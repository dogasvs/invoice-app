import DetayaGitSvg from "@/svgs/detaya-git";
import "./invoicesList.css";
import Link from "next/link";
import Header from "@/components/header";
import { getInvoiceData } from '../actions/serverActions';

export default async function InvoicesList() {
  const invoices = [];

  try {
    // İlk 7 faturayı çekiyoruz şimdilik 
    for (let i = 1; i <= 7; i++) {
      const invoice = await getInvoiceData(i);
      if (invoice) {
        invoices.push(invoice);
      }
    }
  } catch (error) {
    console.error("Fatura verisi alınırken bir hata oluştu:", error.message);
  }

  return (
    <>
      <Header />
      <div className="invoices-list-container">
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <div key={invoice.id} className="invoices-list">
              <div className="invoices-id">
                <h3>
                  <span>#</span>
                  {invoice.invoiceNumber}
                </h3>
              </div>
              <div className="invoices-date">
                <h3>Due {new Date(invoice.invoiceDate).toLocaleDateString()}</h3>
              </div>
              <div className="invoices-customname">
                <h3>{invoice.billTo.name}</h3>
              </div>
              <div className="invoices-price">
                <h3>£ {invoice.items.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)}</h3>
              </div>
              <div className="invoices-status">
                <h3>
                  <span className="doc"></span> {invoice.status === 1 ? "Paralı" : "Ödenmemiş"}
                </h3>
              </div>
              <div className="invoices-detail">
                <Link href={`/details/${invoice.id}`}>
                  <DetayaGitSvg />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Faturalar bulunamadı veya bir hata oluştu.</p>
        )}
      </div>
    </>
  );
}
