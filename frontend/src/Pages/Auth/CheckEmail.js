import React from "react";

const CheckEmail = () => {
    return (
        <div
            style={{
                textAlign: "center",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >
            <h4>
                Link has been sent to your{" "}
                <a
                    href='http://www.gmail.com/'
                    style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
                >
                    {" "}
                    Mail{" "}
                </a>
            </h4>
        </div>
    );
};

export default CheckEmail;
