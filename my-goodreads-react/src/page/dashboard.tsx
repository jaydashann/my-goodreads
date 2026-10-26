import Tiles from "../components/tiles";
import SearchFilter from "../components/search-filter";
import { Button } from "../components/ui/button";
import { AddBook } from "../components/add-book-dialog";
import { Form } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <div className="flex gap-3">
        <div className="flex-1">
          <SearchFilter/>
        </div>
        <Button onClick={() => setOpen(true)}>Add Book</Button>
        <AddBook open={open} onOpenChange={setOpen} />
      </div>
      <Tiles/>
    </div>
  );
}
