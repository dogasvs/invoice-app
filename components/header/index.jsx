"use client";
import FilterIcon from "@/svgs/filter-icon";
import NewInvoicesBtn from "../newInvoicesBtn";
import FilteredDropdown from "../filteredDropdown";

export default function Header({ dataInvoices= [], value, setValue }) {
  return (
    <div className="header">
      <div className="headerTitle">
        <h1>Faturalar</h1>
        <p className="headerTitleInfo">
          Toplam {dataInvoices.length} fatura bulunmaktadır
        </p>
        <p className="headerInforespo"> {dataInvoices.length} fatura </p>
      </div>
      <div className="invoicesProcess">
        <div className="invoicesFilter">
          <FilteredDropdown
            value={value}
            setValue={setValue}
            dataInvoices={dataInvoices}
          />
          <FilterIcon />
        </div>
        <div className="">
          <NewInvoicesBtn />
        </div>
      </div>
    </div>
  );
}
