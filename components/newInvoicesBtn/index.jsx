"use client";

import { useState } from "react";
import ModalAdd from "../modal/modal-add";
import ArtiSvg from "@/svgs/add-invoices";
import "@/components/header/header.css";

export default function NewInvoicesBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="invoicesAdd">
      <button className="invoicesAddBtn " onClick={openModal}>
        <ArtiSvg />
        <span className="invoicesAddBtnDesktop"> Yeni Faturalar </span> 
        <span className="invoicesAddBtnMobil"> Yeni </span> 
      </button>
      <ModalAdd isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}
