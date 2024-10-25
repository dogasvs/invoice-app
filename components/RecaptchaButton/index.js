'use client';
import { useEffect } from "react";
import { handleRecaptcha as serverHandleRecaptcha } from "@/app/actions/serverActions";

export default function RecaptchaButton({ formId }) {

  // useEffect ile reCAPTCHA'yı hazır hale getiriyoruz
  useEffect(() => {
    console.log("useEffect çalıştı"); 
    if (window.grecaptcha) {
      console.log("reCAPTCHA yüklendi");
      window.grecaptcha.ready(() => {
        const button = document.querySelector(".g-recaptcha");
        button.addEventListener("click", () => {
          console.log("reCAPTCHA butonuna tıklandı");
          window.grecaptcha.execute("6LchTGsqAAAAAGTDL6N-Zu4zS09LTLqhy36EPHxk", { action: "submit" })
            .then((token) => {
              console.log("Alınan reCAPTCHA token:", token);
              // Token alındıktan sonra server-side handleRecaptcha'ı çağırıyoruz
              serverHandleRecaptcha(token, formId);
            });
        });
      });
    }
  }, []);

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
