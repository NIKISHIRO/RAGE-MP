import React from 'react';
import {action, observable} from 'mobx';
import Login from '~p/auth/login';
import Register from '~p/auth/register';

class Router {
    @observable route = 'register';
    
    @action setRoute(newRoute) {
        this.route = newRoute;
    }

    routes = {
        'login': () => <Login/>,
        'register': () => <Register/>
    }
    
    component() {
        return this.routes[this.route]();
    }
}


export default new Router;