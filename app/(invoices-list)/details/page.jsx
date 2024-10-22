import "./invoice-detail.css";
import Link from "next/link";
import { getInvoiceData } from "../../actions/serverActions";
import InvoiceDetailsContent from "@/components/invoiceDetailsContent";
import { redirect } from "next/navigation";

// Sunucu tarafında çalışan fatura detay sayfası
export default async function InvoiceDetail({ params }) {
  const invoiceId = params.id || "1";

  const invoiceData = await getInvoiceData(invoiceId);

  if (!invoiceData) {
    return redirect("/empty");
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
}
