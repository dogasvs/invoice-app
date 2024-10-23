'use client';

import { useState } from "react";
import EditModal from "./modal/modal-edit";
import DeleteModal from "./modal/modal-delete";
import { deleteInvoiceData } from "@/app/actions/serverActions";

export default function InvoiceDetailsContent({ invoiceData }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [updatedInvoiceData, setUpdatedInvoiceData] = useState(invoiceData);

    const openModal = () => setIsEditModalOpen(true);
    const closeModal = () => setIsEditModalOpen(false);

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleDelete = async () => {
        try {
            console.log(`Fatura ${updatedInvoiceData.id} siliniyor...`);
            const response = await deleteInvoiceData(updatedInvoiceData.id);
            console.log("API Yanıtı:", response);
            closeDeleteModal();
            console.log("Fatura başarıyla silindi.");
        } catch (error) {
            console.error("Fatura silinirken bir hata oluştu:", error);
        }
    };

    const handleSaveChanges = (newData) => {
        setUpdatedInvoiceData(newData);
        closeModal();
    };

    return (
        <>
            <div className="invoiceDetails">
                <div className="status">
                    <span>Durum</span>
                    <span className={`statusPending ${updatedInvoiceData.paymentStatus === 1 ? 'paid' : 'pending'}`}>
                        {updatedInvoiceData.paymentStatus === 1 ? "Ödenmiş" : updatedInvoiceData.paymentStatus === 2 ? "Kısmi Ödenmiş" : "Askıda"}
                    </span>
                </div>
                <div className="actionButtons">
                    <button className="editButton" onClick={openModal}>Düzenle</button>
                    <button className="deleteButton" onClick={openDeleteModal}>Sil</button>
                    <button className="markPaidButton">Ödendi İşaretle</button>
                </div>
            </div>

            <div className="invoiceInfo">

                <div className="infoDetails">
                    <div className="infoHeader">
                        <span style={{ color: "#7E88C3" }}></span>
                        <span>{updatedInvoiceData.invoiceName}</span>
                    </div>
                    <span className="infoDetails">
                        <p>{updatedInvoiceData.projectDescription || "Proje açıklaması yok"}</p>
                    </span>

                    <div className="invoiceDate">
                        <p>Fatura Tarihi</p>
                        <h4>{new Date(updatedInvoiceData.invoiceDate).toLocaleDateString()}</h4>
                    </div>
                    <div className="invoicePayment">
                        <p>Ödeme Tarihi</p>
                        <h4>{new Date(updatedInvoiceData.paymentDue).toLocaleDateString()}</h4>
                    </div>
                    
                    <div className="infoRight">
                        <p>Fatura Edilecek</p>
                        <h4>{updatedInvoiceData.client.name}</h4>
                        <p>{updatedInvoiceData.client.address}</p>
                        <p>{updatedInvoiceData.client.city}</p>
                        <p>{updatedInvoiceData.client.postCode}</p>
                        <p>{updatedInvoiceData.client.country}</p>
                    </div>
                    <div className="infoSent">
                        <p>Gönderildi</p>
                        <h4>{updatedInvoiceData.client.email}</h4>
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
                        {(updatedInvoiceData.items && Array.isArray(updatedInvoiceData.items)) ? (
                            updatedInvoiceData.items.map((item, index) => (
                                <div className="item" key={index}>
                                    <span>{item.name}</span>
                                    <span style={{ color: "#7E88C3" }}>{item.quantity}</span>
                                    <span style={{ color: "#7E88C3" }}>£ {item.price.toFixed(2)}</span>
                                    <span>£ {item.totalPrice.toFixed(2)}</span>
                                </div>
                            ))
                        ) : (
                            <p>Hiç öğe bulunamadı.</p>
                        )}
                    </div>
                    <div className="totalAmount">
                        <span>Ödenecek Tutar</span>
                        <span>£ {updatedInvoiceData.totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <EditModal
                isOpen={isEditModalOpen}
                closeModal={closeModal}
                onSave={handleSaveChanges}
                invoiceData={updatedInvoiceData}
                invoiceId={updatedInvoiceData.id}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                closeModal={closeDeleteModal}
                onDelete={handleDelete}
            />
        </>
    );
}