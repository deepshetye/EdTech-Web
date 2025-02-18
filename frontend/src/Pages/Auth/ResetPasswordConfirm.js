import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../../context/actions/auth";

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        new_password: "",
        re_new_password: "",
    });

    const { new_password, re_new_password } = formData;

    const onChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (new_password === re_new_password) {
            const uid = match.params.uid;
            const token = match.params.token;

            reset_password_confirm(uid, token, new_password, re_new_password);
            setRequestSent(true);
        } else {
            setError("Password didn't match");
        }
    };

    if (requestSent) {
        return <Redirect to='/' />;
    }

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <form onSubmit={(e) => onSubmit(e)}>
                <div style={{ width: "25rem" }}></div>
                <div className='input-field'>
                    <i className='bx bxs-lock-alt'></i>
                    <input
                        type='password'
                        placeholder='New Password'
                        value={new_password}
                        id='new_password'
                        name='new_password'
                        required
                        minLength='6'
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className='input-field'>
                    <i className='bx bxs-lock-alt'></i>
                    <input
                        type='password'
                        placeholder='Confirm New Password'
                        value={re_new_password}
                        id='new_password'
                        name='re_new_password'
                        required
                        minLength='6'
                        onChange={(e) => onChange(e)}
                    />
                </div>
                {error && <div style={{ color: "red", padding: "3px 0" }}>{error}</div>}
                <button className='btn' style={{ maxWidth: "28em", width: "100%" }} type='submit'>
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
