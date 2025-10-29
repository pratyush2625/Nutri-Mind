'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { JournalEntry } from '@/lib/types';

interface JournalHistoryContextType {
  history: JournalEntry[];
  addEntry: (entry: JournalEntry) => void;
}

const JournalHistoryContext = createContext<JournalHistoryContextType | undefined>(undefined);

export const JournalHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<JournalEntry[]>([]);

  const addEntry = (entry: JournalEntry) => {
    setHistory(prevHistory => [entry, ...prevHistory]);
  };

  return (
    <JournalHistoryContext.Provider value={{ history, addEntry }}>
      {children}
    </JournalHistoryContext.Provider>
  );
};

export const useJournalHistory = () => {
  const context = useContext(JournalHistoryContext);
  if (context === undefined) {
    throw new Error('useJournalHistory must be used within a JournalHistoryProvider');
  }
  return context;
};
