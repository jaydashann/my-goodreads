import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publicInstance } from "../api/api";
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription

 } from "./ui/dialog";
import { Button } from "./ui/button";
import StarRating from "./star-rating";
import Dropdown from "./dropdown";

type Books = {
  id: number;
  user_id: number;
  book_cover: string | null;
  title: string;
  author: string;
  description: string;
  status: string;
  rating: number;
  notes: string;
  started_at: string;
  completed_at: string;
  created_at: string;
  updated_at: string;
};

type AddBookProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

async function createBook() {
    const result = await publicInstance.post<Books[]>('/books')
    return result.data
};

function AddBook({ open, onOpenChange }: AddBookProps) {
    const [ratings, setRatings] = React.useState(2.5);

    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: createBook,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['BOOK_DATA'] }),
    });

    const book_status = [
        'Want To Read',  
        'Currently Reading', 
        'Read', 
        'Did Not Finish',
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-black">
                <DialogHeader>
                    <DialogTitle>Add New Book</DialogTitle>
                </DialogHeader>
                <form>
                    <div className="flex-col">
                        <input className="mb-4 shadow appearance-none border-2 border-background rounded w-full py-2 px-3 text-textcolor leading-tight focus:outline-none focus:shadow-outline" id="author" type="text" placeholder="Title"></input>
                        <input className="mb-4 shadow appearance-none border-2 border-background rounded w-full py-2 px-3 text-textcolor leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Author"></input>
                        <textarea className="resize-y shadow appearance-none border-2 border-background rounded w-full py-2 px-3 text-textcolor leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description"></textarea>
                        <div className="flex">
                          <Dropdown options={book_status}/>
                          <StarRating value={ratings} onChange={setRatings} />
                        </div>
                        <textarea className="resize-y shadow appearance-none border-2 border-background rounded w-full py-2 px-3 text-textcolor leading-tight focus:outline-none focus:shadow-outline" id="notes" placeholder="Notes"></textarea>
                        <div className="flex justify-end mt-2">
                            <Button>Add</Button>
                            {/* <Button>Cancel</Button> */}
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export { AddBook };