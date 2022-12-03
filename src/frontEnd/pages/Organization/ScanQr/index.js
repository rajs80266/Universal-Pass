import React, { useEffect, useState } from "react";
import { QrReader } from 'react-qr-reader';

import './style.css';

const ScanQr = (props) => {
    const [cusAcc, setCusAccount] = useState()
    const { contract } = props
    const checkIfValid = async () => {
        try {
            const res = await contract.getOrganizationPurchasedPass(cusAcc)
            alert("Customer is a valid customer")
        }
        catch (e) {
            alert("Customer is not valid")
        }

    }
    useEffect(() => {
        if (cusAcc)
            checkIfValid()
    }, [cusAcc])

    return (
        <div style={{ width: "500px", height: "500px" }}>
            <h2>Scan your qr code here</h2>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setCusAccount(result?.text);
                    }
                }}
                style={{ width: '100%' }}
            />
        </div>);
};

export default ScanQr;