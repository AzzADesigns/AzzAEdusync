import React, { useState } from "react";

export interface Reminder {
    id: string;
    text: string;
    datetime?: string;
    subject: string;
}

interface RemindersColumnProps {
    reminders: Reminder[];
    setReminders: (r: Reminder[]) => void;
    materias: string[];
    className?: string;
}

const RemindersColumn: React.FC<RemindersColumnProps> = ({
    reminders,
    setReminders,
    materias,
    className,
}) => {
    const [inputOpen, setInputOpen] = useState(false);
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [text, setText] = useState("");
    const [datetime, setDatetime] = useState("");
    const [subject, setSubject] = useState("");
    const [newSubject, setNewSubject] = useState("");
    const [showNewSubject, setShowNewSubject] = useState(false);

    function handleAdd() {
        setText("");
        setDatetime("");
        setSubject(materias[0] || "");
        setNewSubject("");
        setShowNewSubject(false);
        setEditIdx(null);
        setInputOpen(true);
    }
    function handleEdit(idx: number) {
        setText(reminders[idx].text);
        setDatetime(reminders[idx].datetime || "");
        setSubject(reminders[idx].subject || materias[0] || "");
        setNewSubject("");
        setShowNewSubject(false);
        setEditIdx(idx);
        setInputOpen(true);
    }
    function handleDelete(idx: number) {
        setReminders(reminders.filter((_, i) => i !== idx));
    }
    function handleSave() {
        let finalSubject = subject;
        if (showNewSubject && newSubject.trim()) {
            finalSubject = newSubject.trim();
            if (!materias.includes(finalSubject)) {
                // onCreateMateria(finalSubject);
            }
        }
        if (!text.trim() || !finalSubject) return;
        if (editIdx !== null) {
            const updated = reminders.slice();
            updated[editIdx] = {
                ...updated[editIdx],
                text,
                datetime,
                subject: finalSubject,
            };
            setReminders(updated);
        } else {
            setReminders([
                ...reminders,
                {
                    id: Date.now().toString(),
                    text,
                    datetime,
                    subject: finalSubject,
                },
            ]);
        }
        setInputOpen(false);
        setText("");
        setDatetime("");
        setSubject("");
        setNewSubject("");
        setShowNewSubject(false);
        setEditIdx(null);
    }
    function handleCancel() {
        setInputOpen(false);
        setText("");
        setDatetime("");
        setSubject("");
        setNewSubject("");
        setShowNewSubject(false);
        setEditIdx(null);
    }

    return (
        <div
            className={`bg-neutral-950/95 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.7)] px-6 py-8 min-w-[300px] border border-white/10 z-30 ${className || ''} transition-all duration-300 ease-in-out animate-fade-in` +
              ' ' +
              (inputOpen ? 'relative' : 'md:absolute')
            }
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold text-lg">
                    Recordatorios
                </span>
                <button
                    onClick={handleAdd}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white text-2xl cursor-pointer"
                    title="Agregar recordatorio"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 4v12m6-6H4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </div>
            <ul className="flex flex-col gap-2">
                {reminders.length === 0 && (
                    <li className="text-neutral-400 text-sm">
                        Sin recordatorios
                    </li>
                )}
                {reminders.map((r, idx) => (
                    <li
                        key={r.id}
                        className="flex flex-col gap-1 bg-neutral-900 rounded-lg px-3 py-2 text-white text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <span className="flex-1 truncate">{r.text}</span>
                            <span className="text-xs text-blue-300 font-semibold ml-2">
                                {r.subject}
                            </span>
                            <button
                                onClick={() => handleEdit(idx)}
                                className="min-w-[28px] min-h-[28px] flex items-center justify-center rounded hover:bg-white/10 text-white cursor-pointer"
                                title="Editar"
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.8 2.8c-.4-.4-1-.4-1.4 0l-7 7c-.1.1-.2.2-.2.4l-.5 2.5c-.1.4.3.8.7.7l2.5-.5c.1 0 .3-.1.4-.2l7-7c.4-.4.4-1 0-1.4l-1-1zm-7.7 8.9l.3-1.3 1 1-1.3.3zm2-1.1l-1-1 5.5-5.5 1 1-5.5 5.5z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleDelete(idx)}
                                className="min-w-[28px] min-h-[28px] flex items-center justify-center rounded hover:bg-white/10 text-white cursor-pointer"
                                title="Eliminar"
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 1 1-1.06-1.06L6.94 8 4.22 5.28a.75.75 0 0 1 0-1.06z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                        </div>
                        {r.datetime && (
                            <div className="text-xs text-neutral-400 ml-2">
                                Límite: {new Date(r.datetime).toLocaleString()}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {inputOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none">
                    <div className="bg-neutral-950/95 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.7)] px-8 py-6 m-8 flex flex-col items-center min-w-[340px] border border-white/10 animate-fade-in pointer-events-auto">
                        <div className="text-white text-base mb-4 text-center">
                            {editIdx !== null
                                ? "Editar recordatorio"
                                : "Nuevo recordatorio"}
                        </div>
                        <label className="block text-sm text-neutral-400 mb-1">
                            Nombre de la tarea
                        </label>
                        <input
                            className="w-full mb-3 px-4 py-2 rounded-lg bg-neutral-900 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Texto del recordatorio"
                            autoFocus
                        />
                        <label className="block text-sm text-neutral-400 mb-1">
                            Fecha de caducidad
                        </label>
                        <input
                            className="w-full mb-3 px-4 py-2 rounded-lg bg-neutral-900 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
                            value={datetime}
                            onChange={(e) => setDatetime(e.target.value)}
                            type="datetime-local"
                            placeholder="Fecha y hora (opcional)"
                        />
                        <label className="block text-sm text-neutral-400 mb-1">
                            Materia
                        </label>
                        <div className="w-full mb-6">
                            <select
                                className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                disabled={materias.length === 0}
                            >
                                {materias.length === 0 && (
                                    <option value="" disabled>
                                        Sin materias disponibles
                                    </option>
                                )}
                                {materias.map((m) => (
                                    <option key={m} value={m}>
                                        {m}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-4 w-full justify-center">
                            <button
                                onClick={handleSave}
                                className="px-5 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white font-semibold shadow transition cursor-pointer"
                            >
                                Aceptar
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold shadow transition cursor-pointer"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.25s cubic-bezier(.4,0,.2,1); }
      `}</style>
        </div>
    );
};

export default RemindersColumn;
