import "@/styles/globals.css";
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Function to determine active link styling
  const getButtonClass = (path) =>
    router.pathname === path;
  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
      <img className="h-10" src="logoImg.png" />
        <div className='mt-2'>
          <Link href="/" class={getButtonClass('/')?("text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-1 focus:ring-[#050708]/50 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2"):("text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2")}>
            <svg class={("mr-2 w-4 h-4 ") + (getButtonClass('/')?("fill-white"):("fill-black"))} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3ZM6.41421 7H9V4.41421L6.41421 7ZM7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13ZM7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z"></path> </g></svg>
            Genterate
          </Link>
          <Link href="/dev" class={getButtonClass('/dev')?("text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-1 focus:ring-[#050708]/50 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2"):("text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2")}>
          <svg class={("mr-2 w-4 h-4 ") + (getButtonClass('/dev')?("fill-white"):("fill-black"))} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.261 1.03462C12.6971 1.15253 13 1.54819 13 1.99997V8.99997H19C19.3581 8.99997 19.6888 9.19141 19.8671 9.50191C20.0455 9.8124 20.0442 10.1945 19.8638 10.5038L12.8638 22.5038C12.6361 22.8941 12.1751 23.0832 11.739 22.9653C11.3029 22.8474 11 22.4517 11 22V15H5C4.64193 15 4.3112 14.8085 4.13286 14.498C3.95452 14.1875 3.9558 13.8054 4.13622 13.4961L11.1362 1.4961C11.3639 1.10586 11.8249 0.916719 12.261 1.03462ZM6.74104 13H12C12.5523 13 13 13.4477 13 14V18.301L17.259 11H12C11.4477 11 11 10.5523 11 9.99997V5.69889L6.74104 13Z"></path> </g></svg>
            API
          </Link>
        </div>
        <div>
        </div>
        </div>
      <Component {...pageProps} />
    </div>
  );
}
