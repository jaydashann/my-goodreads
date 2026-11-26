import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegHeart } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { MdMoreHoriz } from "react-icons/md";
import { RiShare2Line } from "react-icons/ri";
import { publicInstance } from "../api/api";
import Card from "./card";
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
      <DialogContent className="sm:max-w-[800px] bg-white border border-3 border-background">
        {book && (
          <div className="flex w-full max-h-[80vh] overflow-y-auto">
            <div className="shrink-0 max-w-[40%]">
              <Card image={getCoverUrl(book.book_cover)} />
            </div>
            <div className="group relative flex-1 min-w-0">
              <div className="flex h-full flex-col justify-between">
                <div>
                  {/* icons, delete */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaRegHeart className="ml-8 text-2xl" />
                      <h1 className="ml-2 font-medium">78</h1>
                      <LuMessageCircle className="ml-6 text-2xl" />
                      <RiShare2Line className="ml-6 text-2xl" />
                      <MdMoreHoriz className="ml-6 text-2xl" />
                    </div>
                    <Button
                      className="px-3 py-6 text-sm font-medium"
                      variant="edit"
                      onClick={() => deleteMutation.mutate(book.id)}
                    >
                      {deleteMutation.isPending ? "Deleting..." : "Delete"}
                    </Button>
                  </div>

                  {/* title, author */}
                  <div className="m-3 ml-5">
                    <DialogTitle className="text-2xl">{book.title}</DialogTitle>
                    <h1 className="ml-1">by {book.author}</h1>
                    <hr className="mt-2 h-0.5 border-t-0 bg-gray-200" />
                  </div>
                </div>

                {/* edit button */}
                <Button
                  variant={"edit"}
                  className="pr-48 pl-48 mr-2 self-end bg-primary text-black font-medium h-13 rounded-2xl hover:bg-black/15"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { BookInfo };
