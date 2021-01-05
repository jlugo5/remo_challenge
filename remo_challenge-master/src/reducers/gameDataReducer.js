
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
                seats: addUserToSeat(state.seats,action.payload)
            }
        case 'UPDATE_MOVE':
            console.log(action.payload)
            return {
                seats: moveSeat(state.seats,action.payload)
            }
        default:
            return state = initialState()
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

const moveSeat = (tables,payload) => {
    const {user,table} = payload
    console.log(tables)
    console.log(payload)
    const userExist = tables.find( table => table.seats.find( seat => seat.user === user))
    console.log(table)
    console.log(tables.find( table => table.tableId === table))
    const avaibleSeat = tables.find( table => table.tableId === table).seats.find( seat => !seat.occupide)

    const newTables = tables.map(
        table => (
            (table.tableId === table)?
            {...table,qtySeats: table.qtySeats - 1, seats: table.seats.map( seat => 
                (seat.seat === avaibleSeat.seat)?
                {...seat,user, occupide: !seat.occupide}
                : seat
                )
            }
            :table
        )
    )

    if(userExist){
        return newTables.map(
            table =>(
                (table.TableId === userExist.tableId)?
                {...table,qtySeats: table.qtySeats + 1, seats: table.seats.filter(seat => seat.user !== user)}
                : table
            )
        )
    }

}