import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './style.css';

const ManagePass = (props) => {
    const history = useHistory();
    const [validity, setValidity] = useState();
    const [amount, setAmount] = useState();
    const [error, setErrors] = useState({ validity: false, amount: false });

    const addPass = () => {
        if (!amount) {
            setErrors((e) => { return { ...e, amount: true } })
        }
        if (!validity) {
            setErrors((e) => { return { ...e, validity: true } })
        }
    }
    return (
        <div className="org-pass">
            <h2>Manage Passes</h2>
            <Button style={{maxWidth:"300px",justifySelf:"center"}} variant="contained" onClick={() => history.push("/organizationCurrentPasses")}>
                View current Passes
            </Button>

            <div className="add-pass">
                <h4 style={{justifySelf:"center"}}>Add new pass</h4>

                <TextField id="standard-basic" label="Validity" variant="standard" onChange={(e) => {
                    setValidity(e.target.value)
                    setErrors((e) => { return { ...e, validity: false } })
                }} error={error.validity} />
                <TextField id="standard-basic" label="Amount" variant="standard" onChange={(e) => {
                    setAmount(e.target.value)
                    setErrors((e) => { return { ...e, amount: false } })
                }} error={error.amount} />

                <Button className="login-btn" type="submit" color="primary" onClick={addPass} variant="contained">
                    Add new pass
                </Button>
            </div>
        </div>
    );
};

export default ManagePass;