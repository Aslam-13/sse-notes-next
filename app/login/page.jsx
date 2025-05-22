'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingButton from '../components/LoadingButton';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      const data = await res.json();
      setError(data.error || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full p-2 border rounded" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <LoadingButton loading={isLoading} className="bg-blue-600 text-white w-full">
          Login
        </LoadingButton>
      </form>
      <p className="text-center mt-4 text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-600 hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
}
