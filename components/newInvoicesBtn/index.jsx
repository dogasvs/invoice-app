"use client";

import { useState } from "react";
import ModalAdd from "../modal/modal-add";

export default function NewInvoicesBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>New İnvoices</button>
      <ModalAdd isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}
