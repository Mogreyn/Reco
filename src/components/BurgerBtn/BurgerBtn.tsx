"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./BurgerBtn.module.scss";
import classNames from "classnames";
import ModalMenu from "../MobileMenu/ModalMenu";

const BurgerBtn = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (modalIsOpen && isClient) {
      document.body.style.overflow = "hidden";
    } else if (isClient) {
      document.body.style.overflow = "auto";
    }

    return () => {
      if (isClient) {
        document.body.style.overflow = "auto";
      }
    };
  }, [modalIsOpen, isClient]);

  const handleClick = () => {
    setModalIsOpen((prev) => !prev);
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className={classNames(styles.burgerBtn, { [styles.open]: modalIsOpen })}
        onClick={handleClick}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      {createPortal(
        <ModalMenu isOpen={modalIsOpen} onClick={handleClick} />,
        document.body,
      )}
    </>
  );
};

export default BurgerBtn;
