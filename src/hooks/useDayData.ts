import { useState, useEffect } from "react";

function getLocalData(day: number, month: number, folderKey?: string) {
    if (typeof window === "undefined")
        return { notes: "", tasks: [], links: [], title: "", pdfs: [] };
    const key = folderKey
        ? `${folderKey}-month-${month}-day-${day}`
        : `month-${month}-day-${day}`;
    const data = localStorage.getItem(key);
    return data
        ? JSON.parse(data)
        : { notes: "", tasks: [], links: [], title: "", pdfs: [] };
}

function setLocalData(
    day: number,
    month: number,
    data: {
        notes: string;
        tasks: string[];
        links: string[];
        title: string;
        pdfs: { name: string; data: string }[];
    },
    folderKey?: string,
) {
    if (typeof window === "undefined") return;
    const key = folderKey
        ? `${folderKey}-month-${month}-day-${day}`
        : `month-${month}-day-${day}`;
    localStorage.setItem(key, JSON.stringify(data));
}

export function useDayData(
    selectedDay: number | null,
    month: number,
    folderKey?: string,
) {
    const [notes, setNotes] = useState("");
    const [tasks, setTasks] = useState<string[]>([]);
    const [taskInput, setTaskInput] = useState("");
    const [links, setLinks] = useState<string[]>([]);
    const [linkInput, setLinkInput] = useState("");
    const [title, setTitle] = useState("");
    const [pdfs, setPdfs] = useState<{ name: string; data: string }[]>([]);

    useEffect(() => {
        if (selectedDay !== null) {
            const data = getLocalData(selectedDay, month, folderKey);
            setNotes(data.notes || "");
            setTasks(data.tasks);
            setLinks(data.links);
            setTitle(data.title || "");
            setPdfs(data.pdfs || []);
        }
    }, [selectedDay, month, folderKey]);

    useEffect(() => {
        if (selectedDay !== null) {
            setLocalData(
                selectedDay,
                month,
                { notes, tasks, links, title, pdfs },
                folderKey,
            );
        }
    }, [notes, tasks, links, title, pdfs, selectedDay, month, folderKey]);

    return {
        notes,
        setNotes,
        tasks,
        setTasks,
        taskInput,
        setTaskInput,
        links,
        setLinks,
        linkInput,
        setLinkInput,
        title,
        setTitle,
        pdfs,
        setPdfs,
    };
}
