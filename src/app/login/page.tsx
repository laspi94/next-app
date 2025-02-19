"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string
    password: string
    remember: boolean
}

export default function LoginPage() {
    const { register, handleSubmit } = useForm<Inputs>({
        shouldUseNativeValidation: false,
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
    };

    useEffect(() => {


        return () => {
            //
        }
    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 container">
            <div className="card rounded-container p-4 shadow-lg" style={{ width: "80%", maxWidth: "450px" }}>
                <div className="d-flex align-items-center justify-content-between flex-row p-3">

                    {/* <!-- Login Form Section --> */}
                    <div className="d-flex justify-content-center align-items-center" style={{ flex: 1 }}>
                        <form method="POST" className="w-100" onSubmit={handleSubmit(onSubmit)}>
                            {/* <!-- Logo Section --> */}
                            <div className="text-center">
                                <Image src="/img/logo.png" alt="Logo" className="img-fluid"
                                    style={{ maxHeight: "150px" }} />
                            </div>

                            <br />

                            {/* @if ($errors->has('email'))
                            <div className="row">
                                <div className="alert alert-warning alert-dismissible fade show" role="alert"
                                    id="emailErrorAlert">
                                    {{ $errors-> first('email')}}
                                </div>
                            </div>
                            @endif */}


                            {/* <!-- Email --> */}
                            <div className="input-group mb-4">
                                <span className="input-group-text" id="email"><i className="bi bi-person fs-6"></i></span>
                                <input type="email" className="form-control" id="email" {...register("email")} required autoFocus />
                            </div>

                            {/* <!-- Password --> */}
                            <div className="input-group mb-4">
                                <span className="input-group-text" id="password"><i className="bi bi-key fs-6"></i></span>
                                <input type="password" className="form-control" id="password" {...register("password", {
                                    required: "El password es requerido"
                                })} />
                            </div>

                            {/* <!-- Remember Me --> */}
                            <div className="form-check mb-4">
                                {/* {{ old('remember') ? 'checked' : ''}} */}
                                <input type="checkbox" className="form-check-input"
                                    id="remember" {...register("remember")} />
                                <label className="form-check-label" htmlFor="remember">Recordar sesión</label>
                            </div>

                            {/* <!-- Submit Button --> */}
                            <div className="d-grid">
                                <button type="submit" className="btn btn-sys btn-rounded"
                                    style={{ color: "white", fontWeight: "bold" }}>Ingresar</button>
                            </div>
                        </form>
                    </div>
                </div>


                <div className="text-center mt-3">
                    <p className="text-muted mb-2" style={{ fontSize: "smaller" }}>powered by <span className="badge"
                        style={{ color: "#fff", backgroundColor: "#6c757d" }}>lab.hapore.net</span>
                    </p>
                </div>
            </div >
        </div >
    );
}
