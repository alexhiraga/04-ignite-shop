import { Content, Product, ProductDetails, ProductQuantity, ProductsResume, Sidebar } from "../../styles/pages/components/CartSidebar";
import { useContext } from 'react'
import { X } from "@phosphor-icons/react";
import Image from "next/image";
import axios from "axios";
import { CartContext } from "../../context/CartContext";

interface CartSidebarProps {
    isOpen: boolean
    onClose: () => void
}

export default function CartSidebar() {

    const { 
        cart, 
        removeProduct, 
        isCartOpen, 
        toggleCart, 
        changeProductQuantity 
    } = useContext(CartContext)
    async function handleBuyProduct() {
        const products = cart.map(product => {
            return {
                priceId: product.defaultPriceId,
                quantity: product.quantity
            }
        })

        try {
            const response = await axios.post('/api/checkout', {
                // priceId: product.defaultPriceId
                cart
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (error) {
            alert('Falha ao redirecionar ao checkout!')
        }
    }

    const handleCloseCart = () => {
        toggleCart()
    }

    const totalValue = cart.reduce((total, product) => {
        // remove the R$ and transform in to a number
        const price = parseFloat(product.price.replace(/[^\d.]/g, "")) / 100

        // return the price * quantity of product
        return total + (price * (product.quantity || 1))
    }, 0)

    const totalPrice = totalValue.toFixed(2).toString().replace('.', ',')

    const totalItems = cart.reduce((total, product) => {
        return total + (typeof product.quantity === 'number' ? product.quantity : 1)
    }, 0)

    return (
        <Sidebar className={`${isCartOpen ? 'open' : ''}`}>
            <div className="headerModal">
                <button className="close" onClick={handleCloseCart}>
                    <X size={24} weight="bold" />
                </button>
            </div>

            <Content>
                <div>
                    <h2>Sacola de compras</h2>
                    {cart && cart.map(product => {

                        const handleChangeQuantity = (action: string) => {
                            if(action === 'decrease') {
                                if(product.quantity === 1) return
                                product.quantity--
                                changeProductQuantity(product)
                            } else if(action === 'increase') {
                                product.quantity++
                                changeProductQuantity(product)
                            }
                        }

                        const handleRemoveProduct = () => {
                            removeProduct(product)
                        }

                        const totalProductValue = product.quantity * parseFloat(product.price.replace(/[^\d.]/g, "")) / 100
                        const totalProductPrice = totalProductValue.toFixed(2).toString().replace('.', ',')

                        return (
                            <Product key={product.id}>
                                <div className="image">
                                    <Image src={product.imageUrl} alt="" width={94} height={94} />
                                </div>

                                <ProductDetails>
                                    <p>{product.name}</p>
                                    <span>R$ {totalProductPrice}</span>
                                    <ProductQuantity>
                                        <div>
                                            <button onClick={() => handleChangeQuantity('decrease')}>-</button>
                                            <span>{product.quantity}</span>
                                            <button onClick={() => handleChangeQuantity('increase')}>+</button>
                                        </div>
                                        <div>
                                            <button onClick={handleRemoveProduct}>Remover</button>
                                        </div>
                                    </ProductQuantity>
                                </ProductDetails>
                            </Product>
                        )
                    })}
                </div>

                {cart && cart.length > 0 && (
                    <ProductsResume>
                        <div>
                            <p>Quantidade</p>
                            <p>{totalItems > 1 ? totalItems + ' itens' : totalItems + ' item'}</p>
                        </div>

                        <div>
                            <span>Valor total</span>
                            <h2>R$ {totalPrice}</h2>
                        </div>

                        <button onClick={handleBuyProduct}>
                            Finalizar compra
                        </button>
                    </ProductsResume>
                )}
            </Content>
        </Sidebar>
    )
 }