import { Button } from '@chakra-ui/button';
import { VStack } from '@chakra-ui/layout';
import React, { FC } from 'react';

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
        <VStack>
            {noteTitles.map((note, index) => (
                <Button
                    onClick={() => {
                        if (onIndexChange) onIndexChange(index);
                    }}
                    key={index}
                    width={'3xs'}
                    style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                    colorScheme={selectedIndex === index ? 'blue' : 'gray'}
                    opacity={1}
                >
                    {note}
                </Button>
            ))}
        </VStack>
    );
};

export default NotesDisplay;
