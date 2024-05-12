import React from 'react';
import githubLogo from './github-mark.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Zendesk Tweaker</h1>
            </header>
            <p>Keep Zendesk shared views collapsed.</p>
            <img src={githubLogo} className="App-github-logo" alt="logo"/>
            <a href="https://github.com/tolache/zd-tweaker">tolache/zd-tweaker</a>
        </div>
    );
}

export default App;
