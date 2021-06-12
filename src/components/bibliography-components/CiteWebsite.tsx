import { Container, Heading } from '@chakra-ui/layout';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import SearchWebsite from './SearchWebsite';

export interface CiteWebsiteProps {}

const CiteWebsite: FC<CiteWebsiteProps> = () => {
    return (
        <Container centerContent>
            <Heading>Cite a Website</Heading>
            <SearchWebsite marginTop="2vh" />
            <Link
                to="/create-bibliography/cite-website/manual-citation"
                style={{ textDecoration: 'underline' }}
            >
                Cite it Manually
            </Link>
        </Container>
    );
};

export default CiteWebsite;
