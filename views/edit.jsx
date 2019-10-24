const React = require('react');
const Layout = require('./layout');

class Edit extends React.Component {
    render() {
        
        let id = this.props.id;
        // let sets= this.props.sets;
        // let reps = this.props.reps;
        
        console.log("@@@@@@@@@@@@@")
        console.log(id)
        // console.log(sets)
        // console.log(reps)
        console.log("@@@@@@@@@@@@@")
        return (
            <Layout>

                <form method="POST" action={"/exercise/"+id+"?_method=put"}>
                    <div className="form-group">
                        <label>Sets</label>
                        <input className="form-control form-control-lg" type="number" name="sets" required/>
                    </div>                 
                    <div className="form-group">
                        <label>Reps</label>
                        <input className="form-control" type="number" name="reps" required/>
                    </div>
                    <input type="submit" className="btn btn-success btn-block" value="Submit"/>
                </form>

            </Layout>
        );  
    };
};

module.exports = Edit;