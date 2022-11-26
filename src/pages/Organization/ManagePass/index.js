import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import './style.css';

const ManagePass = (props) => {
    const history = useHistory();
    return (
        <div className="org-pass">
            <h2>Manage Passes</h2>
            <Button variant="contained" onClick={() => history.push("/organizationCurrentPasses")}>
                View current Passes
            </Button>

            <div className="add-pass">
                form
            </div>
        </div>
    );
};

export default ManagePass;