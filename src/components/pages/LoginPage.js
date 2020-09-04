import { Component } from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faGithub } from '@fortawesome/free-brands-svg-icons';

import { auth } from '../../services/firebase';
import { usernamePasswordSignin } from '../../services/AccountFunctions';

library.add(fab, faGithub);

export default class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      error: null
    };

    this.handleSignin = this.handleSignin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleSignin() {
    event.preventDefault();
    event.stopPropagation();

    if (this.state.username && this.state.password) {
      usernamePasswordSignin(this.state.username, this.state.password)
        .then((user) => {
          window.location.replace('/profile');
        })
        .catch((error) => {
          this.setState({error: Object.values(mapErrorToField(error))[0]});
        });
    }

    return false;
  }

  render() {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h4 className="display-5">Sign in to GitNotes</h4>

        <div className="d-flex justify-content-center" style={{ textAlign: 'left', padding: '1rem 0' }}>
          <Card className="shadow-sm" style={{ width: '25rem' }}>
            <Card.Body>
              { this.state.error ? <Alert variant='danger'>{ this.state.error }</Alert> : null }

              <Form onSubmit={this.handleSignin}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control name="username" type="input" onChange={this.handleChange} required />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" type="password" onChange={this.handleChange} required />
                  <Form.Text className="small text-muted">Forgot your password? Too bad.</Form.Text>
                </Form.Group>

                <div style={{ textAlign: 'center' }}>
                  <Button variant="primary" type="submit" className="w-100">Sign in</Button>
                </div>
              </Form>

              <hr />

              <div style={{ textAlign: 'center' }}>
                <Button variant="dark" className="w-100" onClick={() => {
                  let provider = new auth.GithubAuthProvider();
                  return auth().signInWithPopup(provider);
                }}><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon> GitHub</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}