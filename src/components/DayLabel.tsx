import React from "react";

interface DayLabelProps {
    day: number | null;
    month: number;
    year?: number;
}

const weekDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
];

const DayLabel: React.FC<DayLabelProps> = ({ day, month, year }) => {
    if (!day) return null;
    const now = new Date();
    const y = year || now.getFullYear();
    // JS months are 0-indexed
    const date = new Date(y, month, day);
    const weekDay = weekDays[date.getDay()];
    return (
        <span className="text-neutral-200">
            {weekDay} {day}
        </span>
    );
};

export default DayLabel;
