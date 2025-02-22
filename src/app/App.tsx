import { createBrowserRouter, RouterProvider } from "react-router-dom";

import GemSPI from "@/pages/GemSPI.tsx";

import "./App.css";

const router = createBrowserRouter([{ path: "/", element: <GemSPI /> }]);
function App() {
  return (
    // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
    // </ThemeProvider>
  );
}
export default App;
