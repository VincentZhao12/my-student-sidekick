import { Button } from '@chakra-ui/button';
import { Box, VStack } from '@chakra-ui/layout';
import React, { FC } from 'react';
import './NoteDisplay.css';

export interface NotesDisplayProps {
    onIndexChange?: (idx: number) => void;
    selectedIndex?: number;
    noteTitles: string[];
}

const NotesDisplay: FC<NotesDisplayProps> = ({
    noteTitles,
    onIndexChange,
    selectedIndex,
}) => {
    return (
        <Box height="xl" overflow="scroll" className="customScroll">
            <VStack>
                {noteTitles.map((note, index) => (
                    <Button
                        onClick={() => {
                            if (onIndexChange) onIndexChange(index);
                        }}
                        key={index}
                        width={'3xs'}
                        style={{
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                        }}
                        colorScheme={selectedIndex === index ? 'blue' : 'gray'}
                        opacity={1}
                    >
                        {note}
                    </Button>
                ))}
            </VStack>
        </Box>
    );
};

export default NotesDisplay;
