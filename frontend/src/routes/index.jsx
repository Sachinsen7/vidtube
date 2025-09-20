import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Video from "../pages/Video";
import Playlist from "../pages/Playlist";
import Channel from "../pages/Channel";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Subscriptions from "../pages/Subscriptions";
import NotFound from "../pages/NotFound";
import Layout from "../components/common/Layout";
import VideoListPage from "../pages/VideoListPage";
import VideoUploadPage from "../pages/VideoUploadPage";
import ProfilePage from "../pages/ProfilePage";

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
            {
                element: <Layout />,
                children: [
                    { path: "/", element: <Home /> },
                    { path: "/videos/:videoId", element: <Video /> },
                    { path: "/playlists/:playlistId", element: <Playlist /> },
                    { path: "/c/:username", element: <Channel /> },
                    { path: "/dashboard", element: <Dashboard /> },
                    { path: "/login", element: <Login /> },
                    { path: "/register", element: <Register /> },
                    { path: "/subscriptions", element: <Subscriptions /> },
                    { path: "/videos", element: <VideoListPage /> },
                    { path: "/upload", element: <VideoUploadPage /> },
                    { path: "/profile", element: <ProfilePage /> },
                    { path: "*", element: <NotFound /> },
                ],
            },
        ],
    },
]);

export const Routes = () => <RouterProvider router={router} />;
