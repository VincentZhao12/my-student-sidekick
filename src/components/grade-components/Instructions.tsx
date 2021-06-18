import { QuestionIcon } from '@chakra-ui/icons';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    IconButton,
} from '@chakra-ui/react';
import React, { FC } from 'react';

interface InstructionsProps {
    title: string;
}

const Instructions: FC<InstructionsProps> = ({ title, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <IconButton
                aria-label="Help"
                icon={<QuestionIcon />}
                onClick={onOpen}
                marginBottom="inherit"
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{children}</ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Instructions;
