import {
    Box,
    Container,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { FC } from 'react';
import { FcDocument, FcCalculator, FcCalendar } from 'react-icons/fc';
import { GoMarkGithub } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { ReactComponent as Pencil } from '../images/pencil.svg';

export interface HomepageProps {}

const Homepage: FC<HomepageProps> = () => {
    return (
        <Container maxW={'5xl'}>
            <Stack
                as={Box}
                textAlign={'center'}
                spacing={{ base: 8, md: 14 }}
                py={{ base: 20, md: 36 }}
            >
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}
                >
                    Student life{' '}
                    <Text as={'span'} color={'special.500'}>
                        made easy
                    </Text>
                </Heading>
                <Text color={'gray.500'}>
                    Simplify your student experience by using the tools provided
                    on this website. This website is currently in development so
                    any feedback and suggestions would be very appreciated.
                    Email feedback and suggestions to{' '}
                    <Text
                        as={'a'}
                        color="primary.300"
                        textDecoration="underline"
                        href="mailto:mystudentsidekick@gmail.com"
                    >
                        mystudentsidekick@gmail.com
                    </Text>{' '}
                    or make an issue on{' '}
                    <Text
                        as={'a'}
                        color="primary.300"
                        textDecoration="underline"
                        href="https://github.com/VincentZhao12/my-student-sidekick"
                        target="_blank"
                    >
                        Github
                    </Text>
                </Text>
                <SimpleThreeColumns />
            </Stack>
        </Container>
    );
};

interface FeatureProps {
    title: string;
    text: string;
    icon: ReactElement;
    to?: string;
}

const Feature = ({ title, text, icon, to }: FeatureProps) => {
    return (
        <Stack as={Link} to={to || ''} alignItems="center">
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}
            >
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </Stack>
    );
};

const FeatureLink = ({ title, text, icon, to }: FeatureProps) => {
    return (
        <Stack as={'a'} href={to || ''} target="_blank" alignItems="center">
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}
            >
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </Stack>
    );
};

const SimpleThreeColumns = () => {
    return (
        <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 5 }} spacing={10}>
                <Feature
                    icon={<Icon as={FcCalculator} w={10} h={10} />}
                    title={'Grade Calculators'}
                    text={
                        'Calculate your grade based on different grading systems and the test grades you need to get a certain grade'
                    }
                    to="/grade-calculator"
                />
                <Feature
                    icon={<Icon as={FcDocument} w={10} h={10} />}
                    title={'Create Citations'}
                    text={
                        'Write your bibliogrpahy using our citaitons tool. Input a website and this webiste will search the web for citation information about it. Alternatively, you can input your citation data manually. '
                    }
                    to="/create-bibliography"
                />
                <Feature
                    icon={<Icon as={Pencil} w={10} h={10} />}
                    title={'Take Notes'}
                    text={
                        'Use our simple note taker to quickly take some notes and save them to your computer. '
                    }
                    to="/notes"
                />
                <Feature
                    icon={<Icon as={FcCalendar} w={10} h={10} />}
                    title={'Schedule'}
                    text={
                        'Create a schedule using this app to keep track of your events, and get notified before your events start. '
                    }
                    to="/schedule"
                />
                <FeatureLink
                    icon={
                        <Icon as={GoMarkGithub} w={10} h={10} color="black" />
                    }
                    title={'Check out the code'}
                    text={
                        'If you want to check out the code, create an issue, or make a pull request, you can check out the Github repository for this project'
                    }
                    to={'https://github.com/VincentZhao12/my-student-sidekick'}
                />
            </SimpleGrid>
        </Box>
    );
};

export default Homepage;
