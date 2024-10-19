'use client'
import { useState } from 'react';
import './invoice-detail.css';
import EditModal from '@/components/modal/modal-edit';

const InvoiceDetail = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [paymentTerms, setPaymentTerms] = useState('Net 30 Days');

    const openModal = () => {
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
    };

    const handlePaymentChange = (newTerm) => {
        setPaymentTerms(newTerm);
    };

    return (
        <div className="container">
            <div className="wrapper">
                <div className="goBack">
                    <button className="goBackButton">Go back</button>
                </div>

                <div className="invoiceDetails">
                    <div className="status">
                        <span> Status </span>
                        <span className="statusPending">Pending</span>
                    </div>
                    <div className="actionButtons">
                        <button className="editButton" onClick={openModal}>Edit</button>   <button className="deleteButton">Delete</button>
                        <button className="markPaidButton">Mark as Paid</button>
                    </div>
                </div>

                <div className="invoiceInfo">
                    <div className="infoHeader">
                        <span style={{ color: '#7E88C3' }}>#</span>
                        <span> XM9141</span>
                    </div>

                    <span className="infoDetails">
                        <p>Graphic Design</p>
                    </span>

                    <div className="infoDetails">
                        <div className="infoLeft">
                            <p>Invoice Date</p>
                            <h4>21 Aug 2021</h4>
                            <p>Payment Due</p>
                            <h4>20 Sep 2021</h4>
                        </div>
                        <div className="infoRight">
                            <p>Bill To</p>
                            <h4>Alex Grim</h4>
                            <p>84 Church Way</p>
                            <p>Bradford</p>
                            <p>BD1 9PB</p>
                            <p>United Kingdom</p>
                        </div>
                        <div className="infoSent">
                            <p>Sent to</p>
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
                            <span>Item Name</span>
                            <span>QTY.</span>
                            <span>Price</span>
                            <span>Total</span>
                        </div>
                        <div className="itemList">
                            <div className="item">
                                <span>Banner Design</span>
                                <span style={{ color: '#7E88C3' }}>1</span>
                                <span style={{ color: '#7E88C3' }}>£ 156.00</span>
                                <span>£ 156.00</span>
                            </div>
                            <div className="item">
                                <span>Email Design</span>
                                <span style={{ color: '#7E88C3' }}>2</span>
                                <span style={{ color: '#7E88C3' }}>£ 200.00</span>
                                <span>£ 400.00</span>
                            </div>
                        </div>
                        <div className="totalAmount">
                            <span>Amount Due</span>
                            <span>£ 556.00</span>
                        </div>
                    </div>
                </div>
                <EditModal
                    isOpen={isEditModalOpen}
                    closeModal={closeModal}
                    paymentTerms={paymentTerms}
                    handlePaymentChange={handlePaymentChange}
                />            </div>
        </div>
    );
};

export default InvoiceDetail;