"use client";
import { useState, useEffect } from "react";
import InvoicesListComponent from "../clientsInvoiceList";
import Header from "../header";

export default function MainComponent({ invoices }) {
  const [value, setValue] = useState([]);
  const [dataInvoices, setDataInvoices] = useState(invoices);
  console.log(value);
  
  useEffect(() => {
    // Sadece sayfa yüklendiğinde çalışması için bağımlılık dizisini boş bırakıyoruz
    const savedInvoices = localStorage.getItem("invoices");
    if (savedInvoices) {
      setDataInvoices(JSON.parse(savedInvoices));
    } else {
      localStorage.setItem("invoices", JSON.stringify(invoices));
    }
  }, []);

  return (
    <>
      <Header dataInvoices={dataInvoices} value={value} setValue={setValue} />
      <InvoicesListComponent
        dataInvoices={dataInvoices}
        setDataInvoices={setDataInvoices}
        value={value}
        invoices={invoices}
      />
    </>
  );
}
