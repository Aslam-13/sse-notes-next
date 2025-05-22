'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingButton from '../components/LoadingButton';
import { set } from 'mongoose';
export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchNotes = async () => {
    const res = await fetch('/api/notes');
    if (res.status === 401) return router.push('/login');
    const data = await res.json();
    setNotes(data);
  };

     const startEdit = (id) => {
  setNotes((prev) =>
    prev.map((note) =>
      note._id === id ? { ...note, editing: true } : note
    )
  );
};

const cancelEdit = (id) => {
  fetchNotes(); // Re-fetch to restore original values
};

const saveNote = async (note) => {
  await fetch(`/api/notes/${note._id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: note.title,
      content: note.content,
    }),
  });
  fetchNotes();
};



  const addNote = async (e) => {
    e.preventDefault();
    setError('');
    if(title === '' || content === '') {
      setError('Title and content are required');
      return;
    }  
    setIsAdding(true);
    if (!title) return;
    await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
    });
    setTitle('');
    setContent('');
    setIsAdding(false);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    fetchNotes();
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">SSE Notes</h1>
        <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={logout}>Logout</button>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={addNote} className="mb-6 space-y-2">
        <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="w-full p-2 border rounded" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <LoadingButton
          loading={isAdding}
          onClick={addNote}
          className="bg-green-600 text-white"
        >
          Add Note
        </LoadingButton>
      </form>

{notes.map(note => (
  <div key={note._id} className="border p-4 rounded mb-4 shadow">
    {note.editing ? (
      <>
        <input
          className="w-full p-2 border rounded mb-2"
          value={note.title}
          onChange={(e) =>
            setNotes((prev) =>
              prev.map((n) =>
                n._id === note._id ? { ...n, title: e.target.value } : n
              )
            )
          }
        />
        <textarea
          className="w-full p-2 border rounded"
          value={note.content}
          onChange={(e) =>
            setNotes((prev) =>
              prev.map((n) =>
                n._id === note._id ? { ...n, content: e.target.value } : n
              )
            )
          }
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => saveNote(note)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => cancelEdit(note._id)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </>
    ) : (
      <>
        <h3 className="text-lg font-semibold">{note.title}</h3>
        <p className="text-gray-700">{note.content}</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => startEdit(note._id)}
            className="text-blue-600 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => deleteNote(note._id)}
            className="text-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      </>
    )}
  </div>
))}

    </div>
  );
}
