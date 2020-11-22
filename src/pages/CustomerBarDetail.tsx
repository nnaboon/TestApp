import React, {useState, useEffect} from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import BarPic from '../components/BarCard/BarPic';
import Navbar2 from '../components/Navbar/Navbar2';
import CustomerBarForm from './CustomerBarForm';
import './CustomerHome.css'
import CustomerBarPic from './CustomerBarPic';
import Rating from '@material-ui/lab/Rating';
import FavBar from './FavBar';


function CustomerBarDetail({match} : {match:any}) {
    
    const barID = match.params.barid;
    console.log(window.barID);
    const [images,setImages] = useState<any>('');
    const [closeday, setCloseday] = useState<any>([]);
    const [value,setValue] = useState<any>('');
    const [favbar, setFavbar] = useState<any>([]);

    var Week = [
        {id: '0', name: 'Sunday'},
        {id: '1', name: 'Monday'},
        {id: '2', name: 'Tuesday'},
        {id: '3', name: 'Wednesday'},
        {id: '4', name: 'Thursday'},
        {id: '5', name: 'Friday'},
        {id: '6', name: 'Saturday'},
      ];

    const MapDay = () => {
        for(var i = 0; i < closeday.length; i++) {
            if(closeday[i] == true) {
                return (Week[i].name);
            }
        }        
    };

    // const CheckFav = () => {
    //     {console.log('image',images._id)}

    //     favbar.map((bars:any) => {
    //         // console.log('bars', bars._id);

    //         if(bars._id == images._id){
    //             console.log('bars', bars);
    //             // setValue(1);
    //         }
    //     })
    // }

    useEffect(() => {
        axios.get(`http://35.240.130.253:3001/customers/${window.cusID}/favbars`, {
                headers: {
                    'Authorization': `${window.Auth}`,
                    'Access-Control-Allow-Origin': '*'
                }
            }).then((response) => {
                setFavbar(response.data);
                console.log(response.data);
            });            

    // }
    }, []);


    const params = (
        {
            "barId": `${barID}`,
        }
    );

    const favCLick = () => {
        console.log('cusID : ',window.cusID);
        axios.post(`http://35.240.130.253:3001/customers/${window.cusID}/favbars`, params,{
            headers: {
                'Authorization' : `${window.Auth}`,
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => {
            console.log(response.data);
            
        });          
    }

    const favCLick2 = () => {
        console.log('cusID favClick2 : ',window.cusID);
        axios.delete(`http://35.240.130.253:3001/customers/${window.cusID}/favbars/${barID}`,{
            headers: {
                'Authorization' : `${window.Auth}`,
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => {
            console.log(response.data);
        });          
    }

    useEffect(()=> {
            if(value == 1){
                favCLick();
            }
            if(value === null){
                favCLick2();
            }        
    }, [value]);



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
            <Navbar2 />
            {/* {CheckFav()} */}
            <div className="bgg">
                <br/><br/>
                <header>
                    <h1 className='nametext3'>{images.BarName}
                    <Rating name="customized-1"
                            //defaultValue={0} 
                            max={1}     
                            value={value}
                            size="large"
                            onChange={(event, newValue) => {
                                setValue(newValue);
                                console.log('value ', value)
                                // CheckValue();
                            }}
                    />
                    </h1>
                </header>
                <br/>                    
                <CustomerBarPic barID={barID}/>
                <br /><br />
                <p className='destext'>
                    Bar's Description: {images.BarDescription}<br/><br/>
                    Open-Time/Close-Time: {images.OpenTime}/{images.CloseTime}<br/><br/>
                    Close On: {MapDay()}<br/><br/>
                    
                    LINE ID: {images.LineID}<br/>
                    {/* Tel: 012-345-6789<br/><br/> */}
                    OpenTime: {images.OpenTime}<br /><br />
                    Address: {images.Address}<br/><br/>
                    Bar's Rule: {images.BarRule}<br/><br />
                </p>
                <div className='cenbutton'>
                    <CustomerBarForm barID={`${barID}`}/>
                </div>
                <br/><br/><br/>
            </div>
            {MapDay()}
        </div>
    );
}

export default CustomerBarDetail;
