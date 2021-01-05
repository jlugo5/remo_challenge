export const setCurrentUserSeat = (user,table,x,y) => (
    {
        type: 'SET_CURRENT_USER_SEAT',
        payload: {user,table,x,y}
    }
)

export const addUserToSeat = (user,table,x,y) => (
    {
        type:'ADD_USER_TO_SEAT',
        payload: {user,table,x,y}
    }
)