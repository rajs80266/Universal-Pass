import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Shell from './Shell';

import CustomerCurrentPasses from './pages/Customer/CurrentPasses';
import CustomerHomepage from './pages/Customer/Homepage';
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
import { useDispatch, useSelector } from 'react-redux';
import Loader from './components/loader';

const App = () => {
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState({})
  const state = useSelector(state => state.contract)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const web3Handler = async () => {
    setLoading(true)
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0])
      // Get provider from Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // Get signer
      const signer = provider.getSigner()
      loadContract(signer)
    }
    catch {
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
    setLoading(false)
  }
  const loadContract = async (signer) => {
    const contract = new ethers.Contract(UniversalPassAbiAddress.address, UniversalPassAbi.abi, signer)
    setContract(contract)
  }
  const onLogin = async () => {
    dispatch({ type: "CONTRACT", payload: { contract } })
  }
  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      setAccount(accounts[0])
    })
    if (!state.contract)
      web3Handler()
  }, [])
  useEffect(() => {
    if (state.contract)
      setContract(state.contract)
  }, [state])
  return (
    <BrowserRouter>
      <Shell>
        <Loader loading={loading} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Login contract={contract} onLogin={onLogin} setLoading={setLoading} />}
          />
          <Route
            exact
            path="/login"
            render={() => <Login contract={contract} onLogin={onLogin} setLoading={setLoading} />}
          />
          <Route
            exact
            path="/register"
            render={() => <Register contract={contract} setLoading={setLoading} />}
          />
          <Route
            exact
            path="/customerCurrentPasses"
            render={() => <CustomerCurrentPasses contract={contract} setLoading={setLoading} />}
          />
          <Route
            exact
            path="/customerHomepage"
            render={() => <CustomerHomepage account={account} setLoading={setLoading} />}
          />
          <Route
            exact
            path="/customerOrganizationPasses"
            render={() => <CustomerOrganizationPasses contract={contract} setLoading={setLoading} />}
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
            render={() => <ManagerHomepage contract={contract} account={account} setLoading={setLoading} />}
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
            render={() => <OrganizationCurrentPasses contract={contract} account={account} setLoading={setLoading} />}

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
            render={() => <OrganizationManagePass contract={contract} setLoading={setLoading} />}
          />
          <Route
            exact
            path="/organizationScanQr"
            render={() => <OrganizationScanQr contract={contract} setLoading={setLoading} />}
          />
        </Switch>
      </Shell>
    </BrowserRouter>
  );
};

export default App;