import { useState } from "react";
import { AddBook } from "../components/add-book-dialog";
import SearchFilter from "../components/search-filter";
import Tiles from "../components/tiles";
import { Button } from "../components/ui/button";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="flex gap-3">
        <div className="flex-1">
          <SearchFilter />
        </div>
        <Button onClick={() => setOpen(true)}>Add Book</Button>
        <AddBook open={open} onOpenChange={setOpen} />
      </div>
      <Tiles />
    </div>
  );
}
