const initialState = {
    username: '',
    profile_picture: ''
}

const UPDATE_USER = 'UPDATE_USER';
const LOGOUT_USER = 'LOGOUT_USER';

export function updateUser(user){
    const action = {
        type: UPDATE_USER,
        // payload: { username: username, profile_picture: profile_picture },
    }
    return action
};

export function logout(user){
    const action = {
        type: LOGOUT_USER,
    }
    return action
}

export default function reducer(state = initialState, action) {
    switch (action.initialState) {
        case UPDATE_USER:
            // return { username, profile_picture };
            case LOGOUT_USER:
                return {}
    }
}

