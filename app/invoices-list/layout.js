import Header from "@/components/header";
import Sidenav from "@/components/sidenav";
import "./invoicesList.css"

export default function InvoicesLayout({ children }) {
  return (
    <div className="invoicesListLayout">
      <Sidenav />
      <div className="content">
        <Header />
        {children}
      </div>
    </div>
  );
}
