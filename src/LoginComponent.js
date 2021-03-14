import React from 'react';
import UserList from './UserLists';

export default class LoginComponent extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    
        this.handleUser = this.handleUser.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleUser(event) {
        this.setState({username: event.target.value});
      }

      handlePass(event) {
        this.setState({password: event.target.value});
      }
    
      handleSubmit(event) {
        var url = 'http://localhost:8000/api-token-auth/';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', data.token)
                this.setState({token: data.token})
            });
        event.preventDefault();
      }

      logout(){
          localStorage.removeItem('token');
          this.setState({token: null})
      }
    
      render() {
        var token = localStorage.getItem('token');

        if(!token){
            return (
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Nome:
                    <input type="text" value={this.state.username} onChange={this.handleUser} />
                  </label>
                  <label>
                    Senha:
                    <input type="password" value={this.state.password} onChange={this.handlePass} />
                  </label>
                  <input type="submit" value="Enviar" />
                </form>
              );
        }else{
            return (
                <div>
                    <UserList />
                    <button onClick={() => this.logout()}>Logout</button>
                </div>
            )
            
        }

        
      }
}