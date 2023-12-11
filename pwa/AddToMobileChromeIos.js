import React from "react";

import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { HiArrowSmUp } from "react-icons/hi";
import { TbShare2 } from "react-icons/tb";

export default function AddToMobileChromeIos(props) {
  const { closePrompt, doNotShowAgain } = props;

  return (
    <div className="addToHomeScreenIos">
      <HiArrowSmUp className="addToHomeScreen-arrowIos" />
      <div className="addToHomeScreen-container">
        <button className="addToHomeScreen-closeBtn" onClick={closePrompt}>
          <FaTimes />
        </button>
        <img src="/logo192.png" alt="" className="addToHomeScreen-img" />
        <h2>
          Zainstaluj aplikację <span> Lista Zakupów</span>
        </h2>
        <div className="addToHomeScreen-clickContainer">
          <p>1. kliknij w ikonę</p>
          <TbShare2 className="addToHomeScreen-icon" />
        </div>
        <div
          style={{ flexDirection: "column" }}
          className="addToHomeScreen-clickContainer"
        >
          <p>2. następnie kliknij:</p>
          <div className="addToHomeScreen-installBtn">
            <p style={{ marginRight: "5px" }}>Dodaj do ekranu głównego</p>
            <AiOutlinePlusSquare className="addToHomeScreen-icon2" />
          </div>
        </div>
        <button
          className="addToHomeScreen-notShowAgain"
          onClick={doNotShowAgain}
        >
          Nie pokazuj ponownie
        </button>
      </div>
    </div>
  );
}
