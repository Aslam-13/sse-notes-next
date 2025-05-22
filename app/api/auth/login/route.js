import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { createToken } from '@/lib/jwt';

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return Response.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return Response.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  const token = createToken(user);
  return new Response(JSON.stringify({ message: 'Login successful' }), {
    status: 200,
    headers: {
      'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=604800`,
    },
  });
}
