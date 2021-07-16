import { Button, Tooltip, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';

interface ToolbarButtonProps {
    onClick?: () => void;
    label?: string;
    selected?: boolean;
    style?: any;
}

const ToolbarButton: FC<ToolbarButtonProps> = ({
    children,
    onClick,
    label,
    selected,
}) => {
    const selectedColor = useColorModeValue('black', 'gray.100');
    const deselectedColor = useColorModeValue('gray.200', 'gray.600');
    return (
        <Tooltip label={label}>
            <Button
                rounded={'initial'}
                bg={deselectedColor}
                borderColor={selected ? selectedColor : deselectedColor}
                border={selected ? '1px' : 'none'}
                size="lg"
                // DON'T CHANGE THIS TO ONCLICK, IDK WHY, BUT IT BREAKS
                onMouseDown={(e) => {
                    e.preventDefault();
                    if (onClick) onClick();
                }}
            >
                {children}
            </Button>
        </Tooltip>
    );
};

export default ToolbarButton;
