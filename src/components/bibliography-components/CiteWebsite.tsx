import { Container, Heading } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../BackButton';
import SearchWebsite from './SearchWebsite';

export interface CiteWebsiteProps {}

const CiteWebsite: FC<CiteWebsiteProps> = () => {
    return (
        <Container>
            <BackButton />
            <Container centerContent>
                <Heading>Cite a Website</Heading>
                <SearchWebsite marginTop="2vh" />
                <Text
                    to="/create-bibliography/cite-website/manual-citation"
                    textDecoration="underline"
                    as={Link}
                >
                    Cite it Manually
                </Text>
            </Container>
        </Container>
    );
};

export default CiteWebsite;
