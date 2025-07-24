import "@/styles/globals.css";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps }) {
  const router = useRouter();
const pageVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      }
    }
  };
  // Function to determine active link styling
  const getButtonClass = (path) =>
    router.pathname === path;
  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
      <Link href="/"><img className="h-10" src="logoImg.png" /></Link>
        <div className='mt-2'>
          <Link href="/" class={getButtonClass('/')?("text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-1 focus:ring-[#050708]/50 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex items-center mr-2 dark:bg-white dark:text-black dark:hover:bg-slate-200"):("text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex items-center dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-900 mr-2 dark:bg-black dark:text-white")}>
            <svg class={("mr-2 w-4 h-4 ") + (getButtonClass('/')?("fill-white dark:fill-black"):("fill-black dark:fill-white"))} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3ZM6.41421 7H9V4.41421L6.41421 7ZM7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13ZM7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z"></path> </g></svg>
            Genterate
          </Link>
          <Link href="/dev" class={getButtonClass('/dev')?("text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-1 focus:ring-[#050708]/50 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex items-center mr-2 dark:bg-white dark:text-black dark:hover:bg-slate-200"):("text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex items-center dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-900 mr-2 dark:bg-black dark:text-white")}>
          <svg class={("mr-2 w-4 h-4 ") + (getButtonClass('/dev')?("fill-white dark:fill-black"):("fill-black dark:fill-white"))} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.261 1.03462C12.6971 1.15253 13 1.54819 13 1.99997V8.99997H19C19.3581 8.99997 19.6888 9.19141 19.8671 9.50191C20.0455 9.8124 20.0442 10.1945 19.8638 10.5038L12.8638 22.5038C12.6361 22.8941 12.1751 23.0832 11.739 22.9653C11.3029 22.8474 11 22.4517 11 22V15H5C4.64193 15 4.3112 14.8085 4.13286 14.498C3.95452 14.1875 3.9558 13.8054 4.13622 13.4961L11.1362 1.4961C11.3639 1.10586 11.8249 0.916719 12.261 1.03462ZM6.74104 13H12C12.5523 13 13 13.4477 13 14V18.301L17.259 11H12C11.4477 11 11 10.5523 11 9.99997V5.69889L6.74104 13Z"></path> </g></svg>
            API
          </Link>
        </div>
        <div>
          <Link href="/about"><svg className="h-6 mr-1 fill-slate-700 dark:fill-slate-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.661 7.86213C10.4142 8.04749 10.25 8.31328 10.25 8.75C10.25 9.30228 9.80229 9.75 9.25 9.75C8.69772 9.75 8.25 9.30228 8.25 8.75C8.25 7.68672 8.70818 6.82751 9.46005 6.26288C10.1787 5.72317 11.0967 5.5 12 5.5C13.0779 5.5 13.987 5.82418 14.6436 6.44499C15.2951 7.06101 15.6046 7.88116 15.6531 8.7005C15.7483 10.3042 14.864 12.0687 13.2461 12.9932C13.099 13.0773 13.008 13.1462 12.9529 13.1958C13.0783 13.5886 12.9509 14.0345 12.6034 14.2974C12.163 14.6307 11.5359 14.5438 11.2026 14.1034C11.2026 14.1034 11.2031 14.1041 11.2016 14.1021L11.2005 14.1007C10.9606 13.778 10.865 13.355 10.9137 12.9585C10.9974 12.277 11.4727 11.7031 12.2539 11.2568C13.2157 10.7071 13.7065 9.65911 13.6567 8.8189C13.6328 8.41625 13.4898 8.10656 13.2695 7.89822C13.0542 7.69468 12.6721 7.5 12 7.5C11.3981 7.5 10.9411 7.65183 10.661 7.86213Z"></path> <path d="M12 18.5C12.8284 18.5 13.5 17.8284 13.5 17C13.5 16.1716 12.8284 15.5 12 15.5C11.1716 15.5 10.5 16.1716 10.5 17C10.5 17.8284 11.1716 18.5 12 18.5Z"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"></path> </g></svg></Link>
        </div>
        </div>
           <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={router.route} // Key is crucial for AnimatePresence to detect route changes
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence>
      <div className="flex justify-between my-2 text-xs px-3 text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <svg className="h-4 stroke-slate-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 9C13.5197 8.40081 12.93 8 12 8C10.0769 8 9 9.14286 9 12C9 14.8571 10.0769 16 12 16C12.93 16 13.5197 15.5992 14 15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          2025
          IpsumForge
          Built with
          <svg className="h-4 stroke-slate-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          by
          <a className="underline" href="https://jtsh.vercel.app">Jitesh</a>
        </div>

        <div>
          <Link href="/about" className="hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg px-2 py-2">
            About
          </Link>
          <Link href="/dev" className="hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg px-2 py-2">
            API
          </Link>
        </div>
      </div>
    </div>
  );
}
