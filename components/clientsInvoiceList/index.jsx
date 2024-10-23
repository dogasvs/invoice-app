"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import DetayaGitSvg from "@/svgs/detaya-git";
import { useEffect, useState } from "react";

export default function InvoicesListComponent({
  dataInvoices,
  setDataInvoices,
  value,
  invoices,
}) {
  useEffect(() => {
    if (value.length > 0) {
      const status = invoices.filter((x) => value.includes(x.status));
      setDataInvoices(status);
    } else {
      setDataInvoices(invoices);
    }
  }, [value]);

  return (
    <>
      <div className="invoices-list-container">
        {dataInvoices.length > 0
          ? dataInvoices.map((invoice) => (
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
                      {invoice.status == 1 && <span>ödendi</span>}
                      {invoice.status == 2 && <span>ödenmedi</span>}
                      {invoice.status == 0 && <span>askıda</span>}
                    </h3>
                  </div>
                  <div className="invoices-detail">
                    <DetayaGitSvg />
                  </div>
                </div>
              </Link>
            ))
          : "bulunamadı"}
      </div>
    </>
  );
}
