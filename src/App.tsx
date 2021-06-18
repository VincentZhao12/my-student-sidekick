import React, { FC } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Routes from './components/Routes';
import Providers from './components/Providers';
const App: FC = () => {
    return (
        <div className="App">
            <Providers>
                <BrowserRouter>
                    <Navbar />
                    <div style={{ marginTop: '3vh' }}>
                        <Switch>
                            <Routes />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Providers>
        </div>
    );
};

export default App;
