import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Container } from '@chakra-ui/layout';
import React, { FC, useState } from 'react';
import { functions } from '../firebase';

export interface BibliographyProps {}

const Bibliography: FC<BibliographyProps> = () => {
    const [author, setAuthor] = useState<string | string[]>('');
    const [date, setDate] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [publisher, setPublisher] = useState<string>('');
    const [site, setSite] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    const fetchCitationInfo = () => {
        const fetchWebsiteData = functions.httpsCallable('fetchWebsiteInfo');

        const fetchData = async () => {
            const response = await fetchWebsiteData({ url });

            const data = response.data;

            console.log(data);

            let authors = data.author;

            if (Array.isArray(authors))
                setAuthor(authors.map((author) => author));
            setAuthor((data && data.author) || '');
            setDate((data && data.date) || '');
            setTitle((data && data.title) || '');
            setPublisher((data && data.publisher) || '');
            setUrl(data && data.url);
            setSite(data && data.siteName);

            const thisDate = new Date(Date.parse(data.date));
            console.log(thisDate.toDateString());
        };

        fetchData();
    };

    return (
        <Container>
            <Input onChange={(e) => setUrl(e.target.value)} />
            <Button onClick={fetchCitationInfo}>Cite</Button>
            <p>Author: {author}</p>
            <p>Date: {date}</p>
            <p>Title: {title}</p>
            <p>Publisher: {publisher} </p>
            <p>Site Name: {site} </p>
            <p>
                Url: <a href={url}>{url}</a>
            </p>
        </Container>
    );
};

export default Bibliography;
