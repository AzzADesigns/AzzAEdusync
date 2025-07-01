import React from "react";

interface DayModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const DayModal: React.FC<DayModalProps> = ({ open, onClose, children }) => {
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
                <div className="w-full h-full flex flex-col items-center justify-center">
                    {children}
                </div>
            </div>
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s cubic-bezier(.4,0,.2,1); }
                @keyframes modal-in { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: scale(1);} }
                .animate-modal-in { animation: modal-in 0.3s cubic-bezier(.4,0,.2,1); }
            `}</style>
        </div>
    );
};

export default DayModal;
