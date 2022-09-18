import { loadStripe } from "@stripe/stripe-js";

let stripe;

const getStripe = async () => {
  if (!stripe) {
    stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  }
  return stripe;
};

export const handleCheckout = async (items) => {

 
  const stripe = await getStripe();
  const response = await fetch("/api/stripe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(items),
  });

  const data = await response.json();
  console.log("data", data)
  await stripe.redirectToCheckout({ sessionId: data.id });
};
