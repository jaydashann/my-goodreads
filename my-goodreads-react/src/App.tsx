import { Tiles } from "./components/tiles";
import { SearchFilter } from "./components/search-filter";

function App() {
  return (
    <main className="min-h-screen bg-background px-4 py-6">
      <SearchFilter/>
      <Tiles/>
    </main>
  );
}

export default App
