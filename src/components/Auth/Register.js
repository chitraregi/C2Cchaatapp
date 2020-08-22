import React from 'react';
import {Grid, Form, Button, Segment, Header, Message} from 'semantic-ui-react';
import  firebase from '../../Firebase';
import md5 from "md5";

import {Link} from 'react-router-dom'

class Register extends React.Component{

    state = {
    username:"",
    email:"",
    password:"",
    passwordConfirmation:"" ,
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users')
    };
   
    isFormValid =() =>
    {
      let errors =[];
      let error;

      if(this.isFormEmpty(this.state)){

        error = {Message:'Fill in all fields'};
        this.setState({errors: errors.concat(error)});
        return false;
           
      }
      else if(!this.isPasswordValid(this.state)){
          
        error = {Message:'password is invalid'};
        this.setState({errors: errors.concat(error)});
        return false;
      }
      else{
        return true;
      }
    }


  isFormEmpty= ({username ,email ,password ,passwordConfirmation } ) =>
  {
       return !username.length || !email.length || !password.length || !passwordConfirmation.length;
  }

  isPasswordValid = ({ password,passwordConfirmation }) =>
  {
    if(password.length < 6 ||passwordConfirmation.length < 6){
      return false;
    }
    else if(password !== passwordConfirmation){
      return false;
    }
    else{
      return true;
    }
  }

   displayErrors = errors => errors.map((error,i) => <p key={i}> {error.Message} </p>);

    handleChange= (event) => {
       this.setState({ [event.target.name]: event.target.value});
    };

    handleSubmit =(event) =>{
      event.preventDefault();
      if(this.isFormValid()){
       this.setState({ error: [], loading: true });
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email,this.state.password)
       .then(createdUser => {
        console.log(createdUser);
        createdUser.user
          .updateProfile({
            displayName: this.state.username,
            photoURL: `http://gravatar.com/avatar/${md5(
              createdUser.user.email
            )}?d=identicon`
          })
          .then(() => {
            this.saveUser(createdUser).then(() =>{
              console.log('user saved');
            })
            })
          .catch(err => {
            console.error(err);
            this.setState({
              errors: this.state.errors.concat(err),
              loading: false
            });
          });
        })
          .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };
    
  saveUser = createdUser =>{
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  }






    handleInputError=(errors,inputName) =>
    {
      return errors.some(error =>error.Message.toLowerCase().includes(inputName))
      ? "error"
      :""
    };

    render(){

      const {username ,email ,password ,passwordConfirmation,errors,loading } = this.state;
            
return (
  <>
  <Grid textAlign="center" style={{backgroundRepeat:"no-repeat",backgroundSize:"100% 100%", backgroundImage: `url(${"/Images/bg.png"})`}} verticalAlign="middle" className="app">
    <Grid.Column style={{ maxWidth: 450 }}>
    <img className="ui image" src="/Images/c2c.png" alt="club" style={{borderRadius:"20%",position:"relative",top:"-20px",left:"-33rem", width:"4rem"}}/>
      <Header as="h1" icon color="teal" textAlign="center" style={{marginBottom:"2.5rem"}}> 
       <span style={{marginLeft:"1rem",marginRight:"3rem", textAlign:"center",textShadow: "2px 2px black",textSize:"4rem" }}>Register for C2C </span>
      </Header>
      <Form onSubmit={this.handleSubmit} size="large">
        <Segment stacked>
          <Form.Input
            fluid
            name="username"
            icon="user"
            iconPosition="left"
            placeholder="Username"
            onChange={this.handleChange}
            value={username}
            
            type="text"
          />

          <Form.Input
            fluid
            name="email"
            icon="mail"
            iconPosition="left"
            placeholder="Email Address"
            onChange={this.handleChange}
            value={email}
            className={this.handleInputError(errors, "email")}
            type="email"
          />

          <Form.Input
            fluid
            name="password"
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            onChange={this.handleChange}
            value={password}
            className={this.handleInputError(errors, "password")}
            type="password"
          />

          <Form.Input
            fluid
            name="passwordConfirmation"
            icon="repeat"
            iconPosition="left"
            placeholder="Password Confirmation"
            onChange={this.handleChange}
            value={passwordConfirmation}
            className={this.handleInputError(errors, "password")}
            type="password"
          />

          <Button

             disabled={loading}
            className={loading ? 'loading' : '' }
            color="teal"
            fluid
            size="large"
          >
            Submit
          </Button>
        </Segment>
      </Form>
      {errors.length > 0 && (
        <Message error>
         <h3>Error</h3>
         {this.displayErrors(errors)}
        </Message>
      )}
      <Message>
        Already a user? <Link to="/login">Login</Link>
      </Message>
    </Grid.Column>
  </Grid>
  </>
);
 }

}


export default Register;
