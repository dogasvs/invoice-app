import Header from "@/components/header";
import EmptyPageSvg from "@/svgs/empty-svg/empty";
import "./empty.css";

export default function EmptyPage() {
  return (
    <>
      <Header />
      <div className="emptyPageContainer">
        <div className="svg">
          <EmptyPageSvg />
        </div>
        <div className="emptyPageText">
          <h1>Burada hiçbir şey yok</h1>
          <p>
            simgesine tıklayarak yeni bir fatura oluşturun.
            <span>Yeni Fatura</span> düğmesi ve başlayın
          </p>
        </div>
      </div>
    </>
  );
}
