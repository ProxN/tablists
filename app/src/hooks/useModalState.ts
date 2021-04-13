import create, { State, SetState } from 'zustand';

export interface IModal {
  body: React.ReactNode | string;
  props: {
    title: string;
    handler?: () => void;
  };
}

export interface IModalState extends State {
  isModalOpen: boolean;
  modal: IModal | null;
  openModal: (modal: IModal) => void;
  closeModal: () => void;
}

const useModalState = create<IModalState>((set: SetState<IModalState>) => ({
  isModalOpen: false,
  modal: null,
  closeModal: () => {
    set({ isModalOpen: false, modal: null });
  },
  openModal: (modal: IModal) => {
    set({
      isModalOpen: true,
      modal,
    });
  },
}));

export default useModalState;
