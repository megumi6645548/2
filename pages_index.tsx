// @ts-ignore
const React = window.React;
// @ts-ignore
const ReactDOM = window.ReactDOM;
const { useState } = React;
const { render } = ReactDOM;

interface Idea {
  id: number;
  title: string;
  description: string;
}

const defaultIdeas: Idea[] = [
  { id: 1, title: "New Feature", description: "Add dark mode to the app." },
  { id: 2, title: "Marketing", description: "Launch a social media campaign." },
];

function IdeaBoard() {
  const [ideas, setIdeas] = useState<Idea[]>(defaultIdeas);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIdeas([
      ...ideas,
      {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
      },
    ]);
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id: number) => {
    setIdeas(ideas.filter((idea) => idea.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditTitle("");
      setEditDescription("");
    }
  };

  const handleEdit = (idea: Idea) => {
    setEditingId(idea.id);
    setEditTitle(idea.title);
    setEditDescription(idea.description);
  };

  const handleSaveEdit = (id: number) => {
    setIdeas(
      ideas.map((idea) =>
        idea.id === id
          ? { ...idea, title: editTitle.trim(), description: editDescription.trim() }
          : idea
      )
    );
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">🧠 Brainstorming Idea Board</h1>
        <form
          onSubmit={handleAddIdea}
          className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col gap-4"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Add a new idea</h2>
          <input
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Idea title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            required
          />
          <textarea
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Short description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            rows={2}
          />
          <button
            type="submit"
            className="self-end bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add Idea
          </button>
        </form>
        <div className="space-y-4">
          {ideas.length === 0 && (
            <div className="text-center text-gray-400">No ideas yet. Add your first one!</div>
          )}
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 relative"
            >
              {editingId === idea.id ? (
                <>
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    maxLength={50}
                  />
                  <textarea
                    className="border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    maxLength={200}
                    rows={2}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-green-700 transition"
                      onClick={() => handleSaveEdit(idea.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg font-semibold hover:bg-gray-300 transition"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{idea.title}</h3>
                      {idea.description && (
                        <p className="text-gray-600 text-sm mt-1">{idea.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-blue-600 transition"
                      onClick={() => handleEdit(idea)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-600 transition"
                      onClick={() => handleDelete(idea.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Render the component
render(<IdeaBoard />, document.getElementById('root'));
