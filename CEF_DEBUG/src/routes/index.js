import React from 'react';
import {action, observable} from 'mobx';
import Login from '~p/auth/login';

class Router {
    @observable route = 'login';
    
    @action setRoute(newRoute) {
        this.route = newRoute;
    }

    routes = {
        'login': () => <Login/>,
        //'register': () => <Reg/>
    }
    
    component() {
        console.log(this.route);
        return this.routes[this.route]();
    }
}


export default new Router;