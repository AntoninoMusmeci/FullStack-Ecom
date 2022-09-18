import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
      const session = getSession(ctx.req, ctx.res);
      
      const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
      console.log("id", stripeId, "session", session, `${process.env.BASE_URL}/stripe_customer_id`)
      const paymentHistory = await stripe.paymentIntents.list({
        customer: stripeId,
      });
      return { props: { orders: paymentHistory.data } };
    },
  });

function profile({ user, orders }) {
  const route = useRouter();
  console.log("test",user, orders)
  return (
    user && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          {orders.map((order) => (
            <Order key={order.id}>
              <div>
                <h1>Order Number: {order.id}</h1>
                <h2>{order.amount}</h2>
              </div>
              <div>
                <h1>Receipt Email {order.receipt_email}</h1>
              </div>
            </Order>
          ))}
        </div>
        < ButtonStyled  onClick={() => route.push("/api/auth/logout")}>Log out</ ButtonStyled >
      </div>
    )
  );
}



const Order = styled.div`
  background: white;
  margin: 2rem 0rem;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 1rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  h2 {
    font-size: 1rem;
    color: var(--secondary);
  }
 
`;

const ButtonStyled = styled.button`
     background: var(--primary);
    color: white;
    font-weight: 500;
    font-size: 1.2rem;
    padding: 1rem 2rem;
    margin-top: 2rem;
    cursor: pointer;
 
`;


export default profile;
