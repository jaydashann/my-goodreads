import { IoSearch } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { publicInstance } from "../api/api";
import { useState } from "react";

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

async function fetchBookData() {
    const result = await publicInstance.get<Books[]>('/books')
    return result.data
};

export default function SearchFilter() {
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

    const [searchQuery, setSearchQuery] = useState("");

    const clearSearchQuery = () => {
        setSearchQuery("");
    };

    const filterData = data?.filter(books => 
        `${books.title}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="mb-6 relative">
                <div className="flex items-center rounded-lg p-2 gap-2 bg-primary rounded cursor-pointer">
                    <IoSearch className="text-textcolor ml-1" />
                    <input
                    type="text"
                    placeholder="Search..."
                    className="w-full text-textcolor outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.currentTarget.value)}
                    />
                    {searchQuery.length > 0 && (<IoIosCloseCircle className="text-textcolor mr-1" onClick={clearSearchQuery}/>)}
                </div>
                {searchQuery.length > 0 && (<div className="absolute max-h-[200px] w-full overflow-auto flex flex-col p-2 bg-primary shadow-2xl">
                    {filterData.length !== 0 ? filterData?.map((books, i) => (
                        <div key={i} className="flex gap-4 items-center hover:bg-background/50 p-2 pointer-cursor">
                            <div>{`${books.title}`}</div>
                        </div>
                    )): <div>No book available</div>}
                </div>)}
            </div>
            
        </div>
    );
}
