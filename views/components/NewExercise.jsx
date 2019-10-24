const React = require("react");

class NewExercise extends React.Component {
  render() {
    const {type} = this.props;
    return (
      <div>
        <form action={`/${type.toLowerCase()}`} method="post">
          <div>
            <label htmlFor="name">name: </label>
            <input type="text" name="name"/>
          </div>
          <div>
            <label htmlFor="workout_types_id"></label>
            <input type="hidden" name="workout_types_id" value="1"/>
          </div>
          <div>
            <label htmlFor="url">url: </label>
            <input type="url" name="url"/>
          </div>
          <div>
            <label htmlFor="sets">sets: </label>
            <input type="number" name="sets"/>
          </div>
          <div>
            <label htmlFor="reps">reps: </label>
            <input type="number" name="reps"/>
          </div>       
          <input type="submit" value='submit' />
        </form>
      </div>
    );
  }
}

module.exports = NewExercise;