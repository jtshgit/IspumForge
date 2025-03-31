import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AboutPage() {
  const router = useRouter();

  const getButtonClass = (path) =>
    router.pathname === path
      ? "text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-1 focus:ring-[#050708]/50 dark:bg-gray-900 dark:text-white"
      : "text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-1 focus:ring-gray-100 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700";

  return (
    
    <div className="min-h-screen dark:text-white text-gray-900">
      <main className="p-3 mt-3 max-w-4xl mx-auto">
        <section className="bg-white dark:bg-gray-800 p-4 flex items-center gap-2 rounded-lg shadow-md mb-3">
          <svg className="h-5 fill-black dark:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.261 1.03462C12.6971 1.15253 13 1.54819 13 1.99997V8.99997H19C19.3581 8.99997 19.6888 9.19141 19.8671 9.50191C20.0455 9.8124 20.0442 10.1945 19.8638 10.5038L12.8638 22.5038C12.6361 22.8941 12.1751 23.0832 11.739 22.9653C11.3029 22.8474 11 22.4517 11 22V15H5C4.64193 15 4.3112 14.8085 4.13286 14.498C3.95452 14.1875 3.9558 13.8054 4.13622 13.4961L11.1362 1.4961C11.3639 1.10586 11.8249 0.916719 12.261 1.03462ZM6.74104 13H12C12.5523 13 13 13.4477 13 14V18.301L17.259 11H12C11.4477 11 11 10.5523 11 9.99997V5.69889L6.74104 13Z"></path>
          </svg>
          <h1 className="text-xl font-bold">About This Project</h1>
        </section>

        <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-3">
          <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Lorem Ipsum has long been the industry's standard placeholder text, used to demonstrate the visual form of a document without relying on meaningful content. This project was created to address the growing need for an efficient, customizable, and easy-to-integrate Lorem Ipsum API that developers and content creators can rely on. The idea was born from the recognition that while there are many Lorem Ipsum generators available, few offer flexibility in language, paragraph structure, and customization options. This API fills that gap by providing a simple yet powerful solution for generating placeholder text in multiple languages with various formatting options.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            In the world of web development and design, placeholder text is crucial for prototyping, testing layouts, and visualizing content placement. Traditional Lorem Ipsum, derived from Latin, often lacks the diversity needed for multilingual projects. Our API not only generates classic Lorem Ipsum but also supports over 20 languages, making it a versatile tool for global projects. Whether you're designing a website, developing an app, or creating marketing materials, this API ensures you have the perfect placeholder text at your fingertips.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            The core philosophy behind this project is simplicity and efficiency. The API is designed to be lightweight, fast, and easy to integrate into any project. Developers can quickly generate paragraphs, control word counts, and select from various languages with minimal setup. This makes it an ideal solution for both front-end and back-end development, providing consistent placeholder content without the hassle of manual text generation.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Another key feature is the API's responsiveness. It is optimized to handle multiple requests simultaneously, ensuring fast response times even under heavy load. This is particularly important for developers working on large-scale projects or those integrating the API into high-traffic applications. Additionally, the API is built with robust error handling, providing clear and informative messages when issues arise, making debugging straightforward and efficient.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Beyond its technical capabilities, this project also emphasizes user experience. The API’s documentation is designed to be comprehensive yet easy to follow, helping developers quickly understand how to implement and customize the API for their specific needs. Detailed examples, query parameters, and response formats are provided to ensure that users can start generating content with minimal effort.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Ultimately, this project is more than just a placeholder text generator. It’s a tool designed to streamline the content creation process, support multilingual projects, and enhance the development workflow. Whether you're building a landing page, designing a user interface, or creating content for social media, this API provides the flexibility and reliability needed to get the job done efficiently.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-3">
          <h2 className="text-xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Generate Lorem Ipsum in 20+ languages.</li>
            <li>Customizable paragraphs and word counts.</li>
            <li>Fast API responses with minimal latency.</li>
            <li>Simple RESTful API with clean endpoints.</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-3">
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p className="text-gray-700 dark:text-gray-300">
            For contributions, issues, or queries, feel free to reach out:
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2 flex">
            <strong>LinkedIn:</strong> <a href='https://www.linkedin.com/in/jtshk/' className='flex items-center ml-2 text-blue-400'>
            <svg className='h-5 bg-slate-300 p-[0.1px] rounded mr-0.5' viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#0A66C2" d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"></path></g></svg>
            /jtshk</a>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            <strong>Mail:</strong>{' '}
            <a href="mailto:jtshk@icloud.com" className="text-blue-500 dark:text-blue-400 hover:underline">jtshk@icloud.com</a>
          </p>
        </section>
      </main>

      <div className="flex justify-between my-2 text-xs px-3 text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <svg className="h-4 stroke-slate-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 9C13.5197 8.40081 12.93 8 12 8C10.0769 8 9 9.14286 9 12C9 14.8571 10.0769 16 12 16C12.93 16 13.5197 15.5992 14 15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          2025 - IspumForge
          Built with
          <svg className="h-4 stroke-slate-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          by <a href="#">Jitesh</a>
        </div>

        <div>
          <Link href="/about" className="hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg px-2 py-2">
            About
          </Link>
          <Link href="/api" className="hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg px-2 py-2">
            API
          </Link>
        </div>
      </div>
    </div>
  );
}
