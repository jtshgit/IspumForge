"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiLinkedin, FiMail, FiHeart, FiCode, FiGlobe, FiZap, FiBriefcase, FiTwitter } from 'react-icons/fi';

// Component for a feature highlight
const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/50 shadow-lg transition-transform duration-300 hover:scale-105">
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h3>
    </div>
    <p className="mt-4 text-slate-600 dark:text-slate-400">{children}</p>
  </div>
);

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200">
      {/* Animated Background */}

      <main className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto mt-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
              <FiArrowLeft />
              Back to Home
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center my-12 sm:my-16">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
              More Than Just Placeholders.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
              IpsumForge was born from a simple need: a fast, flexible, and developer-friendly tool for generating placeholder text. This project is dedicated to streamlining the design and development process for creators everywhere.
            </p>
          </motion.div>

          {/* Our Mission Section */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8 my-16">
            <FeatureCard icon={<FiCode className="h-6 w-6" />} title="For Developers">
              Built with a clean, easy-to-use API that integrates seamlessly into any project, saving you time and effort.
            </FeatureCard>
            <FeatureCard icon={<FiGlobe className="h-6 w-6" />} title="For Designers">
              Visualize layouts with text from over 20 languages, ensuring your designs are ready for a global audience.
            </FeatureCard>
            <FeatureCard icon={<FiZap className="h-6 w-6" />} title="For Efficiency">
              Get the exact text you need with customizable paragraphs and word counts, delivered with minimal latency.
            </FeatureCard>
          </motion.div>

          {/* Meet the Creator Section */}
          <motion.div variants={itemVariants} className="my-16 sm:my-24">
            <div className="bg-white/50 dark:bg-slate-900/50 p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800/50 shadow-xl text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">A Word From The Creator</h2>
                <p className="mt-4 max-w-3xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
                  "I created IpsumForge because I believe the best tools are the ones that get out of your way and let you focus on what's important: creating. This project is my contribution to the open-source community—built with care, precision, and a love for clean, efficient code. I hope it helps you bring your ideas to life."
                </p>
                <div className="mt-8 flex items-center justify-center gap-6">
                  <a href="https://jitesh.unibrik.com" target="_blank" rel="noopener noreferrer" title="Portfolio" className="text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                    <FiBriefcase className="h-6 w-6" />
                  </a>
                  <a href="https://www.linkedin.com/in/jtshk/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                    <FiLinkedin className="h-6 w-6" />
                  </a>
                   <a href="https://github.com/jtshgit" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                    <FiGithub className="h-6 w-6" />
                  </a>
                </div>
            </div>
          </motion.div>

          {/* Call to Action & Footer */}
          <motion.div variants={itemVariants} className="text-center mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold">Ready to Start Building?</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Check out the API documentation to integrate IpsumForge today.
            </p>
            <Link href="/dev" className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105">
              View API Docs
            </Link>
        
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
