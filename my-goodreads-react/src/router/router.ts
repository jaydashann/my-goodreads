import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const ReactRouter = (children: React.ReactNode) =>
  createBrowserRouter(createRoutesFromElements(children));

export default ReactRouter;
