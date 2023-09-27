import { styled } from "..";

export const SuccessContainer = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 656,

    h1: {
        fontSize: '$2xl',
        color: '$gray100',
    },

    p: {
        fontSize: '$xl',
        color: '$gray300',
        maxWidth: 560,
        textAlign: 'center',
        marginTop: '2rem',
        lineHeight: 1.4
    },

    a: {
        display: 'block',
        marginTop: '5rem',
        fontSize: '$lg',
        color: '$green500',
        textDecoration: 'none',
        fontWeight: 'bold',

        '&:hover': {
            color: '$green300'
        }
    },
})

export const ImageContainer = styled('div', {
    width: 140,
    height: 140,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: '50%',
    padding: '0.25rem',
    marginLeft: -52,
    filter: 'drop-shadow(0 0 60px rgb(0, 0, 0, 0.8))',
    position: 'relative',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover',
    },

    span: {
        position: 'absolute',
        top: 6,
        left: 6,
        background: '$green500',
        width: 30,
        height: 30,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid $gray100'
    }
})

export const ProductsContainer = styled('main', {
    display: 'flex',
    justifyContent: 'center',
    marginRight: -52,
    marginBottom: 24,
})