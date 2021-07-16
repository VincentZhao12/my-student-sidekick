import React, { FC, useState } from 'react';
import {
    Button,
    Container,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useMediaQuery,
} from '@chakra-ui/react';
import WeightedCalc from '../components/grade-components/WeightedCalc';
import PointBasedCalc from '../components/grade-components/PointBasedCalc';
import FinalCalc from '../components/grade-components/FinalCalc';
import TestCalc from '../components/grade-components/TestCalc';
import { ChevronDownIcon } from '@chakra-ui/icons';

export interface GradeCalculatorProps {}

const GradeCalculator: FC<GradeCalculatorProps> = () => {
    const [isLargerThan500] = useMediaQuery('(min-width: 500px)');
    const [showing, setShowing] = useState(<WeightedCalc />);
    return (
        <Container
            centerContent
            width={{
                base: 'xs',
                md: 'sm',
                lg: 'md',
            }}
        >
            <Heading>Grade Calculators</Heading>
            {isLargerThan500 ? (
                <Tabs isFitted marginTop="3" colorScheme="special">
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
                        <TabPanel>
                            <TestCalc />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            ) : (
                <>
                    <Container marginTop="3">
                        <Menu>
                            <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                width="inherit"
                            >
                                Calculators
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    onClick={() => setShowing(<WeightedCalc />)}
                                >
                                    Weighted
                                </MenuItem>
                                <MenuItem
                                    onClick={() =>
                                        setShowing(<PointBasedCalc />)
                                    }
                                >
                                    Assignment Based
                                </MenuItem>
                                <MenuItem
                                    onClick={() => setShowing(<FinalCalc />)}
                                >
                                    Needed Final Score
                                </MenuItem>
                                <MenuItem
                                    onClick={() => setShowing(<TestCalc />)}
                                >
                                    Needed Test Score
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Container>
                    <div style={{ marginTop: 3 }}>{showing}</div>
                </>
            )}
        </Container>
    );
};

export default GradeCalculator;
