import React, { useState } from "react";

interface ToggleProps {
    options: string[];
    onChange?: (value: string) => void;
}

const PillToggle: React.FC<ToggleProps> = ({ options, onChange }) => {
    const [selected, setSelected] = useState(options[0]);

    const handleClick = (option: string) => {
        setSelected(option);
        onChange?.(option);
    };

    return (
        <div className="flex bg-blue-500 rounded-full p-1">
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => handleClick(option)}
                    className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selected === option
                            ? "bg-white shadow"
                            : "bg-transparent text-white"
                        }`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default PillToggle;
