import Head from "next/head";
import { useQuery } from "urql";
import { QUERY_PRODUCTS } from "../utils/query";
import Gallery from "../components/Gallery";

export default function Home() {
  //fetch data
  const [results] = useQuery({ query: QUERY_PRODUCTS });
  const { fetching, error, data } = results;
  if (fetching) return <p> loading... </p>;
  if (error) return <p> Error!! </p>;
  const products = data.products.data
  return (
    <div>
      <Head>
        <title>Home Page!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Gallery products = {products}/>
    </div>
  );
}
