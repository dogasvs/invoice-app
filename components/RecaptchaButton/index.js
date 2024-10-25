export default function RecaptchaButton({ formId }) {
  const handleRecaptcha = (token) => {
    fetch("/api/verify-recaptcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.getElementById(formId).submit(); 
        } else {
          alert("reCAPTCHA doğrulaması başarısız!");
        }
      })
      .catch((error) => console.error("reCAPTCHA hatası:", error));
  };

  return (
    <button
      className="g-recaptcha"
      data-sitekey="6LchTGsqAAAAAGTDL6N-Zu4zS09LTLqhy36EPHxk" 
      data-callback="handleRecaptcha"
      data-action="submit"
    >
      Gönder
    </button>
  );
}
