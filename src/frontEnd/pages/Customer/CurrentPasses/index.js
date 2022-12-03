import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './style.css';

const CurrentPasses = (props) => {
    const { contract } = props;
    const [myPasses, setMyPasses] = useState()
    const sampleCards = [{ orgName: "xyz", dateOfpur: "1/1/2022", tenure: "3 months", cost: "100$" },
    { orgName: "xyz", dateOfpur: "1/1/2022", tenure: "6 months", cost: "200$" },
    { orgName: "xyz", dateOfpur: "1/1/2022", tenure: "12 months", cost: "300$" }]
    const getPasses = async () => {
        const res = await contract.getPurchasedPass()
        console.log(res)
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
                {myPasses && myPasses.map((c) => card(c.organization, c.cost, c.purchasedOn, c.numOfDays))}
            </div>
        </>
    );
};


export default CurrentPasses;