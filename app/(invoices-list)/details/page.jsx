import "./invoice-detail.css";
import Link from "next/link";
import { getInvoiceData } from "../../actions/serverActions";
import InvoiceDetailsContent from "@/components/invoiceDetailsContent";

// Sunucu tarafında çalışan fatura detay sayfası
export default async function InvoiceDetail({ params }) {
  const invoiceId = params.id || "1";

  const invoiceData = await getInvoiceData(invoiceId);

  const parsedInvoiceData = JSON.parse(JSON.stringify(invoiceData));

  if (!parsedInvoiceData) {
    return <p>Fatura bulunamadı!</p>;
  }

  return (
    <div className="container">
      <div className="wrapper">
        <div className="goBack">
          <Link href="/" className="goBackButton">Geri git</Link>
        </div>

        <InvoiceDetailsContent invoiceData={parsedInvoiceData} />
      </div>
    </div>
  );
}
