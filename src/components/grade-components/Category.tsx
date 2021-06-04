import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Container, Flex, Heading, Spacer } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import React, { FC, useEffect, useState } from 'react';
import Card from '../Card';
import NumberInputWrapper from '../NumberInputWrapper';
import { AssignmentType } from './Assignment';

export interface CategoryProps {
    onPercentageChange?: (percentage: number) => any;
    onWeightChange?: (weight: number) => any;
}

const Category: FC<CategoryProps> = ({
    onWeightChange,
    onPercentageChange,
}) => {
    const { isOpen, onToggle } = useDisclosure();
    const [weight, setWeight] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [assignments, setAssignments] = useState<AssignmentType[]>([]);

    useEffect(
        () => onWeightChange && onWeightChange(isNaN(weight) ? 0 : weight),
        [onWeightChange, weight],
    );

    useEffect(() => {
        let points = 0;
        let possiblePoints = 0;

        assignments.forEach((assignment) => {
            points += assignment.points;
            possiblePoints += assignment.possiblePoints;
        });

        const percentage = points / possiblePoints;

        onPercentageChange &&
            onPercentageChange(isNaN(percentage) ? 0 : percentage);
    }, [onPercentageChange, assignments]);

    return (
        <Container>
            <Card backgroundColor="teal.800" padding={3}>
                <Heading size="md" marginBottom="3">
                    Assignment Category
                </Heading>
                <Flex>
                    <NumberInputWrapper
                        placeholder="Category Weight %"
                        onChange={(weight) => setWeight(weight)}
                    />
                    <Spacer />
                    <Card padding={2}>{percentage * 100}%</Card>
                    <Spacer />
                    <Tooltip
                        label={isOpen ? 'Hide Assignments' : 'Show Assignments'}
                    >
                        <IconButton
                            icon={isOpen ? <MinusIcon /> : <AddIcon />}
                            aria-label={'Show Assignments'}
                            onClick={onToggle}
                        />
                    </Tooltip>
                </Flex>
            </Card>
        </Container>
    );
};

export default Category;
