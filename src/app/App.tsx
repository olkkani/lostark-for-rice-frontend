import { createBrowserRouter, RouterProvider } from "react-router-dom";

import GemSpi from "@/pages/GemSpi";
import "./App.css";

const router = createBrowserRouter([{ path: "/", element: <GemSpi /> }]);
function App() {
  return (
    // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
    // </ThemeProvider>
  );
}
export default App;
