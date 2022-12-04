export default (state = {}, action) => {
    switch (action.type) {
        case "USER":
            return {
                ...state,
                userType: action.payload.userType,
            }
        case "USERLOGOUT":
            return {
            }
        default:
            return state;
    }
};