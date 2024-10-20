"use client";
import { useState } from "react";
import "./invoice-detail.css";
import EditModal from "@/components/modal/modal-edit";
import DeleteModal from "@/components/modal/modal-delete";
import Link from "next/link";

export default function InvoiceDetail() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [paymentTerms, setPaymentTerms] = useState("Net 30 Days");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = () => {
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  const handlePaymentChange = (newTerm) => {
    setPaymentTerms(newTerm);
  };
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    console.log("Invoice deleted");
    closeDeleteModal();
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="goBack">
          <Link href="/" className="goBackButton">
            Geri git
          </Link>
        </div>

        <div className="invoiceDetails">
          <div className="status">
            <span> Durum </span>
            <span className="statusPending">Askıda </span>
          </div>
          <div className="actionButtons">
            <button className="editButton" onClick={openModal}>
              Düzenle
            </button>
            <button className="deleteButton" onClick={openDeleteModal}>
              Sil
            </button>
            <button className="markPaidButton">Ödendi İşaretle</button>
          </div>
        </div>

        <div className="invoiceInfo">
          <div className="infoHeader">
            <span style={{ color: "#7E88C3" }}>#</span>
            <span> XM9141</span>
          </div>

          <span className="infoDetails">
            <p>Grafik Tasarım</p>
          </span>

          <div className="infoDetails">
            <div className="infoLeft">
              <p>Fatura Tarihi</p>
              <h4>21 Aug 2021</h4>
              <p>Ödeme Tarihi</p>
              <h4>20 Sep 2021</h4>
            </div>
            <div className="infoRight">
              <p>fatura edilecek</p>
              <h4>Alex Grim</h4>
              <p>84 Church Way</p>
              <p>Bradford</p>
              <p>BD1 9PB</p>
              <p>United Kingdom</p>
            </div>
            <div className="infoSent">
              <p>Gönderildi</p>
              <h4>alexgrim@mail.com</h4>
            </div>

            <div className="topRightAddress">
              <p>19 Union Terrace</p>
              <p>London</p>
              <p>E1 3EZ</p>
              <p>United Kingdom</p>
            </div>
          </div>

          <div className="itemTable">
            <div className="itemHeader">
              <span>Öğe Adı</span>
              <span>Adet</span>
              <span>Fiyat</span>
              <span>toplam</span>
            </div>
            <div className="itemList">
              <div className="item">
                <span>Afiş Tasarımı</span>
                <span style={{ color: "#7E88C3" }}>1</span>
                <span style={{ color: "#7E88C3" }}>£ 156.00</span>
                <span>£ 156.00</span>
              </div>
              <div className="item">
                <span>E-posta Tasarımı</span>
                <span style={{ color: "#7E88C3" }}>2</span>
                <span style={{ color: "#7E88C3" }}>£ 200.00</span>
                <span>£ 400.00</span>
              </div>
            </div>
            <div className="totalAmount">
              <span>Ödenecek Tutar</span>
              <span>£ 556.00</span>
            </div>
          </div>
        </div>
        <EditModal
          isOpen={isEditModalOpen}
          closeModal={closeModal}
          paymentTerms={paymentTerms}
          handlePaymentChange={handlePaymentChange}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

