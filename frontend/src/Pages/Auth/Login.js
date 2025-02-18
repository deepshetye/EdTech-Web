import React, { useState } from "react";
import axios from "axios";
// import { facebookLogin } from "../../helpers/facebook.js";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login, signup } from "../../context/actions/auth.js";
import { loginUser, signupUser } from "../../axios.js";

const Login = ({ login, signup }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();

    const initialSignInFormData = Object.freeze({
        email: "",
        password: "",
    });

    const initialSignUpFormData = Object.freeze({
        first_name: "",
        email: "",
        password: "",
        re_password: "",
    });

    const [signInFormData, updateSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, updateSignUpFormData] = useState(initialSignUpFormData);

    const handleSignInChange = (e) => {
        setError("");
        updateSignInFormData({
            ...signInFormData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSignUpChange = (e) => {
        setError("");
        updateSignUpFormData({
            ...signUpFormData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleFormAuth = async (e, key) => {
        e.preventDefault();
        switch (key) {
            case 5:
                // Sign Up
                if (!signUpFormData.first_name) {
                    setError("Please enter your name");
                }
                if (!signUpFormData.email) {
                    setError("Please enter your email");
                }
                if (!signUpFormData.password) {
                    setError("Please enter a password");
                }
                if (signUpFormData.password.length < 6) {
                    setError("Password must be atleast 6 character long");
                } else if (
                    document.getElementById("sign-up-form")["password-input"].value ===
                    document.getElementById("sign-up-form")["re_password-input"].value
                ) {
                    try {
                        const res = await signupUser({
                            first_name: signUpFormData.first_name,
                            email: signUpFormData.email,
                            password: signUpFormData.password,
                            re_password: signUpFormData.re_password,
                        });
                        await signup(res); // Storing in redux
                        setAccountCreated(true);
                        history.push("/check-email");
                        document.getElementById("sign-up-form").reset();
                    } catch (err) {
                        {
                            err.response.data.password && setError(err.response.data.password[0]);
                        }
                        {
                            err.response.data.email && setError(err.response.data.email[0]);
                        }
                    }
                } else {
                    setError("Password doesn't match");
                }
                break;

            case 6:
                // Sign In
                try {
                    const res = await loginUser({
                        email: signInFormData.email,
                        password: signInFormData.password,
                    });
                    await login(res); // Storing in redux
                    document.getElementById("sign-in-form").reset();
                } catch (err) {
                    setError(err.response.data.detail);
                }
                break;

            default:
                break;
        }
    };

    const handleGoogleSignIn = async (key) => {
        try {
            const res = await axios.get(
                `https://edtech1.herokuapp.com/auth/o/google-oauth2/?redirect_uri=https://edtech1.herokuapp.com`
            );
            console.log(res);
            window.location.replace(res.data.authorization_url);
        } catch (err) {
            console.log(err);
        }
    };

    const switchToSignUp = () => {
        document.getElementById("container").classList.add("sign-up-mode");
    };

    const switchToSignIn = () => {
        document.getElementById("container").classList.remove("sign-up-mode");
    };

    if (accountCreated) {
        return <Redirect to='/check-email' />;
    }

    return (
        <>
            <div className='container' id='container'>
                <div className='forms-container'>
                    <div className='signin-signup'>
                        <form
                            onSubmit={(e) => handleFormAuth(e, 6)}
                            className='sign-in-form'
                            id='sign-in-form'
                            autoComplete='false'
                        >
                            <h2 className='title'>Sign in</h2>
                            <div className='input-field'>
                                <i className='bx bxs-user'></i>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    id='email-signin'
                                    name='email'
                                    required
                                    onChange={(e) => handleSignInChange(e)}
                                />
                            </div>

                            <div className='input-field'>
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    id='password-signin'
                                    name='password'
                                    minLength='6'
                                    required
                                    onChange={handleSignInChange}
                                />
                            </div>
                            {error && (
                                <div style={{ color: "red", textAlign: "center" }}>{error}</div>
                            )}
                            <button type='submit' className='btn'>
                                Login
                            </button>

                            <p className='social-text' style={{ textAlign: "center" }}>
                                Forgot Your Password?{" "}
                                <Link
                                    to='/reset-password'
                                    style={{
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        color: "black",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Reset Password
                                </Link>
                            </p>

                            {/* <p className="social-text">Or Sign In with Social Platforms</p>

              <div className="social-media">
                <div className="social-icon" onClick={() => handleSignIn(1)}>
                  <FaFacebook />
                </div>
                <div className="social-icon" onClick={() => handleSignIn(2)}>
                  <AiFillTwitterCircle />
                </div>
                <div className="social-icon" onClick={() => handleSignIn(3)}>
                  <FaGooglePlus />
                </div>
                <div className="social-icon" onClick={() => handleSignIn(4)}>
                  <FaGithub />
                </div>
              </div> */}
                        </form>

                        <form
                            onSubmit={(e) => handleFormAuth(e, 5)}
                            className='sign-up-form'
                            id='sign-up-form'
                        >
                            <h2 className='title'>Sign up</h2>
                            <div className='input-field '>
                                <i className='bx bxs-user'></i>
                                <input
                                    type='name'
                                    placeholder='Name'
                                    id='name-input'
                                    name='first_name'
                                    required
                                    onChange={handleSignUpChange}
                                />
                            </div>
                            <div className='input-field '>
                                <i className='bx bxs-envelope'></i>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    id='email-input'
                                    name='email'
                                    required
                                    onChange={handleSignUpChange}
                                />
                            </div>
                            <div className='input-field'>
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    id='password-input'
                                    name='password'
                                    required
                                    onChange={handleSignUpChange}
                                />
                            </div>
                            <div className='input-field'>
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type='password'
                                    placeholder='Confirm Password'
                                    id='re_password-input'
                                    name='re_password'
                                    required
                                    onChange={handleSignUpChange}
                                />
                            </div>
                            {error && (
                                <div style={{ color: "red", textAlign: "center" }}>{error}</div>
                            )}
                            <input type='submit' className='btn' value='Sign up' />

                            {/* <p className="social-text">Or Sign Up with Social Platforms</p>

              <div className="social-media">
                <div className="social-icon" onClick={() => handleSignIn(1)}>
                  <FaFacebook />
                </div>
                <div className="social-icon" onClick={() => handleSignIn(2)}>
                  <AiFillTwitterCircle />
                </div>
                <div className="social-icon" onClick={() => handleSignIn(3)}>
                  <FaGooglePlus />
                </div>
                <div className="social-icon" onClick={() => handleSignIn(4)}>
                  <FaGithub />
                </div>
              </div> */}
                        </form>
                    </div>
                </div>

                <div className='panels-container'>
                    <div className='panel left-panel'>
                        <div className='content'>
                            <h3>New here ?</h3>
                            <p>
                                Register now to get access to Notes, Textbooks, Timebable and Many
                                More..
                            </p>
                            <button
                                className='btn transparent sign-up-btn'
                                id='sign-up-btn'
                                onClick={switchToSignUp}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                    <div className='panel right-panel'>
                        <div className='content'>
                            <h3>One of us ?</h3>
                            <p>Welcome back buddy! Just sign in to continue learning :)</p>
                            <button
                                className='btn transparent sign-in-btn'
                                id='sign-in-btn'
                                onClick={switchToSignIn}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isActivated: state.auth.isActivated,
    user: state.auth.user,
});

export default connect(mapStateProps, { login, signup })(Login);
