import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Video from "../pages/Video";
import Playlist from "../pages/Playlist";
import Channel from "../pages/Channel";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/videos/:videoId", element: <Video /> },
            { path: "/playlists/:playlistId", element: <Playlist /> },
            { path: "/c/:username", element: <Channel /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

export const Routes = () => <RouterProvider router={router} />;
