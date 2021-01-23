import React from "react";

interface IButtonProps {
    canClick: boolean;
    loading: boolean;
    actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
    canClick,
    loading,
    actionText,
}) => (
    <button
        className={`
        mt-3 py-3 px-3 focus:outline-none text-lg  text-white  font-medium ${
            canClick
                ? "bg-lime-600 hover:bg-lime-700 transition-colors"
                : "bg-warmGray-200 pointer-events-none"
        } 
        `}
    >
        {loading ? "Loading..." : actionText}
    </button>
);
