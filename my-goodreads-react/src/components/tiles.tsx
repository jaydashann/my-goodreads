import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { publicInstance } from "../api/api";
import { BookInfo } from "./book-info-dialog";
import Card from "./card";
import { Star } from "./star-rating";
import { Button } from "./ui/button";

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchBookData() {
  const result = await publicInstance.get<Books[]>("/books");
  return result.data;
}

export function getCoverUrl(cover: string | null): string | null {
  if (!cover) return null;
  if (cover.startsWith("http")) return cover;
  return `${API_BASE_URL}/uploads/covers/${cover.replace(/^\//, "")}`;
}

const STATUS_VALUES: Record<string, string> = {
  "want-to-read": "Want To Read",
  "currently-reading": "Currently Reading",
  read: "Read",
  "did-not-finish": "Did Not Finish",
};

export default function Tiles() {
  const [selectedBook, setSelectedBook] = useState<Books | null>(null);

  const { status, data, error } = useQuery({
    queryKey: ["BOOK_DATA"],
    queryFn: fetchBookData,
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;

  return (
    <div className="@container">
      <div className="columns-2 gap-4 @min-[488px]:columns-[236px]">
        {data.map((book, i) => (
          <div
            key={book.id}
            className="text-center text-textcolor mb-4 break-inside-avoid rounded-2xl bg-background"
            onClick={() => setSelectedBook(book)}
          >
            <div className="group relative rounded-xl shadow-md w-full overflow-hidden rounded">
              {/* <div className="absolute inset-0 bg-gradient-to-b from-black rounded-xl opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out"></div> */}
              <Card image={getCoverUrl(book.book_cover)} />
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-neutral-600 opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
              <Button
                variant={"edit"}
                className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 bg-red font-medium m-1"
              >
                Edit
              </Button>
            </div>
            <div className=" flex w-full min-w-0 px-1 pt-1 text-left text-sm font-medium">
              <h1 title={book.title}>{book.title}</h1>
              <p className="truncate" title={book.author}>
                : {book.author}
              </p>
            </div>
            {/* <div className="bg-background text-primary font-semibold p-1 m-2 mb-1 rounded">
              <h1>{book.title}</h1>
            </div>
            <div className="">
              <h1>by {book.author}</h1>
            </div>
            <div className="mb-1">
              <h1>{STATUS_VALUES[book.status] ?? book.status}</h1>
            </div>
            <div className="flex items-center justify-center">
              <h1 className="mr-1 font-semibold">{book.rating}</h1>
              {...Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={22}
                  fill={Math.max(0, Math.min(book.rating - index, 1))}
                />
              ))}
            </div> */}
          </div>
        ))}
      </div>
      <BookInfo
        book={selectedBook}
        open={selectedBook !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedBook(null);
        }}
      />
    </div>
  );
}
