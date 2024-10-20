import Header from "@/components/header";
import EmptyPageSvg from "@/svgs/empty-svg/empty";
import "./empty.css";

export default function EmptyPage() {
  return (
    <div className="emptyPage">
      <Header />
      <EmptyPageSvg />
      <h1>Burada hiçbir şey yok</h1>
      <p>
        simgesine tıklayarak yeni bir fatura oluşturun. Yeni Fatura düğmesi ve
        başlayın
      </p>
    </div>
  );
}
