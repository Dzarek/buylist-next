import React, { useState, useEffect, useContext } from "react";

// const alert = document.querySelector(".alert");
const AppContext = React.createContext();

const url = "#";
const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [openClearModal, setOpenClearModal] = useState(false);
  const [activeProducts, setActiveProducts] = useState("");
  const [loading, setLoading] = useState(false);

  // ****** LOCAL STORAGE **********

  const getLocalStorage = () => {
    const saved = localStorage.getItem("products");
    const initialValue = JSON.parse(saved);
    setProducts(initialValue);
    return initialValue;
  };
  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // ****** END LOCAL STORAGE **********

  const handleChange = (e) => {
    setProductName(e.target.value);
  };

  const postProducts = async (id, productName) =>
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          id: id,
          name: productName,
          idproduct: id,
        },
      }),
    });

  const addItem = (e) => {
    setLoading(false);
    e.preventDefault();
    const id = new Date().getTime().toString().slice(3, -1);
    if (productName && !edit) {
      displayAlert("dodano do listy", "success");
      const newProduct = {
        id: id,
        name: productName,
      };
      setProducts([...products, newProduct]);
      postProducts(id, productName);
      setBackToDefault();
    } else if (productName && edit) {
      displayAlert("produkt zmieniony", "success");
      setProducts(
        products.map((item) => {
          if (item.id === editID) {
            putEdit(editID, productName);
            return { ...item, name: productName };
          }
          return item;
        })
      );
      setBackToDefault();
    }
  };

  const putEdit = async (editID, productName) =>
    await fetch(`${url}${editID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          id: editID,
          name: productName,
          idproduct: editID,
        },
      }),
    });

  const handleEditItem = (id) => {
    function displayAlertEdition(text, action) {
      alert.textContent = text;
      alert.classList.add(`alert-${action}`);
      //remove alert
      setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
      }, 2000);
    }
    displayAlertEdition("edycja", "info");
    const oneProduct = products.find((item) => item.id === id);
    setProductName(oneProduct.name);
    setEdit(true);
    setEditID(id);
  };

  function setBackToDefault() {
    setProductName("");
    setEdit(false);
    setEditID(null);
  }

  function displayAlert(text, action) {
    const alert = document.querySelector(".alert");
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    //remove alert
    setTimeout(function () {
      alert.textContent = "";
      alert.classList.remove(`alert-${action}`);
    }, 2000);
  }

  const deleteEverything = () => {
    if (products.length > 0) {
      products.forEach((item) => {
        fetch(`${url}${item.id}`, {
          method: "DELETE",
        });
      });
      setProducts([]);
    }
    setOpenClearModal(false);
    displayAlert("lista wyczyszczona", "danger");
  };

  const deleteItem = (id) => {
    const updateProducts = products.filter((item) => item.id !== id);
    displayAlert("usunięto z listy", "danger");
    setTimeout(() => {
      fetch(`${url}${id}`, {
        method: "DELETE",
      });
      setProducts(updateProducts);
    }, 500);
  };

  return (
    <AppContext.Provider
      value={{
        productName,
        edit,
        products,
        openClearModal,
        activeProducts,
        loading,
        handleChange,
        addItem,
        deleteEverything,
        deleteItem,
        handleEditItem,
        displayAlert,
        setProducts,
        setProductName,
        setOpenClearModal,
        postProducts,
        setActiveProducts,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
