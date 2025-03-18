import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Suspense } from "react";
import Layout from "./layout";
import NotFoundPage from "./pages/404";
import Skeleton from "./components/skeleton";
import Home from "./pages/home";
import CreateTask from "./pages/create-task/create-task";
import InfoTask from "./pages/info-task/info-task";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/"
          element={
            <Suspense fallback={<Skeleton />}>
              <Layout />
            </Suspense>
          }
        >
          <Route
            path="home"
            element={
              <Suspense fallback={<Skeleton />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="create/task"
            element={
              <Suspense fallback={<Skeleton />}>
                <CreateTask />
              </Suspense>
            }
          />
          <Route
            path="task/:id"
            element={
              <Suspense fallback={<Skeleton />}>
                <InfoTask />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
