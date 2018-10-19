import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
//import {AppRegistry, ActivityIndicator, ListView,Text,View} from 'react-native';
import axios from 'axios';
import Popup from "reactjs-popup";
import Modal from 'react-modal';
import usersData from './UsersData';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
function UserRow(props) {
  const user = props.user
  const userLink = `#/users/${user.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user.userid.toString()}>
        <th scope="row"><a href={userLink}>{user.userid}</a></th>
        <td><a href={userLink}>{user.username}</a></td>
        <td>{user.userpass}</td>
      
    </tr>
  )
}



class Users extends Component {
  
  constructor(){
    super();
    this.onSubmit=this.onSubmit.bind(this);
    this.state = {
      items:[],
      isLoaded:false,
      showModal: false,
      userid:''
    };
    
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  onChangeCategoryName(e){
    this.setState({
      userid:e.target.value
    });
  }
  onSubmit(e){
    e.preventDefault();
    const userid={
      userid: this.state.userid
    }
    axios.post('http://laravel.local/api/takeuser',userid).then(res=>res.data);
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  componentDidMount() {
    fetch('http://laravel.local/api/getusers').then(res=>res.json()).then(json=>{
    console.log(json.userid);
      this.setState({
        items:json,
      });
    })
  }
  render() {
    const { items }= this.state;
    console.log("geldim");
    console.log(items.username);
    const userList = usersData.filter((user) => user.id < 12)
    console.log("dsada");
    //var {isLoaded, items}=this.state;
    
    return (
      <div className="animated fadeIn">
    
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users 
                <small className="text-muted">example</small>
                
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">userid</th>
                      <th scope="col">username</th>
                      <th scope="col">userpass</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          
        <div>
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" class="form-control" id="userid" />
          <input  type="text" class="form-control"/>
        </label>
        <button type="submit" value="Submit" >Submit</button>
      </form>

        </div>
          <input type="submit" onClick={this.closeModal} value="Close"/>
        </Modal>
      </div>
      
      </div>
      
    )

  }
}

  
export default Users;
