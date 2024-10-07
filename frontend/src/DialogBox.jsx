import { useRef, useEffect } from "react";

const DialogBox = ({
  handleSubmit,
  formData,
  setFormData,
  editId,
  setIsOpenDialogBox,
  isOpenDialogBox,
  setEditId,
}) => {
  const modalRef = useRef(null);

  const openModal = () => setIsOpenDialogBox(true);
  const closeModal = () => setIsOpenDialogBox(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpenDialogBox(false);
        setFormData({
          title: "",
          content: "",
        });
        setEditId(null);
      }
    };

    if (isOpenDialogBox) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpenDialogBox, setIsOpenDialogBox, setFormData, setEditId]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpenDialogBox(false);
        setFormData({
          title: "",
          content: "",
        });
        setEditId(null);
      }
    };

    if (isOpenDialogBox) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpenDialogBox, setIsOpenDialogBox, setFormData, setEditId]);

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="text-xl px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
      >
        Create Post
      </button>

      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isOpenDialogBox ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      <div
        className={`fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${
          isOpenDialogBox ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef}
          className={`bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 ease-in-out ${
            isOpenDialogBox ? "scale-100" : "scale-95"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              {editId ? "Update Post" : "Create Post"}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-2xl"
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                required
              />
              <textarea
                name="content"
                placeholder="Content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                required
              />
              <button
                type="submit"
                onClick={closeModal}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                {editId ? "Update Post" : "Create Post"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
