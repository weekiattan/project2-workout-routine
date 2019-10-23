const React = require("react");
const UserCredentials = require("./components/UserCredentials");

class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>User Login</h1>
        <UserCredentials type="Login" />
      </div>
    );
  }
}

module.exports = Login;