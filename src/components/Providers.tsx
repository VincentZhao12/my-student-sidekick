import { ChakraProvider } from '@chakra-ui/react';
import React, { FC } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import theme from '../theme';

export interface ProvidersProps {}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>{children}</AuthProvider>
        </ChakraProvider>
    );
};

export default Providers;
