import React from "react";

interface InputDialogProps {
    open: boolean;
    message: string;
    value: string;
    setValue: (v: string) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

const InputDialog: React.FC<InputDialogProps> = ({
    open,
    message,
    value,
    setValue,
    onConfirm,
    onCancel,
}) => {
    if (!open) return null;
    return (
        <div className="fixed bottom-8 right-8 z-50 transition-all duration-300 ease-in-out animate-fade-in">
            <div className="bg-neutral-950/95 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.7)] px-8 py-6 flex flex-col items-center min-w-[320px] border border-white/10 animate-dialog-in transition-all duration-300 ease-in-out">
                <div className="text-white text-base mb-4 text-center">
                    {message}
                </div>
                <input
                    className="w-full mb-6 px-4 py-2 rounded-lg bg-neutral-900 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-600 text-base transition-all duration-200"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                />
                <div className="flex gap-4 w-full justify-center">
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white font-semibold shadow transition cursor-pointer duration-200"
                    >
                        Aceptar
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold shadow transition cursor-pointer duration-200"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
            <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s cubic-bezier(.4,0,.2,1); }
        @keyframes dialog-in { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
        .animate-dialog-in { animation: dialog-in 0.3s cubic-bezier(.4,0,.2,1); }
      `}</style>
        </div>
    );
};

export default InputDialog;
