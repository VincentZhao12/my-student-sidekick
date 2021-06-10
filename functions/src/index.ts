import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.fetchWebsiteInfo = functions.https.onCall(async (data, context) => {
    const { url } = data;

    try {
        const response = await fetch(url);
        const text = await response.text();
        const dom = await new JSDOM(text);

        let foundData: (String | null)[] = [];

        dom.window.document.querySelectorAll('script').forEach((element) => {
            if (element.type === 'application/ld+json')
                foundData = [...foundData, element.textContent];
        });
        return {
            foundData,
            text,
        };
    } catch (error) {
        return error;
    }
});
