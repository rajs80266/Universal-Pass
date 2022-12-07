import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import './style.css';

const OrganizationRequests = (props) => {
    const { contract } = props
    const [reqs, setReqs] = useState()
    const fetchReq = async () => {
        try {
            props.setLoading(true)
            const res = await contract.getUnauthorizedUsers()
            setReqs(res)
        }
        catch (e) {
            alert("somthing went wrong", e)
        }
        finally {
            props.setLoading(false)
        }
    }
    const onApprove = async (address) => {
        try {
            props.setLoading(true)
            const res = await contract.authorizeUser(address)
            alert("Success ")
            props.setLoading(false)
        }
        catch (e) {
            props.setLoading(false)
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
                            <div style={{ margin: "10px" }}>
                                address : {x}

                                <Button variant="contained" onClick={() => onApprove(x)} style={{ margin: "10px" }}> Approve</Button>
                            </div>
                        </>
                    )
                })


            }
        </>
    );
};

export default OrganizationRequests;