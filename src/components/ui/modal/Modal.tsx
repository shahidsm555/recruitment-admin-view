"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    showCloseButton = true,
}) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-theme-xl transition-all dark:bg-gray-900">
                {/* Modal Header */}
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        {title}
                    </h3>
                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>

                {/* Modal Body */}
                <div className="custom-scrollbar max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
