import React from 'react';
import {observer} from 'mobx-react';
import router from '~/routes';

@observer
class App extends React.Component {    
    render() {
        console.log(router);

        return (
            <div>
                {router.component()}
            </div>
        );
    }
};

export default App;