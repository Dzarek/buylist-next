import Head from "next/head";
import GroceryForm from "../components/GroceryForm";
import GroceryContainer from "../components/GroceryContainer";
import Favorite from "../components/Favorite";
import Login from "../components/auth/Login";
import FirstLoading from "../components/FirstLoading";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../components/context";

export default function Home() {
  const { activeProducts, currentUser } = useGlobalContext();
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFirstLoading(false);
    }, 2000);
  }, []);

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
      {firstLoading ? (
        <FirstLoading />
      ) : (
        <div className="app">
          <div className="bg"></div>
          {!currentUser ? (
            <Login />
          ) : (
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
          )}
        </div>
      )}
    </>
  );
}
