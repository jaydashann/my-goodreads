import { MdOutlineSearch } from "react-icons/md";

export function SearchBar({
  onChange,
  value,
  placeholder
}: {
  onChange: (e: string) => void;
  value?: string;
  placeholder?: string;
}) {
  return (
    <div
      className={"bg-primary/5 shadow-xs rounded flex gap-3 items-center max-w-96 px-3 py-2"}
    >
      <MdOutlineSearch size={22} className="text-primary" />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className="bg-transparent flex-grow focus-visible:outline-0 text-sm"
        type="text"
        placeholder={placeholder ?? "Search For Keywords"}
      />
    </div>
  );
}
