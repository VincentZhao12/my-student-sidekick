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
    const timestamp = context.timestamp;

    db.collection('users')
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                const data = doc.data();
                checkNotifications(timestamp, data.id, data.notificationTokens);
            });
        });

    return null;
});

const checkNotifications = async (
    time: string,
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
            if (!data.notified) {
                sendMessages(
                    notificationTokens,
                    data.title,
                    `Your event, ${data.title}, starts now!`,
                );
                doc.ref.update({ notified: true });
            }
        });
    } catch (e) {
        functions.logger.warn(e);
    }
};

const sendMessages = (tokens: string[], title: string, desc: string) => {
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
