const React = require("react");
const UserCredentials = require("./components/UserCredentials");
const Layout = require('./layout')

class Login extends React.Component {
  render() {
    return (
    <Layout>
      
        
      <div>
        <h1>Login</h1>
        <UserCredentials type="Login" />
      </div>
      </Layout>
      
    );
  }
}

module.exports = Login;