import { Container } from '@chakra-ui/layout';
import React, { FC, useEffect } from 'react';
import { functions } from '../firebase';

export interface BibliographyProps {}

const Bibliography: FC<BibliographyProps> = () => {
    useEffect(() => {
        const fetchWebsiteData = functions.httpsCallable('fetchWebsiteInfo');
        const url =
            'https://www.politico.com/news/2021/06/09/progressives-climate-provisions-infrastructure-492667';

        const fetchData = async () => {
            const response = await fetchWebsiteData({ url });
            console.log(JSON.parse(response.data.foundData));
        };

        fetchData();
    }, []);

    return <Container></Container>;
};

export default Bibliography;
