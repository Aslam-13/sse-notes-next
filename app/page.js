import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to SSE Notes App</h1>
        
        <div className="flex gap-4 flex-col sm:flex-row">
          <Link href="/login" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Login
          </Link>
          
          <Link href="/register"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Register
          </Link>
        </div>
      </main>
    </div>
  );
}
