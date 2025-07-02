import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from 'react-to-print';

interface NotesEditorProps {
    value: string;
    onChange: (html: string) => void;
    pdfs: { name: string; data: string }[];
    setPdfs: (pdfs: { name: string; data: string }[]) => void;
    selectedDateLabel: string;
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
    selectedDateLabel,
}: NotesEditorProps) {
    const notesRef = useRef<HTMLDivElement>(null);
    const [showHighlightColors, setShowHighlightColors] = useState(false);
    const [activeHighlightColor, setActiveHighlightColor] = useState<string | null>(null);

    const handlePrint = useReactToPrint({
        contentRef: notesRef,
        pageStyle: `
          @page { size: A4; margin: 20mm; }
          body { -webkit-print-color-adjust: exact; }
          .notes-area {
            background: white !important;
            color: black !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 0 !important;
            border: none !important;
            max-height: none !important;
            overflow: visible !important;
          }
          .notes-area [style*="background-color"] { color: white !important; }
        `,
    });

    useEffect(() => {
        if (notesRef.current && notesRef.current.innerHTML !== value) {
            notesRef.current.innerHTML = value || "";
        }
    }, [value]);

    useEffect(() => {
        if (!notesRef.current) return;
        const handleFocus = () => {
            if (activeHighlightColor) {
                format("hiliteColor", activeHighlightColor);
            }
        };
        const el = notesRef.current;
        el.addEventListener("focus", handleFocus);
        return () => {
            el.removeEventListener("focus", handleFocus);
        };
    }, [activeHighlightColor]);

    function format(command: string, val?: string) {
        if (!notesRef.current) return;
        notesRef.current.focus();
        document.execCommand(command, false, val);
    }

    function handleHighlightClick() {
        setShowHighlightColors((prev) => !prev);
    }

    function handleColorSelect(color: string) {
        const realColor = color === 'transparent' ? '#18181b' : color;
        setActiveHighlightColor(realColor);
        setShowHighlightColors(false);
        format("hiliteColor", realColor);
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

    const handleClearStyles = () => {
        format("removeFormat");
        setActiveHighlightColor('#18181b');
        format("hiliteColor", "#18181b");
        format("foreColor", "white");
        ["bold", "italic", "underline"].forEach(cmd => {
            if (document.queryCommandState(cmd)) {
                format(cmd);
            }
        });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-medium text-neutral-300">
                    {selectedDateLabel}
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
                        <span style={{ textDecoration: 'underline' }}>Sub</span>
                    </button>
                    <button
                        onClick={handleHighlightClick}
                        className="px-2 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer flex items-center gap-2"
                    >
                        {activeHighlightColor === '#18181b' ? (
                            <span className="w-4 h-4 flex items-center justify-center rounded-full border border-white/40 bg-neutral-800 text-white text-xs font-bold">×</span>
                        ) : activeHighlightColor ? (
                            <span className="w-4 h-4 rounded-full border border-white/40" style={{ backgroundColor: activeHighlightColor }} />
                        ) : (
                            <span className="w-4 h-4 rounded-full border border-white/40 bg-neutral-700" />
                        )}
                        Remarcar
                    </button>
                    {showHighlightColors && (
                        <div className="absolute top-10 left-0 flex gap-2 bg-neutral-900 border border-white/20 rounded-lg p-2 z-10 shadow-lg">
                            <button
                                onClick={() => handleColorSelect('transparent')}
                                className="w-7 h-7 rounded-full border-2 border-white/40 cursor-pointer focus:outline-none flex items-center justify-center bg-neutral-800 hover:bg-neutral-700"
                                title="Quitar resaltado"
                            >
                                <span className="text-white text-lg font-bold">×</span>
                            </button>
                            {highlightColors.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => handleColorSelect(color.value)}
                                    className="w-7 h-7 rounded-full border-2 border-white/40 cursor-pointer focus:outline-none"
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    )}
                    <button
                        onClick={handleClearStyles}
                        className="px-2 py-1 rounded border border-white/30 text-white hover:bg-white hover:text-black transition cursor-pointer"
                    >
                        Limpiar estilos
                    </button>
                </div>
                <div
                    className="w-full bg-neutral-900 text-white rounded-xl p-6 text-lg border border-white notes-area xl:max-h-[245px] 2xl:max-h-[340px] overflow-y-auto scrollbar-thin relative"
                    contentEditable
                    ref={notesRef}
                    suppressContentEditableWarning
                    onInput={(e) => {
                        if (activeHighlightColor) {
                            format("hiliteColor", activeHighlightColor);
                        }
                        onChange((e.target as HTMLDivElement).innerHTML);
                    }}
                    style={{
                        resize: "vertical",
                        minHeight: "100px"
                    }}
                    data-placeholder="comience a construir su aprendizaje..."
                />
                <div className="mt-4">
                    <label className="block mb-2 text-sm text-neutral-400">
                        Subir PDF
                    </label>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="mb-2 capitalize"
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
                  .notes-area {
                    max-height: none !important;
                    overflow: visible !important;
                  }
                }
                .notes-area::-webkit-scrollbar {
                  width: 6px;
                  background: transparent;
                }
                .notes-area::-webkit-scrollbar-thumb {
                  background: #444;
                  border-radius: 8px;
                }
                .notes-area::-webkit-scrollbar-track {
                  background: transparent;
                }
                .notes-area {
                  scrollbar-width: thin;
                  scrollbar-color: #444 transparent;
                  border: 1.5px solid #fff;
                  position: relative;
                }
                .notes-area:empty:before {
                  content: attr(data-placeholder);
                  color: #aaa;
                  position: absolute;
                  left: 1.5rem;
                  top: 1.2rem;
                  pointer-events: none;
                  font-size: 1rem;
                  font-style: italic;
                  opacity: 0.7;
                }
                .notes-area b,
                .notes-area strong,
                .notes-area [style*="font-weight: bold"],
                .notes-area [style*="font-weight: 700"] {
                  font-weight: 900 !important;
                }
            `}</style>
        </div>
    );
}
