const React = require('react');
const Layout = require('./layout');

class chest extends React.Component {
    render() {
        // console.log(this.props.workouts)
        let exercisesData = this.props.exercises.map((x)=>{
            const name = x.name;
            const url = x.url;
            const reps = x.reps;
            const sets = x.sets;
            const id = x.id
            const delete_url = "/exercise/"+id+"?_method=delete"
          
            // console.log(url)
            return <div className="card">
                <div className="card-body">
                    <h5 className='card-name'>{name}</h5>
                    <p className="card-text">{sets} sets of {reps} reps</p>
                    <iframe src={url}width="320" height="240" controls autoplay>
                    </iframe>
                    <form action={delete_url} method="POST"><button type="submit">Delete Exercise</button></form>

                </div>
            </div>
        });

        let id = this.props.id;
        let url = `/workout/${id}/new`
        console.log(url,"zzzzz");
        console.log(id,"hello")
        

        return(
            <Layout>
            <html>
             <body>
                <div>
                    <h1>Chest workout!</h1>

                    {exercisesData}

                    </div>
                    <div>
                    <div>
                        <a href={url}>
                        <button>Insert more exercise</button>
                        </a>
                    </div>
                    <div>
                        <a href="/workout/chest/edit">
                        <button>edit</button>
                        </a>
                    </div>
                    <div>
                        <a href="/login">
                        <button>delete</button>
                        </a>
                    </div>
                    </div>
             </body>
            </html>
            </Layout>
            
            )}
    }



module.exports = chest;