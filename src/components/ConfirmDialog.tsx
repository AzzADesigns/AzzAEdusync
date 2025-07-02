import React from "react";

interface ConfirmDialogProps {
    open: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    message,
    onConfirm,
    onCancel,
}) => {
    if (!open) return null;
    return (
        <div className="fixed bottom-8 right-8 z-50 transition-all duration-300 ease-in-out animate-fade-in">
            <div className="bg-neutral-950/95 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.7)] px-8 py-6 flex flex-col items-center min-w-[280px] border border-white/10 animate-dialog-in transition-all duration-300 ease-in-out">
                <div className="text-white text-base mb-6 text-center">
                    {message}
                </div>
                <div className="flex gap-4 w-full justify-center">
                    <button
                        onClick={onConfirm}
                        className="border border-white bg-black text-white rounded-xl px-6 py-3 text-base font-semibold shadow transition hover:bg-white hover:text-black focus:outline-none cursor-pointer"
                    >
                        Aceptar
                    </button>
                    <button
                        onClick={onCancel}
                        className="border border-white bg-black text-white rounded-xl px-6 py-3 text-base font-semibold shadow transition hover:bg-white hover:text-black focus:outline-none cursor-pointer"
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

export default ConfirmDialog;
