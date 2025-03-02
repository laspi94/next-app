
"use client"

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ZodErrors } from "@/lib/types";
import { AuthLayout } from '@/components/layouts';
import Image from 'next/image';
import { Banner, LoadingSpinner } from '@/components';

type Inputs = {
    email: string
    password: string,
}

export default function Login() {
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

            setLoading(false);
            return;
        }

        redirect("/dashboard");
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
                                <Label htmlFor="password" className='mb-3'>Password</Label>
                                <Input id="password" type="password" {...register("password")} />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <LoadingSpinner /> : 'log in'}
                            </Button>
                            <div>
                                <a className='no-underline hover:underline' style={{ fontSize: '0.9em' }} href='/register'>forgot password?</a>
                            </div>
                            <div className='text-center mt-2'>
                                <p>Don&apos;t have an account? <a className='no-underline hover:underline' href='/register'>Register</a></p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthLayout>
    )
}