import { IoCloseOutline } from "react-icons/io5";

export default function AddBookBar({ open, onClose }) {
  return (
    <aside
      className={`h-full shrink-0 overflow-hidden bg-white transition-all duration-300 ease-out ${
        open ? "w-96 border-r border-sideborder" : "w-0"
      }`}
    >
      <nav className="flex h-full w-96 flex-col p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl p-2 font-semibold">Create</h2>
          <button onClick={onClose} className="cursor-pointer">
            <IoCloseOutline className="text-2xl mr-2" />
          </button>
        </div>
      </nav>
    </aside>
  );
}
