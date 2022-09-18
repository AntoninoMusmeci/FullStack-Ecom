import { Provider, createClient } from "urql";
import "../styles/globals.css";
import Nav from "../components/NavBar";
import {StateContext} from "../utils/context"
console.log(process.env.NEXT_PUBLIC_STRAPI_API);
const client = createClient({ url: process.env.NEXT_PUBLIC_STRAPI_API });
function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Provider value={client}>
        <Nav />
        <Component {...pageProps} />
      </Provider>
    </StateContext>
  );
}

export default MyApp;
