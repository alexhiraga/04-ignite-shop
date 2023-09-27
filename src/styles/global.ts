import { globalCss } from ".";

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
    },

    body: {
        backgroundColor: '$gray900',
        color: '$gray100',
        '-webkit-font-smoothing': 'antialiased',
    },

    'body, input, textarea, button': {
        fontFamily: 'Roboto',
        fontWeight: 400,
    },

    h1: {
        fontSize: 32,
    },
    h2: {
        fontsize: 24,
    },
    h3: {
        fontSize: 20,
    },
    h4: {
        fontSize: 18
    }
})