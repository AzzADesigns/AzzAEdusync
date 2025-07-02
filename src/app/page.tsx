"use client";
import Calendar from "../components/Calendar";
import DayModal from "../components/DayModal";
import { useCalendarState } from "../hooks/useCalendarState";
import { useDayData } from "../hooks/useDayData";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";
import FolderTabs from "../components/FolderTabs";
import ConfirmDialog from "../components/ConfirmDialog";
import InputDialog from "../components/InputDialog";
import RemindersColumn from "../components/RemindersColumn";
import { useFolders } from "../hooks/useFolders";
import { useReminders } from "../hooks/useReminders";

export default function Home() {
    // Carpetas y carpeta actual
    const {
        folders,
        currentFolder,
        setCurrentFolder,
        addFolder,
        renameFolder,
        deleteFolder,
    } = useFolders();

    // Recordatorios por carpeta
    const { reminders, setReminders } = useReminders(currentFolder);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState<number | null>(null);
    const [inputOpen, setInputOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [inputMode, setInputMode] = useState<"create" | "rename" | null>(
        null,
    );
    const [renameIdx, setRenameIdx] = useState<number | null>(null);

    // Cambiar la clave de almacenamiento de datos según la carpeta
    const folderKey = currentFolder;
    const {
        month,
        setMonth,
        days,
        selectedDay,
        setSelectedDay,
        titles,
        onTitleChange,
    } = useCalendarState(folderKey);
    const {
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
        pdfs,
        setPdfs,
    } = useDayData(selectedDay, month, folderKey);

    // Para sincronizar materia creada desde recordatorios
    const [pendingMateria, setPendingMateria] = useState<string | null>(null);

    // Crear nueva carpeta (abre el diálogo)
    function handleAddFolder() {
        setInputMode("create");
        setInputValue("");
        setInputOpen(true);
    }
    function confirmAddFolder() {
        addFolder(inputValue.trim());
        setInputOpen(false);
        setInputValue("");
        setInputMode(null);
    }
    function cancelInput() {
        setInputOpen(false);
        setInputValue("");
        setInputMode(null);
        setRenameIdx(null);
    }
    // Renombrar carpeta (abre el diálogo)
    function handleRenameFolder(idx: number) {
        setInputMode("rename");
        setRenameIdx(idx);
        setInputValue(folders[idx]);
        setInputOpen(true);
    }
    function confirmRenameFolder() {
        if (renameIdx === null) return;
        renameFolder(renameIdx, inputValue.trim());
        setInputOpen(false);
        setInputValue("");
        setInputMode(null);
        setRenameIdx(null);
    }
    // Eliminar carpeta (abre el diálogo de confirmación)
    function handleDeleteFolder(idx: number) {
        setFolderToDelete(idx);
        setConfirmOpen(true);
    }
    function confirmDelete() {
        if (folderToDelete === null) return;
        deleteFolder(folderToDelete);
        setConfirmOpen(false);
        setFolderToDelete(null);
    }

    // Si hay una materia pendiente, seleccionarla en el selector de recordatorios
    useEffect(() => {
        if (pendingMateria && folders.includes(pendingMateria)) {
            setPendingMateria(null);
        }
    }, [folders, pendingMateria]);

    // Utilidad para mostrar la fecha seleccionada en formato bonito
    function getSelectedDateLabel() {
        if (!selectedDay) return "";
        const now = new Date();
        const y = now.getFullYear();
        const date = new Date(y, month, selectedDay);
        const weekDays = [
            "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
        ];
        const weekDay = weekDays[date.getDay()];
        return `${weekDay} ${selectedDay}`;
    }

    return (
        <div className="flex flex-col min-h-screen bg-neutral-950">
            <main className="flex-1 flex flex-col items-center justify-start p-4 pt-2 text-white w-full">
                <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-center pt-6">
                    Calendario
                </h1>
                <div className="max-w-[1900px] flex flex-col xl:flex-row xl:justify-between  gap-8 xl:gap-10 2xl:gap-30 mt-4 ">
                    {/* Columna izquierda - FolderTabs */}
                    <div className="  w-full h-full  flex justify-center lg:justify-end mb-8 xl:mb-0">
                        <FolderTabs
                            folders={folders}
                            currentFolder={currentFolder}
                            setCurrentFolder={setCurrentFolder}
                            renameFolder={handleRenameFolder}
                            deleteFolder={handleDeleteFolder}
                            addFolder={handleAddFolder}
                            className="w-full h-full xl:w-75 2xl:w-90"
                        />
                    </div>
                    
                    {/* Columna central - Calendario */}
                    <div className="">
                        <Calendar
                            month={month}
                            setMonth={setMonth}
                            months={useCalendarState().months}
                            days={days}
                            titles={titles}
                            onTitleChange={onTitleChange}
                            onDayClick={setSelectedDay}
                        />
                    </div>
                    
                    {/* Columna derecha - RemindersColumn */}
                    <div className=" w-full h-full flex justify-center xl:block mt-8 xl:mt-0">
                        <RemindersColumn
                            reminders={reminders}
                            setReminders={setReminders}
                            materias={folders}
                            className="w-full h-full xl:w-70 2xl:w-90"
                        />
                    </div>
                </div>
                <DayModal
                    open={selectedDay !== null}
                    onClose={() => setSelectedDay(null)}
                    value={notes}
                    onChange={setNotes}
                    pdfs={pdfs}
                    setPdfs={setPdfs}
                    selectedDateLabel={getSelectedDateLabel()}
                    tasks={tasks}
                    setTasks={setTasks}
                    taskInput={taskInput}
                    setTaskInput={setTaskInput}
                    links={links}
                    setLinks={setLinks}
                    linkInput={linkInput}
                    setLinkInput={setLinkInput}
                />
                <ConfirmDialog
                    open={confirmOpen}
                    message="¿Eliminar esta carpeta y todos sus datos?"
                    onConfirm={confirmDelete}
                    onCancel={() => setConfirmOpen(false)}
                />
                <InputDialog
                    open={inputOpen}
                    message={
                        inputMode === "create"
                            ? "Nombre de la nueva carpeta / materia:"
                            : "Nuevo nombre para la carpeta:"
                    }
                    value={inputValue}
                    setValue={setInputValue}
                    onConfirm={
                        inputMode === "create"
                            ? confirmAddFolder
                            : confirmRenameFolder
                    }
                    onCancel={cancelInput}
                />
            </main>
            <Footer />
        </div>
    );
}
