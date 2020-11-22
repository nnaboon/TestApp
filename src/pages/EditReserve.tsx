import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { FormGroup, Label, Col, Button, Modal, ModalHeader }  from 'reactstrap';
import { Formik, Form, Field, ErrorMessage , FormikHelpers } from 'formik'
import 'bootstrap/dist/css/bootstrap.css';
import * as Yup from 'yup'
import axios from 'axios';
import './EditProfile.css'
import StatusEdit from './StatusEdit';

const RegisterSchema = Yup.object().shape({
  detail: Yup.string(),
});

interface Value2{
  detail: string,
}

interface CardProps {
    ResId: any,
    Name: any,
    GetData: any
}
function EditReserve(props: CardProps){
    console.log(props.Name);
    console.log(props.ResId);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
  let Auth = window.Auth;
  const [click, setClick] = useState(false);
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  let history = useHistory();

  const handleClick = () => {
    {console.log('handle')}
    if(name != '' && value != ''){
      props.GetData();
    }
  }

  const handleChange = () => {
    const params = JSON.stringify(
      {
        [name] : value
      }
    );

    axios.patch(`http://35.240.130.253:3001/reservations/${props.ResId}`, params,{
      headers: {
        'Authorization' : `${window.Auth}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response);
      handleClick();

    });

    console.log(Auth);
  }

  return(
    <div>
      <Button className='edbutton' onClick={toggle}>
        <p className='edtext'> Edit </p>
      </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className='editbg' aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalHeader toggle={toggle} close={closeBtn}>
          <p className='edittoptext'>Edit your details</p>
        </ModalHeader>
          <Formik
            initialValues={{
              detail: '',
            }}
            onSubmit={(
              values: Value2,
              { setSubmitting }: FormikHelpers<Value2>
            ) => {
              setTimeout(() => {
                setSubmitting(false);
              }, 500);
              // setName(values.detail);
            }}
            validationSchema={RegisterSchema}
          >
          {({ errors, touched }) => (
            <Form>
            <br/>
            <Col>
              <FormGroup>
                <Field name={props.Name}
                        type="text" 
                        id="detail" 
                        value={value}
                        onChange={(e:any) => {
                              setName(e.target.name);
                              setValue(e.target.value);
                        }}
                        className={`form-control ${touched.detail ? touched.detail ? 'is-invalid' : 'is-valid' : ''}`}
                        placeholder=""/>
              </FormGroup>
            </Col>
            <div className='cenbutton'>
              <Button
                className='submitbut2'
                type='submit'
                value='submit'
                onClick={() => {handleChange(); setModal(!modal);}}
              >
                <p className='submittext2'>Edit</p>
              </Button>
              
            </div>     
            <br/>     
            </Form>
          )}  
          </Formik>
      </Modal>
    </div>
  )
};

export default EditReserve;
