import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { response } from 'express';

const LoginForm = () => {
    let navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const onSubmit = (data) => loginSuccess(data);

    const login = (data) => {
        fetch("/auth/login", {
        })
        .then((r) => r.json())
        .then((response) => {
            console.log(response);
            if (response.auth) {
                setLoginSuccess(true);
            } else {
                alert('Login failed');
            }
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    };
    if(loginSuccess){
        return navigate('/players');
    }
    return(
        <div className='loginForm'>
            <h2> Login Form </h2>
            <form className='form-login' onSubmit={handleSubmit(onSubmit)}>
                <div className='field'>
                    <label> Name: </label>
                    <input name="name" {...register('name')} />
                </div>
                <div className='field'>
                    <label> PassWord: </label>
                    <input name="password" {...register('name')} />
                </div>
                <input className='submit' type='submit' />
            </form>
        </div>
    )
}