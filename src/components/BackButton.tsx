import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Button, ButtonProps } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

const BackButton: FC<ButtonProps> = ({ children }) => {
    const history = useHistory();
    const back = () => {
        history.goBack();
    };
    return (
        <Button onClick={back}>
            <ChevronLeftIcon marginRight="2" />
            {children || 'Back'}
        </Button>
    );
};

export default BackButton;
