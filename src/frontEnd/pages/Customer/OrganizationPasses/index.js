import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './style.css';

const OrganizationPasses = (props) => {
    console.log(props);
    const { contract, account } = props;
    const [orgs, setOrgs] = useState();
    const [org, setOrg] = useState();
    const [passes, setPasses] = useState();

    const buyPass = async (index) => {
        try {
            const res = await contract.purchasePass(org, index);
            alert("purchaed successfully");
        }
        catch (e) {
            alert(e)
        }
    }


    const fetchOrgPasses = async (address) => {
        try {
            const res = await contract.getPassList(address);
            setPasses(res)
        }
        catch (e) {
            alert(e);
        }

    }
    const fetchOrg = async () => {
        try {
            const res = await contract.getAuthorizedOrganizations();
            const passDetails = [];
            for(let i = 0; i < res.length; i++) {
                console.log(res[i]);
                const passDetail = await contract.users(res[i]);
                passDetails.push({label: passDetail['username'], value: res[i]});
            }
            setOrgs(passDetails);
        }
        catch (e) {
            alert(e)
        }

    }
    useEffect(() => {
        fetchOrg()
    }, [])
    useEffect(() => {
        if (org)
            fetchOrgPasses(org)
    }, [org])

    const sampleCards = [{ tenure: "3 months", cost: "100$" }, { tenure: "6 months", cost: "200$" }, { tenure: "12 months", cost: "300$" }]
    const card = (numOfDays, cost, i) => {
        return (
            <Card variant="outlined" key={i}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {`Validitiy ${numOfDays}`}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {`Cost ${cost}`}
                    </Typography>
                    <Button variant="contained" onClick={() => buyPass(i)}>
                        Buy
                    </Button>
                </CardContent>
            </Card>)

    }
    return (
        <div className="org-passes">Organization Passes
            <FormControl fullWidth>
                <InputLabel >Select Organization</InputLabel>
                <Select
                    value={org}
                    label="Select Organization"
                    onChange={(e) => setOrg(e.target.value)}
                >
                    {orgs && orgs.map((x) => <MenuItem value={x.value}>{x.label}</MenuItem>)}
                </Select>
            </FormControl>
            <div className="passes-grid">
                {passes && passes.map((c, i) => card(c.numOfDays.toNumber(), c.cost.toNumber(), i))}
            </div>
        </div>
    );
};

export default OrganizationPasses;