import Link from "next/link";


export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Gibwork</h1>
        <p className="text-lg text-gray-600 mb-8">
          Find and create tasks in our decentralized marketplace
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/listedTask"
            className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Browse Tasks
          </Link>
          <Link
            href="/createTask"
            className="bg-white text-gray-900 px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Create Task
          </Link>
        </div>
      </div>
    </main>
  );
}