import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';

import Navbar from '../Navbar/Navbar';
import BarForm from '../BarCard/BarForm';
import BarPic from './BarPic';
import './BarDetail.css'
import Loginn2 from '../Login/Loginn2';


function BarDetail({match}) {
    const barID = match.params.barID;
    const [images,setImages] = useState('');
    const [closeday, setCloseday] = useState([]);

    /*
    const [ bardetail, setBardetail] = useState({});
    useEffect(() => {
      axios.get("https://docs.google.com/document/d/1utsUs99LkGp568qHs9GB9eOB3p4KtV_7rl0FF7TE7wc/edit?usp=sharing").then(result => {
        const {data} = result;
        console.log(data);
        setBardata(data);
      });
    },[] );
    */

   var Week = [
    {id: '0', name: 'Sunday'},
    {id: '1', name: 'Monday'},
    {id: '2', name: 'Tuesday'},
    {id: '3', name: 'Wednesday'},
    {id: '4', name: 'Thursday'},
    {id: '5', name: 'Friday'},
    {id: '6', name: 'Saturday'},
  ];

    const favCLick = () => {
        axios.post(`http://35.240.130.253:3001/customers/${barID}/favbars`, {
            headers: {
                'Authorization' : `${window.Auth}`,
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => {
            console.log(response.data);
        });          
    }

    const MapDay = () => {
        for(var i = 0; i < closeday.length; i++) {
            if(closeday[i] == true) {
                return (Week[i].name);
            }
        }        
    };

   useEffect(() => {
    axios.get(`http://35.240.130.253:3001/bars/${barID}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then((response) => {
                    // console.log(response.data);
                    setImages(response.data);
                    setCloseday(response.data.CloseWeekDay);
                });      
    },[])
    return (
        <div>
            <Navbar />
            <div>
                {/*<ul>{bardetail && bardetail.map(item => <li key={item._id}> {item._id} </li>)} </ul>*/}
                <br/><br/>
                <header>
                    <h1 className='nametext'>{images.BarName}
                    {/* <Rating name="customized-1"
                            defaultValue={0} 
                            max={1}     
                            size="large"
                            onChange={favCLick}
                    /> */}
                    </h1>
                </header>
                <br/>                    
                <BarPic barID={barID}/>
                <p className='destext'>
                    Bar's Description: {images.BarDescription}<br/><br/>
                    Open-Time/Close-Time: {images.OpenTime}/{images.CloseTime}<br/><br/>
                    Close On: {MapDay()}<br/><br/>
                    
                    LINE ID: {images.LineID}<br/>
                    {/* Tel: 012-345-6789<br/><br/> */}
                    Address: {images.Address}<br/><br/>
                    OpenTime: {images.OpenTime}<br /><br />
                    Bar's Rule: {images.BarRule}<br/><br />
                    {/* Bar's Rule: If you want larger table, please tell us<br/> one day before your reserved date<br/><br/> */}
                </p>
                <div className='rsdiv'>
                    <Loginn2 barID={`${barID}`}/>
                </div>
                <br/><br/><br/>
            </div>
        </div>
    );
}

/*
function BarDetail(props: { isLogin: any; }) {
    const isLogin = props.isLogin;
    return(<BarDescription/>);
    if (isLogin){
        return <ReserveForm/>;
    }return <Login/>;
}
*/

export default BarDetail;

