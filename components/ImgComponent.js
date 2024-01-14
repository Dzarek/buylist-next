import React, { useState } from "react";

const ImgComponent = ({ produkt, addItemImage }) => {
  const [activeClass, setActiveClass] = useState(false);

  const handleClass = () => {
    setActiveClass(true);
    setTimeout(() => setActiveClass(false), 1000);
  };

  return (
    <>
      <img
        className={
          activeClass
            ? `${produkt.category}Bgc flyImg`
            : `${produkt.category}Bgc`
        }
        src={produkt.src}
        alt={produkt.alt}
        onClick={() => {
          handleClass(true);
          addItemImage(produkt);
        }}
      />
    </>
  );
};

export default ImgComponent;
