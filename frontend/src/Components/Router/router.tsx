import { createBrowserRouter, Navigate } from "react-router-dom";
import { OtpPage } from "../OtpPage/optPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/otp" replace />,
    },
    {
        path: "/otp",
        element: <OtpPage />,
    },
]);