import React,{Component} from 'react';
import {
    BrowserRouter as Router , Route, NavLink ,Link
} from 'react-router-dom';

import url from './app';

export default class HomePage extends Component{
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