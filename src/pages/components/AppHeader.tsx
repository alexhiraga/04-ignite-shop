import { Header } from '../../styles/pages/components/Header'
import CartSidebar from './CartSidebar'
import logoImg from '../../assets/logo.svg'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import Image from 'next/image'
import { Handbag } from '@phosphor-icons/react'
import Link from 'next/link'

export default function AppHeader() {
    
    const { toggleCart, cart } = useContext(CartContext)

    const handleOpenCart = () => {
        toggleCart()
    }

    return (
        <>
            <Header>
                <Link href="/">
                    <Image src={logoImg} alt="" />
                </Link>
                <button
                    onClick={handleOpenCart}
                    disabled={!cart.length}
                >
                    <Handbag size={24} weight="bold" className={cart.length > 0 ? 'notEmpty' : 'cartEmpty'} />
                    {cart.length > 0 && (
                        <span>{cart.length}</span>
                    )}
                </button>
            </Header>
            <CartSidebar />
        </>
    )
}