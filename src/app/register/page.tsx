"use client";

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ZodErrors } from "@/lib/types";
import Image from "next/image";
import { AuthLayout } from '@/components/layouts';
import { Banner, LoadingSpinner } from '@/components';

type Inputs = {
    email: string
    name: string,
    password: string,
    confirmedPassword: string
}

export default function LoginPage() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>('');
    const [isLoading, setLoading] = useState(false);

    const { register, handleSubmit } = useForm<Inputs>({
        shouldUseNativeValidation: false,
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
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

            setLoading(false);
            return;
        }

        redirect('/login');
    };

    return (
        <AuthLayout>
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-96 shadow-md">
                    <CardHeader>
                        <Image src="/img/logo.png" alt="Logo" className="mx-auto" width={150} height={150} priority />
                        <CardTitle className='text-center'>Top Detailing</CardTitle>
                        <Banner message={error} showTitle={false} />
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label htmlFor="email" className='mb-3'>Email</Label>
                                <Input id="email" type="email" {...register("email")} />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div>
                                <Label htmlFor="name" className='mb-3'>Name</Label>
                                <Input id="name" type="name" {...register("name")} />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div>
                                <Label htmlFor="password" className='mb-3'>Password</Label>
                                <Input id="password" type="password" {...register("password")} />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <div>
                                <Label htmlFor="confirmedPassword" className='mb-3'>Password Confirm </Label>
                                <Input id="confirmedPassword" type="password" {...register("confirmedPassword")} />
                                {errors.confirmedPassword && <p className="text-red-500 text-sm">{errors.confirmedPassword}</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <LoadingSpinner /> : 'Register'}
                            </Button>
                            <div className='text-center mt-2'>
                                <p>You have an account? <a className='no-underline hover:underline' href='/loign'>log in</a></p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthLayout>

    );
}
