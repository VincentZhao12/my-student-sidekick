import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Input, Tooltip } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { Name } from '../../utils/BibliographyUtils';

export interface AuthorInputProps {
    onChange?: (names: Name) => any;
    defaultValue?: Name;
    onDelete: () => any;
}

const AuthorInput: FC<AuthorInputProps> = ({
    onChange,
    defaultValue,
    onDelete,
}) => {
    const [first, setFirst] = useState(defaultValue?.first);
    const [middle, setMiddle] = useState(defaultValue?.middle);
    const [last, setLast] = useState(defaultValue?.last);

    return (
        <Flex>
            <Input
                onChange={(e) => {
                    setFirst(e.target.value);
                    onChange &&
                        onChange({
                            first: e.target.value,
                            middle,
                            last: last || '',
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
                            first: first || '',
                            middle: e.target.value,
                            last: last || '',
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
                            first: first || '',
                            middle,
                            last: e.target.value,
                        });
                }}
                placeholder="Last Name"
                defaultValue={defaultValue?.last}
            />
            <Tooltip label="Delete Author">
                <IconButton
                    aria-label="Delete Author"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={onDelete}
                />
            </Tooltip>
        </Flex>
    );
};

export default AuthorInput;
