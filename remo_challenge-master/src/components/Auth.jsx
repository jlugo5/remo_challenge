import React, { useEffect } from 'react';
import Firebase from '../services/firebase';
import { useHistory } from 'react-router-dom';
import { sendGetRequest, sendPostRequest } from '../apis';

import { connect } from 'react-redux'
import { setCurrentUser } from '../reducers/user.action'
import { setCurrentUserSeat } from 'reducers/data.action';

const Auth = ({setCurrentUser,setCurrentUserSeat}) => {
  const history = useHistory();

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // TODO: Store user details
        setCurrentUser(user)
        setCurrentUserSeat(user,'first-table', 91.92, 5.68)
        history.push('/theater');
      }
    });

    // Sample API requests
    // sendGetRequest(`sample-get-request?param=1`).then(response => console.log(response));
    // sendPostRequest(`sample-post-request`, {postParam: 1}).then(response => console.log(response));
  }, []);
  const redirect = () => {
    const provider = new Firebase.auth.GoogleAuthProvider();
    Firebase.auth().signInWithPopup(provider);
  };

  return ( 
    <div 
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1> Remo Coding Challenge Join Room </h1>
      <button onClick={redirect}> Login With Google </button>
    </div> 
  );
};

const mapStateToProps = ({data}) => (
  {
    data
  }
)

const mapDispatchToProps = dispatch => (
  {
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setCurrentUserSeat: (user,table,x,y) => dispatch(setCurrentUserSeat(user,table,x,y))
  }
)
 
export default connect(mapStateToProps,mapDispatchToProps)(Auth);