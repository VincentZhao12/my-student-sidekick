import { Container } from '@chakra-ui/layout';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useBibliography } from '../contexts/BibliographyContext';
import { createCitation } from '../utils/BibliographyUtils';

export interface BibliographyProps {}

const Bibliography: FC<BibliographyProps> = () => {
    const { citations } = useBibliography();
    return (
        <Container>
            <Link to="/create-bibliography/cite-website">Cite a Website</Link>
            {citations.map((citation) => (
                <p>{createCitation(citation)}</p>
            ))}
        </Container>
    );
};

export default Bibliography;
