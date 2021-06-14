import React, { FC } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Routes from './components/Routes';
import Providers from './components/Providers';
import Footer from './components/Footer';
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
                    <Footer />
                </BrowserRouter>
            </Providers>
        </div>
    );
};

export default App;
