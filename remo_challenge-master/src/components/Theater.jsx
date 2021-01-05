import * as React from 'react';
import './Theater.scss'; 
import MapImage from '../assets/conference-map.svg';
import TableConfig from './tableConfig.json';

import {connect} from 'react-redux'
import { useHistory } from 'react-router-dom';
import Firebase from '../services/firebase'
import { setCurrentUserSeat } from 'reducers/data.action';

const Theater = ({currentUser,seats,setCurrentUserSeat}) => {
  const firstTable = TableConfig.tables[0];
  const tables = TableConfig.tables;
  const history = useHistory()
  const auth = Firebase.auth()
  let x = 0


  return ( 
    <div className='remo-theater' style={{width: TableConfig.width, height: TableConfig.height}}>
      <div className='rt-app-bar'>
        {
          console.log(seats)
          // console.log(seats.find( elem => elem.seat.x > elem.seat.y).user.photoURL)
        }
        <img src={currentUser.photoURL} alt="user"/>
        <span>{currentUser.displayName}</span>
        {/**
          * Show user profile pic/name after login
          */}
        {/* <a href='javascript:;' onClick={() => firebase.auth().signOut()}>Logout</a> */}
        <div className='pointer' onClick={() => auth.signOut()} >Logout</div>
      </div>
      <div className='rt-rooms'>
        {/**
          * Create rooms here as in the requirement and make sure it is aligned with background Hi
          */
         tables.map( 
          table => 
          <div key={x++} className='rt-room' style={{width: table.width, height: table.height, top: table.y, left: table.x}}>
            
              {
              table.seats.map(
                seat => 
                  <div key={x++}  >
                    {
                      <img  
                      src={(seats.find( elem => (elem.x === seat.x && elem.y === seat.y)) === undefined ) ? 
                        '': (seats.find( elem => (elem.x === seat.x && elem.y === seat.y))) ? 
                        seats.find( elem => (elem.x === seat.x && elem.y === seat.y)).user.photoURL : '' 
                      } 
                        alt='seat' className='rt_room' style={{position: 'absolute', width: 50, height: 50, top: seat.y, left: seat.x  }}/>
                    }
                  </div>
                
                  
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
    setCurrentUserSeat: (user,table,x,y) => dispatch(setCurrentUserSeat(user,table,x,y)) 
  }
)


 
export default connect(mapStateToProps,mapDispatchToProps)(Theater);