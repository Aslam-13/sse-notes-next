// app/api/notes/[id]/route.js
import { connectDB } from '@/lib/db';
import Note from '@/models/Note';
import { getUserFromToken } from '@/lib/auth';

export async function GET(req, { params }) {
  await connectDB();
  const user = await getUserFromToken();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const note = await Note.findOne({ _id: params.id, userId: user.id });
  if (!note) return Response.json({ error: 'Note not found' }, { status: 404 });

  return Response.json(note);
}

export async function PUT(req, { params }) {
  await connectDB();
  const user = await getUserFromToken();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { title, content } = await req.json();
  const updated = await Note.findOneAndUpdate(
    { _id: params.id, userId: user.id },
    { title, content },
    { new: true }
  );

  if (!updated) return Response.json({ error: 'Note not found' }, { status: 404 });

  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const user = await getUserFromToken();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const deleted = await Note.findOneAndDelete({ _id: params.id, userId: user.id });
  if (!deleted) return Response.json({ error: 'Note not found' }, { status: 404 });

  return Response.json({ message: 'Note deleted' });
}

export async function PATCH(req, { params }) {
  await connectDB();
  const user = await getUserFromToken();
  if (!user) return new Response('Unauthorized', { status: 401 });

  const { title, content } = await req.json();

  const note = await Note.findOneAndUpdate(
    { _id: params.id, user: user._id },
    { title, content, updatedAt: new Date() },
    { new: true }
  );

  if (!note) return new Response('Note not found', { status: 404 });

  return Response.json(note);
}