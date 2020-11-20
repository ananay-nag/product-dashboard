export const dispatchAction = (type, data) => {
    return dispatch => dispatch({type, data});
};