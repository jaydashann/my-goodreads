import { Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import ReactRouter from "./router/router";
// export default function App() {
//   return <Dashboard />;
// }

export const App = ReactRouter(<Route path="" element={<Login />} />);
