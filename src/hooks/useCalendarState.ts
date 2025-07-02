import { useState, useEffect, useMemo } from "react";

const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getLocalData(day: number, month: number, folderKey?: string) {
    if (typeof window === "undefined")
        return { notes: "", tasks: [], links: [], title: "" };
    const key = folderKey
        ? `${folderKey}-month-${month}-day-${day}`
        : `month-${month}-day-${day}`;
    const data = localStorage.getItem(key);
    return data
        ? JSON.parse(data)
        : { notes: "", tasks: [], links: [], title: "" };
}

function setLocalData(
    day: number,
    month: number,
    data: { notes: string; tasks: string[]; links: string[]; title: string },
    folderKey?: string,
) {
    if (typeof window === "undefined") return;
    const key = folderKey
        ? `${folderKey}-month-${month}-day-${day}`
        : `month-${month}-day-${day}`;
    localStorage.setItem(key, JSON.stringify(data));
}

export function useCalendarState(folderKey?: string) {
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [titles, setTitles] = useState<{ [key: number]: string }>({});

    const days = useMemo(() => 
        Array.from({ length: daysInMonth[month] }, (_, i) => i + 1), 
        [month]
    );

    useEffect(() => {
        // Cargar títulos de todos los días del mes actual
        const newTitles: { [key: number]: string } = {};
        days.forEach((day) => {
            const data = getLocalData(day, month, folderKey);
            if (data.title) newTitles[day] = data.title;
        });
        setTitles(newTitles);
    }, [month, folderKey, days]);

    function onTitleChange(day: number, title: string) {
        setTitles((prev) => ({ ...prev, [day]: title }));
        setLocalData(
            day,
            month,
            { ...getLocalData(day, month, folderKey), title },
            folderKey,
        );
    }

    return {
        month,
        setMonth,
        days,
        selectedDay,
        setSelectedDay,
        titles,
        setTitles,
        months,
        daysInMonth,
        onTitleChange,
    };
}
