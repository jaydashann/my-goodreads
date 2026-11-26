import toast from "react-hot-toast";
import { IoMdLogOut } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";

interface SettingsBarProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsBar({ open, onClose }: SettingsBarProps) {
  const navigate = useNavigate();
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
    <aside
      className={`h-full shrink-0 overflow-hidden bg-white transition-all duration-300 ease-out ${
        open ? "w-96 border-r border-sideborder" : "w-0"
      }`}
    >
      <nav className="flex h-full w-96 flex-col p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl p-2 font-semibold">Settings & Support</h2>
          <button onClick={onClose} className="cursor-pointer">
            <IoCloseOutline className="text-2xl mr-2" />
          </button>
        </div>
        <div className="flex mt-1">
          <button
            className="flex items-center justify-center text-left"
            onClick={handleLogout}
          >
            <div className="flex pl-2 pr-2 items-center  hover:bg-hover rounded-lg cursor-pointer">
              <div className="p-4 bg-primary rounded-2xl">
                <IoMdLogOut className="text-3xl" />
              </div>
              <div className="flex-col p-4 pl-3">
                <h1 className="text-md">Logout</h1>
                <p className="text-sm text-grayscale">
                  Logout of your account.
                </p>
              </div>
            </div>
          </button>
        </div>
      </nav>
    </aside>
  );
}
