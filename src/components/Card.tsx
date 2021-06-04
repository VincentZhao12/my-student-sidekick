import { BackgroundProps, Box, LayoutProps } from '@chakra-ui/react';
import React, { FC } from 'react';

export interface CardProps {
    maxWidth?: LayoutProps['maxW'];
    backgroundColor?: BackgroundProps['backgroundColor'];
    padding?: number;
}

const Card: FC<CardProps> = ({
    children,
    maxWidth,
    backgroundColor,
    padding,
}) => {
    return (
        <Box
            borderWidth="1px"
            maxW={maxWidth}
            borderRadius="lg"
            padding={padding ? padding : 5}
            backgroundColor={backgroundColor}
            back
        >
            {children}
        </Box>
    );
};

export default Card;
