import FilterIcon from "@/svgs/filter-icon";
import NewInvoicesBtn from "../newInvoicesBtn";
import FilteredDropdown from "../filteredDropdown";

export default function Header({ invoices }) {
  return (
    <div className="header">
      <div className="headerTitle">
        <h1>Faturalar</h1>
        <p className="headerTitleInfo">
          Toplam {invoices.length} fatura bulunmaktadır
        </p>
        <p className="headerInforespo"> {invoices.length} fatura </p>
      </div>
      <div className="invoicesProcess">
        <div className="invoicesFilter">
          <p className="invoicesFilterRespo">Filtre</p>
          <FilteredDropdown />
          <FilterIcon />
        </div>
        <div className="">
          <NewInvoicesBtn />
        </div>
      </div>
    </div>
  );
}
