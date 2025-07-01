import { useState, useEffect } from "react";

export function useFolders() {
    const [folders, setFolders] = useState<string[]>([]);
    const [currentFolder, setCurrentFolder] = useState("General");

    // Cargar carpetas desde localStorage al inicio
    useEffect(() => {
        const saved = localStorage.getItem("calendar-folders");
        if (saved) {
            setFolders(JSON.parse(saved));
            setCurrentFolder(JSON.parse(saved)[0] || "General");
        } else {
            setFolders(["General"]);
            setCurrentFolder("General");
            localStorage.setItem(
                "calendar-folders",
                JSON.stringify(["General"]),
            );
        }
    }, []);

    // Guardar carpetas en localStorage cuando cambian
    useEffect(() => {
        localStorage.setItem("calendar-folders", JSON.stringify(folders));
        if (!folders.includes(currentFolder)) {
            setCurrentFolder(folders[0] || "General");
        }
    }, [folders, currentFolder]);

    function addFolder(name: string) {
        if (!name || folders.includes(name)) return;
        setFolders([...folders, name]);
        setCurrentFolder(name);
    }

    function renameFolder(idx: number, newName: string) {
        const oldName = folders[idx];
        if (!newName || folders.includes(newName)) return;
        const newFolders = folders.map((f, i) => (i === idx ? newName : f));
        setFolders(newFolders);
        // Renombrar datos en localStorage
        for (let m = 0; m < 12; m++) {
            for (let d = 1; d <= 31; d++) {
                const oldKey = `${oldName}-month-${m}-day-${d}`;
                const newKey = `${newName}-month-${m}-day-${d}`;
                const data = localStorage.getItem(oldKey);
                if (data) {
                    localStorage.setItem(newKey, data);
                    localStorage.removeItem(oldKey);
                }
            }
        }
        if (currentFolder === oldName) setCurrentFolder(newName);
    }

    function deleteFolder(idx: number) {
        if (folders.length === 1) return;
        const name = folders[idx];
        // Borrar datos de la carpeta
        for (let m = 0; m < 12; m++) {
            for (let d = 1; d <= 31; d++) {
                localStorage.removeItem(`${name}-month-${m}-day-${d}`);
            }
        }
        const newFolders = folders.filter((_, i) => i !== idx);
        setFolders(newFolders);
        if (currentFolder === name)
            setCurrentFolder(newFolders[0] || "General");
    }

    return {
        folders,
        currentFolder,
        setCurrentFolder,
        addFolder,
        renameFolder,
        deleteFolder,
    };
}
