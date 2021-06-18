import { Button } from '@chakra-ui/button';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, VStack } from '@chakra-ui/layout';
import { HStack, IconButton } from '@chakra-ui/react';
import React, { FC } from 'react';
import './NoteDisplay.css';

export interface NotesDisplayProps {
    onIndexChange?: (idx: number) => void;
    onDelete?: (idx: number) => void;
    selectedIndex?: number;
    noteTitles: string[];
}

const NotesDisplay: FC<NotesDisplayProps> = ({
    noteTitles,
    onIndexChange,
    onDelete,
    selectedIndex,
}) => {
    return (
        <Box
            height="xl"
            overflowY="auto"
            className="customScroll"
            bg={'gray.700'}
            padding="2"
            borderRadius="lg"
        >
            <VStack>
                {noteTitles.map((note, index) => (
                    <NoteButton
                        onClick={() => {
                            if (onIndexChange) onIndexChange(index);
                        }}
                        key={index}
                        title={note}
                        selected={index === selectedIndex}
                        onDelete={() => onDelete && onDelete(index)}
                    />
                ))}
            </VStack>
        </Box>
    );
};

interface NoteButtonProps {
    onDelete?: () => any;
    selected: boolean;
    title: string;
    onClick: () => any;
}
const NoteButton: FC<NoteButtonProps> = ({
    onDelete,
    selected,
    title,
    onClick,
}) => {
    return (
        <HStack>
            <Button
                onClick={onClick}
                width={'3xs'}
                style={{
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                }}
                colorScheme={selected ? 'special' : 'gray'}
                opacity={1}
                variant="outline"
            >
                {title}
            </Button>
            <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete Citation"
                onClick={onDelete}
                colorScheme="danger"
                variant="outline"
                size="sm"
            />
        </HStack>
    );
};

export default NotesDisplay;
