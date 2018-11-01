import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
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
class Dhcp extends Component {
    constructor(){
        super();
        this.state = {
          items:[], 
          modal: false,
          primary: false,
          success: false,
          warning: false,
          usernameError:"",
          danger: false,
          isLoaded:false,
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
      componentDidMount() {
        fetch('http://laravel.local/api/getServers').then(res=>res.json()).then(json=>{
          this.setState({
           
            items:json,
          });
           console.log(json);
        })
      }
      handleSubmit=(data) =>{
        var items=this.state.items;
         
          var server_name=document.getElementById("blog_post_body");
          var server_id=document.getElementById("blog_post_title");
          var server_pass=document.getElementById("blog_post_pass");
          var server_user=document.getElementById("blog_post_user");
          var server_tag=document.getElementById("blog_post_tag");
          var id_error_success=document.getElementById("id_error_success");
          var items = {
             serverid:server_id.value,
                servername: server_name.value,
                servertag:server_tag.value
          }
          if(id_error_success.textContent=="✔"){
            fetch('http://laravel.local/api/servers', {
              method: 'POST',
              
              body: JSON.stringify({
                server_id:server_id.value,
                server_name: server_name.value,
                server_pass:server_pass.value,
                server_user:server_user.value,
                server_tag:server_tag.value
                }),
              headers: {
                  'Content-Type': 'application/json'
              }
          }).then(res => {
            this.state.items.push(items);
            this.setState({ open: false });
            this.togglePrimary() ;
        })
          .catch((err)=>console.log(err))
      }
         
        }
        handleBlur() {
          var server_name=document.getElementById("blog_post_body");
          var id_error=document.getElementById("id_error");
          var id_error_success=document.getElementById("id_error_success");
          fetch('http://laravel.local/api/validationServers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              server_name: server_name.value
            })
           
        }).then(res=>res.json()).then(json=>{
          console.log(json);
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
          onDelete(event) {
     
            var deleted_servers = {
              server_id: event.serverid,
              server_name: event.servername,
              server_tag: event.servertag
            }
            console.log(deleted_servers);
            var index = this.state.items.indexOf(event);
            console.log(index);
              this.state.items.splice(index, 1);
              this.setState(this.state.items);
              
            return fetch('http://laravel.local/api/delserver', {
              method: 'DELETE',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                server_id: event.serverid,
                server_name: event.servername,
                server_tag:event.servertag
              })
          }).then(res => {
           // this.state.items.pop(deleted_servers);
          })
          .catch((error) => {
              throw (error);
          });
        }
    render() {
        const { items }= this.state;       
            return (
              <div className="animated fadeIn">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-server"></i> SSHCon
                  </div>
                  <div className="card-body">
                    <Table >
                <TableHead>
                  <TableRow>
                    <CustomTableCell >SSHConID</CustomTableCell> 
                    <CustomTableCell >Servername</CustomTableCell>
                    <CustomTableCell >Servertag</CustomTableCell>
                    <CustomTableCell >Delete</CustomTableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
            {items.map(row => {
              return (
               <TableRow>
              <CustomTableCell >{row.serverid}</CustomTableCell>
              <CustomTableCell >{row.servername}</CustomTableCell>
              <CustomTableCell >{row.servertag}</CustomTableCell>
              <CustomTableCell >
                   
                    <Button color="danger" onClick={this.onDelete.bind(this,row)} className="mr-1">Delete</Button>
                    </CustomTableCell>
              </TableRow>
                    );
                  })}
                  </TableBody>
                  <Button color="primary" onClick={this.togglePrimary} className="mr-1">Sunucu Ekleme</Button>
                  <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                              className={'modal-primary ' + this.props.className}>
                         <ModalHeader toggle={this.togglePrimary}>Sunucu Ekleme</ModalHeader>
                         <ModalBody>
                         <form name="blog_post" className="form-horizontal" onSubmit={this.handleSubmit}>
                       <div id="blog_post">
                           <div className="form-group">
                               <label className="col-sm-2 control-label required" htmlFor="blog_post_title">Server Id</label>
               
                               <div className="col-sm-10">
                               <div style={{ color: 'blue' }} class="button-container">
                               <FormGroup check inline>
                                <TextField type="text"
                                style={{ color: 'blue' }}
                                          id="blog_post_title"
                
                                          required="required"
                                          value={this.state.title}
            
                                          className="form-control" />
                                  
                                   
                                          <td>  
                             
                            </td>
                            </FormGroup>
                            </div>
                               </div>
                           </div>
                           <div className="form-group">
                               <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Server Name</label>
                               <div className="col-sm-10">
                               <FormGroup check inline>
                                   <TextField type="text"
                                          id="blog_post_body"
                                          required="required"
                                          value={this.state.body}
                                         
                                          className="form-control" onBlur={this.handleBlur}/>
                                              <td>
                              <Badge id="id_error" color="danger"></Badge>
                              <Badge id="id_error_success" color="success" className="float-right"></Badge>
                            </td>
                            </FormGroup>    
                               </div>
                           </div>
                           <div className="form-group">
                               <label className="col-sm-2 control-label required" htmlFor="blog_post_pass">Sunucu Kullanıcı</label>
                               <div className="col-sm-10">
                               <FormGroup check inline>
                                   <TextField type="text"
                                          id="blog_post_user"
                                          required="required"
                  
                                          value={this.state.pass}
                                          
                                          className="form-control"/>
                                           <Badge id="pass_error" color="danger"></Badge>
                                           </FormGroup> 
                               </div>
                            
                           </div>
                           <div className="form-group">
                               <label className="col-sm-2 control-label required" htmlFor="blog_post_pass">Sunucu Password</label>
                               <div className="col-sm-10">
                               <FormGroup check inline>
                                   <TextField type="text"
                                          id="blog_post_pass"
                                          required="required"
                  
                                          value={this.state.pass}
                                          
                                          className="form-control"/>
                                           <Badge id="pass_error" color="danger"></Badge>
                                           </FormGroup> 
                               </div>
                            
                           </div>
                           <div className="form-group">
                               <label className="col-sm-2 control-label required" htmlFor="blog_post_pass">Sunucu Tag</label>
                               <div className="col-sm-10">
                               <FormGroup check inline>
                                   <TextField type="text"
                                          id="blog_post_tag"
                                          required="required"
                  
                                          value={this.state.pass}
                                         
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
                       
                  </Table>
                 
                  </div>
                </div>
              
              </div>
        );
    }

}

export default Dhcp;