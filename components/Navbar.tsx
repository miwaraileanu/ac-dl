'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white px-6 py-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Логотип */}
        <h1 className="text-black font-bold text-xl">AC&DL</h1>

        {/* Desktop меню */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#services" className="text-black hover:text-yellow-500">Услуги</a>
          <a href="#about" className="text-black hover:text-yellow-500">О нас</a>
          <a
            href="#contact"
            className="border border-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-400 hover:text-black transition"
          >
            Связаться с нами
          </a>
        </div>

        {/* Кнопка для мобильного меню */}
        <button onClick={toggleMenu} className="md:hidden text-black">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Мобильное меню */}
      {isOpen && (
        <div className="md:hidden mt-4 px-4 flex flex-col space-y-3">
          <a href="#services" className="text-black hover:text-yellow-500 px-4">Услуги</a>
          <a href="#about" className="text-black hover:text-yellow-500 px-4">О нас</a>
          <a
            href="#contact"
            className="border border-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-400 hover:text-black transition"
          >
            Связаться с нами
          </a>
        </div>
      )}
    </nav>
  );
}
