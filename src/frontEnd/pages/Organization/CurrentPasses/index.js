import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './style.css';
import Web3 from "web3"

const CurrentPasses = (props) => {
    const { contract, account } = props;
    const [passes, setPasses] = useState();
    const fetchOrgPasses = async () => {
        try {
            props.setLoading(true)
            const res = await contract.getPassList(account)
            setPasses(res)
            props.setLoading(false)

        }
        catch (e) {
            props.setLoading(false)
            alert(e)
        }

    }
    useEffect(() => {
        fetchOrgPasses()
    }, [])
    const card = (numOfDays, cost) => {
        return (<Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div">
                    {`Validitiy(days) ${numOfDays}`}
                </Typography>
                <Typography variant="h5" component="div">
                    {`Cost ${Web3.utils.fromWei(String(cost), "ether")} ethers`}
                </Typography>
            </CardContent>
        </Card>)

    }
    return (
        <>
            <h2 style={{ alignSelf: "center" }}>Current Passes</h2>
            <div className="passes">
                {passes && passes.map((c) => card(c.numOfDays, c.cost))}
            </div>
        </>
    );
};


export default CurrentPasses;