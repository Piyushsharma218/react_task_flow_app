import Animate from "./components/Animate";
import Notification from "./components/Notification";
import Header1 from "./components/Header1";
import Statsgrid from "./components/Statsgrid";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import ClearButton from "./components/ClearButton";
import { useState } from "react";

const playSound = () => {};

function App() {
  const STORAGE_KEY = "todos";

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [notification, setNotification] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  // show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // on Key Press
  const onAddKeyPress = (e) => {
    if (e.key == "Enter") {
      handleAddTodo();
    }
  };

  // add todo
  const handleAddTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([newTodo, ...todos]);
    setInput("");
    playSound("add");
    showNotification("✨ Task added Successfully!");
  };

  //delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todos) => todos.id !== id));
    playSound("delete");
    showNotification("🗑️ Task deleted ", "info");
  };

  const startEditing = (id, text) => {
    // console.log("editing started",id,text)
    setEditingId(id);
    setEditText(text);
  };

  // update todo
  const saveEdit = (id) => {
    if (!editText.trim()) return;

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );

    setEditText("");
    setEditingId(null);
    playSound("update");
    showNotification("Task updated successfully!");
  };

  // cancel edit
  const cancelEdit = () => {
    setEditText("");
    setEditingId(null);
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 p-3 sm:p-6 relative overflow-hidden">
        <Animate />

        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />

        <div className="max-w-3xl mx-auto relative z-1">
          <Header1 />

          <Statsgrid />

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onAdd={handleAddTodo}
            onKeyPress={onAddKeyPress}
          />

          <TodoList
            todos={todos}
            onDelete={deleteTodo}
            onStartEdit={startEditing}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
            editingId={editingId}
            editText={editText}
          />

          <ClearButton />
        </div>
      </div>
    </>
  );
}

export default App;
