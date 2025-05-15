import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ApiPage() {
  const router = useRouter();



  const getButtonClass = (path) =>
    router.pathname === path
      ? "text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-1 focus:ring-[#050708]/50 dark:bg-gray-900 dark:text-white"
      : "text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-1 focus:ring-gray-100 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700";

  

  return (
    <div className={`min-h-screen dark:text-white text-gray-900`}>
      <main className="p-3 mt-3 max-w-4xl mx-auto">
      <section className="bg-white dark:bg-gray-800 p-4 flex items-center gap-2 rounded-lg shadow-md mb-3">
      <svg class="h-5 fill-black dark:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.261 1.03462C12.6971 1.15253 13 1.54819 13 1.99997V8.99997H19C19.3581 8.99997 19.6888 9.19141 19.8671 9.50191C20.0455 9.8124 20.0442 10.1945 19.8638 10.5038L12.8638 22.5038C12.6361 22.8941 12.1751 23.0832 11.739 22.9653C11.3029 22.8474 11 22.4517 11 22V15H5C4.64193 15 4.3112 14.8085 4.13286 14.498C3.95452 14.1875 3.9558 13.8054 4.13622 13.4961L11.1362 1.4961C11.3639 1.10586 11.8249 0.916719 12.261 1.03462ZM6.74104 13H12C12.5523 13 13 13.4477 13 14V18.301L17.259 11H12C11.4477 11 11 10.5523 11 9.99997V5.69889L6.74104 13Z"></path> </g></svg>
      <h1 className="text-xl font-bold">API Documentation</h1>
        </section>

        {/* Base URL */}
        <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-3">
          <h2 className="text-xl font-semibold mb-2">Base URL</h2>
          <p className="text-gray-700 dark:text-gray-300">All API requests are made to the following base URL:</p>
          <code className="block bg-gray-100 dark:bg-gray-900 p-2 rounded mt-2 text-xs">
            https://apiispumforge.vercel.app
          </code>
        </section>

        {/* Generate Endpoint */}
        <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-3">
          <h2 className="text-xl font-semibold mb-2">1. Generate Lorem Text</h2>
          <p className="text-gray-700 dark:text-gray-300">Generates random Lorem Ipsum text based on specified parameters.</p>

          <h3 className="text-xl font-medium mt-4">Request</h3>
          <p className="text-gray-700 dark:text-gray-300">Use the following GET request:</p>
          <code className="block bg-gray-100 break-all dark:bg-gray-900 p-2 rounded mt-2 text-xs">
            GET /generate?paragraphs=2&word_count=50&language=english
          </code>

          <h4 className="font-semibold mt-4">Query Parameters:</h4>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li><strong>paragraphs (optional)</strong>: Number of paragraphs (default: 1)</li>
            <li><strong>word_count (optional)</strong>: Words per paragraph (default: 50)</li>
            <li><strong>language (optional)</strong>: Language code (e.g., english, spanish, french)</li>
          </ul>

          <h3 className="text-xl font-medium mt-4">Response Example</h3>
          <pre className="block overflow-auto bg-gray-100 dark:bg-gray-900 p-2 rounded mt-2 text-xs break-all">
            {`{
  "paragraphs": [
    "Lorem ipsum dolor sit amet,adipiscing elit...",
    "Nulla convallis egestas rhoncus, qu..."
  ]
}`}
          </pre>
        </section>

        {/* Language Support */}
        <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-3">
          <h2 className="text-xl font-semibold mb-2">Supported Languages</h2>
          <p className="text-gray-700 dark:text-gray-300">You can generate Lorem text in the following languages:</p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2">
            {[
              "English", "Spanish", "French", "German", "Hindi", "Chinese", "Japanese",
              "Italian", "Portuguese", "Russian", "Arabic", "Turkish", "Dutch", "Korean",
              "Swedish", "Polish", "Greek", "Hebrew", "Thai", "Indonesian"
            ].map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
        </section>

        {/* Error Handling */}
        <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Error Handling</h2>
          <p className="text-gray-700 dark:text-gray-300">
            The API returns JSON-formatted error messages when something goes wrong:
          </p>
          <pre className="block overflow-auto bg-gray-100 dark:bg-gray-900 p-2 rounded mt-2 text-xs break-all">
            {`{
  "error": "Language not supported",
  "code": 400
}`}
          </pre>
          <p className="text-gray-700 dark:text-gray-300 mt-2">Common error codes:</p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2">
            <li><strong>400:</strong> Bad Request (e.g., unsupported language)</li>
            <li><strong>500:</strong> Internal Server Error (server issues)</li>
          </ul>
        </section>
      </main>
      <div className="flex justify-between my-2 text-xs px-3 text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1 ">
          <svg className="h-4 stroke-slate-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 9C13.5197 8.40081 12.93 8 12 8C10.0769 8 9 9.14286 9 12C9 14.8571 10.0769 16 12 16C12.93 16 13.5197 15.5992 14 15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          2025
          IpsumForge
          Built with
          <svg className="h-4 stroke-slate-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          by
          <a className="underline" href="https://jtsh.vercel.app">Jitesh</a></div>
        <div>
          <Link href="/about" className=" hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg px-2 py-2">About
          </Link>
          <Link href="/dev" className="hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg px-2 py-2">API
          </Link></div>
      </div>
    </div>
  );
}
