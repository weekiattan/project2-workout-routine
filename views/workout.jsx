const React = require('react');
const Layout = require('./layout');

class workout extends React.Component {
    render() {

        console.log("@@@@@@@@@@@@@@@@@@@@@")
        console.log(this.props.workouts)
        console.log("@@@@@@@@@@@@@@@@@@@@@")
        
        let workoutData = this.props.workouts.map((workout)=>{
            let url = "/workout/"+workout.id
            return (
            <a href={url}>{workout.bodypart}</a>
 
                )
                    
           
        });
        return(
            <Layout>
                <html>
             <body>
                <div>
                    <h1>Choose your BodyPart to workout!</h1>

                    <div className="row justify-content-center">
                        
                            {workoutData}
                                     
                     </div>
                </div>
             </body>
            </html>
            </Layout>
            
        )}
    }



module.exports = workout;