// app/api/notes/route.js
import { connectDB } from '@/lib/db';
import Note from '@/models/Note';
import { getUserFromToken } from '@/lib/auth';

export async function GET() {
  await connectDB();
  const user = await getUserFromToken();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const notes = await Note.find({ userId: user.id }).sort({ createdAt: -1 });
  return Response.json(notes);
}

export async function POST(req) {
  await connectDB();
  const user = await getUserFromToken();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { title, content } = await req.json();

  if (!title) return Response.json({ error: 'Title is required' }, { status: 400 });

  const note = await Note.create({
    userId: user.id,
    title,
    content: content || '',
  });

  return Response.json(note, { status: 201 });
}
