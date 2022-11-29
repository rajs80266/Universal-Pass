import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import './style.css';

const OrganizationPasses = (props) => {
    console.log(props);
    const organiztions = ["asdf", "adsf", "asdf", "adsf"]
    const [org, setOrg] = useState();
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
                <Button  variant="contained">
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
                    {organiztions.map((x) => <MenuItem value={x}>{x}</MenuItem>)}
                </Select>
            </FormControl>
            <div className="passes-grid">
                {org && sampleCards.map((c) => card(c.tenure, c.cost))}
            </div>
        </div>
    );
};

export default OrganizationPasses;