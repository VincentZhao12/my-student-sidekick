import { Button, IconButton } from '@chakra-ui/button';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Container, Text } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Tooltip } from '@chakra-ui/tooltip';
import React, { FC, useEffect, useState } from 'react';
import Card from '../Card';
import NumberInputWrapper from '../NumberInputWrapper';
import Instructions from './Instructions';

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
        <Container centerContent width="inherit">
            <Table width="inherit">
                <Thead>
                    <Tr>
                        <Th>Points Scored</Th>
                        <Th>Possible Points</Th>
                        <Th>
                            <Instructions title="How do I use this?">
                                Calculate your grade for a class with an
                                assignment based gradebook. Enter the amount of
                                points you have scored on each assignment and
                                the amount of points possible for that
                                assignment
                            </Instructions>
                        </Th>
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
                            onRemove={() => {
                                let removed = [...assignments];
                                removed.splice(index, 1);
                                setAssignments(removed);
                            }}
                        />
                    ))}
                </Tbody>
            </Table>
            <Tooltip label="Add Assignment">
                <IconButton
                    icon={<AddIcon />}
                    aria-label="Add Assignment"
                    width={{
                        base: 'xs',
                        md: 'sm',
                        lg: 'md',
                    }}
                    colorScheme="secondary"
                    variant="outline"
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
                colorScheme="primary"
                width={{
                    base: 'xs',
                    md: 'sm',
                    lg: 'md',
                }}
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
    onRemove?: () => any;
}

const AssignmentInput: FC<AssignmentInputProps> = ({ onChange, onRemove }) => {
    const [assignment, setAssignment] = useState<Assignment>();

    useEffect(() => {
        onChange &&
            onChange(
                assignment ? assignment : { points: 0, possiblePoints: 0 },
            );
    }, [assignment, onChange]);

    return (
        <Tr
            width={{
                base: 'xs',
                md: 'sm',
                lg: 'md',
            }}
        >
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
            <Td>
                <Tooltip label="Remove Category">
                    <IconButton
                        aria-label="Remove category"
                        icon={<DeleteIcon />}
                        colorScheme="danger"
                        onClick={onRemove}
                    />
                </Tooltip>
            </Td>
        </Tr>
    );
};

export default PointBasedCalc;
