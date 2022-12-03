import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import './style.css';

const OrganizationRequests = (props) => {
    const { contract } = props
    const [reqs, setReqs] = useState()
    const fetchReq = async () => {
        const res = await contract.getUnauthorizedUsers()
        setReqs(res)
    }
    const onApprove = async (address) => {
        console.log(address)
        try {
            const res = await contract.authorizeUser(address)
            alert("Success ")
        }
        catch (e) {
            alert(e)
        }

    }
    useEffect(() => {
        fetchReq()
    }, [])
    return (
        <>
            <div>Organization Requests</div>
            {console.log(reqs)}
            {
                reqs && reqs.map((x) => {
                    return (
                        <>
                            <div style={{margin:"10px"}}>
                                address : {x}
                           
                            <Button variant="contained" onClick={() => onApprove(x)} style={{margin:"10px"}}> Approve</Button>
                            </div>
                        </>
                    )
                })


            }
        </>
    );
};

export default OrganizationRequests;