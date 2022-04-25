import Link from 'next/link';
import Axios from 'axios';
import { useRef, useState } from 'react';

const Signin = () => {

    //add variables to store user input
    const username = useRef();
    const password = useRef();

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            username: username.current.value, 
            password: password.current.value
        }).then(response => {
            console.log(response);
            if(response.data.status == 'success' ){
                let storage = window.localStorage;
                storage.setItem("username", username.current.value);
                window.location = '/'
            }else{
                let storage = window.localStorage;
                storage.setItem("username", "");
            }
        })
        // console.log("username", username.current.value)
        // console.log("password", password.current.value)
    }

    return (
        <div className="account-wrapper">
            <h3 className="title">Sign In</h3>
            <div className="account-form">
                <div className="form-floating mb-3">
                    <input ref={username} type="text" className="form-control" id="floatingInput"
                        placeholder="User ID"/>
                    <label>User ID</label>
                </div>
                <div className="form-floating">
                    <input ref={password} type="password" className="form-control" id="floatingPassword"
                        placeholder="Password" />
                    <label>Password</label>
                </div>
                {/* <div className="form-group">
                    <div className="d-flex justify-content-between flex-wrap pt-sm-2">
                        <div className="checkgroup">
                            <input type="checkbox" name="remember" id="remember" />
                            <label>Remember Me</label>
                        </div>
                        <Link href="/forgotpassword">
                        <a >Forgot Password?</a>
                        </Link>
                    </div>
                </div> */}
                <hr/>
                <div className="form-group">
                    <button className="d-block default-btn move-top" onClick={login}>Sign In</button>
                </div>
            </div>
            <div className="account-bottom">
                <span className="d-block cate pt-10">Don’t Have any Account? &nbsp;
                <Link href="/signup">
                <a > Sign Up</a>
                </Link>
                </span>
                {/* <span className="or"><span>or</span></span>
                {/* <h5 className="subtitle">Login With Social Media</h5>
                <ul className="social-media social-color lab-ul d-flex justify-content-center">
                    <li>
                        <a href="#" className="facebook"><i className="icofont-facebook"></i></a>
                    </li>
                    <li>
                        <a href="#" className="twitter"><i className="icofont-twitter"></i></a>
                    </li>
                    <li>
                        <a href="#" className="linkedin"><i className="icofont-linkedin"></i></a>
                    </li>
                    <li>
                        <a href="#" className="instagram"><i className="icofont-instagram"></i></a>
                    </li>
                    <li>
                        <a href="#" className="pinterest"><i className="icofont-pinterest"></i></a>
                    </li>
                </ul> */}
            </div>
        </div>
    )
}

export default Signin;