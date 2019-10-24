var React = require('react');
const NewExercise = require("./components/NewExercise");

class NewExerciseForm extends React.Component {
  render() {
    return (
      <div>
        <h1>New Exercise</h1>
        <NewExercise type="exercise" />
      </div>
    );
  }
}

module.exports = NewExerciseForm;
