import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './style.css';

const CurrentPasses = (props) => {
    const { contract, account } = props;
    const [passes, setPasses] = useState();
    const fetchOrgPasses = async () => {
        try {
            const res = await contract.getPassList(account)
            setPasses(res)

        }
        catch (e) {
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
                    {`Validitiy ${numOfDays}`}
                </Typography>
                <Typography variant="h5" component="div">
                    {`Cost ${cost}`}
                </Typography>
            </CardContent>
        </Card>)

    }
    return (
        <>
            <h2 style={{ alignSelf: "center" }}>Current Passes</h2>
            <div className="passes">
                {passes && passes.map((c) => card(c.numOfDays.toNumber(), c.cost.toNumber()))}
            </div>
        </>
    );
};


export default CurrentPasses;