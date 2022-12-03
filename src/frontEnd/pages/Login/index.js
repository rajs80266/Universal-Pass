import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";
import './style.css';

const Login = (props) => {
    const [userType, setUserType] = useState("customer");
    const { contract } = props;

    const history = useHistory();
    const loginAccount = async () => {
        try {
            if(userType.toLocaleLowerCase() === "manager") history.push('/managerHomepage');
            else {
                await contract.login(userType.toLocaleLowerCase());
                switch (userType.toLocaleLowerCase()) {
                    case ("customer"):
                        history.push('/customerHomepage');
                        break;
                    case ("organization"):
                        history.push('/organizationHomepage');
                        break;
                    default:
                        break;
                }
            }

        }
        catch (e) {
            alert(e.reason);
        }
    }

    return (

        <div className="Login">
            <div className="form" >
                <>
                    <FormControl fullWidth>
                        <InputLabel >Login as</InputLabel>
                        <Select
                            value={userType}
                            label="User type"
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <MenuItem value={"customer"}>Customer</MenuItem>
                            <MenuItem value={"Manager"}>Manager</MenuItem>
                            <MenuItem value={"organization"}>Organisation</MenuItem>
                        </Select>
                    </FormControl>
                </>
                {/* <TextField id="standard-basic" label="Email" variant="standard" onChange={(e) => {
                    setEmail(e.target.value)
                    setError((e) => { return { ...e, email: false } })
                }} error={errors.email} />
                <TextField id="standard-basic" label="Password" variant="standard" type="password" onChange={(e) => {
                    setPassword(e.target.value)
                    setError((e) => { return { ...e, password: false } })
                }} error={errors.password} /> */}

                <Button className="login-btn" type="submit" color="primary" onClick={loginAccount} variant="contained">
                    Log in
                </Button>
                <Link style={{ textAlign: "center" }} to="/register">New to the application ? Sign up here</Link>

            </div>
        </div>
    );
};

export default Login;