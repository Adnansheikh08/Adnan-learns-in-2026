import { create } from "zustand";

type SelectedNode = {
  id: string;
};

type FlowState = {
  selectedNode: SelectedNode | null;
  setSelectedNode: (node: SelectedNode | null) => void;
};

export const useFlowStore = create<FlowState>((set) => ({
  selectedNode: null,

  setSelectedNode: (node) => set({ selectedNode: node }),
}));