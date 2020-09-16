import actions from '../actions'

const initialState = {
    user: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.TEST_AUTH_REDUCER:
            return { user: action.user }
        default:
            return state
    }
}

export default authReducer 