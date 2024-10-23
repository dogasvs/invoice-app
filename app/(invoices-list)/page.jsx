import DetayaGitSvg from "@/svgs/detaya-git";
import Link from "next/link";
import Header from "@/components/header";
import { getInvoicesData } from "../actions/serverActions";
import { redirect } from "next/navigation";

export default async function InvoicesList() {
  let invoices = [];

  try {
    invoices = await getInvoicesData();
  } catch (error) {
    console.error("Fatura verisi alınırken bir hata oluştu:", error.message);
  }

  return (
    <>
      <Header invoices={invoices} />
      <div className="invoices-list-container">
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <Link href={`/details/${invoice.id}`} key={invoice.id}>
              <div className="invoices-list">
                <div className="invoices-id">
                  <h3>
                    <span>#</span>
                    {invoice.invoiceNumber}
                  </h3>
                </div>
                <div className="invoices-date">
                  <h3>
                    Due {new Date(invoice.invoiceDate).toLocaleDateString()}
                  </h3>
                </div>
                <div className="invoices-customname">
                  <h3>{invoice.client.name}</h3>
                </div>
                <div className="invoices-price">
                  <h3>
                    £{" "}
                    {invoice.items
                      .reduce((total, item) => total + item.totalPrice, 0)
                      .toFixed(2)}
                  </h3>
                </div>
                <div className="invoices-status">
                  <h3>
                    <span className="doc"></span>
                    {invoice.status === 0
                      ? "Askıda"
                      : invoice.status === 1
                      ? "Ödendi"
                      : "Ödenmemiş"}
                  </h3>
                </div>
                <div className="invoices-detail">
                  <DetayaGitSvg />
                </div>
              </div>
            </Link>
          ))
        ) : (
          redirect("/")
        )}
      </div>
    </>
  );
}
