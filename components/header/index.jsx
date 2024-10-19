import ArtiSvg from "@/svgs/add-invoices";
import FilterIcon from "@/svgs/filter-icon";
import NewInvoicesBtn from "../newInvoicesBtn";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitle">
        <h1>Invoices</h1>
        <p>Toplam 7 fatura bulunmaktadır</p>
      </div>
      <div className="invoicesProcess">
        <div className="invoicesFilter">
          <p>Duruma göre filtrele</p>
          <FilterIcon />
        </div>
        <div className="invoicesAdd">
          <NewInvoicesBtn />
          <ArtiSvg />
        </div>
      </div>
    </div>
  );
}
