import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
 } from "./ui/dialog";
 import { getCoverUrl } from "./tiles";
import Card from "./card";
import { Button } from "./ui/button";

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

type BookInfoProps = {
    book: Books | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function BookInfo({ book, open, onOpenChange }: BookInfoProps) {
    return (
        <Dialog 
            open={open} 
            onOpenChange={onOpenChange}
        >
            <DialogContent>
                {book && (
                    <div className="flex w-100 h-100">
                        <div className="">
                            <Card image={getCoverUrl(book.book_cover)}/>
                        </div>
                        
                        <div>
                            <DialogTitle className="text-3xl">{book.title}</DialogTitle>
                            <div>{book.author}</div>
                        </div>
                        <div>
                            <Button>Edit</Button>
                            <Button>Delete</Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
};

export {BookInfo};