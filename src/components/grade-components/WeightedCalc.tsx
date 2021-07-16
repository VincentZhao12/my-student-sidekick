import { Button, IconButton } from '@chakra-ui/button';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Container, Text } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Tooltip } from '@chakra-ui/tooltip';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import Card from '../Card';
import NumberInputWrapper from '../NumberInputWrapper';
import Instructions from './Instructions';

export interface WeightedCalcProps {}

const WeightedCalc: FC<WeightedCalcProps> = () => {
    const [categories, setCategories] = useState<Category[]>([
        { grade: 0, weight: 100 },
    ]);
    const [grade, setGrade] = useState<number>(100);
    const [show, setShow] = useState<boolean>();

    const calculateGrade = (e: SyntheticEvent) => {
        e.preventDefault();
        let grade = 0;
        let totalWeight = 0;
        categories.forEach((category) => {
            grade += (category.grade * category.weight) / 100;
            totalWeight += category.weight;
        });
        grade = (grade / totalWeight) * 100;
        setGrade(grade);
        setShow(true);
    };

    return (
        <Container centerContent width="inherit">
            <form onSubmit={calculateGrade}>
                <Table width="inherit">
                    <Thead>
                        <Tr>
                            <Th>Grade %</Th>
                            <Th>Weight %</Th>
                            <Th>
                                <Instructions title="How do I use this?">
                                    Calculate your grade for a class with a
                                    weighted gradebook. Enter your grades in
                                    each weighted category and how much each
                                    category is worth.
                                </Instructions>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories.map((category, index) => (
                            <CategoryInput
                                key={index}
                                onChange={(category) => {
                                    let changed = categories;
                                    changed[index] = category;
                                    setCategories(changed);
                                }}
                                onRemove={() => {
                                    let removed = [...categories];
                                    removed.splice(index, 1);
                                    setCategories(removed);
                                }}
                            />
                        ))}
                    </Tbody>
                </Table>
                <Tooltip label="Add Category">
                    <IconButton
                        icon={<AddIcon />}
                        aria-label="Add Category"
                        width={{
                            base: 'xs',
                            md: 'sm',
                            lg: 'md',
                        }}
                        colorScheme="secondary"
                        variant="outline"
                        onClick={() =>
                            setCategories([
                                ...categories,
                                { grade: 0, weight: 0 },
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
                    type="submit"
                >
                    Calculate
                </Button>
            </form>

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

interface Category {
    grade: number;
    weight: number;
}

interface CategoryInputProps {
    onChange?: (category: Category) => void;
    onRemove?: () => any;
}

const CategoryInput: FC<CategoryInputProps> = ({ onChange, onRemove }) => {
    const [category, setCategory] = useState<Category>();

    useEffect(() => {
        onChange && onChange(category ? category : { grade: 0, weight: 0 });
    }, [category, onChange]);

    return (
        <Tr>
            <Td>
                <NumberInputWrapper
                    onChange={(num) =>
                        category
                            ? setCategory({ ...category, grade: num })
                            : setCategory({ grade: num, weight: 0 })
                    }
                    required
                />
            </Td>
            <Td>
                <NumberInputWrapper
                    onChange={(num) =>
                        category
                            ? setCategory({ ...category, weight: num })
                            : setCategory({ weight: num, grade: 0 })
                    }
                    required
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

export default WeightedCalc;
