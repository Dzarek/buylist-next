import React from "react";

import { FaTimes } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { MdAddToHomeScreen } from "react-icons/md";
import { HiArrowSmUp } from "react-icons/hi";

export default function AddToMobileChrome(props) {
  const { closePrompt, doNotShowAgain } = props;

  return (
    <div className="addToHomeScreen">
      <HiArrowSmUp className="addToHomeScreen-arrow" />
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
          <HiDotsVertical className="addToHomeScreen-icon" />
        </div>
        <div className="addToHomeScreen-clickContainer">
          <p>2. następnie kliknij:</p>
          <div className="addToHomeScreen-installBtn">
            <MdAddToHomeScreen className="addToHomeScreen-icon2" />
            <p>Zainstaluj aplikację</p>
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
