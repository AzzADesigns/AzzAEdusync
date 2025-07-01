"use client";
import Calendar from "../components/Calendar";
import DayModal from "../components/DayModal";
import NotesEditor from "../components/NotesEditor";
import TasksLinksColumn from "../components/TasksLinksColumn";
import DayLabel from "../components/DayLabel";
import DayTitleInput from "../components/DayTitleInput";
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
        title,
        setTitle,
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

    return (
        <div className="h-screen flex flex-col justify-between bg-neutral-950 overflow-hidden">
            <main className="flex-1 flex flex-col items-center justify-start p-4 pt-2 text-white overflow-hidden w-full">
                <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-center pt-6">
                    Calendario
                </h1>
                <div className="w-full flex flex-col md:flex-row items-center justify-center overflow-visible mt-4 gap-4">
                    {/* Wrapper relative SOLO para el calendario y la columna de carpetas */}
                    <div className="relative flex flex-col md:flex-row items-center justify-center w-full md:w-fit">
                        <FolderTabs
                            folders={folders}
                            currentFolder={currentFolder}
                            setCurrentFolder={setCurrentFolder}
                            renameFolder={handleRenameFolder}
                            deleteFolder={handleDeleteFolder}
                            addFolder={handleAddFolder}
                            className="w-full md:w-auto static md:absolute md:top-15 md:left-[-230px] lg:top-26 mb-4 md:mb-0"
                            style={undefined}
                        />
                        {/* Calendario principal */}
                        <div className="flex flex-col  mt-10 items-center justify-center overflow-hidden w-full md:w-auto">
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
                        <RemindersColumn
                            reminders={reminders}
                            setReminders={setReminders}
                            materias={folders}
                            className="w-full md:w-auto static md:absolute md:top-15 md:right-[-320px] xl:top-26 mt-4 md:mt-0"
                        />
                    </div>
                </div>
                <DayModal
                    open={!!selectedDay}
                    onClose={() => setSelectedDay(null)}
                >
                    <div className="w-full h-full flex flex-col items-center justify-center px-2 md:px-0">
                        <div className="flex items-center gap-4 sm:gap-6 text-2xl sm:text-4xl font-bold mb-6 mt-6 flex-wrap justify-center">
                            <DayLabel day={selectedDay} month={month} />
                            <DayTitleInput value={title} onChange={setTitle} />
                        </div>
                        <div className="w-full max-w-[1800px] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 h-[60vh] md:h-[65vh] overflow-auto">
                            <div className="flex flex-col h-full">
                                <div className="text-lg font-medium mb-4 text-neutral-300">
                                    apuntes
                                </div>
                                <div className="flex flex-col gap-2 bg-neutral-900 rounded-xl p-2 h-full">
                                    <NotesEditor
                                        value={notes}
                                        onChange={setNotes}
                                        pdfs={pdfs}
                                        setPdfs={setPdfs}
                                    />
                                </div>
                            </div>
                            <TasksLinksColumn
                                tasks={tasks}
                                setTasks={setTasks}
                                taskInput={taskInput}
                                setTaskInput={setTaskInput}
                                links={links}
                                setLinks={setLinks}
                                linkInput={linkInput}
                                setLinkInput={setLinkInput}
                            />
                        </div>
                    </div>
                </DayModal>
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
                            ? "Nombre de la nueva carpeta/calendario:"
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
