import React, { FC } from 'react';
import {
    Container,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import WeightedCalc from '../components/grade-components/WeightedCalc';
import PointBasedCalc from '../components/grade-components/PointBasedCalc';
import FinalCalc from '../components/grade-components/FinalCalc';

export interface GradeCalculatorProps {}

const GradeCalculator: FC<GradeCalculatorProps> = () => {
    return (
        <Container centerContent maxW="container.xl">
            <Heading>Grade Calculators</Heading>
            <Tabs isFitted marginTop="1">
                <TabList>
                    <Tab>Weighted</Tab>
                    <Tab>Assignment Based</Tab>
                    <Tab>Needed Final Score</Tab>
                    <Tab>Needed Test Score</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <WeightedCalc />
                    </TabPanel>
                    <TabPanel>
                        <PointBasedCalc />
                    </TabPanel>
                    <TabPanel>
                        <FinalCalc />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

export default GradeCalculator;