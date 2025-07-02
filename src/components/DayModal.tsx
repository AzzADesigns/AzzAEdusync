import React from "react";
import NotesEditor from "./NotesEditor";
import TasksLinksColumn from "./TasksLinksColumn";

interface DayModalProps {
    open: boolean;
    onClose: () => void;
    value: string;
    onChange: (html: string) => void;
    pdfs: { name: string; data: string }[];
    setPdfs: (pdfs: { name: string; data: string }[]) => void;
    selectedDateLabel: string;
    tasks: string[];
    setTasks: (tasks: string[]) => void;
    taskInput: string;
    setTaskInput: (input: string) => void;
    links: string[];
    setLinks: (links: string[]) => void;
    linkInput: string;
    setLinkInput: (input: string) => void;
}

const DayModal: React.FC<DayModalProps> = ({
    open,
    onClose,
    value,
    onChange,
    pdfs,
    setPdfs,
    selectedDateLabel,
    tasks,
    setTasks,
    taskInput,
    setTaskInput,
    links,
    setLinks,
    linkInput,
    setLinkInput,
}) => {
    React.useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg transition-all duration-300 ease-in-out opacity-100 animate-fade-in">
            <div className="w-[98vw] h-[98vh] md:w-[90vw] md:h-[90vh] flex flex-col items-center justify-center relative transition-all duration-300 ease-in-out scale-100 animate-modal-in">
                <button
                    className="absolute top-6 right-6 text-neutral-200 hover:text-black text-5xl font-extrabold focus:outline-none bg-black/30 rounded-full w-16 h-16 flex items-center justify-center shadow-lg border border-white/10 transition hover:bg-white cursor-pointer"
                    onClick={onClose}
                    aria-label="Cerrar"
                    style={{ lineHeight: 1 }}
                >
                    ×
                </button>
                <div className="w-full max-w-[1800px] flex flex-col md:flex-row gap-4 md:gap-8 h-[60vh] md:h-[65vh] overflow-auto">
                    <div className="flex flex-col h-full order-2 md:order-1 w-full md:w-1/2">
                        <div className="text-lg font-medium mb-4 text-neutral-300">
                            Notas
                        </div>
                        <div className="flex flex-col gap-2 bg-neutral-900 rounded-xl p-2 h-full">
                            <NotesEditor
                                value={value}
                                onChange={onChange}
                                pdfs={pdfs}
                                setPdfs={setPdfs}
                                selectedDateLabel={selectedDateLabel}
                            />
                        </div>
                    </div>
                    <div className="order-1 md:order-2 w-full md:w-1/2">
                        <TasksLinksColumn
                            tasks={tasks}
                            setTasks={setTasks}
                            taskInput={taskInput}
                            setTaskInput={setTaskInput}
                            links={links}
                            setLinks={setLinks}
                            linkInput={linkInput}
                            setLinkInput={setLinkInput}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DayModal;
