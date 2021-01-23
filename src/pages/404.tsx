import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => (
    <div className="h-screen flex flex-col justify-center items-center">
        <h2 className="font-semibold text-4xl mb-5 tracking-wide">
            Page not Found
        </h2>
        <h4 className="font-medium text-xl mb-10">
            The page you're looking for does not exist or has moved
        </h4>
        <Link className="hover:underline cursor-pointer text-lime-600" to="/">
            Go back home &rarr;
        </Link>
    </div>
);
