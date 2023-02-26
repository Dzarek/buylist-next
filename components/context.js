import React, { useState, useEffect, useContext } from "react";
import { db, auth } from "../firebase/clientApp";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
  updateProfile,
} from "firebase/auth";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [openClearModal, setOpenClearModal] = useState(false);
  const [activeProducts, setActiveProducts] = useState("");
  const [loading, setLoading] = useState(true);
  const [userProductsList, setUserProductsList] = useState("a");

  // Auth
  const [name, setName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const getUser = getAuth();

  const signup = async (email, password, name) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(getUser.currentUser, {
      displayName: name,
    });
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    signOut(auth);
    setName("");
    setUserProductsList("a");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
    });
    if (currentUser) {
      setUserProductsList(currentUser.displayName + "-" + currentUser.uid);
      setName(currentUser.displayName);
    }
    if (!currentUser) {
      setLoading(true);
    }
    return unsubscribe;
  }, [currentUser]);

  // const productsCollectionRef = collection(db, "products");
  const productsCollectionRefAll = collection(db, userProductsList);

  // End Auth

  const getProducts = async () => {
    try {
      const data = await getDocs(productsCollectionRefAll);
      const items = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const sortItems = items.sort(
        (a, b) => Number(a.productId) - Number(b.productId)
      );
      if (items.length > 0) {
        setProducts(sortItems);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (currentUser) {
      getProducts();
    }
  }, [loading]);

  const handleChange = (e) => {
    setProductName(e.target.value);
  };

  const postProducts = async (id, productName) => {
    await addDoc(productsCollectionRefAll, {
      productId: id,
      name: productName,
    });
    await getProducts();
  };

  const addItem = (e) => {
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
    const productDoc = doc(db, userProductsList, editID);
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
      }, 1500);
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
    }, 1500);
  }

  const deleteEverything = () => {
    if (products.length > 0) {
      products.forEach((item) => {
        const productDoc = doc(db, userProductsList, item.id);
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
    const productDoc = doc(db, userProductsList, id);
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
        currentUser,
        login,
        signup,
        logout,
        name,
        setName,
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
