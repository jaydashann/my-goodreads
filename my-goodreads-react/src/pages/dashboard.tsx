import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMessage } from "react-icons/ai";
import { FaBookOpenReader } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { PiBell } from "react-icons/pi";
import { TbLayoutCollage } from "react-icons/tb";
import { VscDiffAdded, VscHome } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import AddBookBar from "../components/add-book-bar";
import { AddBook } from "../components/add-book-dialog";
import SearchFilter from "../components/search-filter";
import Tiles from "../components/tiles";
import { Button } from "../components/ui/button";
import { useLogout } from "../hooks/auth/useLogout";

function SideBarIcon({ icon: Icon, label, onClick }) {
  return (
    <div className="group relative">
      <button onClick={onClick} className="cursor-pointer">
        <Icon />
      </button>

      <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-black px-3 py-2 text-sm font-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [bookPanel, setBookPanel] = useState(false);
  const { mutateAsync: logout } = useLogout();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
      toast.success("Successfully logged out.");
    } catch (error) {
      console.error(error);
      toast.success("Logout failed. Try again.");
    }
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col justify-between w-18 shrink-0 h-full bg-background border-r border-sideborder">
        <div className="flex flex-col items-center">
          <div className="text-3xl text-secondary mt-6 m-4">
            <SideBarIcon icon={FaBookOpenReader} label="Home" />
          </div>
          <div className="text-3xl m-5">
            <SideBarIcon icon={VscHome} label="Home" />
          </div>
          <div className="text-3xl m-3">
            <SideBarIcon icon={TbLayoutCollage} label="Your books" />
          </div>
          <div className="text-3xl m-6">
            <SideBarIcon
              icon={VscDiffAdded}
              label="Create"
              onClick={() => setBookPanel((curr) => !curr)}
            />
          </div>
          <div className="text-3xl m-2">
            <SideBarIcon icon={PiBell} label="Updates" />
          </div>
          <div className="text-3xl m-6">
            <SideBarIcon icon={AiOutlineMessage} label="Messages" />
          </div>
        </div>
        <div className="flex flex-col items-center m-5">
          <div className="text-3xl">
            <SideBarIcon icon={IoSettingsOutline} label="Settings" />
          </div>
        </div>
      </div>

      <AddBookBar open={bookPanel} onClose={() => setBookPanel(false)} />

      <div className="h-full min-w-0 flex-1 overflow-y-auto">
        <div className="flex gap-3 p-4">
          <div className="flex-1">
            <SearchFilter />
          </div>
          <Button onClick={() => setOpen(true)}>Add Book</Button>
          <Button variant={"logout"} onClick={handleLogout}>
            Logout
          </Button>
          <AddBook open={open} onOpenChange={setOpen} />
        </div>
        <div className="px-4 pb-4">
          <Tiles />
        </div>
      </div>
    </div>
  );
}
