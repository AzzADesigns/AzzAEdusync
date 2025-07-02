import React, { useState } from "react";

interface TasksLinksColumnProps {
    tasks: string[];
    setTasks: (tasks: string[]) => void;
    taskInput: string;
    setTaskInput: (input: string) => void;
    links: string[];
    setLinks: (links: string[]) => void;
    linkInput: string;
    setLinkInput: (input: string) => void;
}

const TasksLinksColumn: React.FC<TasksLinksColumnProps> = ({
    tasks,
    setTasks,
    taskInput,
    setTaskInput,
    links,
    setLinks,
    linkInput,
    setLinkInput,
}) => {
    const [editingTask, setEditingTask] = useState<number | null>(null);
    const [editingTaskValue, setEditingTaskValue] = useState("");
    const [doneTasks, setDoneTasks] = useState<{ [task: string]: boolean }>(() => {
        const stored = localStorage.getItem('doneTasks');
        if (stored) return JSON.parse(stored);
        return {};
    });

    const [editingLink, setEditingLink] = useState<number | null>(null);
    const [editingLinkValue, setEditingLinkValue] = useState("");

    React.useEffect(() => {
        localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    }, [doneTasks]);

    const handleEditTask = (idx: number) => {
        setEditingTask(idx);
        setEditingTaskValue(tasks[idx]);
    };
    const handleSaveTask = (idx: number) => {
        const newTasks = [...tasks];
        newTasks[idx] = editingTaskValue;
        setTasks(newTasks);
        setEditingTask(null);
        setEditingTaskValue("");
    };
    const handleToggleDone = (idx: number) => {
        const task = tasks[idx];
        setDoneTasks((prev) => {
            const updated = { ...prev, [task]: !prev[task] };
            localStorage.setItem('doneTasks', JSON.stringify(updated));
            return updated;
        });
    };
    const handleDeleteTask = (idx: number) => {
        const taskToDelete = tasks[idx];
        setTasks(tasks.filter((_, i) => i !== idx));
        setDoneTasks((prev) => {
            const updated = { ...prev };
            delete updated[taskToDelete];
            localStorage.setItem('doneTasks', JSON.stringify(updated));
            return updated;
        });
    };

    const handleEditLink = (idx: number) => {
        setEditingLink(idx);
        setEditingLinkValue(links[idx]);
    };
    const handleSaveLink = (idx: number) => {
        const newLinks = [...links];
        newLinks[idx] = editingLinkValue;
        setLinks(newLinks);
        setEditingLink(null);
        setEditingLinkValue("");
    };
    const handleDeleteLink = (idx: number) => {
        setLinks(links.filter((_, i) => i !== idx));
    };

    return (
        <div className="flex flex-col gap-12 h-full">
            <div>
                <div className="text-lg font-medium mb-4 text-neutral-300">
                    Tareas
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (taskInput.trim()) {
                            setTasks([...tasks, taskInput]);
                            setTaskInput("");
                        }
                    }}
                    className="flex gap-2 mb-4"
                >
                    <input
                        className="flex-1 bg-neutral-900 text-white rounded-xl p-4 text-base border-none shadow focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-neutral-500 capitalize"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="Nueva tarea..."
                    />
                    <button
                        type="submit"
                        className="border border-white bg-black text-white rounded-xl px-6 py-3 text-base font-semibold shadow transition hover:bg-white hover:text-black focus:outline-none cursor-pointer"
                    >
                        Agregar
                    </button>
                </form>
                <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {tasks.map((task, idx) => (
                        <li
                            key={idx}
                            className="flex items-center gap-2 text-neutral-200 text-base pl-2 border-l-2 border-blue-600"
                        >
                            <button
                                onClick={() => handleToggleDone(idx)}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-2 ${doneTasks[task] ? "bg-green-600 border-green-600" : "border-white/40"} transition cursor-pointer`}
                            >
                                {doneTasks[task] && (
                                    <span className="text-white text-lg">
                                        ✓
                                    </span>
                                )}
                            </button>
                            {editingTask === idx ? (
                                <>
                                    <input
                                        className="bg-neutral-800 text-white rounded px-2 py-1 border border-white/20 focus:outline-none capitalize"
                                        value={editingTaskValue}
                                        onChange={(e) =>
                                            setEditingTaskValue(e.target.value)
                                        }
                                    />
                                    <button
                                        onClick={() => handleSaveTask(idx)}
                                        className="ml-1 px-2 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        onClick={() => setEditingTask(null)}
                                        className="ml-1 px-2 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span
                                        className={
                                            (doneTasks[task]
                                                ? "line-through text-neutral-500 "
                                                : "") + "capitalize"
                                        }
                                    >
                                        {task}
                                    </span>
                                    <button
                                        onClick={() => handleEditTask(idx)}
                                        className="ml-1 px-2 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(idx)}
                                        className="ml-1 px-2 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer"
                                    >
                                        Eliminar
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <div className="text-lg font-medium mb-4 text-neutral-300">
                    Links
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (linkInput.trim()) {
                            setLinks([...links, linkInput]);
                            setLinkInput("");
                        }
                    }}
                    className="flex gap-2 mb-4"
                >
                    <input
                        className="flex-1 bg-neutral-900 text-white rounded-xl p-4 text-base border-none shadow focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-neutral-500 capitalize"
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                        placeholder="Pega un link..."
                    />
                    <button
                        type="submit"
                        className="border border-white bg-black text-white rounded-xl px-6 py-3 text-base font-semibold shadow transition hover:bg-white hover:text-black focus:outline-none cursor-pointer"
                    >
                        Agregar
                    </button>
                </form>
                <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {links.map((link, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            {editingLink === idx ? (
                                <>
                                    <input
                                        className="bg-neutral-800 text-white rounded px-2 py-1 border border-white/20 focus:outline-none"
                                        value={editingLinkValue}
                                        onChange={(e) =>
                                            setEditingLinkValue(e.target.value)
                                        }
                                    />
                                    <button
                                        onClick={() => handleSaveLink(idx)}
                                        className="ml-1 px-2 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        onClick={() => setEditingLink(null)}
                                        className="ml-1 px-2 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline text-blue-400 text-base hover:text-blue-300 transition cursor-pointer"
                                    >
                                        {link}
                                    </a>
                                    <button
                                        onClick={() => handleEditLink(idx)}
                                        className="ml-1 px-2 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteLink(idx)}
                                        className="ml-1 px-2 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer"
                                    >
                                        Eliminar
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TasksLinksColumn;
