import TableConfig from '../components/tableConfig.json';

export default (state = {}, action ) => {
    switch(action.type){
        case 'SET_CURRENT_USER_SEAT':
            console.log('Setting current user to seat')
            return {
                seats:  [action.payload]
            }
        case 'ADD_USER_TO_SEAT':
            return {
                seats: [...state.seats,action.payload]
            }
        case 'UPDATE_MOVE':
            return state
        default:
            return state
    }
}

const initialState = () => {
    const tables = TableConfig.tables;
    console.log('InitialState')
    return {seats: tables.map( table => ({tableId: table.id, qtySeats: 6, seats: table.seats.map( seat => ({user:{}, seat, occupide: false}))}))}
}

const addUserToSeat = (tables,user) => {
    const initialTable = tables.find( table => table.qtySeats > 4)
    const initialSeat = initialTable.seats.find( seat => !seat.occupide)

    if(initialTable){
        return tables.map( table =>  (
            (table.tableId === initialTable.tableId)?
            {...table,qtySeats: table.qtySeats - 1, seats: table.seats.map( seat => 
                (seat.seat === initialSeat.seat)?
                {...seat,user, occupide: !seat.occupide}
                : seat
                )
            }
            :table
            )  
        
        )     
    }
}