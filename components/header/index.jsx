import ArtiSvg from "@/svgs/add-invoices";
import FilterIcon from "@/svgs/filter-icon";

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
          <button>New İnvoices</button>
          <ArtiSvg />
        </div>
      </div>


    </div>
  )
}