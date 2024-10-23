"use server";
import { advancedFetch } from "@/utils/fetch";

const API_BASE_URL = "https://invoice.mkadirgulgun.com.tr";

// Fatura verilerini çekmek için
export async function getInvoiceData(invoiceId) {
  const url = `${API_BASE_URL}/InvoiceDetail/${invoiceId}`; // Belirli faturayı çekmek için URL
  try {
    const response = await advancedFetch(url, "POST"); // API'den GET isteği
    if (response) {
      return response; // Fatura verisi varsa döndür
    } else {
      throw new Error(`Fatura ID ${invoiceId} ile bulunamadı`);
    }
  } catch (error) {
    throw new Error(`Fatura verisi alınamadı: ${error.message}`);
  }
}
export async function getInvoicesData(status) {
  console.log(status);

  let url = `${API_BASE_URL}/Invoices/1`; // 1. sayfadaki Tüm faturaları çekmek için doğru URL

  try {
    const response = await advancedFetch(url, "GET"); // API'den GET isteği
    if (response && response.length > 0) {
      return response; // Eğer fatura verisi varsa döndür
    } else {
      throw new Error("Faturalar bulunamadı");
    }
  } catch (error) {
    throw new Error(`Fatura verileri alınamadı: ${error.message}`);
  }
}

// Fatura verilerini silmek için
export async function deleteInvoiceData(invoiceId) {
  const url = `${API_BASE_URL}/api/Invoice/DeleteInvoice/${invoiceId}`;
  return await advancedFetch(url, "DELETE");
}

/*
// Fatura verilerini güncellemek için 
export async function updateInvoiceData(invoiceId, updatedData) {
    const url = `${API_BASE_URL}/invoices/${invoiceId}`;
    return await advancedFetch(url, 'PUT', updatedData);
}



// Fatura öğesi eklemek için API çağrısı
export async function addInvoiceData(newItem) {
    const url = `${API_BASE_URL}/invoices/add-item`;
    return await advancedFetch(url, 'POST', newItem);
}

*/
/*// Fatura verilerini silmek için mock fonksiyon
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
} */

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

// Yeni fatura öğesi eklemek için mock fonksiyon
export async function addInvoiceData(newInvoice) {
  return new Promise((resolve, reject) => {
    if (newInvoice) {
      const newInvoiceId =
        mockData.length > 0 ? mockData[mockData.length - 1].id + 1 : 1;
      const invoice = {
        id: newInvoiceId,
        invoiceNumber: `INV-2024-${String(newInvoiceId).padStart(3, "0")}`, // Otomatik fatura numarası
        status: 0,
        ...newInvoice,
      };
      mockData.push(invoice);
      resolve(invoice);
    } else {
      reject("Yeni fatura verisi eksik");
    }
  });
}
