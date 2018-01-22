import React,{Component} from 'react';
import {
    BrowserRouter as Router , Route, NavLink ,Link
} from 'react-router-dom';

import url from './app';

export default class AddPage extends Component{
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