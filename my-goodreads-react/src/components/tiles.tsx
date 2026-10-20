import { publicInstance } from "../api/api";
import { useQuery } from "@tanstack/react-query";

const ASPECTS = [
    "aspect-[3/4]",
    "aspect-square",
    "aspect-[2/3]",
    "aspect-[4/5]",
    "aspect-[3/5]",
    "aspect-[5/4]",
    "aspect-[9/16]",
];

type Books = {
  id: number;
  user_id: number;
  book_cover: null;
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
}

async function fetchBookData() {
    const result = await publicInstance.get<Books[]>('/books')

    return result.data
};


export default function Tiles() {
    const {
        status,
        data,
        error
     } = useQuery({ 
        queryKey: ["BOOK_DATA"], 
        queryFn: fetchBookData 
    })

    return (
        <div className="mx-auto max-w-[1800px] columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6">
            {data.map((book, i) => (
                <div
                    key={book.id}
                    className={`${ASPECTS[(i * 3 + (i % 4)) % ASPECTS.length]} mb-4 break-inside-avoid rounded-2xl bg-primary p-4 transition-all hover:scale-102`}
                >
                    <h3>
                        {book.title}
                    </h3>
                </div>
            ))}
        </div>
    );
}