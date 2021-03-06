var React = require('react');
const NewExercise = require("./components/NewExercise");
const Layout = require('./layout');

class NewExerciseForm extends React.Component {
  render() {
    return (
      <Layout>
        <div>
        <h1>New Exercise</h1>
        <NewExercise 
          // exercises={this.props.exercises} 
          id={this.props.id} 
          type={this.props.type} 
        />
      </div>
      </Layout>
      
    );
  }
}

module.exports = NewExerciseForm;
