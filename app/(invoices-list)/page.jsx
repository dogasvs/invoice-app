'use client';
import MainComponent from "@/components/main";
import { getInvoicesData } from "../actions/serverActions";


export default async function InvoicesList() {
  let invoices = [];

  try {
    invoices = await getInvoicesData("0");
  } catch (error) {
    console.error("Fatura verisi alınırken bir hata oluştu:", error.message);
  }
  
  return (
    <>
       <MainComponent invoices={invoices} />
    </>
  );
}
