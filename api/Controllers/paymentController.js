import { Stripe } from "stripe";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.STRIPE_KEY;
const clinetUrl = process.env.CLIENT_URL;

const stripe = new Stripe(key);

const payment = async (req, res) => {
  const { price, name, place } = req.body;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: name,
          },
          unit_amount: price * 10,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${clinetUrl}/profile/success`, // Redirect after successful payment
    cancel_url: `${clinetUrl}/placedetails/${place}`, // Redirect if payment is canceled
  });

  res.json({ id: session.id });
};

export { payment };
