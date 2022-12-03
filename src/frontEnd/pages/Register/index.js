import React, { useState } from "react";
import './style.css';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Link } from "react-router-dom";




const Register = (props) => {
    const [userType, setUserType] = useState("User");
    const [name, setName] = useState();
    const [errors, setError] = useState({ email: false, password: false, name: false });
    const [loading, setLoading] = useState(true)
    const { contract } = props


    // const onSubmit = () => {
    //     if (!name) {
    //         setError((e) => { return { ...e, name: true } })
    //     }

    //     if (!email) {
    //         setError((e) => { return { ...e, email: true } })
    //     }
    //     if (!password) {
    //         setError((e) => { return { ...e, password: true } })
    //     }
    // }

    const signIn = async () => {
        // Get deployed copy of music nft marketplace contract
        console.log(name, userType.toLocaleLowerCase())
        await contract.register(name, userType.toLocaleLowerCase())
        setLoading(false)
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
                            <MenuItem value={"organization"}>Organisation</MenuItem>
                        </Select>
                    </FormControl>
                </>
                <TextField id="standard-basic" label="Name" variant="standard" onChange={(e) => {
                    setName(e.target.value)
                    setError((e) => { return { ...e, name: false } })
                }} error={errors.email} />

                <Button className="login-btn" type="submit" color="primary" onClick={signIn} variant="contained">
                    Sign Up
                </Button>
                <Link style={{ textAlign: "center" }} to="/login">Already a user ? Login in here</Link>

            </div>
        </div>
    );
};

export default Register;