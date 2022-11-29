import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import './style.css';

const Login = (props) => {
    const [userType, setUserType] = useState("User");
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setError] = useState({ email: false, password: false });

    const onSubmit = () => {

        if (!email) {
            setError((e) => { return { ...e, email: true } })
        }
        if (!password) {
            setError((e) => { return { ...e, password: true } })
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
                            <MenuItem value={"User"}>User</MenuItem>
                            <MenuItem value={"Manager"}>Manager</MenuItem>
                            <MenuItem value={"Organisation"}>Organisation</MenuItem>
                        </Select>
                    </FormControl>
                </>
                <TextField id="standard-basic" label="Email" variant="standard" onChange={(e) => {
                    setEmail(e.target.value)
                    setError((e) => { return { ...e, email: false } })
                }} error={errors.email} />
                <TextField id="standard-basic" label="Password" variant="standard" type="password" onChange={(e) => {
                    setPassword(e.target.value)
                    setError((e) => { return { ...e, password: false } })
                }} error={errors.password} />

                <Button className="login-btn" type="submit" color="primary" onClick={onSubmit} variant="contained">
                    Log in
                </Button>
                <Link style={{ textAlign: "center" }} to="/register">New to the application ? Sign up here</Link>

            </div>
        </div>
    );
};

export default Login;