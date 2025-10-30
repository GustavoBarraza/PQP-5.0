"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative flex items-center justify-center min-h-[70vh] overflow-hidden">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/homepqp-5.0.webp')",
          }}
        ></div>

        {/* Overlay para oscurecer un poco */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Contenido */}
        <motion.div
          className="relative z-10 max-w-3xl text-center text-white px-6 sm:px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >

          <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-6xl">
            BIENVENIDOS PQP 
          </h1>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-6l">
            PLATAFORMA COLABORATIVA 5.0
          </h1>
          
          </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
