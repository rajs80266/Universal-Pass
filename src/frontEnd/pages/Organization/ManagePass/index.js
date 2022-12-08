import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './style.css';
import Web3 from 'web3';



const ManagePass = (props) => {
    const history = useHistory();
    const [validity, setValidity] = useState();
    const { contract } = props;

    const [amount, setAmount] = useState();
    const [error, setErrors] = useState({ validity: false, amount: false });

    const addPass = async () => {
        if (!amount) {
            setErrors((e) => { return { ...e, amount: true } })
            return
        }
        if (!validity) {
            setErrors((e) => { return { ...e, validity: true } })
            return
        }
        try {
            props.setLoading(true)
            await contract.addPass(parseInt(validity), (Web3.utils.toWei(String(amount), 'ether')))
            props.setLoading(false)
        }
        catch {
            props.setLoading(false)
            alert("somthinng went wrong")
        }


    }
    return (
        <div className="org-pass">
            <h2>Manage Passes</h2>
            <Button style={{ maxWidth: "300px", justifySelf: "center" }} variant="contained" onClick={() => history.push("/organizationCurrentPasses")}>
                View current Passes
            </Button>

            <div className="add-pass">
                <h4 style={{ justifySelf: "center" }}>Add new pass</h4>

                <TextField id="standard-basic" label="Validity(days)" variant="standard" onChange={(e) => {
                    setValidity(e.target.value)
                    setErrors((e) => { return { ...e, validity: false } })
                }} error={error.validity} />
                <TextField id="standard-basic" label="Amount(ethers)" variant="standard" onChange={(e) => {
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