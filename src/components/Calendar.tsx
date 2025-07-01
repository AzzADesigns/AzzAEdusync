import React from "react";

interface CalendarProps {
    month: number;
    setMonth: (month: number) => void;
    months: string[];
    days: number[];
    titles: { [key: number]: string };
    onTitleChange: (day: number, title: string) => void;
    onDayClick: (day: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({
    month,
    setMonth,
    months,
    days,
    titles,
    onTitleChange,
    onDayClick,
}) => {
    return (
        <>
            <div className="w-full flex justify-center mb-4">
                <div className="flex items-center gap-6 w-[90vw] max-w-4xl">
                    <button
                        className="text-2xl px-4 py-2 rounded-full border border-white/30 bg-black/40 hover:bg-white hover:text-black transition cursor-pointer"
                        onClick={() => setMonth(month === 0 ? 11 : month - 1)}
                        aria-label="Mes anterior"
                    >
                        &#8592;
                    </button>
                    <span className="text-2xl font-semibold flex-1 text-center select-none">
                        {months[month]}
                    </span>
                    <button
                        className="text-2xl px-4 py-2 rounded-full border border-white/30 bg-black/40 hover:bg-white hover:text-black transition cursor-pointer"
                        onClick={() => setMonth(month === 11 ? 0 : month + 1)}
                        aria-label="Mes siguiente"
                    >
                        &#8594;
                    </button>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-4 md:gap-6 mb-12 w-[95vw] max-w-4xl">
                    {days.map((day) => (
                        <div key={day} className="flex flex-col items-center">
                            <button
                                className="h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 text-xl sm:text-2xl md:text-3xl font-bold rounded-2xl bg-neutral-900 hover:bg-neutral-800 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer mb-2"
                                onClick={() => onDayClick(day)}
                            >
                                {day}
                            </button>
                            <div className="w-full flex flex-col items-center">
                                <input
                                    className="w-full bg-transparent text-center text-xs sm:text-base text-white border-b border-white/30 focus:outline-none focus:border-blue-400 transition placeholder:text-neutral-500"
                                    value={titles[day] || ""}
                                    onChange={(e) =>
                                        onTitleChange(day, e.target.value)
                                    }
                                    placeholder="Título..."
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Calendar;
