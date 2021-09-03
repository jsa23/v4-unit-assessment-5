import React, { Component } from 'react';
import axios from 'axios';
import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png';
import logoutLogo from './../../assets/shut_down.png';
import './Nav.css';
import { Link, withRouter } from 'react-router-dom';
import connect from 'react-redux';
import { updateUser } from '../../redux/reducer'; 
import { logout } from '../../redux/reducer';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    axios.get('/api/auth/me')
      .then(res => this.props.updateUser)
    .catch((err) => console.log(err))
  }
  
  logout() {
    axios.post('/api/auth/logout')
      .then(res => this.props.logout)
    .catch((err) => console.log(err))
  }
  
  render() {
      return this.props.location.pathname !== '/' &&
        <div className='nav'>
          <div className='nav-profile-container'>
            {/* <div className='nav-profile-pic'>({this.props.style}backgroundImage=url(`${REDUX_STATE_PIC}`)</div> */}
            <p>username</p>
          </div>
          <div className='nav-links'>
            <Link to='./Dash' img className='nav-img' src={homeLogo} alt='home' />
            <Link to='./Form' img className='nav-img' src={newLogo} alt='new post' />
          </div>
          <Link to='Auth' onClick={(logoutLogo) => this.logout()} img className='nav-img logout' src={logoutLogo} alt='logout' />
        </div>
  }
}

const mapStateToProps = state => state

export default 
<withRouter>
  connect(mapStateToProps {updateUser, logout}(Component))
    <Nav />
</withRouter>;