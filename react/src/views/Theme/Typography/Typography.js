import React, { Component } from 'react';
import { Modal,ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {
Badge,
Button,
ButtonDropdown,
Card,
CardBody,
CardFooter,
CardHeader,
Col,
Collapse,
DropdownItem,
DropdownMenu,
DropdownToggle,
Fade,
Form,
FormGroup,
FormText,
FormFeedback,
Input,
InputGroup,
InputGroupAddon,
InputGroupText,
Label,
Row,
} from 'reactstrap';
window.onload=function(){
document.getElementById("demo").style.display = "none" ;
document.getElementById("demo2").style.display = "none" ;
document.getElementById("demo3").style.display = "none" ;
document.getElementById("demo4").style.display = "none" ;
document.getElementById("demo5").style.display = "none" ;
}
class Typography extends Component {
constructor(props) {
super(props);
this.state = {
modal:false,
primary: false,
success: false,
warning: false,
danger: false
};
this.toggle = this.toggle.bind(this);
this.togglePrimary = this.togglePrimary.bind(this);
this.toggleSuccess = this.toggleSuccess.bind(this);
this.toggleWarning = this.toggleWarning.bind(this);
this.toggleDanger = this.toggleDanger.bind(this);
this.toggle = this.toggle.bind(this);
this.toggleFade = this.toggleFade.bind(this);
this.state = {
collapse: true,
fadeIn: true,
timeout: 300
};
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

toggleFade() {
this.setState((prevState) => { return { fadeIn: !prevState }});
}
myFunction() {

var x = document.getElementById("select").value;
console.log(x);
if(x==1){
document.getElementById("demo").style.display = "" ;
}
else if(x==2){
document.getElementById("demo").style.display = "none";
}
else if(x==0){
document.getElementById("demo").style.display = 'none';
document.getElementById("demo2").style.display = 'none';
document.getElementById("demo3").style.display = "none" ;
document.getElementById("demo4").style.display = 'none';
document.getElementById("demo5").style.display = "none" ;
}
}
myFunctionYeniDizin() {

var x = document.getElementById("yeni_dizin").value;
console.log(x);
if(x==4){
document.getElementById("demo2").style.display = "" ;
document.getElementById("demo3").style.display = "none" ;
document.getElementById("demo4").style.display = 'none';
document.getElementById("demo5").style.display = "none" ;
}
else if(x==3){
document.getElementById("demo2").style.display = "none" ;
document.getElementById("demo3").style.display = "" ;
}
else if(x==0){
document.getElementById("demo2").style.display = 'none';
document.getElementById("demo3").style.display = "none" ;
document.getElementById("demo4").style.display = 'none';
document.getElementById("demo5").style.display = "none" ;
}
}
myFunctionDizinGoc(){
var x = document.getElementById("dizingoc").value;
console.log(x);
if(x==5){
document.getElementById("demo4").style.display = "" ;
document.getElementById("demo5").style.display = "none" ;
}
else if(x==6){
document.getElementById("demo4").style.display = "none" ;
document.getElementById("demo5").style.display = "" ;
}
else if(x==0){
document.getElementById("demo4").style.display = 'none';
document.getElementById("demo5").style.display = "none" ;
}
}

render() {
return (
<Row>
<Col xs="10" md="4">
<Card>
<CardHeader>
<strong>Sunucu Ekleme</strong>
</CardHeader>
<CardBody>
<Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
<FormGroup row>
<Col md="3">
<Label htmlFor="select">Select</Label>
</Col>
<Col xs="10" md="7">
<Input type="select" name="select" id="select" onChange={this.myFunction}>
<option value="0">Seçiminizi Yapın</option>
<option value="1">Yeni Dizin</option>
<option value="2">Mevcut Dizin</option>
</Input>
</Col>
</FormGroup>
</Form>
</CardBody>
</Card>
</Col>
<Col xs="12" sm="6" id='demo'>
<Card>
<CardHeader>
<strong>İşlem</strong>
</CardHeader>
<CardBody>
<Col xs="12" md="9">
<Input type="select" name="select" id="yeni_dizin" onChange={this.myFunctionYeniDizin}>
<option value="0">Lütfen Seçin</option>
<option value="3">Dizin Göç</option>
<option value="4">Yeni Kurulum</option>
</Input>
<br></br>
<FormGroup row id='demo2'>
<Col xs="10" md="20">
<form>
<Input type="text" id="ip-address" name="text-input" size="50" placeholder="Ip address veya Hostname:" />
<Input type="text" id="username" name="text-input" size="50" placeholder="Kullanıcı Adı:" />
<Input type="password" id="password" name="text-input" size="50" placeholder="Password:" />
<Button color="primary" onClick={this.togglePrimary} className="mr-1">Devam</Button>
<Modal isOpen={this.state.primary} toggle={this.togglePrimary}
className={'modal-primary ' + this.props.className}>
<ModalHeader toggle={this.togglePrimary}>Kullanıcı Ekleme</ModalHeader>
<ModalBody>
<Col xs="10" md="20">
<Input type="text" id="Admin" name="text-input" size="50" placeholder="Admin Yönetici Hesabı:" />
<div>
<Input type="password" id="password" name="text-input" size="50" placeholder="Password:" />
<Input type="text" id="Domain" name="text-input" size="50" placeholder="Domain Adı:" />
</div>
</Col>
</ModalBody>
<ModalFooter>
<Button color="primary" size="sm" onClick={this.handleSubmit}>Kaydet</Button>{' '}
<Button color="secondary" size="sm" onClick={this.togglePrimary}>Çıkış</Button>
</ModalFooter>
</Modal>
<Button type="reset" value="Reset" color="danger" className="mr-1"> Reset</Button>
</form>
</Col>
</FormGroup>
<FormGroup row id='demo3'>
<Col xs="10" md="20">
<Input type="select" name="select" id="dizingoc" onChange={this.myFunctionDizinGoc}>
<option value="0">Lütfen Seçin</option>
<option value="5">AD TO SAMBA DC</option>
<option value="6">AD O LDAP</option>
</Input>
</Col>
</FormGroup>
<FormGroup row id='demo4'>
<Col xs="10" md="20">
<form>
<Input type="text" id="ip-address" name="text-input" size="50" placeholder="sambaIp address veya Hostname:" />
<Input type="text" id="username" name="text-input" size="50" placeholder="Kullanıcı Adı:" />
<Input type="password" id="password" name="text-input" size="50" placeholder="Password:" />
<Button color="primary" onClick={this.togglePrimary} className="mr-1">Devam</Button>
<Modal isOpen={this.state.primary} toggle={this.togglePrimary}
className={'modal-primary ' + this.props.className}>
<ModalHeader toggle={this.togglePrimary}>Kullanıcı Ekleme</ModalHeader>
<ModalBody>
<Col xs="10" md="20">
<Input type="text" id="ip" name="text-input" size="50" placeholder="AD Ip adress" />
<Input type="text" id="yönetici_hesap" name="text-input" size="50" placeholder="AD Yönetici Hesabı" />
<div>
<Input type="password" id="password_samba" name="text-input" size="50" placeholder="Password:" />
<Input type="text" id="Domain_samba" name="text-input" size="50" placeholder="Domain Adı:" />
</div>
</Col>
</ModalBody>
<ModalFooter>
<Button color="primary" size="sm" onClick={this.handleSubmit}>Kaydet</Button>{' '}
<Button color="secondary" size="sm" onClick={this.togglePrimary}>Çıkış</Button>
</ModalFooter>
</Modal>
<Button type="reset" value="Reset" color="danger" className="mr-1"> Reset</Button>
</form>
</Col>
</FormGroup>
<FormGroup row id='demo5'>
<Col xs="10" md="20">
<form>
<Input type="text" id="ip-address" name="text-input" size="50" placeholder="ldapIp address veya Hostname:" />
<Input type="text" id="username" name="text-input" size="50" placeholder="Kullanıcı Adı:" />
<Input type="password" id="password" name="text-input" size="50" placeholder="Password:" />
<Button color="primary" onClick={this.togglePrimary} className="mr-1">Devam</Button>
<Modal isOpen={this.state.primary} toggle={this.togglePrimary}
className={'modal-primary ' + this.props.className}>
<ModalHeader toggle={this.togglePrimary}>Kullanıcı Ekleme</ModalHeader>
<ModalBody>
<Col xs="10" md="20">
<Input type="text" id="ip" name="text-input" size="50" placeholder="AD Ip adress" />
<Input type="text" id="yönetici_hesap" name="text-input" size="50" placeholder="AD Yönetici Hesabı" />
<div>
<Input type="password" id="password_samba" name="text-input" size="50" placeholder="Password:" />
<Input type="text" id="Domain_samba" name="text-input" size="50" placeholder="Domain Adı:" />
</div>
</Col>
</ModalBody>
<ModalFooter>
<Button color="primary" size="sm" onClick={this.handleSubmit}>Kaydet</Button>{' '}
<Button color="secondary" size="sm" onClick={this.togglePrimary}>Çıkış</Button>
</ModalFooter>
</Modal>
<Button type="reset" value="Reset" color="danger" className="mr-1"> Reset</Button>
</form>
</Col>
</FormGroup>
</Col>
</CardBody>
</Card>
</Col>
</Row>
);
}
}

export default Typography;