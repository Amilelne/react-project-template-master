import React,{Component} from 'react';
import {
    BrowserRouter as Router , Route, NavLink ,Link
} from 'react-router-dom';
import {browserHistory} from 'react-router';

const axios = require('axios');
const url = 'http://125.212.216.184:3000/api/Todos';

// const HomePage = () => <h1>Home page</h1>;
//const DetailPage = () => <h1>Detail page</h1>;
// const AddPage = () => <h1>Add page</h1>;

export default class App extends Component{
    render(){
        return(
            <Router>
                <div className="navigate">
                    <ul>
                        <li><NavLink  activeClassName="active" to="/">Home</NavLink></li>
                        <li><NavLink  activeClassName="active" to="/detail">Detail</NavLink></li>
                        <li><NavLink  activeClassName="active" to="/add">Add</NavLink></li>
                        <li><NavLink  activeClassName="active" to="/stat">Statistical</NavLink></li>
                    </ul>
                    <hr/>

                    <Route exact path="/" component={HomePage} />
                    <Route  exact path="/detail" component={DetailPage} />
                    <Route path="/add" component={AddPage} />
                    <Route path="/stat" component={StatisticalPage} />
                    <Route path={`/detail/:itemId`} component={DetailPage}/>
                </div>
            </Router>
        )
    }
}
class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            todoList:[]
        }
        this.deleteItem = this.deleteItem.bind(this);
    }
    componentDidMount(){
        const that = this;
        axios.get(url).then(function (response) {
            that.setState({
                todoList:response.data
            })
        })
    }
    deleteItem(itemId){
        const delUrl = url +'/'+ itemId;
        console.log("delUrl="+JSON.stringify(itemId));
        axios.delete(delUrl).then(function (response) {
            console.log(response);
        });
    }
    render(){
        return(
        <div>
            <h1>Home page</h1>
            <div className="theList">
                <ul>
                {this.state.todoList.map(item =>(
                    <li key={item.id}>{item.name}<Link to={`detail/${item.id}`}>Detail</Link><button onClick={(e) => this.deleteItem(item.id)}>Delete</button></li>
                ))}
                 </ul>
            </div>
        </div>
        )
    }
}
class AddPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            text:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        if(!this.state.text.length){
            return;
        }
        const newItem = {
            name:this.state.text,
            dueAt:Date.now()
        };
        axios.post(url,{
            name:newItem.name,
            dueAt:newItem.dueAt
        }).then(function (response) {
            console.log("postResponse:"+response);
        })
        this.setState({
            text:''
        })
    }
    handleChange(e){
        this.setState({text:e.target.value});
    }
    render(){
        return(
            <div>
                <h1>Add Page</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange = {this.handleChange}
                        value = {this.state.text}
                        />
                    <button>Add</button>
                </form>
            </div>
        )
    }
}
class DetailPage extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            dueAt:'',
            id:0,
            createdAt:'',
            updateAt:''
        }
    }
    componentDidMount(){
        const itemId = this.props.match.params.itemId;
        const that = this;
        const detail_url = url+'/'+itemId
        console.log("url="+detail_url)
        axios.get(detail_url).then(function (response) {
            that.setState({
                name:response.data.name,
                dueAt:response.data.dueAt,
                id:response.data.id,
                createdAt:response.data.createdAt,
                updateAt:response.data.updateAt
            })
        })
    }
    render(){
        return(
            <div>
                <h3>Detail Page</h3>
                <p>name:{this.state.name}</p>
                <p>dueAt:{this.state.dueAt}</p>
                <p>id:{this.state.id}</p>
                <p>createdAt:{this.state.createdAt}</p>
                <p>updateAt:{this.state.updateAt}</p>
            </div>
        )
    }
}
var LineChart = require("react-chartjs").Line;

var options = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,
    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",
    //Number - Width of the grid lines
    scaleGridLineWidth : 1,
    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,
    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,
    //Boolean - Whether the line is curved between points
    bezierCurve : true,
    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,
    //Boolean - Whether to show a dot for each point
    pointDot : true,
    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,
    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,
    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,
    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,
    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,
    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,
    //Boolean - Whether to horizontally center the label and point dot inside the grid
    offsetGridLines : false
};
class StatisticalPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:{
                labels: [],
                datasets: {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: []
                }
            }
        }
    }
    componentDidMount(){
        const that = this;
        axios.get(url+'stats?range=daily').then(function (response) {
            const date = [];
            const count = [];
            for(let i=0;i<response.data.length;i++){
                date.push(response.data[i].date);
                count.push(response.data[i].count);
            }
            that.setState({

            });
        })
    }
    render(){
        return(
            <LineChart data={this.state.data} options={options} width="600" height="250" />
        )
    }
}