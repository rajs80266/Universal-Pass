import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './style.css';

const CurrentPasses = (props) => {
    console.log(props);
    const { contract, account } = props;
    const [passes, setPasses] = useState();
    const sampleCards = [{ tenure: "3 months", cost: "100$" }, { tenure: "6 months", cost: "200$" }, { tenure: "12 months", cost: "300$" }]
    const fetchOrgPasses = async () => {
        setPasses(await contract.getPassList(account))
    }
    useEffect(() => {
        fetchOrgPasses()
    }, [])
    const card = (numOfDays, cost) => {
        return (<Card variant="outlined">
            <CardContent>
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
                {sampleCards.map((c) => card(c.numOfDays, c.cost))}
            </div>
        </>
    );
};


export default CurrentPasses;