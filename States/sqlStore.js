import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSQLStore = create(
  persist(
    (set) => ({
      sqlGenQuery: "",
      setGenSqlQuery: (query) => set({ sqlGenQuery: query }),
    }),
    {
      name: "sql-query-store", // Key for localStorage
    }
  )
);

export default useSQLStore;
