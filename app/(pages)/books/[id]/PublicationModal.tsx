import Modal from '@/components/Modal';
import React, { useState } from 'react';
import PublicationForm from '@/components/forms/publication';

const PublicationModal: React.FC<{bookId: string}> = ({bookId}) => {
  let [style, setStyle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setStyle(
      'md:mx-auto right-0 left-0 md:w-1/2 rounded-xl m-4 px-4 py-6 md:px-6 bg-gray-100'
    );
  };

  return (
    <div className="relative">
      <button
        onClick={toggleModal}
        className="bg-purple-50 px-4 max-w-56 border-purple-50 text-white hover:font-bold p-3 flexCenter gap-1 relative rounded-lg"
      >
        BUY YOUR COPY NOW
      </button>
      {/* Modal */}
      <Modal isOpen={isOpen} style={style} toggleModal={toggleModal}>
        <PublicationForm toggleModal={toggleModal} bookId={bookId} />
      </Modal>
    </div>
  );
};

export default PublicationModal;
