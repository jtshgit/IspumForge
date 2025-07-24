"use client";

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import Dropdown from "./components/dropdown";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFileText,
  FiCode,
  FiGlobe,
  FiZap
} from "react-icons/fi"; // Using a consistent icon library

// Storing features in an array makes the code cleaner
const features = [{
  icon: < FiFileText className = "h-6 w-6"/> ,
  title: "Custom Text Generation",
  description: "Quickly create tailored Lorem Ipsum text for design mockups, presentations, and content previews.",
}, {
  icon: < FiCode className = "h-6 w-6" />,
  title: "HTML-Ready Output",
  description: "Copy generated text along with proper HTML tags for smooth integration into your web projects.",
}, {
  icon: < FiGlobe className = "h-6 w-6" /> ,
  title: "Multi-Language Support",
  description: "Generate placeholder text in over 20 languages for global accessibility and diverse design needs.",
}, {
  icon: < FiZap className = "h-6 w-6" /> ,
  title: "Free & Powerful API",
  description: "Access a reliable and free API to fetch Lorem Ipsum text dynamically for any of your development projects.",
}, ];

// The improved Feature Section component
  const featureVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
  };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// A new component for the animated checkmark icon
const AnimatedCheckIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="h-5 w-5"
    initial="hidden"
    animate="visible"
  >
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
      variants={{
        hidden: { pathLength: 0, opacity: 0 },
        visible: { pathLength: 1, opacity: 1 },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  </motion.svg>
);


export default function Home() {
  const divRef = useRef(null);
  const actionMenuRef = useRef(null);
  const [isFloating, setIsFloating] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [paragraph, setParagraph] = useState(3);
  const [words, setWords] = useState(60);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(""); // Now tracks 'html', 'text', or ''
  const [loadingText, setLoadingText] = useState(false);

  // Animation variants remain the same
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const copyHTML = () => {
    const htmlString = output.map((p) => `<p>${p.trim()}</p>`).join("\n");
    navigator.clipboard.writeText(htmlString).then(() => {
      setCopied("html"); // Set state to 'html'
      setTimeout(() => setCopied(""), 2000);
    });
  };

  const copyText = () => {
    const plainText = output.join("\n\n");
    navigator.clipboard.writeText(plainText).then(() => {
      setCopied("text"); // Set state to 'text'
      setTimeout(() => setCopied(""), 2000);
    });
  };


  const generateLorem = async () => {
    setOutput("")
    setLoadingText(true);
    try {
      const res = await fetch(
        `/api/generate?paragraphs=${paragraph}&language=${selectedLanguage}&word_count=${words}`
      );
      const data = await res.json();
      setOutput(data['paragraphs']);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingText(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!divRef.current || !actionMenuRef.current) return;
      const divRect = divRef.current.getBoundingClientRect();
      if (divRect.bottom <= window.innerHeight - 40) {
        setIsFloating(false);
      } else {
        setIsFloating(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [output]);

  return (
    <div className="-z-10">
      <div className="absolute inset-0 h-full -z-10">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333333_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* The rest of your page structure (Header, Controls, etc.) remains here... */}
        <center>
          <motion.div variants={itemVariants}>
            <picture>
              <source srcSet="/dark_logo.png" media="(prefers-color-scheme: dark)" />
              <source srcSet="/logo.png" media="(prefers-color-scheme: light)" />
              <img className='sm:mt-8 sm:h-28 mt-10 h-20' alt="Themed Image" />
            </picture>
          </motion.div>
          <motion.div variants={itemVariants} className="font-extrabold text-3xl md:text-4xl mt-16 text-slate-700 dark:text-slate-200">
            Generate Custom Lorem Ipsum in
            <span className="text-[#ea6d12] inline-flex ml-2">
              20 Languages!
            </span>
          </motion.div>
          <motion.div variants={itemVariants} className="my-8">
            <a target="_black" className="w-40" href="https://buymeacoffee.com/jtsh"><img className="mx-auto h-10" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" /></a>
          </motion.div>
        </center>
        <center>
          <motion.div variants={itemVariants} className="md:flex w-full max-w-[60rem]">
            {/* Control Panel Div */}
            <div className="p-4 md:w-2/5 text-gray-800 text-left">
              <div className="max-w-2xl">
                <h6 className="text-sm font-bold mb-2 text-gray-900 dark:text-gray-400">Selected Language: {selectedLanguage || "None"}</h6>
                <Dropdown language={selectedLanguage} setLanguage={setSelectedLanguage} />
              </div>
              <div className="flex mt-2">
                <div className="w-1/2">
                  <form className="max-w-xs">
                    <label htmlFor="countries" className="block my-2 text-[12px] font-semibold text-gray-900 dark:text-gray-400">Paragraph</label>
                    <div className="relative flex items-center max-w-[8rem]">
                      <motion.button whileTap={{ scale: 0.9 }} type="button" onClick={() => { (paragraph > 1) && setParagraph(paragraph - 1) }} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                        </svg>
                      </motion.button>
                      <input type="text" className="bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block max-w-10 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={paragraph} onChange={(e) => { const val = parseInt(e.target.value); if (val > 0 && val < 100) setParagraph(val); }} required />
                      <motion.button whileTap={{ scale: 0.9 }} type="button" onClick={() => { (paragraph < 100) && setParagraph(paragraph + 1) }} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </motion.button>
                    </div>
                  </form>
                </div>
                <div className="w-1/2">
                  <form className="max-w-xs">
                    <label htmlFor="countries" className="block my-2 text-[12px] font-semibold text-gray-900 dark:text-gray-400">Word Count</label>
                    <div className="relative flex items-center max-w-[8rem]">
                       <motion.button whileTap={{ scale: 0.9 }} type="button" onClick={() => { (words > 1) && setWords(words - 1) }} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                         <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                         </svg>
                       </motion.button>
                       <input type="text" className="bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block max-w-10 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={words} onChange={(e) => { const val = parseInt(e.target.value); if (val > 0 && val < 200) setWords(val); }} required />
                       <motion.button whileTap={{ scale: 0.9 }} type="button" onClick={() => { (words < 200) && setWords(words + 1) }} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                         <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                         </svg>
                       </motion.button>
                     </div>
                  </form>
                </div>
              </div>
               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={generateLorem} className="bg-indigo-600 mt-5 flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-100 hover:text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50" type="button">
                Generate
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
                  <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
            
            {/* Output Panel Div */}
            <div className="md:w-3/5 p-4 dark:text-gray-800">
              <div className="relative min-h-50 px-4 py-2 w-full rounded-xl border border-gray-100 bg-gray-100 dark:bg-gray-900 dark:border-gray-800 text-left">
                
                {/* Removed the separate toast notification */}

                <div ref={divRef}>
                  <div className="text-[14px] dark:text-slate-300 text-slate-700">
                    <AnimatePresence>
                      {output && output?.map((element, index) => (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={index} className="mb-4">{element}</motion.p>
                      ))}
                    </AnimatePresence>
                  </div>
                  {/* ... loading skeleton ... */}

                  <AnimatePresence>
                    {output && output.length > 0 && (
                      <motion.div
                        ref={actionMenuRef}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`${isFloating ? "fixed bottom-5 left-1/2 transform -translate-x-1/2" : " bottom-0"} mx-auto transition-all duration-300`}
                      >
                        <div className="flex gap-2">
                          
                          {/* MODIFIED HTML COPY BUTTON */}
                          <motion.button
                            whileHover={{ scale: copied !== 'html' ? 1.1 : 1 }}
                            whileTap={{ scale: copied !== 'html' ? 0.9 : 1 }}
                            onClick={copyHTML}
                            disabled={copied === 'html'}
                            className={`flex items-center justify-center w-32 bg-blue-600 text-[14px] text-white px-3 py-1.5 gap-1.5 rounded-md shadow-lg transition-colors ${copied === 'html' ? '!bg-green-500' : ''}`}
                          >
                            <AnimatePresence mode="wait" initial={false}>
                              {copied === 'html' ? (
                                <span key="copied" className="flex items-center justify-center gap-1.5">
                                  <AnimatedCheckIcon />
                                  Copied
                                </span>
                              ) : (
                                <motion.span key="copy" className="flex items-center justify-center gap-1.5">
                                  <svg className="h-5 w-5 stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 7L4 12L9 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15 7L20 12L15 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                  Copy HTML
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </motion.button>

                          {/* MODIFIED TEXT COPY BUTTON */}
                          <motion.button
                            whileHover={{ scale: copied !== 'text' ? 1.1 : 1 }}
                            whileTap={{ scale: copied !== 'text' ? 0.9 : 1 }}
                            onClick={copyText}
                            disabled={copied === 'text'}
                            className={`flex items-center justify-center w-32 bg-blue-600 text-[14px] text-white px-3 py-1.5 gap-1.5 rounded-md shadow-lg transition-colors ${copied === 'text' ? '!bg-green-500' : ''}`}
                          >
                            <AnimatePresence mode="wait" initial={false}>
                              {copied === 'text' ? (
                                <span key="copied" className="flex items-center justify-center gap-1.5">
                                  <AnimatedCheckIcon />
                                  Copied
                                </span>
                              ) : (
                                <motion.span key="copy" className="flex items-center justify-center gap-1.5">
                                   <svg className="h-5 w-5 stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H12H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                  Copy Text
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className={isFloating ? "h-11" : "h-2"}></div>
              </div>
            </div>
          </motion.div>
        </center>
        
        {/* Your Feature section and Footer can also be wrapped in motion.div if desired */}
        <motion.div variants={itemVariants}>
          <div className = "py-16 sm:py-24" >
    <div className = "mx-auto max-w-7xl px-6 lg:px-8" >
    <div className = "mx-auto max-w-2xl text-center" >
    <h2 className = "text-base font-semibold leading-7 text-indigo-400" >
    Everything You Need </h2> <p className = "mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl" >
    Powerful Features </p> <p className = "mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300" >
    IpsumForge provides a simple yet powerful toolkit for all your placeholder text requirements. </p> </div> <motion.div initial = "hidden"
    whileInView = "visible"
    viewport = {
      {
        once: true
      }
    }
    transition = {
      {
        staggerChildren: 0.2
      }
    }
    className = "mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none" >
    <div className = "grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2" > {
      features.map((feature) => ( <    motion.div key = {
          feature.title
        }
        variants = {
          featureVariants
        }
        className = "relative flex flex-col rounded-2xl bg-white/50 dark:bg-slate-900/50 p-8 shadow-lg ring-1 ring-gray-900/5" >
        <div className = "flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white" >
        <span className = "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white" > {
          feature.icon
        } </span> {feature.title} </div> <div className = "mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300" >
        <p className = "flex-auto" > {
          feature.description
        } </p> </div> </motion.div>
      ))
    } </div> </motion.div> </div> </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
