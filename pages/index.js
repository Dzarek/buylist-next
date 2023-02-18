import Head from "next/head";
import GroceryForm from "../components/GroceryForm";
import GroceryContainer from "../components/GroceryContainer";
import Favorite from "../components/Favorite";
import { useGlobalContext } from "../components/context";

export default function Home() {
  const { activeProducts } = useGlobalContext();

  return (
    <>
      <Head>
        <title>Lista Zakupów</title>
        <meta name="description" content="Lista Zakupów" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="shortcut icon" href="/logo192.png" />
      </Head>
      <div className="app">
        <div className="bg"></div>
        <section className="center">
          <GroceryForm />
          <GroceryContainer />
          <Favorite />
          {activeProducts && (
            <footer>
              <a href="https://icons8.com">
                Icony produktów: <span>https://icons8.com</span>{" "}
              </a>
            </footer>
          )}
        </section>
      </div>
    </>
  );
}
