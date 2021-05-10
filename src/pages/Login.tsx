import {
    useColorModeValue,
    Stack,
    Heading,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Link as StyledLink,
    VStack,
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    CloseButton,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import firebase from '../firebase';

export interface LoginProps {}

const Login: FC<LoginProps> = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = () => {
        setError('');
        login(email, pass)
            .then(() => {
                history.push('/');
            })
            .catch((error: firebase.auth.AuthError) => {
                if (error.code === 'auth/invalid-email')
                    setError('You did not enter a valid Email');
                else if (error.code === 'auth/user-not-found')
                    setError('This user could not be found');
                else if (error.code === 'auth/wrong-password')
                    setError('Wrong password');
            });
    };

    return (
        <VStack
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            {error && (
                <Stack align={'center'}>
                    <Alert status="error" width={'md'} alignItems="center">
                        <AlertIcon />
                        <AlertTitle mr={2}>Error Signing In!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                        <CloseButton
                            position="absolute"
                            right="8px"
                            top="8px"
                            onClick={() => setError('')}
                        />
                    </Alert>
                </Stack>
            )}
            <Stack align={'center'} marginBottom={'3'}>
                <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            </Stack>
            <Stack align={'center'}>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    minWidth="xs"
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                bg="inherit"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                bg="inherit"
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleSubmit}
                            >
                                Sign in
                            </Button>
                        </Stack>
                        <Stack spacing={10} alignItems="center">
                            <Text>
                                Don't have an account?{' '}
                                <StyledLink
                                    color="cyan.400"
                                    as={Link}
                                    to="/signup"
                                >
                                    Sign Up
                                </StyledLink>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </VStack>
    );
};

export default Login;