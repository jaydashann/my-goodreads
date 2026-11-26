import { useState } from "react";
import { FiBook } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { AddBook } from "../add-book-dialog";

interface AddBookBarProps {
  open: boolean;
  onClose: () => void;
}

export default function AddBookBar({ open, onClose }: AddBookBarProps) {
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="flex mt-1">
          <button
            className="flex items-center justify-center text-left"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex pl-2 pr-2 items-center  hover:bg-hover rounded-lg cursor-pointer">
              <div className="p-4 bg-primary rounded-2xl">
                <FiBook className="text-3xl" />
              </div>
              <div className="flex-col p-4 pl-3">
                <h1 className="text-md">Add Book</h1>
                <p className="text-sm text-grayscale">
                  Add a book that you've read or are currently reading.
                </p>
              </div>
            </div>
          </button>
          <AddBook open={isOpen} onOpenChange={setIsOpen} />
        </div>
      </nav>
    </aside>
  );
}
