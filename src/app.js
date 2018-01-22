import React,{Component} from 'react';
import {
    BrowserRouter as Router , Route, NavLink ,Link
} from 'react-router-dom';
import {browserHistory} from 'react-router';

import HomePage from './HomePage';
import AddPage from './AddPage';
import DetailPage from './DetailPage';
import StatisticalPage from './StatisticalPage';

const axios = require('axios');
var url = module.exports.url = "http://125.212.216.184:3000/api/Todos";


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



