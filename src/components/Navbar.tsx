import React, { FC, ReactNode } from 'react';
import {
    Box,
    Flex,
    HStack,
    Link as StyledLink,
    IconButton,
    useDisclosure,
    useColorModeValue,
    Stack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactComponent as UserIcon } from '../images/user.svg';

type LinkData = {
    to: string;
    text: string;
};

const linksData: LinkData[] = [
    { text: 'Grade Calculator', to: '/grade-calculator' },
    { text: 'Create Bibliography', to: '/create-bibliography' },
    { text: 'Notes', to: '/notes' },
];

export const NavLink = ({
    children,
    to,
}: {
    children: ReactNode;
    to?: string;
}) => (
    <StyledLink
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        as={Link}
        to={to || ''}
    >
        {children}
    </StyledLink>
);

const Links: FC = () => (
    <>
        {linksData.map((link) => (
            <NavLink to={link.to} key={link.to}>
                {link.text}
            </NavLink>
        ))}
    </>
);

const Navbar: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { loggedIn, logout } = useAuth();
    const iconColor = useColorModeValue('black', 'gray.100');

    return (
        <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: !isOpen ? 'none' : 'inherit' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                    <Box fontSize="xl" as={Link} to="/">
                        My Student Sidekick
                    </Box>
                    <HStack
                        as={'nav'}
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}
                    >
                        <Links />
                    </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                    {loggedIn ? (
                        <>
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    icon={<UserIcon color={iconColor} />}
                                />
                                <MenuList>
                                    <MenuItem onClick={logout}>
                                        Log Out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </>
                    ) : (
                        <Flex display={{ base: 'none', md: 'flex' }}>
                            <NavLink to="/login">Log In</NavLink>
                            <NavLink to="/signup">Sign Up</NavLink>
                        </Flex>
                    )}
                </Flex>
            </Flex>

            {isOpen ? (
                <Box pb={4}>
                    <Stack as={'nav'} spacing={4}>
                        <Links />
                        {!loggedIn && (
                            <>
                                <NavLink to="/login">Log In</NavLink>
                                <NavLink to="/signup">Sign Up</NavLink>
                            </>
                        )}
                    </Stack>
                </Box>
            ) : (
                <React.Fragment />
            )}
        </Box>
    );
};

export default Navbar;
