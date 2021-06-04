import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    BackgroundProps,
} from '@chakra-ui/react';
import React, { FC } from 'react';

export interface NumberInputWrapperProps {
    onChange?: (num: number) => void;
    placeholder?: string;
    backgroundColor?: BackgroundProps['backgroundColor'];
}

const NumberInputWrapper: FC<NumberInputWrapperProps> = ({
    onChange,
    placeholder,
    backgroundColor,
}) => {
    return (
        <NumberInput onChange={(str, num) => onChange && onChange(num)}>
            <NumberInputField
                placeholder={placeholder}
                backgroundColor={backgroundColor}
            />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    );
};

export default NumberInputWrapper;
