import React, { cloneElement, useMemo } from 'react';

interface ModalProps {
  style?: string;
  isOpen: boolean;
  toggleModal: () => void;
  children: React.ReactElement<{ isOpen: boolean; toggleModal: () => void }>;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  style = '',
  children,
  toggleModal,
}) => {
  // Memoize the cloned children for performance
  const modalChildren = useMemo(() => {
    // Only pass `toggleModal` if `children` expects it
    if (React.isValidElement(children) && typeof children.type !== 'string') {
      return cloneElement(children, { isOpen, toggleModal });
    }
    return children; // Do not modify DOM elements
  }, [children, isOpen, toggleModal]);

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 right-0 h-screen w-full z-50">
          {/* Overlay */}
          <div
            className="absolute top-0 left-0 w-full h-screen bg-[black] opacity-50"
            onClick={toggleModal}
          />
          {/* Modal */}
          <div
            className={`absolute max-h-screen overflow-y-auto transition-transform transform shadow-xl dropdown ${style} ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {modalChildren}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
