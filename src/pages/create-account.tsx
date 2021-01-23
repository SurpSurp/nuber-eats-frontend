import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form.error";
import UberLogo from "../images/logo.svg";
import {
    createAccountMutation,
    createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import { UserRole } from "../__generated__/globalTypes";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
        createAccount(input: $createAccountInput) {
            error
            ok
        }
    }
`;

interface ICreateAccountForm {
    email: string;
    password: string;
    role: UserRole;
}

export const CreateAccount = () => {
    const {
        register,
        getValues,
        errors,
        handleSubmit,
        formState,
    } = useForm<ICreateAccountForm>({
        mode: "onChange",
        defaultValues: {
            role: UserRole.Client,
        },
    });
    const history = useHistory();
    const onCompleted = (data: createAccountMutation) => {
        const {
            createAccount: { ok },
        } = data;
        if (ok) {
            alert("Account Created! Login now");
            history.push("/");
        }
    };
    const [
        createAccountMutaion,
        { loading, data: createAccountMutationResult },
    ] = useMutation<createAccountMutation, createAccountMutationVariables>(
        CREATE_ACCOUNT_MUTATION,
        { onCompleted }
    );
    const onSubmit = () => {
        const { email, password, role } = getValues();
        if (!loading) {
            createAccountMutaion({
                variables: {
                    createAccountInput: {
                        email,
                        password,
                        role,
                    },
                },
            });
        }
    };

    return (
        <div className="h-screen flex items-center flex-col mt-8 lg:mt-24">
            <Helmet>
                <title>Create Account | Uber Eats</title>
            </Helmet>
            <div className=" w-full max-w-screen-sm flex flex-col items-center px-5">
                <img
                    src={UberLogo}
                    alt="logo"
                    className="w-48 mb-10 lg:mb-16"
                />
                <div className="w-full mb-8">
                    <h3 className=" text-2xl lg:text-3xl text-gray-600 font-medium">
                        시작하기
                    </h3>
                </div>
                <div className="w-full text-gray-700 font-medium">
                    <h5>기본 정보 입력으로 회원가입하세요.</h5>
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
                    <select
                        name="role"
                        ref={register({ required: true })}
                        className="input"
                    >
                        {Object.keys(UserRole).map((role, index) => (
                            <option key={index}>{role}</option>
                        ))}
                    </select>
                    <Button
                        canClick={formState.isValid}
                        loading={loading}
                        actionText={"계정 만들기"}
                    />
                    {createAccountMutationResult?.createAccount.error && (
                        <FormError
                            errorMessage={
                                createAccountMutationResult?.createAccount.error
                            }
                        />
                    )}
                </form>
                <div>
                    <span>Already use Uber? </span>
                    <Link to="/">
                        <span className="text-lime-600 cursor-pointer hover:underline">
                            {" "}
                            Sign In
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
