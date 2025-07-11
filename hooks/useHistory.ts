
"use client";

import { useContext } from "react";

import { HistoryContext, HistoryContextType } from "../context/HistoryProvider";

export function useHistory(): HistoryContextType {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
}
