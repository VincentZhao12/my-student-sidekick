import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Button, IconButton } from '@chakra-ui/button';
import { CopyIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Container, Heading, VStack } from '@chakra-ui/layout';
import { Flex, Tooltip } from '@chakra-ui/react';
import parse from 'html-react-parser';
import React, { FC, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useBibliography } from '../contexts/BibliographyContext';
import { createCitation } from '../utils/BibliographyUtils';
import './Bibliography.css';

export interface BibliographyProps {}

const Bibliography: FC<BibliographyProps> = () => {
    const { citations } = useBibliography();

    useEffect(() => {
        console.log(citations);
    }, [citations]);

    return (
        <Container centerContent>
            <Heading>Bibliography</Heading>
            {citations.length === 0 ? (
                <Alert statur="info">
                    <AlertIcon />
                    To add a citation to your bibliography, press the "Cite a
                    Website" button below
                </Alert>
            ) : (
                citations.map((citation, index) => (
                    <CitationText index={index} key={index}>
                        {parse(createCitation(citation))}
                    </CitationText>
                ))
            )}
            <Button
                width="inherit"
                as={Link}
                to="/create-bibliography/cite-website"
                colorScheme="green"
                marginTop="2vh"
            >
                Cite a Website
            </Button>
        </Container>
    );
};

interface CitationTextProps {
    index: number;
}

const CitationText: FC<CitationTextProps> = ({ index, children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const history = useHistory();

    const { deleteCitation } = useBibliography();

    const handleCopyCitation = () => {
        function listener(e: ClipboardEvent) {
            e.clipboardData?.setData('text/html', ref.current?.innerHTML || '');
            e.clipboardData?.setData(
                'text/plain',
                ref.current?.innerHTML || '',
            );
            e.preventDefault();
        }
        document.addEventListener('copy', listener);
        document.execCommand('copy');
        document.removeEventListener('copy', listener);
    };

    return (
        <>
            <Flex marginTop="2vh">
                <p className="citation">{children}</p>
                <VStack>
                    <Tooltip lable="Copy Citation">
                        <IconButton
                            icon={<CopyIcon />}
                            aria-label="Copy Citation"
                            onClick={handleCopyCitation}
                            colorScheme="blue"
                        />
                    </Tooltip>
                    <Tooltip lable="Edit Citation">
                        <IconButton
                            icon={<EditIcon />}
                            aria-label="Edit Citation"
                            onClick={() =>
                                history.push(
                                    `/create-bibliography/cite-website/manual-citation/edit${index}`,
                                )
                            }
                            colorScheme="yellow"
                        />
                    </Tooltip>
                    <Tooltip label="Delete Citation">
                        <IconButton
                            icon={<DeleteIcon />}
                            aria-label="Delete Citation"
                            onClick={() => deleteCitation(index)}
                            colorScheme="red"
                        />
                    </Tooltip>
                </VStack>
            </Flex>
            <div style={{ display: 'none' }} ref={ref}>
                <p
                    style={{
                        fontFamily:
                            'Times New Roman, Tinos, Liberation Serif, serif',
                        fontSize: '12pt',
                        lineHeight: '2',
                        color: 'black',
                        fontWeight: 'normal',
                    }}
                >
                    {children}
                </p>
            </div>
        </>
    );
};

export default Bibliography;
