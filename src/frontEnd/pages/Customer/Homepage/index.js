import { Button } from "@mui/material";
import React from "react";
import QRCode from "react-qr-code";
import { useHistory } from "react-router-dom";
import './style.css';

const HomePage = (props) => {
    console.log(props);
    const history = useHistory();

    return (
        <div className={"cus-home"}>
            <h2>Welcome back!</h2>
            <Button variant="contained" onClick={() => history.push("/customerCurrentPasses")}>
                View my passes
            </Button>
            <Button variant="contained" onClick={() => history.push("/customerOrganizationPasses")}>
                Buy New Pass
            </Button>
            {props.account && <QRCode value={props.account} />}
        </div>
    );
};

export default HomePage;