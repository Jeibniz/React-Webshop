/**
 * Place holder reducer. Will process a SIMPLE_ACTION type.
 */
export default (state = {}, action) => {
    switch (action.type) {
        case 'SIMPLE_ACTION':
            return {
                result: action.payload
            };
        default:
            return state
    }
}