"use client";
import { useState, useEffect } from "react";
import InvoicesListComponent from "../clientsInvoiceList";
import Header from "../header";
import { useRouter } from "next/navigation";

export default function MainComponent({ invoices }) {
  const [value, setValue] = useState([]);
  const [dataInvoices, setDataInvoices] = useState(invoices);
  const router = useRouter();
  console.log(value);
  
  useEffect(() => {
    // Eğer fatura sayısı 0 ise kullanıcıyı /empty sayfasına yönlendir
    if (invoices.length === 0) {
      router.push('/empty');
      return;
    }

    
    const savedInvoices = localStorage.getItem("invoices");
    if (savedInvoices) {
      setDataInvoices(JSON.parse(savedInvoices));
    } else {
      localStorage.setItem("invoices", JSON.stringify(invoices));
    }
  }, [invoices, router]);

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
