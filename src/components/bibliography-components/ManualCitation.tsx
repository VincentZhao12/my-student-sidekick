import { Button, IconButton } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Container, Heading, Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import React, { FC, useEffect, useState } from 'react';
import { match, useHistory } from 'react-router';
import { useBibliography } from '../../contexts/BibliographyContext';
import { CitationData, DateFormat, Name } from '../../utils/BibliographyUtils';
import AuthorInput from './AuthorInput';
import DateInput from './DateInput';

interface MatchParams {
    index: string;
}

export interface ManualCitationProps {
    match?: match<MatchParams>;
}

const ManualCitation: FC<ManualCitationProps> = ({ match }) => {
    const [title, setTitle] = useState<string>();
    const [author, setAuthor] = useState<Name[]>();
    const [siteName, setSiteName] = useState<string>();
    const [publisher, setPublisher] = useState<string>();
    const [url, setUrl] = useState<string>();
    const [date, setDate] = useState<DateFormat>();
    const [defaultData, setDefaultData] = useState<CitationData>();
    const index = parseInt(match?.params.index || '');

    const {
        citations,
        newCitation,
        setNewCitation,
        addCitation,
        editCitation,
    } = useBibliography();

    const history = useHistory();

    useEffect(() => {
        let defaultData = newCitation || { title: '' };
        if (match?.params.index && index >= 0 && index < citations.length)
            defaultData = citations[index];
        setAuthor(defaultData?.author);
        setTitle(defaultData?.title);
        setSiteName(defaultData?.siteName);
        setPublisher(defaultData?.publisher);
        setUrl(defaultData?.url);
        setDate(defaultData?.date);

        setDefaultData(defaultData);
    }, [newCitation, citations, index, match?.params.index]);

    const handleSubmit = () => {
        if (match?.params.index) {
            editCitation &&
                editCitation(index, {
                    title: title || '',
                    author,
                    siteName,
                    publisher,
                    url,
                    date,
                });
        } else {
            addCitation({
                title: title || '',
                author,
                siteName,
                publisher,
                url,
                date,
            });
            setNewCitation && setNewCitation();
        }

        history.push('/create-bibliography');
    };

    return (
        <Container centerContent>
            <Heading>
                {newCitation
                    ? 'Make Edits and Add More Information'
                    : match?.params.index !== undefined
                    ? 'Edit Citation'
                    : 'Cite a Website'}
            </Heading>
            <Container marginTop="2vh">
                <Text>Article Title</Text>
                <Input
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    defaultValue={defaultData?.title}
                />
            </Container>
            <Container marginTop="2vh">
                <Text justifyContent="center">Author (s)</Text>
                {author?.map((authorName, index) => (
                    <AuthorInput
                        key={index}
                        defaultValue={
                            defaultData?.author && defaultData?.author[index]
                        }
                        onChange={(name) => {
                            let changed = author;
                            changed[index] = name;
                        }}
                        onDelete={() => {
                            let changed = [...author];
                            changed.splice(index, 1);
                            setAuthor(changed);
                            console.log(author);
                        }}
                    />
                ))}
                <Tooltip label="Add Author">
                    <IconButton
                        icon={<AddIcon />}
                        aria-label="Add Author"
                        onClick={() =>
                            author
                                ? setAuthor([
                                      ...author,
                                      { first: '', last: '' },
                                  ])
                                : setAuthor([{ first: '', last: '' }])
                        }
                        width="inherit"
                        alignSelf="center"
                    />
                </Tooltip>
            </Container>

            <Container marginTop="2vh">
                <Text>Website Name</Text>
                <Input
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder="Website Name"
                    defaultValue={defaultData?.siteName}
                />
            </Container>
            <Container marginTop="2vh">
                <Text>Publisher</Text>
                <Input
                    onChange={(e) => setPublisher(e.target.value)}
                    placeholder="Publisher"
                    defaultValue={defaultData?.publisher}
                />
            </Container>
            <Container marginTop="2vh">
                <Text>URL</Text>
                <Input
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="URL"
                    defaultValue={defaultData?.url}
                />
            </Container>
            <Container marginTop="2vh">
                <Text>Date Published</Text>
                <DateInput
                    onChange={(date) => setDate(date)}
                    defaultValue={defaultData?.date}
                />
            </Container>
            <Container>
                <Button
                    colorScheme="green"
                    width="inherit"
                    onClick={handleSubmit}
                >
                    Finish Citation
                </Button>
            </Container>
        </Container>
    );
};

export default ManualCitation;
