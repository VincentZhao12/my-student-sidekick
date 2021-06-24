import { Container, Heading, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Profile } from '../images/profile.svg';

interface NeedAccountProps {}

const NeedAccount: FC<NeedAccountProps> = () => {
    return (
        <Container centerContent width="xl">
            <Heading>Please Log In</Heading>
            <Profile style={{ marginTop: '3vh' }} />
            <Text marginTop="3vh" textAlign="center" fontSize="xl" width="xl">
                This feature requires an account. Please click this link to{' '}
                <Text color="special.300" as={Link} to="/login">
                    log in
                </Text>{' '}
                or this link to{' '}
                <Text color="special.300" as={Link} to="/signup">
                    create an account
                </Text>
                . If you don't want to create an account, this website offers
                many other features that don't require an account
            </Text>
        </Container>
    );
};

export default NeedAccount;
