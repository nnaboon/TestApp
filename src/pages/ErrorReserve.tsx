import React from 'react'
import { Button } from 'semantic-ui-react'
import { NavLink, Route } from 'react-router-dom';
import Navbar2 from '../components/Navbar/Navbar2';
import './CustomerHome.css'
import '../components/BarCard/Reserveii.css';
import { withRouter } from 'react-router-dom'


const CustomerReserveii = ({match} : {match:any}) => {
  return (
    <div className='bgg'>
      <Navbar2 />

      <div className='rsidpos'>
        <p className='rsidtext'>
          <br/><br/>
          Please read bar rules again.
        </p>
        <br/><br/><br/>
        </div>
      <div className='rsidpos'>
        <p className='rsidtext2'>
          You can try to <br/>reserve again!
        </p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button className='rsidbutton' onClick={() => window.location.replace(`/CustomerBarDetail/${match.params.barID}`)}>
          <b className='rsidtext3'> Reserve again </b>
        </Button>
      </div>
    </div>
  );
}

export default CustomerReserveii;