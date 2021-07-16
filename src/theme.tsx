import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    colors: {
        primary: {
            100: '#b0cfff',
            200: '#89b6ff',
            300: '#619eff',
            400: '#3A86FF',
            500: '#2e6bcc',
        },
        secondary: {
            100: '#dac3f9',
            200: '#c19cf6',
            300: '#9c60f0',
            400: '#8338EC',
            500: '#692dbd',
        },
        danger: {
            100: '#d36d66',
            200: '#cb554d',
            300: '#c43d33',
            400: '#b50c00',
            500: '#910a00',
        },
        warning: {
            100: '#ffe08a',
            200: '#ffd563',
            300: '#ffcb3c',
            400: '#FFBE0B',
            500: '#cc9809',
        },
        special: {
            100: '#fdae88',
            200: '#fd9361',
            300: '#fc7839',
            400: '#FB5607',
            500: '#c94506',
        },
    },
});
export default theme;
