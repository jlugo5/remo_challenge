import * as React from 'react';
import './Theater.scss'; 
import MapImage from '../assets/conference-map.svg';
import TableConfig from './tableConfig.json';

import {connect} from 'react-redux'
import { useHistory } from 'react-router-dom';
import Firebase from '../services/firebase'
import { addUserToSeat, updateMove } from 'reducers/data.action';

const Theater = ({currentUser,seats,updateMove,addUserToSeat}) => {
  const firstTable = TableConfig.tables[0];
  const tables = TableConfig.tables;
  const history = useHistory()
  const auth = Firebase.auth()
  let x = 0


  return ( 
    <div className='remo-theater' style={{width: 1000, height: 800}}>
      <div className='rt-app-bar'>
        {
          console.log(seats)
        }
        
        {/**
          * Show user profile pic/name after login
          */}
        {/* <a href='javascript:;' onClick={() => firebase.auth().signOut()}>Logout</a> */}
        <img src={currentUser.photoURL} alt="user"/>
        <span>{currentUser.displayName}</span>
        <div className='pointer' onClick={() => (auth.signOut(),history.push('/'))} >Logout</div>
        {/* <div className='pointer' onClick={() => addUserToSeat(currentUser)} >Add Users</div> */}
      </div>
      <div className='rt-rooms'>
        {/**
          * Create rooms here as in the requirement and make sure it is aligned with background
          */
         tables.map( 
          table => 
          <div onClick={ () => updateMove(currentUser,table.id)} key={x++} className='rt-room' style={{width: table.width, height: table.height, top: table.y, left: table.x}}>
            
              {
              table.seats.map(
                seat => 
                      <img  key={x++}
                      src={
                        (seats.find( tableSeats => tableSeats.seats.find(seat => seat.occupide)) === undefined ) ? 
                        '': (seats.find( tableSeats => tableSeats.seats.find(seat => seat.occupide)).seats.find(elem => elem.seat.x === seat.x && elem.seat.y === seat.y)) ? 
                        seats.find( tableSeats => tableSeats.seats.find(seat => seat.occupide)).seats.find(elem => elem.seat.x === seat.x && elem.seat.y === seat.y).user.photoURL : '' 
                      } 
                        alt='seat' className='rt_room' style={{position: 'absolute', width: 50, height: 50, top: seat.y, left: seat.x  }}/>
              )}
            
            <div className='rt-room-name'>{table.id}</div>
          </div>
          )  
        
        }
      </div>
      <div className='rt-background'>
        <img src={MapImage} alt='Conference background'/>
      </div>
    </div>
  );
};

const mapStateToProps = ({user,data}) => (
  {
    currentUser: user.currentUser,
    seats: data.seats
  }
)

const mapDispatchToProps = dispatch => (
  {
    updateMove: (user,table,seat) => dispatch(updateMove(user,table,seat)),
    addUserToSeat: (user) => dispatch(addUserToSeat(user))
  }
)


 
export default connect(mapStateToProps,mapDispatchToProps)(Theater);