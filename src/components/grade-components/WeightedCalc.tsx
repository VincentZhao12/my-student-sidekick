import { Button, IconButton } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Container, Text } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Tooltip } from '@chakra-ui/tooltip';
import React, { FC, useEffect, useState } from 'react';
import Card from '../Card';
import NumberInputWrapper from '../NumberInputWrapper';

export interface WeightedCalcProps {}

const WeightedCalc: FC<WeightedCalcProps> = () => {
    const [categories, setCategories] = useState<Category[]>([
        { grade: 0, weight: 100 },
    ]);
    const [grade, setGrade] = useState<number>(100);
    const [show, setShow] = useState<boolean>();

    const calculateGrade = () => {
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
        <Container centerContent>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Grade %</Th>
                        <Th>Weight %</Th>
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
                        />
                    ))}
                </Tbody>
            </Table>
            <Tooltip label="Add Category">
                <IconButton
                    icon={<AddIcon />}
                    aria-label="Add Category"
                    width="inherit"
                    colorScheme="blue"
                    onClick={() =>
                        setCategories([...categories, { grade: 0, weight: 0 }])
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

interface Category {
    grade: number;
    weight: number;
}

interface CategoryInputProps {
    onChange?: (category: Category) => void;
}

const CategoryInput: FC<CategoryInputProps> = ({ onChange }) => {
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
                />
            </Td>
            <Td>
                <NumberInputWrapper
                    onChange={(num) =>
                        category
                            ? setCategory({ ...category, weight: num })
                            : setCategory({ weight: num, grade: 0 })
                    }
                />
            </Td>
        </Tr>
    );
};

export default WeightedCalc;
