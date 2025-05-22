// lib/auth.js
import { verifyToken } from './jwt';
import { cookies } from 'next/headers';

export const getUserFromToken = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch (err) {
    return null;
  }
};
