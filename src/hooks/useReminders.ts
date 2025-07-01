import { useState, useEffect } from "react";
import type { Reminder } from "../components/RemindersColumn";

export function useReminders(currentFolder: string) {
    const [remindersMap, setRemindersMap] = useState<{
        [folder: string]: Reminder[];
    }>({});
    const reminders = remindersMap[currentFolder] || [];

    function setRemindersForCurrent(r: Reminder[]) {
        setRemindersMap((prev) => ({ ...prev, [currentFolder]: r }));
        localStorage.setItem(`reminders-${currentFolder}`, JSON.stringify(r));
    }

    // Cargar recordatorios de localStorage al cambiar de carpeta
    useEffect(() => {
        const saved = localStorage.getItem(`reminders-${currentFolder}`);
        if (saved) {
            setRemindersMap((prev) => ({
                ...prev,
                [currentFolder]: JSON.parse(saved),
            }));
        }
    }, [currentFolder]);

    return {
        reminders,
        setReminders: setRemindersForCurrent,
    };
}
