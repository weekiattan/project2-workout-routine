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
                <div className='card'>
                    <img src={workout.image} height="200" width="300"/>
                    <a href={url}><button type="button" class="btn btn-success btn-block btn-lg">{workout.bodypart}</button></a>
                    
                </div>

                )
                    
           
        });
        return(
            <Layout>
                <html>
             <body>
                <div>
                <h2 class="display-2 text-center">Choose your Body Part to workout!</h2>

                    <div className="row justify-content-center">
                        <div className = 'card'>
                            
                        {workoutData}
                        </div>
                           
                
                     </div>
                </div>
             </body>
            </html>
            </Layout>
            
        )}
    }



module.exports = workout;