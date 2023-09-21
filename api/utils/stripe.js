// import { Stripe } from "stripe";


// const stripe = new Stripe(process.env.STRIPE_KEY);


  

// const payment = async (req, res) => {
//   const { amount, description } = req.body;

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [{
//       price_data: {
//         currency: 'usd',
//         product_data: {
//           name: description,
//         },
//         unit_amount: amount * 100, // Amount in cents
//       },
//       quantity: 1,
//     }],
//     mode: 'payment',
//     success_url: 'http://localhost:3000/success', // Redirect after successful payment
//     cancel_url: 'http://localhost:3000/cancel', // Redirect if payment is canceled
//   });

//   res.json({ id: session.id });
// };






// export const stripePayment = async (price, token) => {
//   try {
//     const idempontencyKey = uuidv4();
//     const amount = price * 10; // Convert to cents

//     const paymentIntent = await stripe.paymentIntents.create(
//       {
//         amount,
//         currency: "inr",
//         payment_method: token.id,
//         confirmation_method: "manual", // Use manual confirmation
//         confirm: true, // Confirm the payment intent immediately
//         receipt_email: token.email,
//       },
//       { idempontencyKey }
//     );

//     return paymentIntent; // Resolve with paymentIntent object
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }
