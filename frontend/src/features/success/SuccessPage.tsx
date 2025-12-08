import { Link, useSearchParams } from "react-router";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white max-w-lg rounded-3xl shadow-2xl w-full p-8 border-t-4 border-green-500">
        <div className="p-4 flex flex-col items-center gap-8">
          <div className="text-4xl text-green-500">🎉</div>
          <h1 className="text-4xl text-green-600 mb-2">Ödeme başarılı </h1>

          <p className="text-gray-700 text-lg text-center leading-relaxed">
            Ödemeniz <strong>başarılı bir şekilde</strong> alındı. Randevunuza
            lütfen zamanında gelmeye özen gösterin.
          </p>

          <Link
            to={"/"}
            className="px-8 py-3 rounded-full bg-green-500 text-white font-semibold text-lg shadow-xl hover:bg-green-600"
          >
            Ana Sayfaya Dön
          </Link>

          <p className="border-l-4 border-green-600 p-3 bg-green-50">
            Ödeme ID: #{sessionId}
          </p>

          <p className="text-gray-500 text-sm mt-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
            <strong>Önemli Not:</strong> Eğer gelmeyecekseniz, başkalarının
            faydalanabilmesi için randevunuzu <strong>iptal etmenizi</strong>{" "}
            rica ederiz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
