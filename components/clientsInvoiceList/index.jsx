"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import DetayaGitSvg from "@/svgs/detaya-git";
import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";

export default function InvoicesListComponent({
  dataInvoices,
  setDataInvoices,
  value,
  invoices,
}) {

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Varsayılan sayfa boyutu
  const [paginatedInvoices, setPaginatedInvoices] = useState([]);



  useEffect(() => {
    if (value.length > 0) {
      const status = invoices.filter((x) => value.includes(x.status));
      setDataInvoices(status);
    } else {
      setDataInvoices(invoices);
    }
    setCurrentPage(1); // Filtreleme yapıldığında sayfayı 1'e ayarladm
  }, [value, invoices, setDataInvoices]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const slicedInvoices = dataInvoices.slice(startIndex, endIndex);
    setPaginatedInvoices(slicedInvoices);
  }, [currentPage, pageSize, dataInvoices]);

  const totalPages = Math.ceil(dataInvoices.length / pageSize);


  return (
    <>
      <div className="invoices-list-container">
        {paginatedInvoices.length > 0
          ? paginatedInvoices.map((invoice) => (
              <Link href={`/details/${invoice.id}`} key={invoice.id}>
                <div className="invoices-list">
                  <div className="invoices-id">
                    <h3>
                      <span></span>
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
                      {invoice.status === 1 && <span>ödendi</span>}
                      {invoice.status === 2 && <span>ödenmedi</span>}
                      {invoice.status === 0 && <span>askıda</span>}
                    </h3>
                  </div>
                  <div className="invoices-detail">
                    <DetayaGitSvg />
                  </div>
                </div>
              </Link>
            ))
          : "Bulunamadı"}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
      
    </>
  );
}