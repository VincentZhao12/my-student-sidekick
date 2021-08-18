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
    Icon,
    Badge,
    Avatar,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactComponent as Logo } from '../images/logo.svg';
import { IoExitOutline } from 'react-icons/io5';

type LinkData = {
    to: string;
    text: string;
    badge?: string;
};

const linksData: LinkData[] = [
    { text: 'Grade Calculator', to: '/grade-calculator' },
    { text: 'Create Bibliography', to: '/create-bibliography' },
    { text: 'Notes', to: '/notes' },
    { text: 'Schedule', to: '/schedule' },
    { text: 'Quizzes', to: '/quizzes', badge: 'Beta' },
];

export const NavLink = ({
    children,
    to,
    onClick,
}: {
    children: ReactNode;
    to?: string;
    onClick?: () => any;
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
        onClick={onClick}
    >
        {children}
    </StyledLink>
);

const Links = ({ onClose }: { onClose?: () => any }) => (
    <>
        {linksData.map((link) => (
            <NavLink to={link.to} key={link.to} onClick={onClose}>
                {link.text}
                {link.badge && (
                    <Badge ml="1" colorScheme="special">
                        {link.badge}
                    </Badge>
                )}
            </NavLink>
        ))}
    </>
);

const Navbar: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { loggedIn, logout, currentUser } = useAuth();
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
                        <Icon viewBox="0 0 600 600" fill="white" boxSize={10}>
                            <Logo />
                        </Icon>
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
                                    as={Avatar}
                                    backgroundColor="gray.600"
                                />
                                <MenuList>
                                    <MenuItem
                                        cursor="default!important"
                                        isDisabled={true}
                                        _disabled={{ color: 'white' }}
                                    >
                                        <Text fontWeight="bold">
                                            {currentUser?.displayName}
                                        </Text>
                                    </MenuItem>
                                    <hr />
                                    <MenuItem onClick={logout}>
                                        <Flex
                                            width="inherit"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Text>Log Out</Text>
                                            <Spacer />
                                            <Icon
                                                as={IoExitOutline}
                                                height="100%"
                                            />
                                        </Flex>
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
                        <Links onClose={onClose} />
                        {!loggedIn && (
                            <>
                                <NavLink to="/login" onClick={onClose}>
                                    Log In
                                </NavLink>
                                <NavLink to="/signup" onClick={onClose}>
                                    Sign Up
                                </NavLink>
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
