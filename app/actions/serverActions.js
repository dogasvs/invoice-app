import { advancedFetch } from "@/utils/fetch";


const API_BASE_URL = 'https://dummyjson.com';

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
