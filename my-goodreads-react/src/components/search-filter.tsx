import { IoSearch } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

export default function SearchFilter() {
    return (
        <div>
            <div className="mb-6">
                <div className="flex items-center rounded-md p-2 gap-2 bg-primary">
                    <IoSearch className="text-background" />
                    <input
                    type="text"
                    placeholder="Search..."
                    className="w-full text-background outline-none"
                    />
                    <IoIosCloseCircle className="text-background"/>
                </div>
            </div>
            
        </div>
    );
}
