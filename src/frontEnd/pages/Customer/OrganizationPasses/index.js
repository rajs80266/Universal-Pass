import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './style.css';
import Web3 from 'web3';


const OrganizationPasses = (props) => {

    const { contract, account } = props;
    const [orgs, setOrgs] = useState();
    const [org, setOrg] = useState();
    const [passes, setPasses] = useState();

    const buyPass = async (index,cost) => {
        try {
            props.setLoading(true)
            const res = await contract.purchasePass(org, index,{value:cost}) ;
            alert("purchased successfully");
        }
        catch (e) {
            alert(e)
        }
        finally {
            props.setLoading(false)

        }
    }


    const fetchOrgPasses = async (address) => {
        try {
            props.setLoading(true)

            const res = await contract.getPassList(address);
            setPasses(res)
        }
        catch (e) {
            alert(e);
        }
        finally {
            props.setLoading(false)

        }

    }
    const fetchOrg = async () => {
        try {
            props.setLoading(true)

            const res = await contract.getAuthorizedOrganizations();
            const passDetails = [];
            for (let i = 0; i < res.length; i++) {
                const passDetail = await contract.users(res[i]);
                passDetails.push({ label: passDetail['username'], value: res[i] });
            }
            setOrgs(passDetails);
        }
        catch (e) {
            props.setLoading(false)
            alert(e)
        }
        finally{
            props.setLoading(false)

        }

    }
    useEffect(() => {
        fetchOrg()
    }, [])
    useEffect(() => {
        if (org)
            fetchOrgPasses(org)
    }, [org])

    const card = (numOfDays, cost, i) => {
        return (
            <Card variant="outlined" key={i}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {`Validitiy ${numOfDays}`}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {`Cost ${Web3.utils.fromWei(String(cost),"ether")} ethers`}
                    </Typography>
                    <Button variant="contained" onClick={() => buyPass(i,cost)}>
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
                {passes && passes.map((c, i) => card(c.numOfDays.toString(), c.cost.toString(), i))}
            </div>
        </div>
    );
};

export default OrganizationPasses;