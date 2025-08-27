import { useCallback, useRef, useState } from "react";
import TodoCard from "./components/TodoCard";

type Todo = {
  id: string;
  text: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const composingRef = useRef(false); // IME変換中フラグ

  const addTodo = useCallback((raw: string) => {
    const v = raw.trim();
    if (!v) return; // 空白は弾く
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text: v }]);
    setInput("");
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (composingRef.current) return; // 変換確定中は追加しない
      addTodo(input);
    },
    [addTodo, input]
  );

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const isComposing =
        (e.nativeEvent as any).isComposing ||
        e.key === "Process" ||
        // 古いブラウザ用フォールバック
        // @ts-ignore
        e.keyCode === 229;
      composingRef.current = isComposing;
    },
    []
  );

  const handleCompositionStart = () => (composingRef.current = true);
  const handleCompositionEnd = () => (composingRef.current = false);

  const handleDone = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100">
      <div className="mx-auto max-w-xl px-4 py-10">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Todo App</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Enter で追加 / Done で完了
          </p>
        </header>

        {/* Input Card */}
        <div className="rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur shadow-lg ring-1 ring-slate-200/60 dark:ring-slate-800">
          <form onSubmit={handleSubmit} className="flex gap-2 p-4 md:p-5">
            <label htmlFor="new-task" className="sr-only">
              New task
            </label>
            <input
              id="new-task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task"
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              aria-label="New task"
              className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-base outline-none focus:ring-4 ring-indigo-100 dark:ring-indigo-900/30 focus:border-indigo-400 transition"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-4 ring-indigo-300 dark:ring-indigo-800 active:translate-y-px transition"
            >
              Add
            </button>
          </form>
        </div>

        {/* List */}
        <section className="mt-6 space-y-3">
          {todos.length === 0 ? (
            <div className="text-center text-sm text-slate-500 dark:text-slate-400">
              まだタスクがありません。上の入力から追加してください。
            </div>
          ) : (
            todos.map((todo) => (
              <TodoCard
                key={todo.id}
                task={todo.text}
                onDone={() => handleDone(todo.id)}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
