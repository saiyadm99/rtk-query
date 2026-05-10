import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">
          Auth Demo App
        </h1>

        <div className="space-y-4">
          <Link
            href="/firebase-demo"
            className="block bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded"
          >
            Firebase Auth Demo
          </Link>

          <Link
            href="/jwt-demo"
            className="block bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded"
          >
            JWT Auth Demo
          </Link>
        </div>
      </div>
    </div>
  );
}