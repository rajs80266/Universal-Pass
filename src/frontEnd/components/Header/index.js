import React from "react";
import "./style.css"
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const history = useHistory()
    const contract = useSelector(state => state.contract?.contract)
    const disptach = useDispatch()

    return (
        <>
            <div className="header">
                <h3>Pass<span>Management </span></h3>
                {contract &&
                    <Button style={{ width: "170px", marginLeft: "auto" }} variant="contained" onClick={() => {
                        disptach({ type: "LOGOUT" })
                        history.push('/')
                    }}>
                        LogOut   </Button>}

            </div>
        </>
    );
}

export default Header;