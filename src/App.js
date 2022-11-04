import React from 'react';
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

const App = () => {
    return (
        <BrowserRouter>
            <Shell>
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={Login}
                  />
                  <Route
                    exact
                    path="/login"
                    component={Login}
                  />
                  <Route
                    exact
                    path="/register"
                    component={Register}
                  />
                  <Route
                    exact
                    path="/customerCurrentPasses"
                    component={CustomerCurrentPasses}
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
                    component={OrganizationCurrentPasses}
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
                    component={OrganizationManagePass}
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