import { styled } from "../..";

export const Sidebar = styled('div', {
    zIndex: 10,
    position: 'fixed',
    top: 0,
    right: -480,
    width: 480,
    height: '100%',
    backgroundColor: '$gray800',
    overflowY: 'auto',
    transition: 'right 0.2s ease-in-out',

    filter: 'drop-shadow(-4px 0 30px rgb(0, 0, 0, 0.8))',

    '&.open': {
        right: 0,
    },

    div: {
        '&.headerModal': {
            display: 'flex',
            justifyContent: 'end'
        },
    },

    button: {
        '&.close': {
            margin: 24,
            backgroundColor: 'transparent',
            color: '$grayIcon',
            border: 'none',
            cursor: 'pointer',
            '&:hover': {
                color: '$gray300'
            }
        }
    },
})

export const Content = styled('div', {
    margin: '0 48px 48px',
    display: 'flex',
    height: 'calc(100vh - 75px - 48px)',
    flexDirection: 'column',
    justifyContent: 'space-between'
})

export const Product = styled('div', {
    margin: '32px 0',
    display: 'flex',
    gap: 20,

    div: {
        '&.image': {
            background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
            width: 102,
            height: 93,
            borderRadius: 8,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        img: {
            objectFit: 'cover'
        }
    },
})

export const ProductDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 18,
    marginBottom: 24,

    p: {
        color: '$gray300',
        marginBottom: 6,
    },

    span: {
        color: '$gray100',
        fontWeight: 'bold',
        marginBottom: 4,
    },

    button: {
        background: 'none',
        border: 'none',
        color: '$green500',
        fontWeight: 'bold',
        fontSize: 16,
        width: 'fit-content',
        cursor: 'pointer',
        transition: '0.3s ease-in-out',

        '&:hover': {
            color: '$green300'
        }
    }
})

export const ProductQuantity = styled('div', {
    display: 'flex',
    margin: '4px 0',
    gap: 4,
    alignItems: 'baseline',

    div: {
        background: '$gray900',
        padding: 8,
        borderRadius: 8,
    },

    span: {
        borderBottom: '1px solid $green500',
        padding: '0 6px',
        color: 'white',
        width: 'auto'
    }
})

export const ProductsResume = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,

    div: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        span: {
            fontWeight: 'bold',
        }
    },

    button: {
        width: '100%',
        padding: '24px 0',
        background: '$green500',
        fontSize: 18,
        fontWeight: 'bold',
        border: 'none',
        color: 'white',
        borderRadius: 8,
        marginTop: 55,
        cursor: 'pointer',
        transition: '0.3s ease-in-out',

        '&:hover': {
            background: '$green300'
        }
    }
})