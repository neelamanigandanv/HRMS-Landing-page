import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import RequestDemoModal from "../components/common/RequestDemoModal";

export interface DemoModalOptions {
  title?: string;
  subtitle?: string;
  defaultInterest?: string;
}

interface DemoModalContextType {
  openDemoModal: (options?: DemoModalOptions) => void;
  closeDemoModal: () => void;
  isOpen: boolean;
}

const DemoModalContext = createContext<DemoModalContextType | undefined>(undefined);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<DemoModalOptions>({});

  const openDemoModal = (options?: DemoModalOptions) => {
    if (options) {
      setModalOptions(options);
    } else {
      setModalOptions({});
    }
    setIsOpen(true);
  };

  const closeDemoModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleGlobalOpen = (e: Event) => {
      const customEvent = e as CustomEvent<DemoModalOptions>;
      openDemoModal(customEvent.detail);
    };

    window.addEventListener("open-demo-modal", handleGlobalOpen);
    return () => {
      window.removeEventListener("open-demo-modal", handleGlobalOpen);
    };
  }, []);

  return (
    <DemoModalContext.Provider value={{ openDemoModal, closeDemoModal, isOpen }}>
      {children}
      <RequestDemoModal
        isOpen={isOpen}
        onClose={closeDemoModal}
        title={modalOptions.title}
        subtitle={modalOptions.subtitle}
        defaultInterest={modalOptions.defaultInterest}
      />
    </DemoModalContext.Provider>
  );
}

export function useDemoModal(): DemoModalContextType {
  const context = useContext(DemoModalContext);
  if (!context) {
    return {
      openDemoModal: (options?: DemoModalOptions) => {
        window.dispatchEvent(new CustomEvent("open-demo-modal", { detail: options }));
      },
      closeDemoModal: () => {},
      isOpen: false,
    };
  }
  return context;
}

export default DemoModalContext;
