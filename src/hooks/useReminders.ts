import { useState, useEffect } from "react";
import type { Reminder } from "../components/RemindersColumn";

export function useReminders(folderKey?: string) {
    const storageKey = folderKey ? `reminders-${folderKey}` : "reminders-General";
    const [reminders, setReminders] = useState<Reminder[]>([]);

    function setRemindersForCurrent(r: Reminder[]) {
        localStorage.setItem(storageKey, JSON.stringify(r));
    }

    // Cargar recordatorios de localStorage al cambiar de carpeta
    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            const arr = JSON.parse(stored);
            if (arr.length === 0 && (!folderKey || folderKey === 'General')) {
                setReminders([{
                    id: 'default-warning',
                    text: 'Recordar que la web almacena los datos en el localStorage, para no perder el progreso, no se debe eliminar la cache del navegador',
                    subject: 'General',
                }]);
            } else {
                setReminders(arr);
            }
        } else if (!folderKey || folderKey === 'General') {
            setReminders([{
                id: 'default-warning',
                text: 'Recordar que la web almacena los datos en el localStorage, para no perder el progreso, no se debe eliminar la cache del navegador',
                subject: 'General',
            }]);
        } else {
            setReminders([]);
        }
    }, [storageKey, folderKey]);

    return {
        reminders,
        setReminders: setRemindersForCurrent,
    };
}
