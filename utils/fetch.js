export const advancedFetch = async (url, method = "GET", data = null) => {
  console.log();

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });

    // HTTP durum kodunu kontrol etme
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Bir hata oluştu.");
    }

    // Eğer response nullsa, null döndür
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Fetch hatası:", error);
    return error;
  }
};
