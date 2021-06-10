import { Container, Spacer, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import NumberInputWrapper from '../NumberInputWrapper';

export interface TestCalcProps {}

const TestCalc: FC<TestCalcProps> = () => {
    const [grade, setGrade] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);

    const [target, setTarget] = useState<number>(0);
    const [current, setCurrent] = useState<number>(0);
    const [testsTaken, setTestsTaken] = useState<number>(0);
    const [testScore, setTestScore] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [displayTarget, setDisplayTarget] = useState<number>(0);

    const calculateGrade = () => {
        let other = current - (weight * testScore) / 100;
        let testPoints = (testsTaken * testScore) / 100;
        let testPossible = testsTaken + 1;
        let needed =
            (((target - other) / weight) * testPossible - testPoints) * 100;

        setGrade(needed);
        setShow(true);
        setDisplayTarget(target);
    };

    return (
        <Container>
            <Stack>
                <Container>
                    <Text>Your Current Grade % </Text>
                    <Spacer />
                    <NumberInputWrapper onChange={setCurrent} />
                </Container>
                <Container>
                    <Text>Your Target Grade % </Text>
                    <Spacer />
                    <NumberInputWrapper onChange={setTarget} />
                </Container>
                <Container>
                    <Text>Test Category Weight % </Text>
                    <Spacer />
                    <NumberInputWrapper onChange={setWeight} />
                </Container>
                <Container>
                    <Text>Tests Taken </Text>
                    <Spacer />
                    <NumberInputWrapper onChange={setTestsTaken} />
                </Container>
                <Container>
                    <Text>Test Category Grade % </Text>
                    <Spacer />
                    <NumberInputWrapper onChange={setTestScore} />
                </Container>
                <Button
                    marginTop="3"
                    colorScheme="green"
                    width="inherit"
                    onClick={calculateGrade}
                >
                    Calculate
                </Button>
                {show && (
                    <Container centerContent>
                        <Text fontSize="3xl">
                            You need{' '}
                            <span
                                style={{
                                    color:
                                        grade >= 95
                                            ? 'red'
                                            : grade >= 85
                                            ? 'orange'
                                            : grade >= 75
                                            ? 'yellow'
                                            : 'green',
                                    fontWeight: 'bold',
                                }}
                            >
                                {Math.round(grade * 100) / 100}%
                            </span>{' '}
                            on your next test to get {displayTarget}%
                        </Text>
                    </Container>
                )}
            </Stack>
        </Container>
    );
};

export default TestCalc;
