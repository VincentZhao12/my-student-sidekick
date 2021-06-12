import { Flex, Input } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { Name } from '../../utils/BibliographyUtils';

export interface AuthorInputProps {
    onChange?: (names: Name) => any;
    defaultValue?: Name;
}

const AuthorInput: FC<AuthorInputProps> = ({ onChange, defaultValue }) => {
    const [first, setFirst] = useState('');
    const [middle, setMiddle] = useState('');
    const [last, setLast] = useState('');

    return (
        <Flex>
            <Input
                onChange={(e) => {
                    setFirst(e.target.value);
                    onChange &&
                        onChange({
                            first: e.target.value,
                            middle,
                            last,
                        });
                }}
                placeholder="First Name"
                defaultValue={defaultValue?.first}
            />
            <Input
                onChange={(e) => {
                    setMiddle(e.target.value);
                    onChange &&
                        onChange({
                            first,
                            middle: e.target.value,
                            last,
                        });
                }}
                placeholder="Middle Name"
                defaultValue={defaultValue?.middle}
            />
            <Input
                onChange={(e) => {
                    setLast(e.target.value);
                    onChange &&
                        onChange({
                            first,
                            middle,
                            last: e.target.value,
                        });
                }}
                placeholder="Last Name"
                defaultValue={defaultValue?.last}
            />
        </Flex>
    );
};

export default AuthorInput;
