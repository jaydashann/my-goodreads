import { IoSearch } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

export default function SearchFilter() {
    return (
        <div>
            <div className="mb-6">
                <div className="flex items-center rounded-lg p-2 gap-2 bg-primary cursor-pointer">
                    <IoSearch className="text-textcolor ml-1" />
                    <input
                    type="text"
                    placeholder="Search..."
                    className="w-full text-textcolor outline-none"
                    />
                    <IoIosCloseCircle className="text-textcolor mr-1"/>
                </div>
            </div>
            
        </div>
    );
}
