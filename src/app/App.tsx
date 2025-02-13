import { createBrowserRouter, RouterProvider } from "react-router-dom";

import GemSPI from "@/pages/GemSPI.tsx";

import "./App.css";
import Hello from "@/pages/hello";

const router = createBrowserRouter([
  { path: "/", element: <GemSPI /> },
  { path: "/hello", element: <Hello /> },
]);
function App() {
  return (
    // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
    // </ThemeProvider>
  );
}
export default App;
