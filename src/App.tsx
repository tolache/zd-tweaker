import React, { useEffect, useState } from 'react';
import githubLogo from './github-mark.svg';
import './App.css';

function App() {
    const [isSharedViewsCollapsed, setIsSharedViewsCollapsed] = useState(true);
    const [isTicketInfoBarsHidden, setIsTicketInfoBarsHidden] = useState(true);

    useEffect(() => {
        chrome.storage.local.get(["collapseSharedViews"], function (result) {
            setIsSharedViewsCollapsed(result?.collapseSharedViews ?? true);
        });
        chrome.storage.local.get(["hideTicketInfoBars"], function (result) {
            setIsTicketInfoBarsHidden(result?.hideTicketInfoBars ?? true);
        });
    }, []);

    const handleCollapseSharedViewsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsSharedViewsCollapsed(checked);
        chrome.storage.local.set({ collapseSharedViews: checked },
            function() {
                console.log('Collapse shared views is set to: ' + checked);
            });
    };

    const handleHideTicketInfoBarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsTicketInfoBarsHidden(checked);
        chrome.storage.local.set({ hideTicketInfoBars: checked },
            function() {
                console.log('Hide ticket info bars is set to: ' + checked);
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Zendesk Tweaker</h1>
            </header>
            <div className={"feature-toggle"}>
                <input type={"checkbox"} id={"collapse-shared-views"}
                       checked={isSharedViewsCollapsed} onChange={handleCollapseSharedViewsChange}/>
                <label htmlFor={"collapse-shared-views"}>Collapse shared views</label>
            </div>
            <div className={"feature-toggle"}>
                <input type={"checkbox"} id={"hide-ticket-info-bar"}
                       checked={isTicketInfoBarsHidden} onChange={handleHideTicketInfoBarsChange}/>
                <label htmlFor={"hide-ticket-info-bar"}>Hide ticket 'Shared with ...' info bar</label>
            </div>
            <footer>
                <img src={githubLogo} className="App-github-logo" alt="logo"/>
                <a href="https://github.com/tolache/zd-tweaker">tolache/zd-tweaker</a>
            </footer>
        </div>
    );
}

export default App;
