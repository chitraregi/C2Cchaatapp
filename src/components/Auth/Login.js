import React from 'react';
import {Grid, Form, Button, Segment, Header, Message} from 'semantic-ui-react';

import  firebase from '../../Firebase';

import {Link} from 'react-router-dom'

class Login extends React.Component{

    state = {
    email:"",
    password:"",
    errors: [],
    loading: false,
    };
       

   displayErrors = errors => errors.map((error,i) => <p key={i}> {error.message} </p>);

    handleChange= (event) => {
       this.setState({ [event.target.name]: event.target.value});
    };

    handleSubmit =(event) =>{
      event.preventDefault();
      if(this.isFormValid(this.state)){
       this.setState({ error: [], loading: true });
       firebase
       .auth()
       .signInWithEmailAndPassword(this.state.email,this.state.password) 
       .then(signedInUser=>{
           console.log(signedInUser);
       })
       
       .catch(err =>{
             console.log(err);
             this.setState({
                 errors: this.state.errors.concat(err),
                 loading:false
             });
       })

    }
  };

  isFormValid=({email,password}) => email && password;

  handleInputError=(errors,inputName) =>
  {
    return errors.some(error =>error.message.toLowerCase().includes(inputName))
    ? "error"
    :"";
  };

    render(){

      const {email ,password ,errors,loading } = this.state;
            
return (
  <>
  <Grid textAlign="center" style={{backgroundRepeat:"no-repeat",backgroundSize:"100% 100%", backgroundImage: `url(${"/Images/ll.gif"})`}} verticalAlign="middle" className="app">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h1" icon color="violet" textAlign="center" style={{marginBottom:"2.5rem"}}> 
       <span style={{marginLeft:"1rem",marginRight:"3rem", textAlign:"center",textShadow: "2px 2px black",textSize:"4rem" }}>Login to C2C </span>
      </Header>
      <Form onSubmit={this.handleSubmit} size="large">
        <Segment stacked>

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

          <Button

             disabled={loading}
            className={loading ? 'loading' : '' }
            color="violet"
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
        Don't have an account <Link to="/Register">Register</Link>
      </Message>
    </Grid.Column>
  </Grid>
  </>
);
 }

}


export default Login;
