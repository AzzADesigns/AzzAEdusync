import React from "react";

interface FolderTabsProps {
    folders: string[];
    currentFolder: string;
    setCurrentFolder: (folder: string) => void;
    renameFolder: (idx: number) => void;
    deleteFolder: (idx: number) => void;
    addFolder: () => void;
    style?: React.CSSProperties;
    className?: string;
}

const FolderTabs: React.FC<FolderTabsProps> = ({
    folders,
    currentFolder,
    setCurrentFolder,
    renameFolder,
    deleteFolder,
    addFolder,
    style,
    className = "",
}) => (
    <div
        className={`flex flex-col gap-4 z-30 border border-white/10 bg-neutral-950/95 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.7)] px-6 py-8 ${className} transition-all duration-300 ease-in-out animate-fade-in`}
        style={{ minWidth: "170px", ...style, position: "absolute" }}
    >
        {folders.map((folder, idx) => (
            <div
                key={folder}
                className={`flex items-center gap-2 group cursor-pointer transition-all ${currentFolder === folder ? "font-bold text-white" : "text-neutral-400 hover:text-white"}`}
                onClick={() => setCurrentFolder(folder)}
            >
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${currentFolder === folder ? "bg-neutral-800 border-white/60" : "bg-neutral-900 border-white/20 group-hover:border-white/40"}`}
                >
                    {folder[0]?.toUpperCase() || "?"}
                </div>
                <span className="truncate max-w-[80px]">{folder}</span>
                {folder !== "General" && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                renameFolder(idx);
                            }}
                            className="ml-1 text-xs min-w-[28px] min-h-[28px] flex items-center justify-center rounded hover:bg-white/10 text-white cursor-pointer"
                            title="Renombrar"
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
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteFolder(idx);
                            }}
                            className="ml-1 text-xs min-w-[28px] min-h-[28px] flex items-center justify-center rounded hover:bg-white/10 text-white cursor-pointer"
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
                    </>
                )}
            </div>
        ))}
        <button
            onClick={addFolder}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white text-2xl mt-2 cursor-pointer"
            title="Agregar carpeta"
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
);

export default FolderTabs;
