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
                    <span className={`statusPending ${updatedInvoiceData.status === 1 ? 'paid' : 'pending'}`}>
                        {updatedInvoiceData.status === 1 ? "Ödenmiş" : updatedInvoiceData.status === 2 ? "Kısmi Ödenmiş" : updatedInvoiceData.status === 3 ? "Tamamlandı" : "Askıda"}
                    </span>
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
                    <span>{updatedInvoiceData.invoiceNumber}</span>
                </div>

                <span className="infoDetails">
                    <p>{updatedInvoiceData.projectDescription}</p>
                </span>

                <div className="infoDetails">
                    <div className="infoLeft">
                        <p>Fatura Tarihi</p>
                        <h4>{new Date(updatedInvoiceData.invoiceDate).toLocaleDateString()}</h4>
                        <p>Ödeme Tarihi</p>
                        <h4>{new Date(updatedInvoiceData.invoiceDate).toLocaleDateString()}</h4>
                    </div>
                    <div className="infoRight">
                        <p>Fatura Edilecek</p>
                        <h4>{updatedInvoiceData.billTo.name}</h4>
                        <p>{updatedInvoiceData.billTo.address}</p>
                        <p>{updatedInvoiceData.billTo.city}</p>
                        <p>{updatedInvoiceData.billTo.postCode}</p>
                        <p>{updatedInvoiceData.billTo.country}</p>
                    </div>
                    <div className="infoSent">
                        <p>Gönderildi</p>
                        <h4>{updatedInvoiceData.billTo.email}</h4>
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
                                    <span>£ {(item.quantity * item.price).toFixed(2)}</span>
                                </div>
                            ))
                        ) : (
                            <p>Hiç öğe bulunamadı.</p>
                        )}
                    </div>
                    <div className="totalAmount">
                        <span>Ödenecek Tutar</span>
                        <span>£ {updatedInvoiceData.items ? updatedInvoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2) : '0.00'}</span>
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
