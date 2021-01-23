import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form.error";
import { LOCAL_TOKEN } from "../constants";
import UberLogo from "../images/logo.svg";
import {
    loginMutation,
    loginMutationVariables,
} from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput: LoginInput!) {
        login(input: $loginInput) {
            ok
            error
            token
        }
    }
`;

interface ILoginForm {
    email: string;
    password: string;
}

export const Login = () => {
    const {
        register,
        getValues,
        errors,
        handleSubmit,
        formState,
    } = useForm<ILoginForm>({ mode: "onChange" });
    const onCompleted = (data: loginMutation) => {
        const {
            login: { ok, token },
        } = data;
        if (ok && token) {
            localStorage.setItem(LOCAL_TOKEN, token);
            authTokenVar(token);
            isLoggedInVar(true);
        }
    };
    const [loginMutation, { data: loginMutaionResult, loading }] = useMutation<
        loginMutation,
        loginMutationVariables
    >(LOGIN_MUTATION, {
        onCompleted,
    });
    const onSubmit = () => {
        if (!loading) {
            const { email, password } = getValues();
            loginMutation({
                variables: {
                    loginInput: {
                        email,
                        password,
                    },
                },
            });
        }
    };

    return (
        <div className="h-screen flex items-center flex-col mt-8 lg:mt-24">
            <Helmet>
                <title>Login | Uber Eats</title>
            </Helmet>
            <div className=" w-full max-w-screen-sm flex flex-col items-center px-5">
                <img
                    src={UberLogo}
                    alt="logo"
                    className="w-48 mb-10 lg:mb-16"
                />
                <div className="w-full mb-8">
                    <h3 className=" text-2xl lg:text-3xl text-gray-600 font-medium">
                        돌아오신 것을 환영합니다
                    </h3>
                </div>
                <div className="w-full text-gray-700 font-medium">
                    <h5>이메일 주소로 로그인하세요.</h5>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-3 mt-3  w-full mb-5"
                >
                    <input
                        ref={register({
                            required: "Email is required",
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                        type="email"
                        name="email"
                        placeholder="이메일"
                        required
                        className="input"
                    />

                    {errors.email?.message && (
                        <FormError errorMessage={errors.email?.message} />
                    )}
                    {errors.email?.type === "pattern" && (
                        <FormError
                            errorMessage={"이메일이 유효하지 않습니다"}
                        />
                    )}
                    <input
                        ref={register({
                            required: "Password is required",
                            minLength: 6,
                        })}
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        required
                        className="input"
                    />
                    {errors.password?.message && (
                        <FormError errorMessage={errors.password?.message} />
                    )}
                    {errors.password?.type === "minLength" && (
                        <FormError errorMessage="Password must be more than 6 chars." />
                    )}
                    <Button
                        canClick={formState.isValid}
                        loading={loading}
                        actionText={"로그인"}
                    />
                    {loginMutaionResult?.login.error && (
                        <FormError
                            errorMessage={loginMutaionResult.login.error}
                        />
                    )}
                </form>
                <div>
                    <span>Uber는 처음이신가요? </span>
                    <Link to="/create-account">
                        <span className="text-lime-600 cursor-pointer hover:underline">
                            {" "}
                            계정 만들기
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
