const React = require("react");

class Home extends React.Component {
    render() {
      return (
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
      );
    }
  }
  
  module.exports = Home;