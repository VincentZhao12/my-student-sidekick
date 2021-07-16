import { ChakraProvider } from '@chakra-ui/react';
import React, { FC } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { BibliographyProvider } from '../contexts/BibliographyContext';
import theme from '../theme';

export interface ProvidersProps {}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <BibliographyProvider>{children}</BibliographyProvider>
            </AuthProvider>
        </ChakraProvider>
    );
};

export default Providers;
