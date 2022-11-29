import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import './style.css';

const CurrentPasses = (props) => {
    console.log(props);
    const sampleCards = [{ orgName: "xyz", dateOfpur: "1/1/2022", tenure: "3 months", cost: "100$" },
    { orgName: "xyz", dateOfpur: "1/1/2022", tenure: "6 months", cost: "200$" },
    { orgName: "xyz", dateOfpur: "1/1/2022", tenure: "12 months", cost: "300$" }]
    const card = (tenure, cost, orgName, dateOfpur) => {
        return (<Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div">
                    {"Organization " + orgName}
                </Typography>
                <Typography variant="h5" component="div">
                    {"date of purchase " + dateOfpur}
                </Typography>
                <Typography variant="h5" component="div">
                    {tenure}
                </Typography>
                <Typography variant="h5" component="div">
                    {tenure}
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
                {sampleCards.map((c) => card(c.tenure, c.cost, c.orgName, c.dateOfpur))}
            </div>
        </>
    );
};


export default CurrentPasses;