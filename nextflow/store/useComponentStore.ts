import { create } from "zustand";

type Component = {
  id: string;
  name: string;
  template: string;
  defaultProps: Record<string, string>;
};

type ComponentState = {
  components: Component[];
  addComponent: (comp: Component) => void;
};

export const useComponentStore = create<ComponentState>((set) => ({
  components: [],

  addComponent: (comp) =>
    set((state) => ({
      components: [...state.components, comp],
    })),
}));