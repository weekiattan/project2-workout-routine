const React = require('react');

class workout extends React.Component {
    render() {
        console.log(this.props.workouts)
        
        let workoutData = this.props.workouts.map((workout)=>{
            let url = "/workout/"+workout.id
            return <a href={url}>{workout.bodypart}</a>
        });
        return(
            <html>
             <body>
                <div>
                    <h1>Choose your bodypart to workout!</h1>

                    {workoutData}

                  
                     
                </div>
             </body>
            </html>
            )}
    }



module.exports = workout;