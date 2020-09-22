import actions from '../actions/actionTypes'

const initialState = {
    user: null
}

const updateAuthUser = (user) => {
    if (isNaN(user.expiresIn) === false)
        user.expiresIn = new Date(new Date().getTime() + user.expiresIn * 1000);
    
    localStorage.setItem('user', JSON.stringify(user));
    setTimeout(() => {
        return logout()
    }, new Date(user.expiresIn).getTime() - (new Date()).getTime())

    return { user }
}

const checkUserOrLogout = () => {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
        return logout()

    }
    else {
        const user = JSON.parse(userStr)
        if (user.expiresIn <= new Date()) {
            return logout()
        }
        else {
            return updateAuthUser(user)
        }
    }
}

const logout = () => {
    localStorage.removeItem('user')
    return { user: null }
}

// ------------------------------------------------
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPDATE_AUTH_USER:
            return updateAuthUser(action.user)
        case actions.CHECK_USER_OR_LOGOUT:
            return checkUserOrLogout()
        case actions.LOGOUT:
            return logout()
        default:
            return state
    }
}

export default authReducer 