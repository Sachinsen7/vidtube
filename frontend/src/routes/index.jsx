import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Video from "../pages/Video";
import Playlist from "../pages/Playlist";
import Channel from "../pages/Channel";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

const AppComponent = React.lazy(() => import("../App"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <React.Suspense fallback={<div>Loading...</div>}>
                <AppComponent />
            </React.Suspense>
        ),
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
