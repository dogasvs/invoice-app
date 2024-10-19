import Header from "@/components/header";
import Sidenav from "@/components/sidenav";

export default function InvoicesLayout({ children }) {
  return (
    <div className="invoicesListLayout">
      <Header />
      <Sidenav />
      <div className="content">{children}</div>
    </div>
  );
}
