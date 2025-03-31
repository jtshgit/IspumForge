import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import Dropdown from "./components/dropdown";
import { consumeDynamicAccess } from "next/dist/server/app-render/dynamic-rendering";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const divRef = useRef(null);
  const actionMenuRef = useRef(null);
  const [isFloating, setIsFloating] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [paragraph, setParagraph] = useState(3);
  const [words, setWords] = useState(60);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState("");
  const [loadingText, setLoadingText] = useState(false);

  const copyHTML = () => {
    const htmlString = output.map((p) => `<p>${p.trim()}</p>`).join("\n");
    navigator.clipboard.writeText(htmlString).then(() => {
      setCopied("HTML copied!");
      setTimeout(() => setCopied(""), 1500);
    });
  };

  const copyText = () => {
    const plainText = output.join("\n\n");
    navigator.clipboard.writeText(plainText).then(() => {
      setCopied("Text copied!");
      setTimeout(() => setCopied(""), 1500);
    });
  };


  const generateLorem = async () => {
    setLoadingText(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:5001/generate?paragraphs=${paragraph}&language=${selectedLanguage}&word_count=${words}`
      );
      const data = await res.json();
      // const process = data.text.split("<br>")
      setOutput(data['paragraphs']);
    } catch (error) {
      console.error("Error:", error);
    } finally{
      setLoadingText(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!divRef.current || !actionMenuRef.current) return;

      const divRect = divRef.current.getBoundingClientRect();
      const menuHeight = actionMenuRef.current.offsetHeight;

      if (divRect.bottom <= window.innerHeight - 40) {
        // Attach the menu at the bottom of the div
        setIsFloating(false);
      } else {
        // Keep floating
        setIsFloating(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <center>
        <picture>
          <source srcSet="/dark_logo.png" media="(prefers-color-scheme: dark)" />
          <source srcSet="/logo.png" media="(prefers-color-scheme: light)" />
          <img className='sm:mt-8 sm:h-28 mt-10 h-20' alt="Themed Image" />
        </picture>
        <div class="font-extrabold text-3xl md:text-4xl mt-16 text-slate-700 dark:text-slate-200">
          Generate Custom Lorem Ipsum in
          <span class="text-[#ea6d12] inline-flex ml-2">
            20 Languages!
          </span>

        </div>
        <div class="my-8">
          <a target="_black" className="w-40" href="https://buymeacoffee.com/jtsh"><img class="mx-auto h-10" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" /></a>
        </div>
      </center>
      <center>
        <div className="md:flex w-full max-w-[60rem]">
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
                    <button type="button" onClick={() => { (paragraph > 1) && setParagraph(paragraph - 1) }} id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                      <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                      </svg>
                    </button>
                    <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block max-w-10 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" value={paragraph} onChange={(e) => { ((e.target.value > 0) && (e.target.value < 100)) && (setParagraph(parseInt(e.target.value))) }} required />
                    <button type="button" onClick={() => { (paragraph < 100) && setParagraph(paragraph + 1) }} id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                      <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-1/2">
                <form className="max-w-xs">
                  <label htmlFor="countries" className="block my-2 text-[12px] font-semibold text-gray-900 dark:text-gray-400">Word Count</label>
                  <div className="relative flex items-center max-w-[8rem]">
                    <button type="button" onClick={() => { (words > 1) && setWords(words - 1) }} id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                      <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                      </svg>
                    </button>
                    <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block max-w-10 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" value={words} onChange={(e) => { ((e.target.value > 0) && (e.target.value < 200)) && (setWords(parseInt(e.target.value))) }} required />
                    <button type="button" onClick={() => { (words < 200) && setWords(words + 1) }} id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                      <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <button onClick={generateLorem} class="mt-5 flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            Genterate
 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 ml-1.5">
    <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
  </svg>
</button>
          </div>
          <div className="md:w-3/5 p-4  dark:text-gray-800">
            <div className="px-4 py-2 w-full rounded-xl border border-gray-100 bg-gray-100 dark:bg-gray-900 dark:border-gray-800 text-left">


              {/* <div className="absolute end-2 mr-2 ">
                  <button className="-translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center">
                    <span id="default-icon">
                      <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                      </svg>
                    </span>
                    <span id="success-icon" className="hidden">
                      <svg className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                      </svg>
                    </span>
                  </button>
                </div> */}
              <div className="" ref={divRef}
              >

                <div className="text-[14px]">
                  {output && output?.map((element, index) => (
                    <>
                    <p key={index}>{element}</p><br></br></>
                  ))}
                </div>
                {loadingText && (
                  <div role="status" className="py-2 w-full animate-pulse">
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-3 max-w-1/2"></div>
                  </div>
                )}

                {output && (<div
                  ref={actionMenuRef}
                  className={`${isFloating
                    ? "fixed bottom-5 left-1/2 transform -translate-x-1/2"
                    : " bottom-0 "
                    } mx-auto transition-all duration-300`}
                >
                  <div className="flex gap-2">
                    <button onClick={copyHTML} className="flex bg-blue-600 text-[14px] text-white px-3 py-1.5 gap-1 rounded-md shadow-lg w-31">
                      <svg className="h-5 stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 7L4 12L9 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 7L20 12L15 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                      Copy HTML
                    </button>
                    <button onClick={copyText} className="flex bg-blue-600 text-[14px] text-white px-3 py-1.5 gap-1 rounded-md shadow-lg w-31">
                      <svg className="h-5 stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H12H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                      Copy Text
                    </button>
                  </div>
                </div>)}
              </div>
              <div className={isFloating ? ("h-11") : ("h-2")}></div>

            </div>
          </div>
        </div>
        <div className="max-w-[50rem] mt-8 mb-2">
        <h2 className="text-left pl-5 mt-2 text-2xl font-semibold text-slate-400">Feature</h2>
        </div>
        <div className="px-4 pb-4">
          <div className="text-left max-w-[50rem] bg-gray-100 dark:bg-gray-700 rounded-lg py-1 sm:flex">
            <div>
              <div class="bg-white dark:bg-gray-800 rounded-lg m-2 px-6 py-8 ring shadow-xl ring-gray-900/5">
                <div>
                  <span class="inline-flex items-center justify-center rounded-md bg-slate-200 dark:bg-slate-600 p-2 shadow-lg">
                    <svg className="h-5 stroke-black dark:stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 6H19M5 10H15M5 14H19M5 18H15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  </span>
                </div>
                <h3 class="text-gray-900 dark:text-white mt-2 text-base font-medium tracking-tight ">Custom Text Generation</h3>
                <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
                  Quickly create tailored Lorem Ipsum text for design mockups, presentations, and content previews              </p>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg m-2 px-6 py-8 ring shadow-xl ring-gray-900/5">
                <div>
                  <span class="inline-flex items-center justify-center rounded-md bg-slate-200 dark:bg-slate-600 p-2 shadow-lg">
                    <svg className="h-5 stroke-black dark:stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H12H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 12L8 14L10 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12L16 14L14 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  </span>
                </div>
                <h3 class="text-gray-900 dark:text-white mt-2 text-base font-medium tracking-tight ">HTML-Ready Output</h3>
                <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
                  Copy generated text along with proper HTML tags for smooth integration into your web projects.                </p>
              </div>
            </div>
            <div>
              <div class="bg-white dark:bg-gray-800 rounded-lg m-2 px-6 py-8 ring shadow-xl ring-gray-900/5">
                <div>
                  <span class="inline-flex items-center justify-center rounded-md bg-slate-200 dark:bg-slate-600 p-2 shadow-lg">
                    <svg className="h-4 fill-black dark:fill-white" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>translate-solid</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M43.8,41.2,33.9,16.3A2.1,2.1,0,0,0,32,15H30a2.1,2.1,0,0,0-1.9,1.3L23.3,28.4a24,24,0,0,1-5.6-4.3c3.4-4,5.9-8.8,6.2-13.1h2A2.1,2.1,0,0,0,28,9.3,2,2,0,0,0,26,7H17.5V4.1A2.1,2.1,0,0,0,15.8,2a2,2,0,0,0-2.3,2V7H6.1A2.1,2.1,0,0,0,4,8.7,2,2,0,0,0,6,11H19.9c-.3,3-2.3,6.7-4.9,10.1a34.1,34.1,0,0,1-3.2-4.9A2.1,2.1,0,0,0,9.6,15a2,2,0,0,0-1.4,2.9,39.1,39.1,0,0,0,4.1,6.2,24,24,0,0,1-7,5A2.2,2.2,0,0,0,4,31.4,2,2,0,0,0,6,33l.8-.2A26.4,26.4,0,0,0,15,27a28.1,28.1,0,0,0,6.8,5.1l-3.6,9.1A2,2,0,0,0,20,44a2.2,2.2,0,0,0,1.9-1.3L25.8,33H36.2l3.9,9.7A2.2,2.2,0,0,0,42,44a2,2,0,0,0,1.8-2.8ZM27.4,29,31,19.9,34.6,29Z"></path> </g> </g> </g></svg>
                  </span>
                </div>
                <h3 class="text-gray-900 dark:text-white mt-2 text-base font-medium tracking-tight ">Support for Multiple Languages</h3>
                <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
                  Generate placeholder text in over 10 languages, with more languages coming soon for global accessibility.                  </p>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg m-2 px-6 py-8 ring shadow-xl ring-gray-900/5">
                <div>
                  <span class="inline-flex items-center justify-center rounded-md bg-slate-200 dark:bg-slate-600 p-2 shadow-lg">
                    <svg class="h-5 fill-black dark:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.261 1.03462C12.6971 1.15253 13 1.54819 13 1.99997V8.99997H19C19.3581 8.99997 19.6888 9.19141 19.8671 9.50191C20.0455 9.8124 20.0442 10.1945 19.8638 10.5038L12.8638 22.5038C12.6361 22.8941 12.1751 23.0832 11.739 22.9653C11.3029 22.8474 11 22.4517 11 22V15H5C4.64193 15 4.3112 14.8085 4.13286 14.498C3.95452 14.1875 3.9558 13.8054 4.13622 13.4961L11.1362 1.4961C11.3639 1.10586 11.8249 0.916719 12.261 1.03462ZM6.74104 13H12C12.5523 13 13 13.4477 13 14V18.301L17.259 11H12C11.4477 11 11 10.5523 11 9.99997V5.69889L6.74104 13Z"></path> </g></svg>
                  </span>
                </div>
                <h3 class="text-gray-900 dark:text-white mt-2 text-base font-medium tracking-tight ">Free & Powerful API</h3>
                <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
                  Access a reliable and free API to fetch Lorem Ipsum text dynamically for websites, apps, and development projects.
                </p>
              </div>
            </div>
          </div>
        </div>

      </center>
      <div className="flex justify-between mb-2 text-xs px-3 text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1 ">
          <svg className="h-4 stroke-slate-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 9C13.5197 8.40081 12.93 8 12 8C10.0769 8 9 9.14286 9 12C9 14.8571 10.0769 16 12 16C12.93 16 13.5197 15.5992 14 15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          2025
          IspumForge
          Built with
          <svg className="h-4 stroke-slate-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          by
          <a href="#">Jitesh</a></div>
        <div>
          <Link href="/about" className=" hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg px-2 py-2">About
          </Link>
          <Link href="/dev" className="hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg px-2 py-2">API
          </Link></div>
      </div>
      {/* <form className="max-w-xs mx-auto">
    <label for="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</label>
    <div className="relative flex items-center max-w-[8rem]">
        <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M1 1h16"/>
            </svg>
        </button>
        <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
        <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
            </svg>
        </button>
    </div>
    <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please select a 5 digit number from 0 to 9.</p>
</form> */}
      {/* <div>
              <h2 className="text-2xl font-bold mb-4">Stats</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <div className="p-4 bg-green-100 rounded-xl">
                    <div className="font-bold text-xl text-gray-800 leading-none">Good day, <br/>Kristin</div>
                    <div className="mt-5">
                      <button type="button" className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition">
                        Start tracking
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                  <div className="font-bold text-2xl leading-none">20</div>
                  <div className="mt-2">Tasks finished</div>
                </div>
                <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                  <div className="font-bold text-2xl leading-none">5,5</div>
                  <div className="mt-2">Tracked hours</div>
                </div>
                <div className="col-span-2">
                  <div className="p-4 bg-purple-100 rounded-xl text-gray-800">
                    <div className="font-bold text-xl leading-none">Your daily plan</div>
                    <div className="mt-2">5 of 8 completed</div>
                  </div>
                </div>
              </div>
            </div> */}
    </div>
  );
}
