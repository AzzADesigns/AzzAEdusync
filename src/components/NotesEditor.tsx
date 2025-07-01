import React, { useRef, useEffect, useState } from "react";

interface NotesEditorProps {
    value: string;
    onChange: (html: string) => void;
    pdfs: { name: string; data: string }[];
    setPdfs: (pdfs: { name: string; data: string }[]) => void;
}

const highlightColors = [
    { name: "Azul", value: "#1e3a8a" },
    { name: "Rojo", value: "#b91c1c" },
    { name: "Verde", value: "#065f46" },
    { name: "Rosa", value: "#a21caf" },
    { name: "Amarillo", value: "#b45309" },
];

export default function NotesEditor({
    value,
    onChange,
    pdfs = [],
    setPdfs,
}: NotesEditorProps) {
    const notesRef = useRef<HTMLDivElement>(null);
    const [showHighlightColors, setShowHighlightColors] = useState(false);

    useEffect(() => {
        if (notesRef.current && notesRef.current.innerHTML !== value) {
            notesRef.current.innerHTML = value || "";
        }
    }, [value]);

    function format(command: string, val?: string) {
        if (!notesRef.current) return;
        notesRef.current.focus();
        document.execCommand(command, false, val);
    }

    function handleHighlightClick() {
        setShowHighlightColors((prev) => !prev);
    }

    function handleColorSelect(color: string) {
        format("hiliteColor", color);
        setShowHighlightColors(false);
    }

    function handlePrint() {
        if (!notesRef.current) return;
        // Agrega una clase especial para impresión
        notesRef.current.classList.add("print-notes");
        window.print();
        setTimeout(() => {
            notesRef.current &&
                notesRef.current.classList.remove("print-notes");
        }, 1000);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (!files) return;
        Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const data = ev.target?.result as string;
                setPdfs([...pdfs, { name: file.name, data }]);
            };
            reader.readAsDataURL(file);
        });
        e.target.value = "";
    }

    function handleRemovePdf(idx: number) {
        setPdfs(pdfs.filter((_, i) => i !== idx));
    }

    function openPdf(pdf: { name: string; data: string }) {
        // Extraer solo la parte base64 si es data URL
        const base64 = pdf.data.split(",")[1];
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-medium text-neutral-300">
                    apuntes
                </div>
                <button
                    onClick={handlePrint}
                    className="px-3 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer text-sm"
                >
                    Descargar PDF
                </button>
            </div>
            <div className="flex flex-col gap-2 bg-neutral-900 rounded-xl p-2 h-full">
                <div className="flex gap-2 mb-2 relative">
                    <button
                        onClick={() => format("bold")}
                        className="px-2 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer"
                    >
                        B
                    </button>
                    <button
                        onClick={() => format("italic")}
                        className="px-2 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer"
                    >
                        I
                    </button>
                    <button
                        onClick={() => format("underline")}
                        className="px-2 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer"
                    >
                        U
                    </button>
                    <button
                        onClick={handleHighlightClick}
                        className="px-2 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer"
                    >
                        Remarcar
                    </button>
                    {showHighlightColors && (
                        <div className="absolute top-10 left-0 flex gap-2 bg-neutral-900 border border-white/20 rounded-lg p-2 z-10 shadow-lg">
                            {highlightColors.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() =>
                                        handleColorSelect(color.value)
                                    }
                                    className="w-7 h-7 rounded-full border-2 border-white/40 cursor-pointer focus:outline-none"
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div
                    className="w-full h-full min-h-[400px] bg-neutral-900 text-white rounded-xl p-6 text-lg border-none shadow focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-neutral-500 resize overflow-auto notes-area"
                    contentEditable
                    ref={notesRef}
                    suppressContentEditableWarning
                    onInput={(e) =>
                        onChange((e.target as HTMLDivElement).innerHTML)
                    }
                    style={{
                        minHeight: "400px",
                        maxHeight: "100%",
                        resize: "vertical",
                    }}
                />
                <div className="mt-4">
                    <label className="block mb-2 text-sm text-neutral-400">
                        Subir PDF
                    </label>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="mb-2"
                    />
                    {pdfs.length > 0 && (
                        <ul className="space-y-2 mt-2">
                            {pdfs.map((pdf, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-center gap-2 text-sm text-neutral-200 bg-neutral-800 rounded px-2 py-1"
                                >
                                    <button
                                        onClick={() => openPdf(pdf)}
                                        className="underline hover:text-blue-400 bg-transparent border-none cursor-pointer p-0 m-0 text-left"
                                    >
                                        {pdf.name}
                                    </button>
                                    <button
                                        onClick={() => handleRemovePdf(idx)}
                                        className="ml-2 px-2 py-0.5 rounded bg-red-700 hover:bg-red-900 text-white text-xs"
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .print-notes, .print-notes * { visibility: visible !important; }
          .print-notes { position: absolute !important; left: 0; top: 0; width: 100vw; background: white; color: black; z-index: 9999; box-shadow: none; }
        }
      `}</style>
        </div>
    );
}
