import React, { FC } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import Category from '../components/grade-components/Category';

export interface GradeCalculatorProps {}

const GradeCalculator: FC<GradeCalculatorProps> = () => {
    return (
        <Container
            justifyContent="center"
            justifyItems="center"
            display="flex"
            flexDirection="column"
        >
            <Heading>Weighted Grade Calculator</Heading>
            <Category />
        </Container>
    );
};

export default GradeCalculator;
