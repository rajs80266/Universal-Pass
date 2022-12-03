import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import CustomerReports from "../CustomerReports";
import OrganizationReports from "../OrganizationReports";
import OrganizationRequests from "../OrganizationRequests";
import './style.css';

const HomePage = (props) => {

    const [value, setValue] = useState(-1)

    return (

        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ justifyContent: "center", display: "flex" }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={(x, y) => setValue(y)} aria-label="basic tabs example">
                        <Tab label="Organization Requests" />
                        <Tab label="Organization Reports" />
                        <Tab label="Customer Reports" />
                    </Tabs>
                </Box>
            </div>
            {value == -1 && <> Welcome  manager</>}
            {value == 0 && <OrganizationRequests {...props} />}
            {value == 1 && <OrganizationReports />}
            {value == 2 && <CustomerReports />}
        </div>
    );
};

export default HomePage;