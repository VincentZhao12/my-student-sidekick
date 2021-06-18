import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Button, IconButton } from '@chakra-ui/button';
import { CopyIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Container, Heading, VStack, HStack } from '@chakra-ui/layout';
import { Flex, Tooltip } from '@chakra-ui/react';
import parse from 'html-react-parser';
import React, { FC, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useBibliography } from '../contexts/BibliographyContext';
import { createCitation } from '../utils/BibliographyUtils';
import './Bibliography.css';

export interface BibliographyProps {}

const Bibliography: FC<BibliographyProps> = () => {
    const { citations } = useBibliography();

    const ref = useRef<HTMLDivElement>(null);

    const copyCitations = () => {
        const listener = (e: ClipboardEvent) => {
            e.clipboardData?.setData('text/html', ref.current?.innerHTML || '');
            e.clipboardData?.setData(
                'text/plain',
                ref.current?.innerHTML || '',
            );
            e.preventDefault();
        };
        document.addEventListener('copy', listener);
        document.execCommand('copy');
        document.removeEventListener('copy', listener);
    };

    return (
        <Container centerContent>
            <Heading>Bibliography</Heading>
            {citations.length === 0 ? (
                <Alert statur="info" marginTop="3">
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
            <div ref={ref} style={{ display: 'none' }}>
                {citations.map((citation, index) => (
                    <p
                        style={{
                            fontFamily:
                                'Times New Roman, Tinos, Liberation Serif, serif',
                            fontSize: '12pt',
                            lineHeight: '2',
                            color: 'black',
                            fontWeight: 'normal',
                        }}
                        key={index}
                    >
                        {parse(createCitation(citation))}
                    </p>
                ))}
            </div>
            <HStack marginTop="2vh">
                <Button
                    as={Link}
                    to="/create-bibliography/cite-website"
                    colorScheme="secondary"
                >
                    Cite a Website
                </Button>
                <Button
                    onClick={copyCitations}
                    colorScheme="primary"
                    disabled={!citations || !citations.length}
                >
                    Copy All Citations
                </Button>
            </HStack>
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
        const listener = (e: ClipboardEvent) => {
            e.clipboardData?.setData('text/html', ref.current?.innerHTML || '');
            e.clipboardData?.setData(
                'text/plain',
                ref.current?.innerHTML || '',
            );
            e.preventDefault();
        };
        document.addEventListener('copy', listener);
        document.execCommand('copy');
        document.removeEventListener('copy', listener);
    };

    return (
        <>
            <Flex marginTop="2vh">
                <p className="citation">{children}</p>
                <VStack>
                    <Tooltip label="Copy Citation">
                        <IconButton
                            icon={<CopyIcon />}
                            aria-label="Copy Citation"
                            onClick={handleCopyCitation}
                            colorScheme="primary"
                        />
                    </Tooltip>
                    <Tooltip label="Edit Citation">
                        <IconButton
                            icon={<EditIcon />}
                            aria-label="Edit Citation"
                            onClick={() =>
                                history.push(
                                    `/create-bibliography/cite-website/manual-citation/edit${index}`,
                                )
                            }
                            colorScheme="warning"
                        />
                    </Tooltip>
                    <Tooltip label="Delete Citation">
                        <IconButton
                            icon={<DeleteIcon />}
                            aria-label="Delete Citation"
                            onClick={() => deleteCitation(index)}
                            colorScheme="danger"
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
