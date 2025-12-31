import Animate from "./components/Animate";
import Notification from "./components/Notification";
import Header1 from "./components/Header1";
import StatsGrid from "./components/StatsGrid";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import ClearButton from "./components/ClearButton";
import { useEffect, useState } from "react";

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
    // playSound("add");
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
    // playSound("update");
    showNotification("Task updated successfully!");
  };

  // cancel edit
  const cancelEdit = () => {
    setEditText("");
    setEditingId(null);
  };

  //edit key press
  const handleEditKeyPress = (e, id) => {
    if (e.key === "Enter") {
      saveEdit(id);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  // clear all completed task
  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
    // playSound("delete");
    showNotification("🗑️ Task deleted ", "info");
  };

  // onToggle
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const todo = todos.find((t) => t.id === id);

    if (!todo.completed) {
      // playSound("complete");
      showNotification("🎉 Greate Job! Task completed!");
    }
  };

  // get from locatStorage
  useEffect(() => {
   try {
    const data = localStorage.getItem(STORAGE_KEY);
    if(data){
      setTodos(JSON.parse(data))
    }
   } catch (error) {
    console.log("Load Error: ",error)
   } finally{
    setHasLoaded(true);
   }
  }, [])
  
  
  // save to localStorage
  useEffect(() => {
    if(!hasLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY,JSON.stringify(todos))
    } catch (error) {
      console.log("save error : ",error)
      
    }
  }, [todos,hasLoaded])

  const activeTodos = todos.filter((t) => !t.completed).length;
  const completedTodos = todos.filter((t) => t.completed).length;
  const progress = todos.length > 0 ? (completedTodos / todos.length) * 100 : 0;

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 p-3 sm:p-6 relative overflow-hidden">
        <Animate />

        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />

        <div className="max-w-3xl mx-auto relative z-1">
          <Header1 activeTodos={activeTodos} progress={progress} />

          <StatsGrid
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            totalTodos={todos.length}
          />

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
            onEditTextChange={(e) => setEditText(e.target.value)}
            onEditKeyPress={handleEditKeyPress}
            onToggle={toggleTodo}
          />

          <ClearButton onClick={clearCompleted} />
        </div>
      </div>
    </>
  );
}

export default App;
