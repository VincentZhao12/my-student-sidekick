import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

admin.initializeApp();
const db = admin.firestore();
const messaging = admin.messaging();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

interface CitationData {
    title?: string;
    url?: string;
    siteName?: string;
    date?: string;
    publisher?: string;
    author?: string | string[];
}

exports.fetchWebsiteInfo = functions.https.onCall(async (data, context) => {
    const { url } = data;
    let foundData: CitationData = {};

    try {
        const response = await fetch(url);
        const text = await response.text();
        const dom = await new JSDOM(text);

        foundData.title =
            dom.window.document.querySelector('title')?.textContent || '';

        dom.window.document.querySelectorAll('meta').forEach((meta) => {
            const prop = meta.getAttribute('property');
            const content = meta.content;

            if (prop === 'og:title') foundData.title = content;
            else if (prop === 'og:url') foundData.url = content;
            else if (prop === 'og:site_name') foundData.siteName = content;
            else if (
                prop === 'article:published_time' ||
                meta.getAttribute('itemprop') === 'datePublished'
            )
                foundData.date = content;
            else if (prop === 'article:publisher')
                foundData.publisher = meta.content;
            else if (
                prop === 'article:author' ||
                meta.getAttribute('name') === 'author'
            )
                foundData.author = content;
        });

        dom.window.document.querySelectorAll('script').forEach((script) => {
            if (
                script.type == 'application/ld+json' &&
                script &&
                script.textContent
            ) {
                let scriptData = JSON.parse(script.textContent);

                if (Array.isArray(scriptData)) scriptData = scriptData[0];

                if (scriptData['@graph']) scriptData = scriptData['@graph'][0];

                const authors = scriptData.author;
                if (Array.isArray(authors))
                    foundData.author = authors.map((author) => author.name);
                else if (authors) foundData.author = authors.name;

                if (
                    scriptData['@type'] === 'Organization' ||
                    scriptData['@type'] === 'NewsMediaOrganization'
                )
                    foundData.publisher = scriptData.name;

                if (scriptData.publisher)
                    foundData.publisher = scriptData.publisher.name;

                if (!foundData.date && scriptData.datePublished)
                    foundData.date = scriptData.datePublished;
            }
        });

        if (!foundData.date)
            foundData.date =
                dom.window.document
                    .querySelector('time')
                    ?.getAttribute('datetime') || '';
    } catch (error) {}
    return foundData;
});

exports.periodic = functions.pubsub.schedule('* * * * *').onRun((context) => {
    db.collection('users')
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                const data = doc.data();
                // removeOldEvents(data.id);
                checkNotifications(data.id, data.notificationTokens);
                checkNotifications2(data.id, data.notificationTokens);
                checkNotifications3(data.id, data.notificationTokens);
            });
        });

    return null;
});

// const removeOldEvents = async (user: string) => {
//     const oldEventsSnapshot = await db
//         .collection('users')
//         .doc(user)
//         .collection('events')
//         .where('end', '<', admin.firestore.Timestamp.now())
//         .get();

//     oldEventsSnapshot.docs.forEach((doc) => doc.ref.delete());
// };

const checkNotifications2 = async (
    user: string,
    notificationTokens: string[],
) => {
    const eventsSnapshot = await db
        .collection('users')
        .doc(user)
        .collection('events')
        .where(
            'start',
            '<=',
            admin.firestore.Timestamp.fromMillis(
                admin.firestore.Timestamp.now().toMillis() + 1000 * 60 * 60,
            ),
        )
        .get();

    eventsSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (!data.notified2) {
            sendMessages(
                notificationTokens,
                data.title,
                `Your event, ${data.title}, starts in 1 hour!`,
            );
            doc.ref.update({ notified2: true });
        }
    });
};

const checkNotifications3 = async (
    user: string,
    notificationTokens: string[],
) => {
    const eventsSnapshot = await db
        .collection('users')
        .doc(user)
        .collection('events')
        .where(
            'start',
            '<=',
            admin.firestore.Timestamp.fromMillis(
                admin.firestore.Timestamp.now().toMillis() +
                    1000 * 60 * 60 * 24,
            ),
        )
        .get();

    eventsSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (!data.notified3) {
            sendMessages(
                notificationTokens,
                data.title,
                `Your event, ${data.title}, starts in 1 day!`,
            );
            doc.ref.update({ notified3: true });
        }
    });
};

const checkNotifications = async (
    user: string,
    notificationTokens: string[],
) => {
    try {
        const eventsSnapshot = await db
            .collection('users')
            .doc(user)
            .collection('events')
            .where('start', '<=', admin.firestore.Timestamp.now())
            .get();

        eventsSnapshot.docs.forEach((doc) => {
            const data = doc.data();
            if (!data.notified1) {
                functions.logger.log('message sent to user: ' + user);
                sendMessages(
                    notificationTokens,
                    data.title,
                    `${data.title}, starts now!`,
                );
                doc.ref.update({ notified1: true });
            }
        });
    } catch (e) {
        functions.logger.warn(e);
    }
};

const sendMessages = (tokens: string[], title: string, desc: string) => {
    functions.logger.log(tokens);
    messaging.sendAll(
        tokens.map((token) => ({
            token,
            notification: {
                title,
                body: desc,
            },
        })),
    );
};
