import { Button, IconButton } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Container, Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useBibliography } from '../../contexts/BibliographyContext';
import { DateFormat, Name } from '../../utils/BibliographyUtils';
import AuthorInput from './AuthorInput';
import DateInput from './DateInput';

export interface ManualCitationProps {}

const ManualCitation: FC<ManualCitationProps> = () => {
    const [title, setTitle] = useState<string>();
    const [author, setAuthor] = useState<Name[]>();
    const [siteName, setSiteName] = useState<string>();
    const [publisher, setPublisher] = useState<string>();
    const [url, setUrl] = useState<string>();
    const [date, setDate] = useState<DateFormat>();

    const { newCitation, setNewCitation, addCitation } = useBibliography();

    const history = useHistory();

    useEffect(() => {
        setAuthor(newCitation?.author);
        setTitle(newCitation?.title);
        setSiteName(newCitation?.siteName);
        setPublisher(newCitation?.publisher);
        setUrl(newCitation?.url);
        setDate(newCitation?.date);
    }, [newCitation]);

    const handleSubmit = () => {
        addCitation({
            title: title || '',
            author,
            siteName,
            publisher,
            url,
            date,
        });
        setNewCitation && setNewCitation();
        history.push('/create-bibliography');
    };

    return (
        <Container>
            <Container marginTop="2vh">
                <Text>Article Title</Text>
                <Input
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    defaultValue={newCitation?.title}
                />
            </Container>
            <Container marginTop="2vh">
                <Text justifyContent="center">Author (s)</Text>
                {author?.map((authorName, index) => (
                    <AuthorInput
                        key={index}
                        defaultValue={
                            newCitation?.author && newCitation?.author[index]
                        }
                        onChange={(name) => {
                            let changed = author;
                            changed[index] = name;
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
                    defaultValue={newCitation?.siteName}
                />
            </Container>
            <Container marginTop="2vh">
                <Text>Publisher</Text>
                <Input
                    onChange={(e) => setPublisher(e.target.value)}
                    placeholder="Publisher"
                    defaultValue={newCitation?.publisher}
                />
            </Container>
            <Container marginTop="2vh">
                <Text>URL</Text>
                <Input
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="URL"
                    defaultValue={newCitation?.url}
                />
            </Container>
            <Container marginTop="2vh">
                <Text>Date Published</Text>
                <DateInput
                    onChange={(date) => setDate(date)}
                    defaultValue={newCitation?.date}
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
