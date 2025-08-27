type TodoCardProps = {
  task: string;
  onDone: () => void;
};

function TodoCard({ task, onDone }: TodoCardProps) {
  return (
    <div className="group flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 px-4 py-3 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-500/80 group-hover:bg-indigo-500 transition" />
        <span className="text-[15px]">{task}</span>
      </div>
      <button
        onClick={onDone}
        className="rounded-lg border border-transparent bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-sm text-slate-800 dark:text-slate-100 font-medium hover:bg-green-500 hover:text-white dark:hover:bg-green-500 focus:outline-none focus:ring-4 ring-green-200 dark:ring-green-800 transition"
        aria-label={`Mark "${task}" as done`}
        title="Done"
      >
        Done
      </button>
    </div>
  );
}

export default TodoCard;
