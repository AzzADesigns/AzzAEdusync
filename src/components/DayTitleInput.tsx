import React from "react";

interface DayTitleInputProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    style?: React.CSSProperties;
}

const DayTitleInput: React.FC<DayTitleInputProps> = ({
    value,
    onChange,
    className = "",
    style,
}) => (
    <input
        className={`w-full bg-transparent text-center text-xl font-bold text-white border-b border-white/30 focus:outline-none focus:border-blue-400 transition placeholder:text-neutral-500 capitalize ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Título del día..."
        style={{ minWidth: 120, maxWidth: 300, ...style }}
    />
);

export default DayTitleInput;
