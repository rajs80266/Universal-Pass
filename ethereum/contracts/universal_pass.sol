// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <=0.8.7;
pragma experimental ABIEncoderV2;

contract Universal_Pass {
    struct User {
        string username;
        string userType;
        bool authorized;
        bool registered;
    }

    struct Pass {
        uint256 numOfDays;
        uint256 cost;
    }

    struct PurchasedPass {
        address organization;
        uint256 numOfDays;
        uint256 cost;
        uint256 purchasedOn;
    }

    address public manager;

    mapping(address => User) public users;
    address[] public authorizedOrganizations;
    address[] public unauthorizedOrganizations;

    mapping(address => Pass[]) organizationPassList;

    mapping(address => PurchasedPass[]) purchasedPasses;
    mapping(address => mapping(address => PurchasedPass[])) organizationPurchasedPasses;

    modifier onlyManager() {
        require(
            msg.sender == manager,
            "Only the manager can call this function."
        );
        _;
    }

    constructor() {
        manager = msg.sender;
    }

    function register(string memory username, string memory userType)
        public
        returns (User memory userDetails)
    {
        require(
            !users[msg.sender].registered,
            "User Already exists associated with this account"
        );

        User storage user = users[msg.sender];
        user.username = username;
        user.userType = userType;
        user.authorized = keccak256(bytes(userType)) != keccak256(bytes("organization"));
        user.registered = true;

        if (!user.authorized) {
            unauthorizedOrganizations.push(msg.sender);
        }

        return user;
    }

    function authorizeUser(address userAddress)
        public
        onlyManager
        returns (User memory userDetails)
    {
        require(
            users[userAddress].registered,
            "User not found associated with this account"
        );

        User storage user = users[userAddress];
        user.authorized = true;

        authorizedOrganizations.push(userAddress);

        bool foundUnauthorizedOrganization = false;
        for (uint256 i = 0; i < unauthorizedOrganizations.length - 1; i++) {
            if (!foundUnauthorizedOrganization) {
                if (unauthorizedOrganizations[i] == userAddress) {
                    foundUnauthorizedOrganization = true;
                }
            }
            if (foundUnauthorizedOrganization) {
                unauthorizedOrganizations[i] = unauthorizedOrganizations[i + 1];
            }
        }
        unauthorizedOrganizations.pop();

        return user;
    }

    function login() public view returns (bool allowLogin) {
        return users[msg.sender].registered;
    }

    function isUserAuthorized(address userAddress)
        public
        view
        returns (bool isAuthorized)
    {
        return users[userAddress].authorized;
    }

    function getAuthorizedUsers()
        public
        view
        returns (address[] memory unauthorizedUsers)
    {
        return authorizedOrganizations;
    }

    function getUnauthorizedUsers()
        public
        view
        onlyManager
        returns (address[] memory unauthorizedUsers)
    {
        return unauthorizedOrganizations;
    }

    function addPass(uint256 numOfDays, uint256 cost)
        public
        returns (Pass memory passDetails)
    {
        require(users[msg.sender].authorized, "Requires manager approval");
        Pass memory pass = Pass({numOfDays: numOfDays, cost: cost});
        organizationPassList[msg.sender].push(pass);
        return pass;
    }

    function removePass(address organizationAddress, uint256 index)
        public
        returns (bool isDeleted)
    {
        for (
            uint256 i = index;
            i < organizationPassList[organizationAddress].length;
            i++
        ) {
            organizationPassList[organizationAddress][i] = organizationPassList[
                organizationAddress
            ][i + 1];
        }
        organizationPassList[organizationAddress].pop();

        return true;
    }

    function getPassList(address organizationAddress)
        public
        view
        returns (Pass[] memory passDetails)
    {
        return organizationPassList[organizationAddress];
    }

    function getPass(address organizationAddress, uint256 index)
        public
        view
        returns (Pass memory passDetails)
    {
        return organizationPassList[organizationAddress][index];
    }

    function purchasePass(address organizationAddress, uint256 index)
        public
        returns (PurchasedPass memory purchasedPassDetails)
    {
        require(keccak256(bytes(users[msg.sender].userType)) == keccak256(bytes("customer")), "Only customer can purchase");
        Pass memory pass = organizationPassList[organizationAddress][index];
        PurchasedPass memory purchasedPass = PurchasedPass({
            organization: organizationAddress,
            numOfDays: pass.numOfDays,
            cost: pass.cost,
            purchasedOn: block.timestamp
        });
        purchasedPasses[msg.sender].push(purchasedPass);
        organizationPurchasedPasses[msg.sender][organizationAddress].push(purchasedPass);
        return purchasedPass;
    }

    function getPurchasedPass()
        public
        view
        returns (PurchasedPass[] memory purchasedPassList)
    {
        return purchasedPasses[msg.sender];
    }

    function getOrganizationPurchasedPass(address organizationAddress)
        public
        view
        returns (PurchasedPass[] memory purchasedPassList)
    {
        return organizationPurchasedPasses[msg.sender][organizationAddress];
    }
}
