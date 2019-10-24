const React = require("react");
const UserCredentials = require("./components/UserCredentials");
const Layout = require('./layout');

class Register extends React.Component {
  render() {
    return (
      <Layout>
         <div>
        <h1>User Registration</h1>
        <UserCredentials type="Register" />
      </div>
      </Layout>
     
    );
  }
}

module.exports = Register;