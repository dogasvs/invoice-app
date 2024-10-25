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
