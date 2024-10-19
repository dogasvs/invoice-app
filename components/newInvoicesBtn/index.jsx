"use client";

import { useState } from "react";
import ModalAdd from "../modal/modal-add";

export default function NewInvoicesBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toogleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button onClick={toogleModal}>New İnvoices</button>
      <ModalAdd isModalOpen={isModalOpen} />
    </>
  );
}
