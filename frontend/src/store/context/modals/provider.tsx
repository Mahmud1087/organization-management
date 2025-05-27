import React, { useEffect, useState, type JSX } from 'react';

interface ModalState {
  [key: string]: boolean;
}

interface SuccessPayload {
  text: JSX.Element | string;
  buttonText: string;
}

interface DeletePayload {
  text: JSX.Element | string;
  successText: JSX.Element | string;
  onClick?: () => void;
}

interface ConfirmActionPayload {
  title: JSX.Element | string;
  desc: JSX.Element | string;
  successText: string;
  action?: () => void;
  variant?:
    | 'default'
    | 'link'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
  btnText?: string;
}

interface SuccessModalState {
  [key: string]: { isOpen: boolean; payload?: SuccessPayload };
}

interface DeleteModalState {
  [key: string]: { isOpen: boolean; payload?: DeletePayload };
}

interface ConfirmActionModalState {
  [key: string]: { isOpen: boolean; payload?: ConfirmActionPayload };
}

export interface ModalContextType {
  modalState: ModalState;
  successModalState: SuccessModalState;
  deleteModalState: DeleteModalState;
  confirmActionModalState: ConfirmActionModalState;
  rowId: number;
  setTableRow: (id: number) => void;
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
  openSuccessModal: (modalName: string, payload: SuccessPayload) => void;
  openDeleteModal: (modalName: string, payload: DeletePayload) => void;
  openConfirmActionModal: (
    modalName: string,
    payload: ConfirmActionPayload
  ) => void;
  closeSuccessModal: (modalName: string) => void;
  closeDeleteModal: (modalName: string) => void;
  closeConfirmActionModal: (modalName: string) => void;
  toggleModal: (modalName: string) => void;
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
}

export const ModalContext = React.createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>({});
  const [successModalState, setSuccessModalState] = useState<SuccessModalState>(
    {}
  );
  const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>(
    {}
  );
  const [confirmActionModalState, setConfirmActionModalState] =
    useState<ConfirmActionModalState>({});
  const [rowId, setRowId] = useState(0);

  useEffect(() => {
    const rowId = localStorage.getItem('rowId');
    if (rowId) {
      setTableRow(Number(rowId));
    }
  }, []);

  const setTableRow = (id: number) => {
    localStorage.setItem('rowId', String(id));
    setRowId(id);
  };

  const openModal = (modalName: string) => {
    setModalState((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: string) => {
    setModalState((prev) => ({
      ...prev,
      [modalName]: false,
    }));
  };

  const openSuccessModal = (modalName: string, payload?: SuccessPayload) => {
    setSuccessModalState((prev) => ({
      ...prev,
      [modalName]: { isOpen: true, payload },
    }));
  };

  const closeSuccessModal = (modalName: string) => {
    setSuccessModalState((prev) => ({
      ...prev,
      [modalName]: { isOpen: false, payload: undefined },
    }));
  };

  const openDeleteModal = (modalName: string, payload?: DeletePayload) => {
    setDeleteModalState((prev) => ({
      ...prev,
      [modalName]: { isOpen: true, payload },
    }));
  };

  const openConfirmActionModal = (
    modalName: string,
    payload?: ConfirmActionPayload
  ) => {
    setConfirmActionModalState((prev) => ({
      ...prev,
      [modalName]: { isOpen: true, payload },
    }));
  };

  const closeConfirmActionModal = (modalName: string) => {
    setConfirmActionModalState((prev) => ({
      ...prev,
      [modalName]: { isOpen: false, payload: undefined },
    }));
  };

  const closeDeleteModal = (modalName: string) => {
    setDeleteModalState((prev) => ({
      ...prev,
      [modalName]: { isOpen: false, payload: undefined },
    }));
  };

  const toggleModal = (modalName: string) => {
    setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        rowId,
        successModalState,
        deleteModalState,
        confirmActionModalState,
        setTableRow,
        openModal,
        openSuccessModal,
        closeSuccessModal,
        openDeleteModal,
        openConfirmActionModal,
        closeConfirmActionModal,
        closeDeleteModal,
        closeModal,
        toggleModal,
        setModalState,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
