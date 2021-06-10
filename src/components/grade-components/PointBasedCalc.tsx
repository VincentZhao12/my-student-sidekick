import { Button, IconButton } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Container, Text } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Tooltip } from '@chakra-ui/tooltip';
import React, { FC, useEffect, useState } from 'react';
import Card from '../Card';
import NumberInputWrapper from '../NumberInputWrapper';

export interface PointBasedCalcProps {}

const PointBasedCalc: FC<PointBasedCalcProps> = () => {
    const [assignments, setAssignments] = useState<Assignment[]>([
        { points: 0, possiblePoints: 0 },
    ]);
    const [grade, setGrade] = useState<number>(100);
    const [show, setShow] = useState<boolean>();

    const calculateGrade = () => {
        let points = 0;
        let possiblePoints = 0;
        assignments.forEach((assignment) => {
            points += assignment.points;
            possiblePoints += assignment.possiblePoints;
        });

        if (possiblePoints === 0) setGrade(0);
        else setGrade((points / possiblePoints) * 100);
        setShow(true);
    };

    return (
        <Container centerContent>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Points Scored</Th>
                        <Th>Possible Points</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {assignments.map((assignment, index) => (
                        <AssignmentInput
                            key={index}
                            onChange={(assignment) => {
                                let changed = assignments;
                                changed[index] = assignment;
                                setAssignments(changed);
                            }}
                        />
                    ))}
                </Tbody>
            </Table>
            <Tooltip label="Add Assignment">
                <IconButton
                    icon={<AddIcon />}
                    aria-label="Add Assignment"
                    width="inherit"
                    colorScheme="blue"
                    onClick={() =>
                        setAssignments([
                            ...assignments,
                            { points: 0, possiblePoints: 0 },
                        ])
                    }
                />
            </Tooltip>

            <Button
                marginTop="3"
                colorScheme="green"
                width="inherit"
                onClick={calculateGrade}
            >
                Calculate
            </Button>

            {show && (
                <div style={{ marginTop: '3vh' }}>
                    <Card maxWidth="-webkit-min-content">
                        <Text fontSize="3xl">
                            {Math.round(grade * 100) / 100}%
                        </Text>
                    </Card>
                </div>
            )}
        </Container>
    );
};

interface Assignment {
    points: number;
    possiblePoints: number;
}

interface AssignmentInputProps {
    onChange?: (assignment: Assignment) => void;
}

const AssignmentInput: FC<AssignmentInputProps> = ({ onChange }) => {
    const [assignment, setAssignment] = useState<Assignment>();

    useEffect(() => {
        onChange &&
            onChange(
                assignment ? assignment : { points: 0, possiblePoints: 0 },
            );
    }, [assignment, onChange]);

    return (
        <Tr>
            <Td>
                <NumberInputWrapper
                    onChange={(num) =>
                        assignment
                            ? setAssignment({ ...assignment, points: num })
                            : setAssignment({ points: num, possiblePoints: 0 })
                    }
                />
            </Td>
            <Td>
                <NumberInputWrapper
                    onChange={(num) =>
                        assignment
                            ? setAssignment({
                                  ...assignment,
                                  possiblePoints: num,
                              })
                            : setAssignment({ possiblePoints: num, points: 0 })
                    }
                />
            </Td>
        </Tr>
    );
};

export default PointBasedCalc;
