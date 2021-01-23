import React from "react";
import UberLogo from "../images/logo.svg";
import { HiMenu, HiLocationMarker, HiUser } from "react-icons/hi";
import { useMe } from "../hooks/useMe";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
    const { data } = useMe();
    return (
        <>
            {!data?.me.verified && (
                <div className="bg-yellow-100 py-3 text-center">
                    <span className=" text-gray-500 ">
                        Please verify your email!
                    </span>
                </div>
            )}
            <header className="py-6">
                <div className="w-full max-w-screen-3xl mx-auto flex justify-between ">
                    <div className="flex justify-between  w-3/5">
                        <div className="flex w-1/3 justify-start items-center">
                            <HiMenu className=" text-2xl mr-8" />
                            <img className=" w-40" src={UberLogo} alt="logo" />
                        </div>
                        <div className="w-2/3 flex justify-start items-center px-5 border-b border-warmGray-200 bg-warmGray-100 ">
                            <HiLocationMarker className="text-2xl" />
                            <input
                                className="bg-gray-100 w-4/5 px-5 py-4 focus:outline-none"
                                type="search"
                                name="search"
                                placeholder="Enter delivery address"
                            />
                        </div>
                    </div>
                    <div className="w-2/5 flex justify-end items-center">
                        <Link to="/user-profile">
                            <span className="bg-warmGray-200 flex items-center justify-center rounded-3xl w-20 py-3 px-3 text-sm font-medium cursor-pointer hover:bg-warmGray-300">
                                <HiUser className="text-2xl" />
                            </span>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
};
