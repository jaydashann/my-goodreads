import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AddBook } from "../components/add-book-dialog";
import SearchFilter from "../components/search-filter";
import Tiles from "../components/tiles";
import { Button } from "../components/ui/button";
import { useLogout } from "../hooks/auth/useLogout";

export default function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="flex gap-3">
        <div className="flex-1">
          <SearchFilter />
        </div>
        <Button onClick={() => setOpen(true)}>Add Book</Button>
        <Button onClick={handleLogout}>Logout</Button>
        <AddBook open={open} onOpenChange={setOpen} />
      </div>
      <Tiles />
    </div>
  );
}
