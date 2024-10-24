"use server";
import { advancedFetch } from "../../utils/fetch.js";

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


// Kullanıcı aramak için
export async function searchUser(name) {
  const url = `${API_BASE_URL}/Client/${encodeURIComponent(name)}`;
  try {
    const response = await advancedFetch(url, "GET");
    if (response && Array.isArray(response)) {
      return response; // Kullanıcı verisi varsa döndür
    } else {
      throw new Error(`Kullanıcı adı "${name}" ile bulunamadı.`);
    }
  } catch (error) {
    throw new Error(`Kullanıcı verisi alınamadı: ${error.message}`);
  }
}



// Fatura verilerini silmek için
export async function deleteInvoiceData(invoiceId) {
  const url = `${API_BASE_URL}/api/Invoice/DeleteInvoice/${invoiceId}`;
  return await advancedFetch(url, "DELETE");
}

// Fatura verilerini API'ye eklemek için
export async function addInvoiceData(invoiceData) {
  const url = `${API_BASE_URL}/api/Invoice/SaveInvoice`;
  try {
    const response = await advancedFetch(url, "POST", invoiceData);
    if (!response.ok) {
      throw new Error("Fatura kaydedilirken hata oluştu.");
    }
    return response.json();
  } catch (error) {
    console.error("Fatura ekleme hatası:", error);
    throw error;
  }
}

// Öğeleri eklemek için
export async function addItemData(itemData) {
  const url = `${API_BASE_URL}/api/Invoice/SaveItems`;
  try {
    const response = await advancedFetch(url, "POST", itemData);
    if (!response.ok) {
      throw new Error("Öğe kaydedilirken hata oluştu.");
    }
    return response.json();
  } catch (error) {
    console.error("Öğe ekleme hatası:", error);
    throw error;
  }
}

/*
// Fatura verilerini güncellemek için
export async function updateInvoiceData(invoiceId, updateData) {
  const url = `${API_BASE_URL}/api/Invoice/UpdateInvoice/${invoiceId}`; // Güncelleme için doğru URL
  try {
    const response = await advancedFetch(url, "PUT", updateData);
    if (response && response.success) { // API'nizin başarılı yanıtını kontrol edin
      return response;
    } else {
      throw new Error("Fatura güncellenirken bir hata oluştu.");
    }
  } catch (error) {
    throw new Error(`Fatura güncellenemedi: ${error.message}`);
  }
}




*/

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
