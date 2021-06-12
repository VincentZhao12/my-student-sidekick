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
    value?: number;
}

const NumberInputWrapper: FC<NumberInputWrapperProps> = ({
    onChange,
    placeholder,
    backgroundColor,
    defaultValue,
    value,
}) => {
    return (
        <NumberInput
            onChange={(str, num) => onChange && onChange(num)}
            defaultValue={defaultValue}
            value={value === undefined ? undefined : value + ''}
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
