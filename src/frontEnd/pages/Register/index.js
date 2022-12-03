import React, { useState } from "react";
import './style.css';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Link } from "react-router-dom";




const Register = (props) => {
    const [userType, setUserType] = useState("customer");
    const [name, setName] = useState();
    const { contract } = props;

    const signIn = async () => {
        try {
            await contract.register(name, userType.toLocaleLowerCase());
        } catch (e) {
            alert(e.reason.substring(79, 127));
        }
    }

    return (
        <div className="Login">
            <div className="form" >
                <>
                    <FormControl fullWidth>
                        <InputLabel >Register as</InputLabel>
                        <Select
                            value={userType}
                            label="User type"
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <MenuItem value={"customer"}>Customer</MenuItem>
                            <MenuItem value={"organization"}>Organisation</MenuItem>
                        </Select>
                    </FormControl>
                </>
                <TextField id="standard-basic" label="Name" variant="standard" onChange={(e) => {
                    setName(e.target.value)
                }} />

                <Button className="login-btn" type="submit" color="primary" onClick={signIn} variant="contained">
                    Sign Up
                </Button>
                <Link style={{ textAlign: "center" }} to="/login">Already a user ? Login in here</Link>

            </div>
        </div>
    );
};

export default Register;