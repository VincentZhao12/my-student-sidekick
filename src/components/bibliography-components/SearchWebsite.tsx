import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Flex } from '@chakra-ui/layout';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router';
import { useBibliography } from '../../contexts/BibliographyContext';
import { functions } from '../../firebase';
import { DateFormat, Name } from '../../utils/BibliographyUtils';

export interface SearchWebsiteProps {
    marginTop?: string;
}

const SearchWebsite: FC<SearchWebsiteProps> = ({ marginTop }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const { setNewCitation } = useBibliography();
    const history = useHistory();

    const handleSubmit = async () => {
        setLoading(true);

        const fetchData = functions.httpsCallable('fetchWebsiteInfo');
        const response = await fetchData({ url });
        let citationData = response.data;

        citationData.author = reformatAuthor(citationData.author);

        citationData.date = reformatDate(citationData.date);

        setLoading(false);

        setNewCitation && setNewCitation(citationData);
        history.push('/create-bibliography/cite-website/manual-citation');
    };

    const reformatDate: (date: string) => DateFormat | undefined = (date) => {
        if (!date) return undefined;

        date = date.substring(0, 10);

        let dateObj = new Date(Date.parse(date));

        return {
            month: formatMonth(dateObj.getMonth()),
            day: dateObj.getDate() + 1,
            year: dateObj.getFullYear(),
        };
    };

    const formatMonth = (month: number) => {
        switch (month) {
            case 0:
                return 'January';
            case 1:
                return 'Febuary';
            case 2:
                return 'March';
            case 3:
                return 'April';
            case 4:
                return 'May';
            case 5:
                return 'June';
            case 6:
                return 'July';
            case 7:
                return 'August';
            case 8:
                return 'September';
            case 9:
                return 'October';
            case 10:
                return 'November';
            case 11:
                return 'December';
            default:
                return '';
        }
    };

    const reformatAuthor = (author?: string | string[]) => {
        if (!author) return undefined;
        let result: Name | Name[];
        let authors = author;

        if (typeof author == 'string')
            authors = author.split(',').map((author) => author.trim());

        if (Array.isArray(authors)) {
            result = authors.map((author) => ({
                first: author.substring(0, author.indexOf(' ')),
                last: author.substring(author.lastIndexOf(' ') + 1),
            }));
        } else {
            result = {
                first: authors.substring(0, author.indexOf(' ')),
                last: authors.substring(author.lastIndexOf(' ') + 1),
            };
        }
        return result;
    };

    return (
        <Flex width={'md'} marginTop={marginTop}>
            <Input onChange={(e) => setUrl(e.target.value)} placeholder="URL" />
            <Button
                colorScheme="green"
                onClick={handleSubmit}
                disabled={loading}
                isLoading={loading}
            >
                Cite
            </Button>
        </Flex>
    );
};

export default SearchWebsite;
