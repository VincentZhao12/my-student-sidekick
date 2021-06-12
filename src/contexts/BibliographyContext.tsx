import React, { createContext, FC, useContext, useState } from 'react';
import {
    BibliographyData,
    CitationData,
    createCitation,
} from '../utils/BibliographyUtils';

const initValue: BibliographyData = {
    citations: [],
    addCitation: (citation) => {},
    deleteCitation: (index) => {},
};
const BibliographyContext = createContext(initValue);

export const useBibliography = () => {
    return useContext(BibliographyContext);
};

export const BibliographyProvider: FC = ({ children }) => {
    const [citations, setCitations] = useState<CitationData[]>([]);
    const [newCitation, setNewCitation] = useState<CitationData>();

    const compareCitation = (
        citation1: CitationData,
        citation2: CitationData,
    ) => {
        let comparable1 = createCitation(citation1);
        let comparable2 = createCitation(citation2);

        return comparable1.localeCompare(comparable2);
    };

    const addCitation = (citation: CitationData) => {
        let newCitations = citations;
        newCitations.push(citation);

        newCitations.sort((a, b) => compareCitation(a, b));

        setCitations(newCitations);

        return newCitations.indexOf(citation);
    };

    const deleteCitation = (index: number) => {
        let newCitations = [...citations];

        console.log(newCitations);

        if (index >= 0 && index < newCitations.length)
            newCitations.splice(index, 1);

        console.log(newCitations);

        setCitations(newCitations);
    };

    const editCitation = (index: number, citation: CitationData) => {
        if (index >= 0 && index < citations.length) {
            let newCitations = citations;
            newCitations[index] = citation;
            setCitations(newCitations);
        }
    };

    const value: BibliographyData = {
        citations,
        addCitation,
        deleteCitation,
        newCitation,
        setNewCitation,
        editCitation,
    };
    return (
        <BibliographyContext.Provider value={value}>
            {children}
        </BibliographyContext.Provider>
    );
};
