import FilterIcon from "@/svgs/filter-icon";
import NewInvoicesBtn from "../newInvoicesBtn";
import FilteredDropdown from "../filteredDropdown";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitle">
        <h1>Faturalar</h1>
        <p className="headerTitleInfo">Toplam 7 fatura bulunmaktadır</p>
        <p className="headerInforespo"> 7 fatura </p>
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
