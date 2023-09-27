import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { cart } = req.body

    //get only products that have defaultPriceId and a valid quantity
    const items = cart
        .filter(product => product.defaultPriceId && product.quantity >= 1)
        .map(product => ({
            price: product.defaultPriceId,
            quantity: product.quantity
        }))

    if(req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. '})
    }

    if(!items) {
        return res.status(400).json({ error: 'Product not found.' })
    }

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_URL}/`

    // products

    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'payment',
        line_items: items
    })

    return res.status(201).json({
        checkoutUrl: checkoutSession.url
    })
}