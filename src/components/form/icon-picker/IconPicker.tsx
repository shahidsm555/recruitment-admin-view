"use client";
import React, { useState, useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";
import { fetchIcons } from "@/lib/icon-utils";
import Input from "@/components/form/input/InputField";

interface IconPickerProps {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    className?: string; // Add className prop
}

const IconPicker: React.FC<IconPickerProps> = ({
    value,
    onChange,
    label = "Select Icon",
    placeholder = "Search icon...",
    className = "",
}) => {
    const [icons, setIcons] = useState<string[]>([]);
    const [filteredIcons, setFilteredIcons] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadIcons = async () => {
            setLoading(true);
            const iconNames = await fetchIcons();
            setIcons(iconNames);
            setFilteredIcons(iconNames);
            setLoading(false);
        };
        loadIcons();
    }, []);

    useEffect(() => {
        const filtered = icons.filter((icon) =>
            icon.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredIcons(filtered);
    }, [searchTerm, icons]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSelect = (iconName: string) => {
        onChange(iconName);
        setIsOpen(false);
        setSearchTerm("");
    };

    // Dynamically render the icon
    const renderIcon = (iconName: string, size = 20) => {
        // @ts-ignore
        const IconComponent = LucideIcons[iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-./g, x => x[1].toUpperCase())] || LucideIcons[iconName];

        if (!IconComponent) {
            // Fallback or attempt PascalCase conversion more robustly if needed
            // Lucide export names are typically PascalCase (e.g. 'user-check' -> 'UserCheck')
            const pascalCaseName = iconName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
            // @ts-ignore
            const FallbackIcon = LucideIcons[pascalCaseName];
            if (FallbackIcon) return <FallbackIcon size={size} />;

            return null;
        }
        return <IconComponent size={size} />;
    };

    const SelectedIcon = value ? renderIcon(value) : null;

    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            {label && <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">{label}</label>}
            <div
                className="flex items-center justify-between w-full p-2.5 border border-gray-300 rounded-lg cursor-pointer bg-white dark:bg-gray-900 dark:border-gray-700 focus:ring-brand-500 focus:border-brand-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    {SelectedIcon ? <span className="text-gray-600 dark:text-gray-300">{SelectedIcon}</span> : <span className="text-gray-400">Select an icon</span>}
                    <span className="text-gray-900 dark:text-white">{value || ""}</span>
                </div>
                <LucideIcons.ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 max-h-60 overflow-hidden flex flex-col">
                    <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            autoFocus
                        />
                    </div>
                    <div className="overflow-y-auto flex-1 p-2 grid grid-cols-4 gap-2">
                        {loading ? (
                            <div className="col-span-4 text-center py-4 text-gray-500">Loading icons...</div>
                        ) : filteredIcons.length > 0 ? (
                            filteredIcons.map((icon) => (
                                <button
                                    key={icon}
                                    type="button"
                                    className={`flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${value === icon ? 'bg-brand-50 dark:bg-brand-900/20 ring-1 ring-brand-500' : ''}`}
                                    onClick={() => handleSelect(icon)}
                                    title={icon}
                                >
                                    <div className="text-gray-700 dark:text-gray-300 mb-1">
                                        {renderIcon(icon, 24)}
                                    </div>
                                    <span className="text-xs text-center text-gray-500 truncate w-full">{icon}</span>
                                </button>
                            ))
                        ) : (
                            <div className="col-span-4 text-center py-4 text-gray-500">No icons found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IconPicker;
