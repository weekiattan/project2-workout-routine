const React = require('react');
const Layout = require('./layout');

class Edit extends React.Component {
    render() {
        
       let  exercisesData = this.props.exercises.map((x)=>{
           const reps = x.reps;
           const sets= x.sets;
           const id = x.id

           return  <form method="POST" action={"/exercise/"+id+"?_method=put"}>
           <div className="form-group">
               <label>Sets</label>
               <input className="form-control form-control-lg" type="number" name="sets" placeholder={sets} required/>
           </div>                 
           <div className="form-group">
               <label>Reps</label>
               <input className="form-control" type="number" name="reps" placeholder={reps} required/>
           </div>
           <input type="submit" className="btn btn-success btn-block" value="Submit"/>
       </form>

       });

       let id = this.props.id;
    
        return (
            <Layout>

               <html>
             <body>
                <div>
                    

                    {exercisesData}

                    </div>
                   
             </body>
            </html>

            </Layout>
        );  
    };
};

module.exports = Edit;