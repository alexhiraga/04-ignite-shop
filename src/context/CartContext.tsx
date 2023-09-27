import { ReactNode, createContext, useEffect, useState } from "react"

interface CartContextTypeProps {
    children: ReactNode
}

interface ProductProps {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
    quantity: number
}

interface CartContextType {
    cart: ProductProps[]
    isCartOpen: boolean
    toggleCart: (toggle?: string) => void
    addProduct: (_product: ProductProps) => void
    removeProduct: (_product: ProductProps) => void
    changeProductQuantity: (_product: ProductProps) => void
    emptyTheCart: () => void
}

export const CartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextTypeProps) {
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [cart, setCart] = useState<ProductProps[]>([])

    function toggleCart(toggle?: string) {
        if(!toggle) setIsCartOpen((prevIsCartOpen) => !prevIsCartOpen);
        else if(toggle === 'open') setIsCartOpen(true)
        else if(toggle === 'close') setIsCartOpen(false)
    };

    function refreshCart(updatedCart: ProductProps[]) {
        setCart(updatedCart)
        //refresh localStorage
        const stateJSON = JSON.stringify(updatedCart)
        localStorage.setItem('@ignite-shop:product-cart-1.0.0', stateJSON)
    }

    useEffect(() =>{
        const storedStateAsJSON = localStorage.getItem('@ignite-shop:product-cart-1.0.0')

        if(storedStateAsJSON) {
            setCart(JSON.parse(storedStateAsJSON))
        }
    }, [])

    function addProduct(_product: ProductProps) {
        // check if there is already the same product in the cart
        const existingProductInCart = cart.findIndex(product => product.id === _product.id)

        if(existingProductInCart !== -1) {
            // if exists, increment quantity
            const updatedCart = [...cart]
            if(updatedCart[existingProductInCart].quantity && _product.quantity) {
                updatedCart[existingProductInCart].quantity += _product.quantity
            }
            refreshCart(updatedCart)
        } else {
            const updatedCart = [...cart, _product]
            refreshCart(updatedCart)
        }
    }

    function removeProduct(_product: ProductProps) {
        const updatedCart = cart.filter(product => {
            return product.id !== _product.id
        })
        refreshCart(updatedCart)

        // close cart
        if(!updatedCart.length) setIsCartOpen(false)
    }

    function changeProductQuantity(_product: ProductProps) {
        const updatedCart = cart.map(product => {
            if(product.id === _product.id) {
                return { ...product, quantity: _product.quantity}
            }
            return product
        })
        refreshCart(updatedCart)
    }

    function emptyTheCart() {
        refreshCart([])
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                isCartOpen,
                toggleCart,
                addProduct,
                removeProduct,
                changeProductQuantity,
                emptyTheCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}