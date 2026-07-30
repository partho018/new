'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Check } from 'lucide-react';
import { Country, COUNTRIES, DEFAULT_COUNTRY } from '@/lib/countries';

interface CountrySelectorProps {
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
  compact?: boolean;
}

export default function CountrySelector({
  selectedCountry = DEFAULT_COUNTRY,
  onSelectCountry,
  compact = false,
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dialCode.includes(searchQuery) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Selector Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 h-full rounded-l-xl bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/90 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-all border-r border-slate-200 dark:border-slate-700/80 select-none focus:outline-none"
        title="Select Country Code"
      >
        <span className="text-base leading-none">{selectedCountry.flag}</span>
        <span className="font-bold tracking-tight text-slate-700 dark:text-slate-200">
          {selectedCountry.dialCode}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-blue-500' : ''
          }`}
        />
      </button>

      {/* Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 w-64 z-50 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl p-2.5 space-y-2 overflow-hidden"
          >
            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code..."
                className="w-full h-8 pl-8 pr-3 text-xs rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Country List */}
            <div className="max-h-52 overflow-y-auto space-y-0.5 pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => {
                  const isSelected = country.code === selectedCountry.code;
                  return (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        onSelectCountry(country);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-base leading-none">{country.flag}</span>
                        <span className="truncate">{country.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({country.code})</span>
                      </div>
                      <div className="flex items-center gap-1.5 ml-2">
                        <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                          {country.dialCode}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-blue-500" />}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-4 text-center text-xs text-slate-400">
                  No country found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
