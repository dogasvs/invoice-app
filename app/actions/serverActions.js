/*import { advancedFetch } from "@/utils/fetch";

const API_BASE_URL = '';

// Fatura verilerini çekmek için 
export async function getInvoiceData(invoiceId) {
    const url = `${API_BASE_URL}/invoices/${invoiceId}`;
    return await advancedFetch(url, 'GET');
}

// Fatura verilerini güncellemek için 
export async function updateInvoiceData(invoiceId, updatedData) {
    const url = `${API_BASE_URL}/invoices/${invoiceId}`;
    return await advancedFetch(url, 'PUT', updatedData);
}

// Fatura verilerini silmek için
export async function deleteInvoiceData(invoiceId) {
    const url = `${API_BASE_URL}/invoices/${invoiceId}`;
    return await advancedFetch(url, 'DELETE');
}

// Fatura öğesi eklemek için API çağrısı
export async function addInvoiceData(newItem) {
    const url = `${API_BASE_URL}/invoices/add-item`;
    return await advancedFetch(url, 'POST', newItem);
}
*/

import mockData from "../../mockData.json";

export async function getInvoiceData(invoiceId) {
    // invoiceId'yi sayıya çeviriyoruz, çünkü item.id number türünde
    const id = Number(invoiceId);

    // JSON dosyasından gelen mock veriden ilgili faturayı bul
    const invoice = mockData.find((item) => item.id === id);

    // Promise ile fatura verisini döndür
    return new Promise((resolve, reject) => {
        if (invoice) {
            resolve(invoice);
        } else {
            reject(`Invoice with ID ${invoiceId} not found`);
        }
    });
}

// Fatura verilerini güncellemek için mock fonksiyon
export async function updateInvoiceData(invoiceId, updatedData) {
    const invoiceIndex = mockData.findIndex((item) => item.id === invoiceId);

    return new Promise((resolve, reject) => {
        if (invoiceIndex !== -1) {
            // Mock veriyi güncelle
            mockData[invoiceIndex] = { ...mockData[invoiceIndex], ...updatedData };
            resolve(mockData[invoiceIndex]);
        } else {
            reject(`Invoice with ID ${invoiceId} not found`);
        }
    });
}

// Fatura verilerini silmek için mock fonksiyon
export async function deleteInvoiceData(invoiceId) {
    const invoiceIndex = mockData.findIndex((item) => item.id === invoiceId);

    return new Promise((resolve, reject) => {
        if (invoiceIndex !== -1) {
            // Mock veriyi sil
            mockData.splice(invoiceIndex, 1);
            resolve(`Invoice with ID ${invoiceId} deleted`);
        } else {
            reject(`Invoice with ID ${invoiceId} not found`);
        }
    });
}

// Yeni fatura öğesi eklemek için mock fonksiyon
export async function addInvoiceData(newItem) {
    return new Promise((resolve) => {
        // Yeni fatura item'ini mock veriye ekle
        const newInvoiceId = mockData.length + 1;
        const newInvoice = { id: newInvoiceId, ...newItem };
        mockData.push(newInvoice);
        resolve(newInvoice);
    });
}
