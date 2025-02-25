"use client"

import './login.css';
import { Banner } from "@/lib/components";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ZodErrors } from "@/lib/types";
import Image from "next/image";

type Inputs = {
    email: string
    password: string,
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

        const response = await fetch("/api/auth/login", {
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

        redirect('/home');
    };

    return (<>
        <div className="d-flex flex-column justify-content-center">
            <div className="text-center" style={{ marginTop: '20vh' }}>
                <Image src="/img/logo.png" alt="Logo" className="mx-auto" width={150} height={150} priority />
            </div>

            <div className="mx-auto" style={{ width: '350px' }}>

                <Banner message={error} color={'warning'} icon={'ExclamationLg'} />

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
                    <div>
                        <button type="submit" className="w-100 btn btn-primary mt-4">
                            Log In
                        </button>
                    </div>
                    <div>
                        <a className='text-secondary forgot-passwod' href='/register'>forgot password?</a>
                    </div>
                    <div className='text-center mt-2'>
                        <p>Not member? <a href='/register'>Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    </>);
}
