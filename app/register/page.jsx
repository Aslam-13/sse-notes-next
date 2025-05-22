'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingButton from '../components/LoadingButton';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    // Automatically login after successful registration
    const loginRes = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (loginRes.ok) {
      router.push('/dashboard');
    } else {
      setError('Registered, but failed to login automatically.');
    }
  } else {
    const data = await res.json();
    setError(data.error || 'Registration failed');
  }
};


  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full p-2 border rounded" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <LoadingButton loading={isLoading} className="bg-blue-600 text-white w-full">
          Register
        </LoadingButton>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 hover:underline">
          Login here
        </a>
      </p>
    </div>
  );
}
