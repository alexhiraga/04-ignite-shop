import { styled } from "../..";

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',

    button: {
        height: 48,
        width: 48,
        borderRadius: 6,
        backgroundColor: '$gray800',
        border: 'none',
        position: 'relative',
        cursor: 'pointer',

        span: {
            position: 'absolute',
            borderRadius: '50%',
            width: 24,
            height: 24,
            top: -7,
            right: -7,
            backgroundColor: '$green500',
            color: 'white',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            outline: '3px solid $gray900'
        },
        
        svg: {
            '&.cartEmpty': {
                color: '$grayIcon'
            },
            '&.notEmpty': {
                color: '$gray300',
            }
        }
            
    },
    
})
