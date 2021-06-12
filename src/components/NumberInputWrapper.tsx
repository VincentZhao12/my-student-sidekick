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
    defaultValue?: number;
    backgroundColor?: BackgroundProps['backgroundColor'];
}

const NumberInputWrapper: FC<NumberInputWrapperProps> = ({
    onChange,
    placeholder,
    backgroundColor,
    defaultValue,
}) => {
    return (
        <NumberInput
            onChange={(str, num) => onChange && onChange(num)}
            defaultValue={defaultValue}
        >
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
