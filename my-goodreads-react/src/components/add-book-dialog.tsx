import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publicInstance } from "../api/api";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
 } from "./ui/dialog";
import { Button } from "./ui/button";
import StarRating from "./star-rating";
import Dropdown from "./dropdown";
import Datepicker, { type DateValueType } from "react-tailwindcss-datepicker";

type Book = {
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

type NewBook = {
  title: string;
  author: string;
  description: string;
  status: string;
  rating: number;
  notes: string;
  started_at: string | null;
  completed_at: string | null;
  book_cover: File | null;
};

type AddBookProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

async function createBook(book: NewBook) {
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("description", book.description);
    formData.append("status", book.status);
    formData.append("notes", book.notes);
    formData.append("rating", String(book.rating));
    if (book.started_at) formData.append("started_at", book.started_at);
    if (book.completed_at) formData.append("completed_at", book.completed_at);
    if (book.book_cover) formData.append("book_cover", book.book_cover);

    const result = await publicInstance.post<Book[]>("/books", formData);
    return result.data;
};

function AddBook({ open, onOpenChange }: AddBookProps) {
    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Want To Read");
    const [ratings, setRatings] = useState(2.5);
    const [notes, setNotes] = useState("");
    const [cover, setCover] = useState<File | null>(null);
    const [value, setValue] = useState<DateValueType>({
        startDate: null,
        endDate: null,
    });

    const STATUS_VALUES: Record<string, string> = {
        "Want To Read": "want-to-read",
        "Currently Reading": "currently-reading",
        "Read": "read",
        "Did Not Finish": "did-not-finish",
    };

    const toDateString = (d: Date | string | null | undefined) => {
        if (!d) return null;
        const date = new Date(d);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const resetForm = () => {
        setTitle("");
        setAuthor("");
        setDescription("");
        setStatus("Want To Read");
        setRatings(2.5);
        setNotes("");
        setCover(null);
        setValue({ startDate: null, endDate: null });
    };

    const addMutation = useMutation({
        mutationFn: createBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['BOOK_DATA'] });
            resetForm();
            onOpenChange(false);
        },
        onError: (error) => {
            console.log("Failed to add book", error);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addMutation.mutate({
            title,
            author,
            description,
            status: STATUS_VALUES[status],
            rating: ratings,
            notes,
            started_at: toDateString(value?.startDate),
            completed_at: toDateString(value?.endDate),
            book_cover: cover,
        })
        console.log("status:", status);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-black overflow-visible">
                <DialogHeader>
                    <DialogTitle>Add New Book</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex-col">
                        <input className="mb-4 shadow appearance-none border-2 border-background rounded w-full py-2 px-3 text-textcolor leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}></input>
                        <input className="mb-4 shadow appearance-none border-2 border-background rounded w-full py-2 px-3 text-textcolor leading-tight focus:outline-none focus:shadow-outline" id="author" type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)}></input>
                        <textarea className="resize-y shadow appearance-none border-2 border-background rounded w-full py-2 px-3 text-textcolor leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        <div className="flex">
                          <Dropdown options={Object.keys(STATUS_VALUES)} value={status} onChange={setStatus}/>
                          
                          <StarRating value={ratings} onChange={setRatings} />
                        </div>
                        <div className="border-2 border-background rounded w-full mb-4">
                            <Datepicker 
                                placeholder="Date Started and Finished"
                                popoverDirection="up"
                                primaryColor={"emerald"}
                                value={value} 
                                onChange={newValue => setValue(newValue)} 
                                showShortcuts={false}
                                inputClassName={"w-full text-textcolor text-md bg-primary pl-3 p-2"}
                            />
                        </div>

                        <textarea className="resize-y shadow appearance-none border-2 border-background rounded w-full py-2 px-3 mb-1 text-textcolor leading-tight focus:outline-none focus:shadow-outline" id="notes" placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)}></textarea>
                        
                        <label className=" text-sm text-background font-small">Upload Book Cover</label>
                        <input className="p-2 mb-4 mt-1 cursor-pointer bg-background border-2 border-background text-primary text-sm rounded rounded-base focus:ring-brand focus:border-brand block w-full shadow-xs file:bg-primary file:text-background hover:file:bg-primary/80 file:p-1 file:pr-2 file:pl-2 file:rounded file:mr-2" id="file_input" type="file" onChange={(e) => setCover(e.target.files?.[0] ?? null)}></input>

                        <div className="flex justify-end mt-2">
                            <Button type="submit" disabled={addMutation.isPending}>
                                {addMutation.isPending ? "Adding..." : "Add"}
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
        
    );
}

export { AddBook };