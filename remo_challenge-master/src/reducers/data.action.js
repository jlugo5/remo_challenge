export const setCurrentUserSeat = (user,table,x,y) => (
    {
        type: 'SET_CURRENT_USER_SEAT',
        payload: {user,table,x,y}
    }
)

export const addUserToSeat = (user) => (
    {
        type:'ADD_USER_TO_SEAT',
        payload: user
    }
)