import { Box, Container, Stack } from '@chakra-ui/react';
import React, { FC } from 'react';
import './Footer.css';

export interface FooterProps {}

const Footer: FC<FooterProps> = () => {
    return (
        <Box bg={'gray.900'} color={'gray.200'} className="footer">
            <Container as={Stack} maxW={'6xl'} py={10}></Container>
        </Box>
    );
};

export default Footer;
