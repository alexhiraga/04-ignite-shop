import Link from "next/link";
import { ImageContainer, ProductsContainer, SuccessContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

interface ProductProps {
    name: string
    id: string
    quantity: number
    imageUrl: string
}
interface SuccessProps {
    customerName: string
    products: ProductProps[]
}

export default function Success({ customerName, products }: SuccessProps) {
    const { emptyTheCart } = useContext(CartContext)
    useEffect(() => {
        emptyTheCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const productsQuantity = products.reduce((acc, curr) => acc + curr.quantity, 0)

    return (
        <>
            <Head>
                <title>
                    Compra efetuada | Ignite Shop

                    <meta name="robots" content="noindex" />
                </title>
            </Head>
            <SuccessContainer>
                <ProductsContainer>
                    {products.map(product => (
                        <ImageContainer key={product.id}>
                            {product.quantity > 1 && (
                                <span>{product.quantity}</span>
                            )}
                            <Image src={product.imageUrl} width={120} height={110} alt="" title={product.name} />
                        </ImageContainer>
                    ))}
                </ProductsContainer>

                <h1>Compra efetuada!</h1>

                <p>
                    Uhuul <strong>{customerName}</strong>, sua compra de {productsQuantity > 1 ? productsQuantity + ' camisetas' : productsQuantity + ' camiseta'} já está a caminho da sua casa.
                </p>

                <Link href="/">
                    Voltar ao catálogo
                </Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details.name

    const products = session.line_items.data

    const productsInfo = products.map(product => {
        return {
            name: product.description,
            id: product.id,
            quantity: product.quantity,
            imageUrl: (product.price.product as Stripe.Product).images[0]
        }
    })

    return {
        props: {
            customerName,
            products: productsInfo
        }
    }
}