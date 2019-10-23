const React = require("react");
const UserCredentials = require("./components/UserCredentials");

class Register extends React.Component {
  render() {
    return (
      <div>
        <h1>User Registration</h1>
        <UserCredentials type="Register" />
      </div>
    );
  }
}

module.exports = Register;