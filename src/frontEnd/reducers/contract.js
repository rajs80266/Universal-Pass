export default (state = {}, action) => {
    switch (action.type) {
        case "CONTRACT":
            return {
                ...state,
                contract: action.payload.contract,

            }
        case "LOGOUT":
            return {
            }
        default:
            return state;
    }
};