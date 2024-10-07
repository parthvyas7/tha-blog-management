import { useRef, useEffect } from "react";

const Modal = ({ setModalOpen, modalOpen, post }) => {
  const modalRef = useRef(null);

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [modalOpen, setModalOpen]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setModalOpen(false);
      }
    };

    if (modalOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [modalOpen, setModalOpen]);

  return (
    <div className="p-4">
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          modalOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      <div
        className={`fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${
          modalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className={`bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 ease-in-out ${
            modalOpen ? "scale-100" : "scale-95"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="p-6">
            <h2 className="text-2xl mb-4">{post.title}</h2>
            <p className="text-xl mb-4">{post.content}</p>
            <button
              type="submit"
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
