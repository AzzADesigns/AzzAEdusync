import React from "react";

interface CalendarProps {
    month: number;
    setMonth: (month: number) => void;
    year: number;
    setYear: (year: number) => void;
    months: string[];
    days: number[];
    titles: { [key: number]: string };
    onTitleChange: (day: number, title: string) => void;
    onDayClick: (day: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({
    month,
    setMonth,
    year,
    setYear,
    months,
    days,
    titles,
    onTitleChange,
    onDayClick,
}) => {
    const handlePrevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };
    const handleNextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };
    return (
        <>
            <div className="">
                <div className="flex items-center gap-6 ">
                    <button
                        className="text-2xl px-4 py-2 rounded-full border border-white/30 bg-black/40 hover:bg-white hover:text-black transition cursor-pointer"
                        onClick={handlePrevMonth}
                        aria-label="Mes anterior"
                    >
                        &#8592;
                    </button>
                    <span className="text-2xl font-semibold flex-1 text-center select-none">
                        {months[month]} {year}
                    </span>
                    <button
                        className="text-2xl  px-4 py-2 rounded-full border border-white/30 bg-black/40 hover:bg-white hover:text-black transition cursor-pointer"
                        onClick={handleNextMonth}
                        aria-label="Mes siguiente"
                    >
                        &#8594;
                    </button>
                </div>
            </div>
            <div className="flex w-full p-5 justify-center xl:w-150 mt-5">
                <div className="grid grid-cols-7 gap-y-8 gap-x-8 sm:gap-x-12 md:gap-x-16 mb-8 w-full max-w-5xl xl:max-w-6xl">
                    {days.map((day) => (
                        <div key={day} className="flex flex-col items-center mb-2">
                            <button
                                className="h-9 w-9 sm:h-16 sm:w-16 md:h-19 md:w-19 text-lg sm:text-xl md:text-2xl font-bold rounded-2xl bg-neutral-950/95 border border-white/10 shadow-[0_12px_48px_0_rgba(0,0,0,1)] transition-all duration-200 ease-in-out text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer mb-2 hover:bg-white hover:text-[#18181b] active:bg-neutral-200 active:text-[#18181b]"
                                onClick={() => onDayClick(day)}
                            >
                                {day}
                            </button>
                            <div className="w-full flex flex-col items-center">
                                <input
                                    className="w-10 md:w-20 bg-transparent text-center text-xs sm:text-sm text-white border-b border-white/30 focus:outline-none focus:border-blue-400 transition placeholder:text-neutral-500 capitalize truncate-mobile"
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
