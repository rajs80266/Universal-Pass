import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import './style.css';

const CurrentPasses = (props) => {
    console.log(props);
    const sampleCards = [{ tenure: "3 months", cost: "100$" }, { tenure: "6 months", cost: "200$" }, { tenure: "12 months", cost: "300$" }]
    const card = (tenure, cost) => {
        return (<Card variant="outlined">
            <CardContent>
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
                {sampleCards.map((c) => card(c.tenure, c.cost))}
            </div>
        </>
    );
};


export default CurrentPasses;