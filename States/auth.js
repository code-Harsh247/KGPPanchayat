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
      role: null,
      userId: null,
      userName: null, 
      userPhone: null,
     
      // Login action
      login: async (values) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/api/login', values, {
            headers: { 'Content-Type': 'application/json' }
          });
          
          const { success, UserRole, UserID, UserName, UserPhone } = response.data;
          
          if (success) {
            set({
              isAuthenticated: true,
              loading: false,
              role: UserRole,
              userId: UserID,
              userName: UserName,
              userPhone: UserPhone,
            });
            return { success: true };
          } else {
            throw new Error('Login failed');
          }
        } catch (error) {
          const errorMessage = error.response?.data?.error || error.message || 'Login failed';
          set({ loading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },
      
      // Check auth status (useful on app initialization)
      checkAuth: async () => {
        set({ loading: true });
        try {
          const response = await axios.get("/api/checkAuth");
          
          if (response.data.isAuthenticated) {
            // You might want to update user data here as well if your API returns it
            set({ 
              isAuthenticated: true, 
              loading: false,
              // If your checkAuth endpoint returns user data, add it here
            });
          } else {
            set({ isAuthenticated: false, loading: false });
          }
        } catch (error) {
          set({ isAuthenticated: false, loading: false });
        }
      },
      
      // Logout action
      logout: async () => {
        try {
          // Optional: call logout API if you have one
          // await axios.post('/api/logout');
          set({
            isAuthenticated: false,
            role: null,
            userId: null,
            userName: null,
            userPhone: null,
            error: null
          });
          return { success: true };
        } catch (error) {
          return { success: false, error: error.message };
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