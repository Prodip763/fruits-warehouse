import React from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import GoogleLogin from "../../Social/Google/GoogleLogin";
import Loading from "../../shared/Loading/Loading";

const Register = () => {
    
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, updatingError] = useUpdateProfile(auth);

    let errorElement;

    const handleRegister = async(e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        if (password !== confirmPassword) {
            alert("Password didn't match")
        }
        else {
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name });
            alert('Updated profile');
            navigate('/home');
        }


    }
    if (loading || updating) {
        return <Loading></Loading>
      }
    if (error || updatingError) {
        errorElement = <p className="text-red-500 text-center">Error: {error.message}</p>
    }

    



    
    const handleLogin = () => {
        navigate('/login');
    }


    return (
        <div className="my-28">
            <form onSubmit={handleRegister}>
                <h2 className="text-center text-pink-500 text-2xl">Please Register Fruits Warehouse</h2>
                <label className="block ">
                    <span className="block text-center text-sm font-medium text-slate-700">User Name</span>
                    <input type="text" name="name" className="mx-auto w-1/2 mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500       
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
                </label>
                <label className="block ">
                    <span className="block text-center text-sm font-medium text-slate-700">Your Email</span>
                    <input type="email" name="email" required className="mx-auto w-1/2 mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500       
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
                </label>
                <label className="block">
                    <span className="block text-center text-sm font-medium text-slate-700">Password</span>
                    <input type="password" name="password" required className="mx-auto w-1/2 mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500       
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
                </label>
                <label className="block">
                    <span className="block text-center text-sm font-medium text-slate-700">Confirm Password</span>
                    <input type="password" name="confirmPassword" required className="mx-auto w-1/2 mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500       
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
                </label>
                <input className="mx-auto block w-1/2 mt-2  bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" type='submit' value="Register"></input>
            </form>
            {errorElement}
            <p className="mt-4 text-center font-medium">If you have a fruits warehouse account? <span onClick={handleLogin} className="text-pink-600 cursor-pointer">Please SignIn</span></p>
            <GoogleLogin></GoogleLogin>
        </div>
    );
};

export default Register;