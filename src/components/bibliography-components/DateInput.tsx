import { Flex, Select } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { DateFormat } from '../../utils/BibliographyUtils';
import NumberInputWrapper from '../NumberInputWrapper';

export interface DateInputProps {
    onChange?: (date: DateFormat) => any;
    defaultValue?: DateFormat;
}

const DateInput: FC<DateInputProps> = ({ onChange, defaultValue }) => {
    const [day, setDay] = useState<number>();
    const [month, setMonth] = useState<string>();
    const [year, setYear] = useState<number>();

    return (
        <Flex>
            <Select
                placeholder="Month"
                defaultValue={
                    defaultValue?.month !== '' ? defaultValue?.month : undefined
                }
                onChange={(e) => {
                    setMonth(e.target.value);
                    onChange &&
                        onChange({
                            day: day || 0,
                            month: e.target.value,
                            year: year || 0,
                        });
                }}
            >
                <option value="January">January</option>
                <option value="Febuary">Febuary</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
            </Select>
            <NumberInputWrapper
                onChange={(day) => {
                    setDay(day);
                    onChange &&
                        onChange({
                            day: day || 0,
                            month: month || '',
                            year: year || 0,
                        });
                }}
                placeholder={'Day'}
                defaultValue={
                    defaultValue?.day !== 0 ? defaultValue?.day : undefined
                }
            />
            <NumberInputWrapper
                onChange={(year) => {
                    setYear(year);
                    onChange &&
                        onChange({
                            day: day || 0,
                            month: month || '',
                            year: year || 0,
                        });
                }}
                placeholder={'Year'}
                defaultValue={
                    defaultValue?.year !== 0 ? defaultValue?.year : undefined
                }
            />
        </Flex>
    );
};

export default DateInput;
