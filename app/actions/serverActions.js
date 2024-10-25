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

/*
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
}*/


export async function getInvoicesData(status) {
  console.log("Fatura durumu:", status);

  let currentPage = 1;
  let totalPages = 1; // Başlangıçta en az bir sayfa olduğunu varsayalım.
  let allInvoices = [];

  try {
    while (currentPage <= totalPages) {
      // URL'yi tek bir satırda doğru şekilde oluşturduğunuzdan emin olun
      let url = `${API_BASE_URL}/Invoices/${currentPage}`;

      // Eğer durum filtresi kullanıyorsanız, URL'ye query parametresi ekleyin
      if (status !== undefined && status !== null) {
        url += `?status=${status}`;
      }

      console.log(`Fetching URL: ${url}`);

      const data = await advancedFetch(url, "GET"); // data zaten JSON olarak dönüyor

      if (!data || !Array.isArray(data.invoices) || typeof data.totalPages !== "number") {
        throw new Error("Faturalar bulunamadı veya yanıt formatı geçersiz.");
      }

      // Mevcut sayfadaki faturaları ekle
      allInvoices = [...allInvoices, ...data.invoices];
      totalPages = data.totalPages; // Toplam sayfa sayısını güncelle

      console.log(`Sayfa ${currentPage} tamamlandı. Toplam Sayfa: ${totalPages}`);
      currentPage++;
    }

    console.log(`Toplam Fatura Sayısı: ${allInvoices.length}`);
    return allInvoices;
  } catch (error) {
    console.error("Fatura verileri alınamadı:", error);
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
export async function addItemsData(itemData) {
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


// Fatura verilerini API'ye güncellemek için
export async function updateInvoiceData(invoiceData) {
  const url = `${API_BASE_URL}/api/Invoice/SaveInvoice`;
  try {
    const response = await advancedFetch(url, "POST", invoiceData);
    if (!response.ok) {
      throw new Error("Fatura güncellenirken hata oluştu.");
    
    }
    return response.json();
  } catch (error) {
    console.error("Fatura güncelleme hatası:", error);
    throw error;
  }
}


// Öğeleri API'ye güncellemek için
export async function updateItemsData(itemData) {
  const url = `${API_BASE_URL}/api/Invoice/SaveItems`;
  try {
    const response = await advancedFetch(url, "POST", itemData);
    if (!response.ok) {
      throw new Error("Öğe güncellenirken hata oluştu.");
    }
    return response.json();
  } catch (error) {
    console.error("Öğe güncelleme hatası:", error);
    throw error;
  }
}

// reCAPTCHA doğrulaması için
export const handleRecaptcha = async (token, formId) => {
  try {
    console.log("Backend'e gönderilen token:", token); // Kontrol
    const data = await advancedFetch("/api/verify-recaptcha", "POST", { token });

    if (data.success) {
      document.getElementById(formId).submit();
      console.log("Başarılı doğrulama:", data);
    } else {
      alert("reCAPTCHA doğrulaması başarısız!");
      console.log("Başarısız doğrulama:", data);
    }
  } catch (error) {
    console.error("reCAPTCHA doğrulama hatası:", error);
  }
};


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



*/

