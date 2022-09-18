//logic to make the purches

import Stripe from "stripe";
import {getSession} from "@auth0/nextjs-auth0"
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {

  const session = getSession(req,res)
  console.log("session",session)
  const user = session?.user;
  console.log("user", user)
  const stripeId = user["http://localhost:3000/stripe_customer_id"]
  if (req.method === "POST") {
    
    try {
        
        const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        customer: stripeId,
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },

        line_items: req.body.map((item) => {
          console.log(item)
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.product.Title,
                images: [item.product.image.data.attributes.formats.thumbnail.url],
              },
              unit_amount: item.product.price * 100,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancell`,
      });
      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  }
}
