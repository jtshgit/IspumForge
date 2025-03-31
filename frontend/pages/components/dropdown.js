"use client"; // Required for Next.js App Router

import { useState, useRef, useEffect } from "react";
// import { FaChevronDown } from "react-icons/fa";

export default function Dropdown({ language, setLanguage }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Toggle dropdown
    const toggleDropdown = () => setOpen(!open);

    // Set selected language
    const selectLanguage = (lang) => {
        setLanguage(lang); // Update the parent state
        setOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={toggleDropdown}
                className={`flex w-full items-center justify-between rounded p-2  text-xs cursor-pointer bg-gray-100 dark:bg-gray-700 dark:text-slate-300 ${open ? "ring-blue-600" : ""
                    }`}
            >
                <span>{language === "" ? "english" : language}</span>
                <svg className="h-4 fill-black dark:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"></path> </g></svg>
            </button>

            {open && (
                <ul className="absolute mt-1 w-full rounded bg-gray-100 dark:bg-gray-600  z-10">
                    {["english", "spanish", "french", "german", "hindi", "chinese", "japanese", 
    "italian", "portuguese", "russian", "arabic", "turkish", "dutch", "korean", 
    "swedish", "polish", "greek", "hebrew", "thai", "indonesian"].map((lang) => (
                        <li
                            key={lang}
                            className="cursor-pointer select-none p-2 dark:text-slate-300 text-xs hover:bg-gray-500"
                            onClick={() => selectLanguage(lang)}
                        >
                            {lang}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
