import Image from "next/image"
import Head from "next/head"

import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import Link from "next/link"
import { Handbag } from "@phosphor-icons/react"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

interface HomeProps {
    products: {
        id: string
        name: string
        imageUrl: string
        price: string
        description: string
        defaultPriceId: string
        quantity: number
    }[]
}
export default function Home({ products }: HomeProps) {
    const [ sliderRef ] = useKeenSlider({
        slides: {
            perView: 3,
            spacing: 48,
        }
    })

    const { addProduct, toggleCart } = useContext(CartContext)

    return (
        <>
            <Head>
                <title>Home | Ignite Shop</title>
            </Head>
            <HomeContainer ref={sliderRef} className="keen-slider">
                {products.map(product => {
                    const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault()
                        addProduct(product)
                        toggleCart('open')
                    }

                    return (
                        <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                            <Product className="keen-slider__slide">
                                {product.imageUrl ? (
                                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                                ) : (
                                    <>
                                        <Skeleton highlightColor="#202024" width={485} height={656} />
                                        <div className="skeletonFooter">
                                            <Skeleton highlightColor="#202024" width={330} height={32} />
                                            <Skeleton highlightColor="#202024" width={100} height={32} />
                                        </div>
                                    </>
                                )}
                                <footer>
                                    <div>
                                        <strong>{product.name}</strong>
                                        <span>{product.price}</span>
                                    </div>
                                    <button onClick={handleAddToCart}>
                                        <Handbag size={28} weight="bold" />
                                    </button>
                                </footer>
                            </Product>
                        </Link>
                    )
                })}
            </HomeContainer>
        </>
    )
}

export const getStaticProps: GetStaticProps = async() => {
    const response = await stripe.products.list({
        expand: ['data.default_price']
    })

    const products = response.data.map(product => {
        const price = product.default_price as Stripe.Price

        return {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(price.unit_amount / 100),
            description: product.description,
            defaultPriceId: price.id,
            quantity: 1
        }
    })
    return {
        props: {
            products
        },
        revalidate: 60 * 60 * 2, // 2 hours
    }
}