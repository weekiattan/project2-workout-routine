const React = require("react");
const Layout = require('./layout');

class Home extends React.Component {
    render() {
      return (
        <Layout>
          <div>
          <div>
            <a href="/register">
              <button>Register</button>
            </a>
          </div>
          <div>
            <a href="/login">
              <button>Login</button>
            </a>
          </div>
        </div>  
        </Layout>
        
      );
    }
  }
  
  module.exports = Home;