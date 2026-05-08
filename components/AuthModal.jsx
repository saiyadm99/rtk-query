export default function AuthModal({ children, onClose }) {
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 text-3xl">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}