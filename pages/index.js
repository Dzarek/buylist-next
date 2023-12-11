import GroceryForm from "../components/GroceryForm";
import GroceryContainer from "../components/GroceryContainer";
import Favorite from "../components/Favorite";
import Login from "../components/auth/Login";
import FirstLoading from "../components/FirstLoading";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../components/context";

import AddToHomeScreen from "../pwa/AddToHomeScreen";

export default function Home() {
  const { activeProducts, currentUser } = useGlobalContext();
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFirstLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <AddToHomeScreen />
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
                    Ikony produktów: <span>https://icons8.com</span>{" "}
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
