import React, { useEffect, useState } from "react";
import "./style.css"
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const history = useHistory()
    const contract = useSelector(state => state.contract?.contract)
    const userType = useSelector(state => state.user?.userType)
    const [homePage, setHomePage] = useState('/')
    const disptach = useDispatch()
    useEffect(() => {
        if (userType) {
            switch (userType.toLocaleLowerCase()) {
                case "customer":
                    setHomePage('/customerHomepage');
                    return;
                case "manager":
                    setHomePage('/managerHomepage');
                    return;
                case "organization":
                    setHomePage('/organizationHomepage');
                    return;
            }
        }
        else {
            setHomePage('/')
        }

    }, [userType])

    return (
        <>
            <div className="header">
                <h3 style={{ cursor: "pointer" }} onClick={() => history.push(homePage)}>Pass<span>Management </span></h3>
                {contract &&
                    <Button style={{ width: "170px", marginLeft: "auto" }} variant="contained" onClick={() => {
                        disptach({ type: "LOGOUT" })
                        disptach({ type: "USERLOGOUT" })
                        history.push('/')
                    }}>
                        LogOut   </Button>}

            </div>
        </>
    );
}

export default Header;