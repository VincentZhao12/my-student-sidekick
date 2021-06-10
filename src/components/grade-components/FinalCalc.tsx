import { Container, Spacer, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import NumberInputWrapper from '../NumberInputWrapper';

export interface FinalCalcProps {}

const FinalCalc: FC<FinalCalcProps> = () => {
    const [grade, setGrade] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);

    const [target, setTarget] = useState<number>(0);
    const [current, setCurrent] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [displayTarget, setDisplayTarget] = useState<number>(0);

    const calculateGrade = () => {
        const grade = (target - (1 - weight / 100) * current) / (weight / 100);
        setGrade(grade);
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
                    <Text>Final Weight % </Text>
                    <Spacer />
                    <NumberInputWrapper onChange={setWeight} />
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
                            on your final to get {displayTarget}%
                        </Text>
                    </Container>
                )}
            </Stack>
        </Container>
    );
};

export default FinalCalc;
