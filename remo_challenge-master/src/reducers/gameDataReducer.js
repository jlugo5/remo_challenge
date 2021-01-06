
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
                seats: addUserToSeat(state,action.payload)
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

const addUserToSeat = (state,user, seatsNum=4) => {
    const {seats} = state
    const initialTable = seats.find( table => table.qtySeats > seatsNum)
    const initialSeat = initialTable.seats.find( seat => !seat.occupide)
    
    console.log(initialTable)
    console.log(user)
    if(initialTable){
        return seats.map( table =>  (
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
    }else{
        seatsNum -= 1
        addUserToSeat(seats,user,seatsNum)
    }
}

const moveSeat = (tables,payload) => {
    const {user,table} = payload
    const userExist = tables.find( table => table.seats.find( seat => seat.user === user))
    const avaibleSeat = tables.find( table1 => table1.tableId === table).seats.find( seat => !seat.occupide)

    if(userExist.tableId === table)
        return tables

    const newTables = tables.map(
        table1 => (
            (table1.tableId === table && table1.qtySeats > 0)?
            {...table1,qtySeats: table1.qtySeats - 1, seats: table1.seats.map( seat => 
                (seat.seat === avaibleSeat.seat)?
                {...seat,user, occupide: !seat.occupide}
                : seat
                )
            }
            :table1
        )
    )

    const userSeat = userExist.seats.find(seat => seat.user === user)
    if(userExist){
        return newTables.map(
            table =>(
                (table.tableId === userExist.tableId)?
                {...table,qtySeats: table.qtySeats + 1, seats: table.seats.map(seat => 
                    seat.user === userSeat.user?
                    {...seat, user: {}, occupide: !seat.occupide}:
                    seat
                    )
                }
                : table
            )
        )
    }

}