export interface DateFormat {
    month: string;
    day: number;
    year: number;
}

export interface Name {
    first: string;
    last: string;
    middle?: string;
}

export interface CitationData {
    author?: Name[];
    date?: DateFormat;
    publisher?: string;
    siteName?: string;
    title: string;
    url?: string;
}

export interface BibliographyData {
    citations: CitationData[];
    addCitation: (ciation: CitationData) => any;
    deleteCitation: (index: number) => any;
    newCitation?: CitationData;
    setNewCitation?: (citation?: CitationData) => any;
    editCitation?: (index: number, citation: CitationData) => any;
}

export const createCitation: (citation?: CitationData) => string = (
    citation,
) => {
    let result = '';

    if (citation?.author?.length) {
        result += `${citation?.author[0].last}, ${citation?.author[0].first}`;
        if (citation?.author.length === 2)
            result += `, and ${citation?.author[1].last}, ${citation?.author[1].first}`;
        else if (citation?.author.length > 2) result += ', et al';

        result += '. ';
    }

    result += `<q>${citation?.title}</q>. `;

    if (citation?.siteName) result += `${citation?.siteName.italics()}, `;

    if (citation?.publisher) result += `${citation?.publisher}, `;

    if (citation?.date)
        result += `${citation?.date.month} ${citation?.date.day} ${citation?.date.year}, `;

    if (citation?.url) result += citation?.url + '. ';

    return result;
};
