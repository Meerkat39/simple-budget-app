import ReactDOM from "react-dom";

const Modal = ({ children, onClose }) => {
  let modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    const div = document.createElement("div");
    div.id = "modal-root";
    document.body.appendChild(div);
    modalRoot = div;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full text-xl font-bold w-10 h-10 flex items-center justify-center transition-colors duration-200"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
