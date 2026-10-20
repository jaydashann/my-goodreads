import Tiles from "../components/tiles";
import SearchFilter from "../components/search-filter";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <SearchFilter/>
      <Tiles/>
    </div>
  );
}
