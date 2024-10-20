'use client';

import { useState } from "react";
import EditModal from "./modal/modal-edit";
import DeleteModal from "./modal/modal-delete";
import { deleteInvoiceData } from "@/app/actions/serverActions";

export default function InvoiceDetailsContent({ invoiceData }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [paymentTerms, setPaymentTerms] = useState(invoiceData.paymentTerms || "Net 30 Days");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openModal = () => setIsEditModalOpen(true);
    const closeModal = () => setIsEditModalOpen(false);

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleDelete = async () => {
        try {
          console.log(`Fatura ${invoiceData.id} siliniyor...`);
          const response = await deleteInvoiceData(invoiceData.id);
          console.log("API Yanıtı:", response);
          closeDeleteModal();
          console.log("Fatura başarıyla silindi.");
        } catch (error) {
          console.error("Fatura silinirken bir hata oluştu:", error);
        }
      };
      
    const handleSaveChanges = (updatedData) => {
        setInvoiceData(updatedData);
        closeModal();
    };

    const handlePaymentChange = (newTerm) => setPaymentTerms(newTerm);

    return (
        <>
            <div className="invoiceDetails">
                <div className="status">
                    <span> Durum </span>
                    <span className="statusPending">Askıda </span>
                </div>
                <div className="actionButtons">
                    <button className="editButton" onClick={openModal}>Düzenle</button>
                    <button className="deleteButton" onClick={openDeleteModal}>Sil</button>
                    <button className="markPaidButton">Ödendi İşaretle</button>
                </div>
            </div>

            <div className="invoiceInfo">
                <div className="infoHeader">
                    <span style={{ color: "#7E88C3" }}>#</span>
                    <span> {invoiceData.id}</span>
                </div>

                <span className="infoDetails">
                    <p>{invoiceData.projectDescription}</p>
                </span>

                <div className="infoDetails">
                    <div className="infoLeft">
                        <p>Fatura Tarihi</p>
                        <h4>{invoiceData.invoiceDate}</h4>
                        <p>Ödeme Tarihi</p>
                        <h4>{invoiceData.dueDate}</h4>
                    </div>
                    <div className="infoRight">
                        <p>Fatura Edilecek</p>
                        <h4>{invoiceData.clientName}</h4>
                        <p>{invoiceData.clientStreetAddress}</p>
                        <p>{invoiceData.clientCity}</p>
                        <p>{invoiceData.clientPostCode}</p>
                        <p>{invoiceData.clientCountry}</p>
                    </div>
                    <div className="infoSent">
                        <p>Gönderildi</p>
                        <h4>{invoiceData.clientEmail}</h4>
                    </div>
                </div>

                <div className="itemTable">
                    <div className="itemHeader">
                        <span>Öğe Adı</span>
                        <span>Adet</span>
                        <span>Fiyat</span>
                        <span>Toplam</span>
                    </div>
                    <div className="itemList">
                        {(invoiceData.items && Array.isArray(invoiceData.items)) ? (
                            invoiceData.items.map((item, index) => (
                                <div className="item" key={index}>
                                    <span>{item.name}</span>
                                    <span style={{ color: "#7E88C3" }}>{item.quantity}</span>
                                    <span style={{ color: "#7E88C3" }}>£ {item.price.toFixed(2)}</span>
                                    <span>£ {(item.quantity * item.price).toFixed(2)}</span>
                                </div>
                            ))
                        ) : (
                            <p>Hiç öğe bulunamadı.</p>
                        )}
                    </div>
                    <div className="totalAmount">
                        <span>Ödenecek Tutar</span>
                        <span>£ {invoiceData.items ? invoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2) : '0.00'}</span>
                    </div>
                </div>
            </div>

            <EditModal
                isOpen={isEditModalOpen}
                closeModal={closeModal}
                paymentTerms={paymentTerms}
                handlePaymentChange={handlePaymentChange}
                onSave={handleSaveChanges}
                invoiceData={invoiceData}
                invoiceId={invoiceData.id}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                closeModal={closeDeleteModal}
                onDelete={handleDelete}
            />
        </>
    );
}
