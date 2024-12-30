'use client'

import { Link } from 'lucide-react'
import { motion } from "framer-motion"
import InteractiveHoverButton from "@/components/ui/interactive-hover-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-100 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center mt-6 ml-6"
      >
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 540 532" className="rounded-md me-3">
          <path d="M0 0 C178.2 0 356.4 0 540 0 C540 175.56 540 351.12 540 532 C361.8 532 183.6 532 0 532 C0 356.44 0 180.88 0 0 Z " fill="#8151FD" transform="translate(0,0)"></path>
          <path d="M0 0 C13.2 0 26.4 0 40 0 C40 83.16 40 166.32 40 252 C26.8 252 13.6 252 0 252 C0 168.84 0 85.68 0 0 Z " fill="#FFFFFF" transform="translate(346,140)"></path>
          <path d="M0 0 C13.2 0 26.4 0 40 0 C40 83.16 40 166.32 40 252 C26.8 252 13.6 252 0 252 C0 168.84 0 85.68 0 0 Z " fill="#FFFFFF" transform="translate(154,140)"></path>
          <path d="M0 0 C12.54 0 25.08 0 38 0 C38 26.4 38 52.8 38 80 C44.6 80 51.2 80 58 80 C58 93.2 58 106.4 58 120 C32.92 120 7.84 120 -18 120 C-18 106.8 -18 93.6 -18 80 C-12.06 80 -6.12 80 0 80 C0 53.6 0 27.2 0 0 Z " fill="#FFFFFF" transform="translate(250,272)"></path>
          <path d="M0 0 C12.54 0 25.08 0 38 0 C38 13.2 38 26.4 38 40 C25.46 40 12.92 40 0 40 C0 26.8 0 13.6 0 0 Z " fill="#FFFFFF" transform="translate(308,392)"></path>
          <path d="M0 0 C12.54 0 25.08 0 38 0 C38 13.2 38 26.4 38 40 C25.46 40 12.92 40 0 40 C0 26.8 0 13.6 0 0 Z " fill="#FFFFFF" transform="translate(194,392)"></path>
        </svg>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-violet-800">gibwork</h2>
      </motion.div>
      
      <motion.hr 
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, delay: 0.5 }}
        className="border-t-4 border-violet-600 mt-4"
      />

      <div className="flex flex-col items-center justify-center mt-20 h-[calc(100vh-120px)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-4xl md:text-6xl font-bold text-violet-900 mr-4">
              GIBWORK <span className="text-violet-600">API</span> EXAMPLE APP
            </h1>
            <motion.button 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              onClick={() => window.open("https://gibwork.readme.io/reference/overview", "_blank")} 
              className="bg-violet-600 text-white py-2 px-4 rounded-xl hover:bg-violet-700 transition duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Link className="mr-2" size={20} /> <span className="font-bold">API Docs</span>
            </motion.button>
          </div>
          <motion.hr 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 1.2 }}
            className="border-t-4 border-violet-600 mt-2 w-3/4 mx-auto"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex space-x-8 mb-12"
        >
          <InteractiveHoverButton text="Explore Tasks" onClick={() => window.location.href = '/exploreTasks'} />
          <InteractiveHoverButton text="Create Task" onClick={() => window.location.href = '/createTask'}/>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="max-w-3xl mx-auto text-center px-4"
        >
          <p className="text-xl md:text-2xl leading-relaxed text-violet-800">
            <span className="text-violet-600 font-semibold">Gibwork</span> bridges{" "}
            <span className="font-bold">Businesses</span> and{" "}
            <span className="font-bold">Talent</span> in the{" "}
            <span className="text-violet-600 font-semibold">Web3 Ecosystem</span>.{" "}
            The RESTful interface provides seamless integration, enabling businesses
            to efficiently{" "}
            <span className="text-violet-600">
              create, manage, and execute tasks
            </span>{" "}
            while empowering talent to discover and participate in opportunities.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-violet-200 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      />
    </div>
  )
}
