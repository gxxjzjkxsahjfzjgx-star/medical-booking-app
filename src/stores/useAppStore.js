import { create } from 'zustand';

// Helper to load persistent state from localStorage safely
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('med_app_theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const getInitialFavorites = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('med_app_favorites');
      return saved ? JSON.parse(saved) : ['1', '3'];
    } catch {
      return ['1', '3'];
    }
  }
  return ['1', '3'];
};

const getInitialProfile = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('med_app_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
  }
  return {
    name: 'Jana Sayed',
    email: 'janasayed135790@gmail.com',
    phone: '01064362926',
    city: 'Cairo, Egypt',
    bloodType: 'A+',
    allergies: 'None',
    emergencyContact: 'Family Contact (+20 106 436 2926)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  };
};

export const useAppStore = create((set, get) => ({
  // 1. Theme State (Dark / Light mode - BONUS feature requirement)
  theme: getInitialTheme(),
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('med_app_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme: newTheme });
  },
  initTheme: () => {
    const currentTheme = get().theme;
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  // 2. Favorites Store (Doctor IDs)
  favorites: getInitialFavorites(),
  toggleFavorite: (doctorId) => {
    const current = get().favorites;
    const isFav = current.includes(doctorId);
    const updated = isFav ? current.filter((id) => id !== doctorId) : [...current, doctorId];
    localStorage.setItem('med_app_favorites', JSON.stringify(updated));
    set({ favorites: updated });

    get().addToast({
      type: isFav ? 'info' : 'success',
      title: isFav ? 'Removed from Favorites' : 'Added to Favorites',
      message: isFav ? 'Doctor removed from your wishlist' : 'Doctor saved to your quick access list'
    });
  },

  // 3. User Profile State
  userProfile: getInitialProfile(),
  updateUserProfile: (newProfileData) => {
    const updated = { ...get().userProfile, ...newProfileData };
    localStorage.setItem('med_app_profile', JSON.stringify(updated));
    set({ userProfile: updated });
    get().addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile preferences have been saved successfully'
    });
  },

  // 4. Global Toast Notifications
  toasts: [],
  addToast: ({ type = 'info', title, message }) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast = { id, type, title, message };
    set((state) => ({ toasts: [...state.toasts, newToast] }));
    
    // Auto dismiss after 4 seconds
    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));
