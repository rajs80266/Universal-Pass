import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Shell from './Shell';

import CustomerCurrentPasses from './pages/Customer/CurrentPasses';
import CustomerHomepage from './pages/Customer/Homepage';
import CustomerManagePass from './pages/Customer/ManagePass';
import CustomerOrganizationPasses from './pages/Customer/OrganizationPasses';
import CustomerPurchase from './pages/Customer/Purchase';
import Login from './pages/Login';
import ManagerCustomerReports from './pages/Manager/CustomerReports';
import ManagerHomepage from './pages/Manager/Homepage';
import ManagerOrganizationReports from './pages/Manager/OrganizationReports';
import ManagerOrganizationRequests from './pages/Manager/OrganizationRequests';
import OrganizationCurrentPasses from './pages/Organization/CurrentPasses';
import OrganizationCustomerDetails from './pages/Organization/CustomerDetails';
import OrganizationHomepage from './pages/Organization/Homepage';
import OrganizationManagePass from './pages/Organization/ManagePass';
import OrganizationScanQr from './pages/Organization/ScanQr';
import Register from './pages/Register';
import UniversalPassAbi from '../contractsData/Universal_Pass.json'
import UniversalPassAbiAddress from '../contractsData/Universal_Pass-address.json'
import { ethers } from "ethers"

const App = () => {
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState({})

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Get signer
    const signer = provider.getSigner()
    loadContract(signer)
  }
  const loadContract = async (signer) => {
    // Get deployed copy of music nft marketplace contract
    const contract = new ethers.Contract(UniversalPassAbiAddress.address, UniversalPassAbi.abi, signer)
    // await contract.register(name, userType.toLocaleLowerCase())
    setContract(contract)
  }
  useEffect(() => {
    web3Handler()
  }, [])
  return (
    <BrowserRouter>
      <Shell>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Login contract={contract} />}
          />
          <Route
            exact
            path="/login"
            render={() => <Login contract={contract} />}
          />
          <Route
            exact
            path="/register"
            render={() => <Register contract={contract} />}
          />
          <Route
            exact
            path="/customerCurrentPasses"
            render={() => <CustomerCurrentPasses contract={contract} />}
          />
          <Route
            exact
            path="/customerHomepage"
            component={CustomerHomepage}
          />
          <Route
            exact
            path="/customerManagePass"
            component={CustomerManagePass}
          />
          <Route
            exact
            path="/customerOrganizationPasses"
            component={CustomerOrganizationPasses}
          />
          <Route
            exact
            path="/customerPurchase"
            component={CustomerPurchase}
          />
          <Route
            exact
            path="/managerCustomerReports"
            component={ManagerCustomerReports}
          />
          <Route
            exact
            path="/managerHomepage"
            component={ManagerHomepage}
          />
          <Route
            exact
            path="/managerOrganizationReports"
            component={ManagerOrganizationReports}
          />
          <Route
            exact
            path="/managerOrganizationRequests"
            component={ManagerOrganizationRequests}
          />
          <Route
            exact
            path="/organizationCurrentPasses"
            render={() => <OrganizationCurrentPasses contract={contract} account={account} />}

          />
          <Route
            exact
            path="/organizationCustomerDetails"
            component={OrganizationCustomerDetails}
          />
          <Route
            exact
            path="/organizationHomepage"
            component={OrganizationHomepage}
          />
          <Route
            exact
            path="/organizationManagePass"
            render={() => <OrganizationManagePass contract={contract} />}
          />
          <Route
            exact
            path="/organizationScanQr"
            component={OrganizationScanQr}
          />
        </Switch>
      </Shell>
    </BrowserRouter>
  );
};

export default App;