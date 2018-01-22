import React,{Component} from 'react';
import {
    BrowserRouter as Router , Route, NavLink ,Link
} from 'react-router-dom';

import url from './app';

export default class DetailPage extends Component{
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