import React, { Component } from 'react';
import {Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
//import Button from '@material-ui/core/Button';
import { Badge,FormGroup} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import fetch from 'isomorphic-fetch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import usersData from './UsersData'
function UserRow(props) {
 
  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }


}
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


class Users extends Component {
 
  constructor(){
    super();
    this.state = {
      items:[], //User list
      modal: false,
      primary: false,
      success: false,
      warning: false,
      usernameError:"",
      danger: false,
      isLoaded:false,
      open: false, //Add user dialog open-close declaration
      open_edit:false, //Update user dialog open-close declaration
      errors: {}
    };
    this.toggle = this.toggle.bind(this);
  this.togglePrimary = this.togglePrimary.bind(this);
  this.toggleSuccess = this.toggleSuccess.bind(this);
  this.toggleWarning = this.toggleWarning.bind(this);
  this.toggleDanger = this.toggleDanger.bind(this);
  }
 
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
  }
  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  toggleWarning() {
    this.setState({
      warning: !this.state.warning,
    });
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }

/**Dialog open close methods */
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClickOpenEdit=()=>{
    this.setState({ open_edit: true });
  };
  handleCloseEdit=()=>{
    this.setState({ open_edit: false });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  /**Get Request for user from API
   * http://laravel.local/api/getusers
   */
  componentDidMount() {
    fetch('http://laravel.local/api/getusers').then(res=>res.json()).then(json=>{
      this.setState({
       
        items:json,
      });
       console.log(json);
    })
  }
  handleTitleChange(event){
    var id_error=document.getElementById("id_error");
    var name_error=document.getElementById("name_error");
    var userpass_error=document.getElementById("pass_error");
    var id_error_success=document.getElementById("id_error_success");
    console.log(event.target.value);
  if(event.target.value==""){
    id_error.textContent="";
    id_error_success.textContent="";
  }

   
  }
  handleBodyChange(event){
    //console.log(event.target.value);
  }
  handlePassChange(event){
  //  console.log(event.target.value);
  }
  /**Add user Request from api and dialog communication */

 
  handleSubmit=(data) =>{
  var items=this.state.items;
   
    var name=document.getElementById("blog_post_body");
    var id=document.getElementById("blog_post_title");
    var userpass=document.getElementById("blog_post_pass");
    var id_error_success=document.getElementById("id_error_success");
    var users = {
      userid: id.value,
      username: name.value,
      userpass: userpass.value
    }
   
    if(id_error_success.textContent=="✔"){
      fetch('http://laravel.local/api/takeuser', {
        method: 'POST',
        
        body: JSON.stringify({
          userid:id.value,
          username: name.value,
          userpass:userpass.value
          }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
      this.state.items.push(users);
      this.setState({ open: false });
      this.togglePrimary() ;
  })
    .catch((err)=>console.log(err))
}
   
  }

/**Update user with Api and dialog communication */
handleUpdate(event){
  var edited_id=document.getElementById("edited_id");
  var edited_name=document.getElementById("edited_name");
  var edited_userpass=document.getElementById("edited_userpass");

  let body = JSON.stringify({
    edited_id:edited_id.value,
      edited_name: edited_name.value,
      edited_userpass:edited_userpass.value,

      userid: event.userid,
      username: event.username,
      userpass:event.userpass,
    
});
console.log(body);
  fetch('http://laravel.local/api/updateuser', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      edited_id:edited_id.value,
      edited_name: edited_name.value,
      edited_userpass:edited_userpass.value,

      userid: event.userid,
      username: event.username,
      userpass:event.userpass,
    })
   
}).then(res=>res.json()).then(json=>{
  this.toggleSuccess();
  this.setState({ open_edit: false });
})
.catch((error) => {
    throw (error);
});
this.setState({ edited_open: false });
}

/**Delete from database function request method */
onDelete(event) {
 
  var deleted_users = {
    userid: event.userid,
    username: event.username,
    userpass: event.userpass
  }
  console.log(deleted_users);
  var index = this.state.items.indexOf(event);
  console.log(index);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
    
  return fetch('http://laravel.local/api/deluser', {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        userid: event.userid,
        username: event.username,
        userpass:event.userpass
    })
}).then(res => {
  //this.state.items.pop(deleted_users);
})
.catch((error) => {
    throw (error);
});

}
handleBlur() {
  var ids=document.getElementById("blog_post_title");
  var id_error=document.getElementById("id_error");
  var id_error_success=document.getElementById("id_error_success");
  fetch('http://laravel.local/api/validation', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userid: ids.value
    })
   
}).then(res=>res.json()).then(json=>{
  
  if(json=='true') {
    id_error_success.textContent="✔";
    id_error.textContent="";

  }
  else if(json=="null"){
    id_error.textContent="";
    id_error_success.textContent="";
  }
  else{
    id_error.textContent="X";
    id_error_success.textContent="";
 
  }

})
.catch((error) => {
    throw (error);
});
  
  }

  render() {
    const { items }= this.state;
    const errors=this.state.errors;
    return (
      <div className="animated fadeIn">
        <Table >
        <TableHead>
          <TableRow>
            <CustomTableCell >Userid</CustomTableCell>
            <CustomTableCell >username</CustomTableCell>
            <CustomTableCell >userpass</CustomTableCell>
            <CustomTableCell >Edit</CustomTableCell>
            <CustomTableCell >Delete</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(row => {
            return (
              <TableRow>
                <CustomTableCell >{row.userid}</CustomTableCell>
                <CustomTableCell >{row.username}</CustomTableCell>
                <CustomTableCell >{row.userpass}</CustomTableCell>
                <CustomTableCell >
             
                <Button color="success" onClick={this.toggleSuccess} className="mr-1">Edit</Button>
                <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                       className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.toggleSuccess}>Kullanıcı Bilgileri Yenileme</ModalHeader>
                  <ModalBody>
                 
         <label className="col-sm-2 control-label required">Id:</label>
         <TextField id="edited_id" type="text" required="required" className="form-control"onChange={this.handleBodyChange}/><br/>
         <label className="col-sm-2 control-label required">Username:</label>
           <TextField id="edited_name"type="text" required="required" className="form-control"onChange={this.handleBodyChange}/><br/>
           <label className="col-sm-2 control-label required">Userpass:</label>
           <TextField id="edited_userpass"type="text" required="required" className="form-control"onChange={this.handleBodyChange} /><br/>
        
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={this.handleUpdate.bind(this,row)}className="mr-1" >Değiştir</Button>
                    <Button color="secondary" onClick={this.toggleSuccess}>Çıkış</Button>
                  </ModalFooter>
                </Modal>
              
        
            </CustomTableCell>
            <CustomTableCell >
           
            <Button color="danger" onClick={this.onDelete.bind(this,row)} className="mr-1">Delete</Button>
            </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <div>
       
       <Button color="primary" onClick={this.togglePrimary} className="mr-1">Add User</Button>
               <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                      className={'modal-primary ' + this.props.className}>
                 <ModalHeader toggle={this.togglePrimary}>Kullanıcı Ekleme</ModalHeader>
                 <ModalBody>
                 <form name="blog_post" className="form-horizontal" onSubmit={this.handleSubmit}>
               <div id="blog_post">
                   <div className="form-group">
                       <label className="col-sm-2 control-label required" htmlFor="blog_post_title">Id</label>
       
                       <div className="col-sm-10">
                       <div style={{ color: 'blue' }} class="button-container">
                       <FormGroup check inline>
                        <TextField type="text"
                        style={{ color: 'blue' }}
                                  id="blog_post_title"
                                  errorText={this.state.usernameError}
                                  required="required"
                                  value={this.state.title}
                                  onChange={this.handleTitleChange.bind(this)}
                                  className="form-control" onBlur={this.handleBlur}/>
                          
                           
                                  <td>  
                      <Badge id="id_error" color="danger"></Badge>
                      <Badge id="id_error_success" color="success" className="float-right"></Badge>
                    </td>
                    </FormGroup>
                    </div>
                       </div>
                   </div>
                   <div className="form-group">
                       <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Kullanıcı</label>
                       <div className="col-sm-10">
                       <FormGroup check inline>
                           <TextField type="text"
                                  id="blog_post_body"
                                  required="required"
                                  errorText={this.state.usernameError}
                                  value={this.state.body}
                                  onChange={this.handleBodyChange.bind(this)}
                                  className="form-control"/>
                                      <td>
                      <Badge id="name_error" color="danger"></Badge>
                    </td>
                    </FormGroup>    
                       </div>
                   </div>
                   <div className="form-group">
                       <label className="col-sm-2 control-label required" htmlFor="blog_post_pass">Password</label>
                       <div className="col-sm-10">
                       <FormGroup check inline>
                           <TextField type="text"
                                  id="blog_post_pass"
                                  required="required"
                                  errorText={this.state.usernameError}
                                  value={this.state.pass}
                                  onChange={this.handlePassChange.bind(this)}
                                  className="form-control"/>
                                   <Badge id="pass_error" color="danger"></Badge>
                                   </FormGroup> 
                       </div>
                    
                   </div>
                   
               </div>
</form>
                 </ModalBody>
                 <ModalFooter>
                   <Button color="primary" onClick={this.handleSubmit}>Kaydet</Button>{' '}
                   <Button color="secondary" onClick={this.togglePrimary}>Çıkış</Button>
                 </ModalFooter>
               </Modal>
     
       
     </div>
      </Table>
        
     
      </div>
      
    )

  }
}


  
export default Users;

