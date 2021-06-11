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
                if (!foundData.author) {
                    if (Array.isArray(authors))
                        foundData.author = authors.map((author) => author.name);
                    else if (authors) foundData.author = authors.name;
                }

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
    } catch (error) {
        console.log(error);
    }
    return foundData;
});
