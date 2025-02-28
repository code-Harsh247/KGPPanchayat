// store/useAuthStore.js
import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";
import axios from 'axios';
const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      loading: false,
      error: null,
      checkAuth: false,


      // Login action
      login: async (values) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Login failed');
          }

          set({
            isAuthenticated: true,
            loading: false,
            // Since we're using HTTP-only cookies for the token,
            // we don't store the token in the state
            user: { phone_number: values.phone_number }
          });

          return { success: true };
        } catch (error) {
          set({ loading: false, error: error.message });
          return { success: false, error: error.message };
        }
      },

      // Check auth status (useful on app initialization)
      checkAuth: async () => {
        set({ loading: true });
        try {
          const res = await fetch("/api/checkAuth"); // Calls the API route
          const data = await res.json();
      
          if (data.isAuthenticated) {
            set({ isAuthenticated: true, loading: false });
          } else {
            set({ isAuthenticated: false, loading: false });
          }
        } catch (error) {
          set({ isAuthenticated: false, loading: false });
        }
      }
    }),
    {
      name: 'auth-storage', // name of the item in the storage
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useAuthStore;