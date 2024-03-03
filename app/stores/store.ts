import { create } from "zustand";

type Store = {
  user: null;
  setUser: (user: any) => void;
};
const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
}));

export default useStore;
