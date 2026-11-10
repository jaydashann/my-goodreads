import z from "zod";

export const BooksSchema = z.object({});

export type Book = {
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

export type NewBook = {
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

export type AddBookProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
