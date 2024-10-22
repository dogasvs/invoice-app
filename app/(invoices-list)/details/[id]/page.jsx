import Link from "next/link";
import { getInvoiceData } from "../../../actions/serverActions";
import InvoiceDetailsContent from "@/components/invoiceDetailsContent";
import "../invoice-detail.css"

export default async function InvoiceDetail({ params }) {
  const invoiceId = params.id || "1"; // URL'den gelen fatura ID

  try {
    const invoiceData = await getInvoiceData(invoiceId);

    if (!invoiceData) {
      return <p>Fatura bulunamadı!</p>;
    }

    return (
      <div className="container">
        <div className="wrapper">
          <div className="goBack">
            <Link href="/" className="goBackButton">Geri git</Link>
          </div>

          <InvoiceDetailsContent invoiceData={invoiceData} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Fatura verisi alınırken bir hata oluştu:", error.message);
    return <p>Fatura verisi alınırken bir hata oluştu: {error.message}</p>;
  }
}
