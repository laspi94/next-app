"use client";

import { Banner } from "@/lib/components";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ZodErrors } from "@/lib/types";
import Image from "next/image";
import './register.css';

type Inputs = {
    email: string
    name: string,
    password: string,
    confirmedPassword: string
}

export default function LoginPage() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>('');

    const { register, handleSubmit } = useForm<Inputs>({
        shouldUseNativeValidation: false,
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setError(null);
        setErrors({});

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            try {
                const parsedMessage: ZodErrors = JSON.parse(result.message);

                const errorMessages: Record<string, string> = {};

                parsedMessage.forEach((error) => {
                    errorMessages[error.path[0]] = error.message;
                });

                setErrors(errorMessages);
            } catch (error) {
                setError(result.message);
            }

            return;
        }

        redirect('/login');
    };

    return (
        <>
            <div className="d-flex flex-column justify-content-center">
                <div className="text-center" style={{ marginTop: '10vh' }}>
                    <Image src="/img/logo.png" alt="Logo" className="mx-auto" width={150} height={150} priority />
                </div>

                <div className="mx-auto" style={{ width: '350px' }}>

                    <Banner message={error} color={'warning'} icon="ExclamationLg" />

                    <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="email" className="control-label required">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register("email")}
                                autoComplete="email"
                                className="form-control"
                            />
                            {errors.email && <p className="text-danger">{errors.email}</p>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="control-label required">
                                Nombre
                            </label>
                            <input
                                id="name"
                                {...register("name")}
                                autoComplete="name"
                                className="form-control"
                            />
                            {errors.name && <p className="text-danger">{errors.name}</p>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="control-label required">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register("password")}
                                autoComplete="current-password"
                                className="form-control"
                            />
                            {errors.password && <p className="text-danger">{errors.password}</p>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmedPassword" className="control-label required">
                                Confirmar contraseña
                            </label>
                            <input
                                id="confirmedPassword"
                                type="password"
                                {...register("confirmedPassword")}
                                autoComplete="current-confirmedPassword"
                                className="form-control"
                            />
                            {errors.confirmedPassword && <p className="text-danger">{errors.confirmedPassword}</p>}
                        </div>

                        <div>
                            <button type="submit" className="w-100 btn btn-primary mt-4">
                                Sign In
                            </button>
                        </div>
                        <div className='text-center mt-2'>
                            <p>You have an account? <a href='/loign'>log in</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
