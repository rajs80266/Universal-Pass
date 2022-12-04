import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './style.css';

const CurrentPasses = (props) => {
    const { contract } = props;
    const [myPasses, setMyPasses] = useState()
    const getPasses = async () => {
        const res = await contract.getPurchasedPass()
        setMyPasses(res)
    }
    useEffect(() => {
        getPasses()
    }, [])
    const card = (organization, cost, purchasedOn, numOfDays) => {
        return (<Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div">
                    {"Organization " + organization}
                </Typography>
                <Typography variant="h5" component="div">
                    {"date of purchase " + purchasedOn}
                </Typography>
                <Typography variant="h5" component="div">
                    {numOfDays}
                </Typography>
                <Typography variant="h5" component="div">
                    {cost}
                </Typography>
            </CardContent>
        </Card>)

    }
    return (
        <>
            <h2 style={{ alignSelf: "center" }}>Current Passes</h2>
            <div className="passes">
                {myPasses && myPasses.map((c) => card(c.organization, c.cost.toNumber(), c.purchasedOn.toNumber(), c.numOfDays.toNumber()))}
            </div>
        </>
    );
};


export default CurrentPasses;