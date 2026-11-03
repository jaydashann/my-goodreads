import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

type DropdownProps = {
    options: string[];
    value: string;
    onChange: (value: string) => void;
};

const Dropdown = ({ options, value, onChange }: DropdownProps) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    
    const handleClickAway = () => setIsDropdownVisible(false);

    const dropdownContent = (
        <div className="absolute z-10 w-full bg-primary rounded shadow-xl">
            {options.map(option => (
                <div 
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsDropdownVisible(false);
                  }} 
                  className="px-3 py-2 cursor-pointer hover:bg-secondary text-textcolor"
                >
                    {option}
                </div>
            ))}
        </div>
    );

    return (
        <div className="w-full justify-center pt-2">
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className="relative">
                    <div 
                      onClick={() => setIsDropdownVisible(!isDropdownVisible)} 
                      className="border-3 border-background px-3 py-5 rounded h-7 flex items-center text-background shadow-xl justify-between"
                    >
                        {value} 
                        <FaCaretDown 
                            className={`${
                                isDropdownVisible ? "rotate-180 transition" : ""
                            }`}
                        />
                    </div>
                    {isDropdownVisible && dropdownContent}
                </div>
            </ClickAwayListener>
        </div>
    );
};

export default Dropdown;