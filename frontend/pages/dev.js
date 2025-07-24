"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiCheck, FiZap, FiBox, FiList, FiAlertTriangle, FiArrowLeft, FiTerminal, FiMonitor } from 'react-icons/fi';

// A reusable component for code blocks with a copy button
const CodeBlock = ({ codeString }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="block overflow-x-auto bg-slate-100 dark:bg-slate-900/70 p-4 rounded-xl mt-2 text-sm border border-slate-200 dark:border-slate-800">
        <code>
          {codeString}
        </code>
      </pre>
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`absolute top-2.5 right-2.5 p-2 rounded-lg transition-colors text-slate-500 ${copied
          ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400'
          : 'bg-white/50 dark:bg-slate-800/50 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiCheck className="h-4 w-4" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiCopy className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

// Component for the new tabbed command examples
const CommandTabs = () => {
    const [activeTab, setActiveTab] = useState('curl');
    const curlCommand = `curl "https://ipsumforge.unibrik.com/api/generate?paragraphs=3&language=english"`;
    const powershellCommand = `Invoke-WebRequest -Uri "https://ipsumforge.unibrik.com/api/generate?paragraphs=3&language=english"`;

    return (
        <div className="mt-4">
            <div className="flex border-b border-slate-200 dark:border-slate-800">
                <button
                    onClick={() => setActiveTab('curl')}
                    className={`flex items-center gap-2 px-4 py-2 sm:text-sm text-xs font-medium transition-colors border-b-2 ${activeTab === 'curl' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                    <FiTerminal />
                    Terminal (cURL)
                </button>
                <button
                    onClick={() => setActiveTab('powershell')}
                    className={`flex items-center gap-2 px-4 py-2 sm:text-sm text-xs font-medium transition-colors border-b-2 ${activeTab === 'powershell' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                    <FiMonitor />
                    Windows (PowerShell)
                </button>
            </div>
            <div className="pt-4">
                {activeTab === 'curl' && <CodeBlock codeString={curlCommand} />}
                {activeTab === 'powershell' && <CodeBlock codeString={powershellCommand} />}
            </div>
        </div>
    )
}


export default function ApiPage() {
  const languages = [
    "English", "Spanish", "French", "German", "Hindi", "Chinese", "Japanese",
    "Italian", "Portuguese", "Russian", "Arabic", "Turkish", "Dutch", "Korean",
    "Swedish", "Polish", "Greek", "Hebrew", "Thai", "Indonesian"
  ];

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200">
      {/* Animated Background */}

      <main className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">

        <div className="mb-12 mt-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                <FiArrowLeft />
                Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                API Documentation
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                Integrate IpsumForge's powerful text generation into your own application for free.
            </p>
        </div>

        {/* Base URL */}
        <section className="mb-12">
          <div className="flex items-center gap-3">
            <FiBox className="h-6 w-6 text-indigo-500"/>
            <h2 className="text-2xl font-bold">Base URL</h2>
          </div>
          <p className="mt-2 text-slate-600 dark:text-slate-400">All API requests are made to the following base URL:</p>
          <CodeBlock codeString="https://ipsumforge.unibrik.com/api" />
        </section>

        {/* Generate Endpoint */}
        <section className="mb-12">
          <div className="flex items-center gap-3">
             <FiZap className="h-6 w-6 text-indigo-500"/>
             <h2 className="text-2xl font-bold">Generate Endpoint</h2>
          </div>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Generates random Lorem Ipsum text based on specified parameters.</p>

          <h3 className="text-lg font-semibold mt-6">HTTP Request</h3>
          <CodeBlock codeString="GET https://ipsumforge.unibrik.com/api/generate?paragraphs=3&word_count=50&language=english" />

          <h3 className="text-lg font-semibold mt-6">Command-Line Request</h3>
          <CommandTabs />

          <h4 className="font-semibold mt-8 mb-2">Query Parameters:</h4>
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
            <ul>
              <li><strong>paragraphs</strong> (optional, number): Number of paragraphs to generate. Default: `1`.</li>
              <li><strong>word_count</strong> (optional, number): Average words per paragraph. Default: `50`.</li>
              <li><strong>language</strong> (optional, string): The desired language. See supported languages below. Default: `english`.</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold mt-8">Example Response</h3>
          <CodeBlock codeString={`{\n  "paragraphs": [\n    "Lorem ipsum dolor sit amet, adipiscing elit...",\n    "Nulla convallis egestas rhoncus, qu..."\n  ]\n}`} />
        </section>

        {/* Language Support */}
        <section className="mb-12">
            <div className="flex items-center gap-3">
                <FiList className="h-6 w-6 text-indigo-500"/>
                <h2 className="text-2xl font-bold">Supported Languages</h2>
            </div>
          <p className="mt-2 text-slate-600 dark:text-slate-400">You can generate text in the following languages:</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {languages.map((lang) => (
              <span key={lang} className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-sm font-medium px-3 py-1 rounded-full">
                {lang}
              </span>
            ))}
          </div>
        </section>

        {/* Error Handling */}
        <section>
          <div className="flex items-center gap-3">
            <FiAlertTriangle className="h-6 w-6 text-indigo-500"/>
            <h2 className="text-2xl font-bold">Error Handling</h2>
          </div>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            The API returns JSON-formatted error messages with standard HTTP status codes.
          </p>
          <h3 className="text-lg font-semibold mt-6">Example Error</h3>
          <CodeBlock codeString={`{\n  "error": "Language not supported",\n  "code": 400\n}`} />
           <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 mt-4">
                <ul>
                    <li><strong>400 Bad Request:</strong> Invalid parameters, such as an unsupported language.</li>
                    <li><strong>500 Internal Server Error:</strong> An unexpected error occurred on our end.</li>
                </ul>
            </div>
        </section>

        <footer className="text-center mt-10 border-t border-slate-200 dark:border-slate-800">
            
        </footer>
      </main>
    </div>
  );
}