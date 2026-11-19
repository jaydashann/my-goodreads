import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { publicInstance } from "../api/api";
import Card from "./card";
import { Star } from "./star-rating";
import { getCoverUrl } from "./tiles";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

type Books = {
  id: string;
  user_id: string;
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
};

async function deleteBook(id: string) {
  const result = await publicInstance.delete<Books[]>(`/books/${id}`);
  return result.data;
}

function BookInfo({ book, open, onOpenChange }: BookInfoProps) {
  const queryClient = useQueryClient();

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
        exact: false,
      });
      onOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[750px]">
        {book && (
          <div className="w-full max-h-[80vh] overflow-y-auto">
            <div className="flex gap-6">
              {/* book cover and rating */}
              <div className="w-40 shrink-0 sm:w-48">
                <div className="aspect-[2/3] w-full rounded">
                  <Card image={getCoverUrl(book.book_cover)} />
                  <div className="flex items-center justify-center mt-3">
                    <h1 className="mr-1 font-semibold text-lg">
                      {book.rating}
                    </h1>
                    {...Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        size={28}
                        fill={Math.max(0, Math.min(book.rating - index, 1))}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* book info */}
              <div className="flex min-w-0 flex-1 flex-col">
                {/* title */}
                <DialogTitle className="text-3xl leading-tight text-right">
                  {book.title}
                </DialogTitle>
                {/* author */}
                <div className="mt-1 text-lg opacity-80 text-right">
                  {book.author}
                </div>
                {/* <div className="flex justify-end">
                  <h1 className="mr-1 font-semibold">{book.rating}</h1>
                  {...Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={20}
                      fill={Math.max(0, Math.min(book.rating - index, 1))}
                    />
                  ))}
                </div> */}
                {/* description */}
                <div>
                  <h1 className="pr-3 pl-3 bg-background font-semibold">
                    Description
                  </h1>
                  <div className="pr-3 pl-3 text-justify">
                    <div>
                      {isExpanded
                        ? book.description
                        : `${book.description.substring(0, 500)}...`}
                    </div>
                    <button
                      className="underline hover:text-accent cursor-pointer"
                      onClick={toggleExpansion}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  </div>
                </div>
                {/* notes */}
                <div>
                  <h1 className="pr-3 pl-3 mt-4 font-semibold">Notes</h1>
                  <div className="pr-3 pl-3 text-justify">{book.notes}</div>
                </div>
                {/* start and end date */}
                <div className="flex pr-3 pl-3 mt-4">
                  <h1 className="mt-2 mr-2 font-medium">Started:</h1>
                  <h1 className="bg-background p-2 mr-4 rounded text-primary font-medium">
                    {book.started_at}
                  </h1>
                  <h1 className="mt-2 mr-1 font-medium">Finished:</h1>
                  <h1 className="bg-background p-2 ml-1 rounded text-primary font-medium">
                    {book.completed_at}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="mr-3">Edit</Button>
              <Button onClick={() => deleteMutation.mutate(book.id)}>
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { BookInfo };
