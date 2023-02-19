import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase/clientApp";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [openClearModal, setOpenClearModal] = useState(false);
  const [activeProducts, setActiveProducts] = useState("");
  const [loading, setLoading] = useState(true);

  const productsCollectionRef = collection(db, "products");

  // ****** LOCAL STORAGE **********

  // const getLocalStorage = () => {
  //   const saved = localStorage.getItem("products");
  //   const initialValue = JSON.parse(saved);
  //   setProducts(initialValue);
  //   return initialValue;
  // };
  // useEffect(() => {
  //   getLocalStorage();
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("products", JSON.stringify(products));
  // }, [products]);

  // ****** END LOCAL STORAGE **********

  const getProducts = async () => {
    // setLoading(true);
    try {
      const data = await getDocs(productsCollectionRef);
      const items = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const sortItems = items.sort(
        (a, b) => Number(a.productId) - Number(b.productId)
      );
      if (items.length > 0) {
        setProducts(sortItems);
      } else {
        setProducts([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (e) => {
    setProductName(e.target.value);
  };

  const postProducts = async (id, productName) => {
    await addDoc(productsCollectionRef, { productId: id, name: productName });
    await getProducts();
  };

  const addItem = (e) => {
    setLoading(false);
    e.preventDefault();
    const id = Number(new Date().getTime().toString().slice(0, -1));
    if (productName && !edit) {
      displayAlert("dodano do listy", "success");
      const newProduct = {
        productId: id,
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

  const putEdit = async (editID, productName) => {
    const productDoc = doc(db, "products", editID);
    const updatedProcuct = { name: productName };
    await updateDoc(productDoc, updatedProcuct);
  };

  const handleEditItem = (id) => {
    const alert = document.querySelector(".alert");
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
        const productDoc = doc(db, "products", item.id);
        deleteDoc(productDoc);
      });
      setProducts([]);
    }
    setOpenClearModal(false);
    displayAlert("lista wyczyszczona", "danger");
  };

  const deleteItem = (id) => {
    const updateProducts = products.filter((item) => item.id !== id);
    displayAlert("usunięto z listy", "danger");
    const productDoc = doc(db, "products", id);
    setTimeout(() => {
      deleteDoc(productDoc);
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
