import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './style.css';
import Web3 from 'web3';


const CurrentPasses = (props) => {
    const { contract } = props;
    const [myPasses, setMyPasses] = useState()
    const getPasses = async () => {
        props.setLoading(true)
        try {
            const res = await contract.getPurchasedPass();
            const passDetails = [];
            for (let i = 0; i < res.length; i++) {
                const { username } = await contract.users(res[i].organization);
                passDetails.push({ ...res[i], organization: username });
            }
            setMyPasses(passDetails);
        }
        finally {
            props.setLoading(false)

        }
    }
    useEffect(() => {
        getPasses()
    }, [])


    function toDateTime(secs) {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
    }

    const card = (organization, cost, purchasedOn, numOfDays) => {
        return (<Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div">
                    {"Organization: " + organization}
                </Typography>
                <Typography variant="h5" component="div">
                    {"Date of purchase: " + String(toDateTime(purchasedOn)).substring(0, 15)}
                </Typography>
                <Typography variant="h5" component="div">
                    {`Validity: ${numOfDays} days`}
                </Typography>
                <Typography variant="h5" component="div">
                {`Cost: ${Web3.utils.fromWei(String(cost),"ether")} ethers`}
                </Typography>
            </CardContent>
        </Card>)

    }
    return (
        <>
            <h2 style={{ alignSelf: "center" }}>Current Passes</h2>
            <div className="passes">
                {myPasses && myPasses.map((c) => card(c.organization, c.cost.toString(), c.purchasedOn.toString(), c.numOfDays.toNumber()))}
            </div>
        </>
    );
};


export default CurrentPasses;