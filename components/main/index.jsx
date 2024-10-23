"use client";
import { useState } from "react";
import InvoicesListComponent from "../clientsInvoiceList";
import Header from "../header";

export default function MainComponent({ invoices }) {
  const [value, setValue] = useState([]);
  const [dataInvoices, setDataInvoices] = useState(invoices);
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
