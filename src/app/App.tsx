import { createBrowserRouter, RouterProvider } from "react-router-dom";

import GemChart from "@/pages/GemChart.tsx";
import "./App.css";
import { ThemeProvider } from "./theme-provider";

const router = createBrowserRouter([{ path: "/", element: <GemChart /> }]);
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
export default App;
