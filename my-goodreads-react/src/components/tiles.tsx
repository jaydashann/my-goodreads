import { publicInstance } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import Card from "./card";
import { Star } from "./star-rating";

const ASPECTS = [
    //"aspect-[9/16]",
    //"aspect-[3/5]",
    "aspect-[2/3]",
    //"aspect-[3/4]",
    //"aspect-[4/5]",
];

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function fetchBookData() {
    const result = await publicInstance.get<Books[]>('/books')
    return result.data
};

function getCoverUrl(cover: string | null): string | null {
  if (!cover) return null;
  if (cover.startsWith("http")) return cover; 
  return `${API_BASE_URL}/uploads/covers/${cover.replace(/^\//, "")}`; 
}

const STATUS_VALUES: Record<string, string> = {
        "want-to-read": "Want To Read",
        "currently-reading": "Currently Reading",
        "read": "Read",
        "did-not-finish": "Did Not Finish",
    };


export default function Tiles() {
    const {
        status,
        data,
        error
     } = useQuery({ 
        queryKey: ["BOOK_DATA"], 
        queryFn: fetchBookData,
    });

    if (status === "pending") return <div>Loading...</div>;
    if (status === "error") return <div>Error: {error.message}</div>;

    return (
        <div className="mx-auto max-w-[1800px] columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6">
            {data.map((book, i) => (
                <div
                    key={book.id}
                    className="text-center text-textcolor mb-4 break-inside-avoid rounded-2xl bg-primary p-4 transition-all hover:scale-102"
                >
                    <div className={`${ASPECTS[(i * 3 + (i % 4)) % ASPECTS.length]} w-full overflow-hidden rounded`}>
                        <Card image={getCoverUrl(book.book_cover)}/>
                    </div>
                    <div className="bg-background text-primary font-semibold p-1 m-2 mb-1 rounded">
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
                    </div>
                </div>
            ))}
        </div>
    );
}