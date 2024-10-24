import Link from "next/link";
import { getInvoiceData } from "../../actions/serverActions";
import InvoiceDetailsContent from "@/components/invoiceDetailsContent";
import { redirect } from "next/navigation";

// Sunucu tarafında çalışan fatura detay sayfası
export default async function InvoiceDetail({ params, initialInvoiceId }) {
  const initialInvoiceId = params.id || "1";

  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

 useEffect(() => {
        const getInvoiceData = async () => {
            setLoading(true);
            try {
                const data = await fetchInvoiceData(initialInvoiceId);
                setInvoiceData(data);
            } catch (error) {
                setFetchError("Fatura verileri alınırken hata oluştu.");
                console.error("Fatura çekme hatası:", error);
            } finally {
                setLoading(false);
            }
        };

        getInvoiceData();
    }, [initialInvoiceId]);

    if (loading) return <p>Yükleniyor...</p>;
    if (fetchError) return <p className="error-message">{fetchError}</p>;
    if (!invoiceData) return <p>Fatura bulunamadı.</p>;

  return (
    <div className="container">
      <div className="wrapper">
        <div className="goBack">
          <Link href="/" className="goBackButton">Geri git</Link>
        </div>

        <InvoiceDetailsContent invoiceData={invoiceData} />
      </div>
    </div>
  );
}
