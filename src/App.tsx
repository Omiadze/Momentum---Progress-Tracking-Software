import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Suspense } from "react";
import Layout from "./layout";
import NotFoundPage from "./pages/404";
import Skeleton from "./components/skeleton";
import Home from "./pages/home";
import CreateTask from "./pages/createTask/create-task";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
