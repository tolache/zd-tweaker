import React, { useEffect, useState } from 'react';
import githubLogo from './github-mark.svg';
import './App.css';
import FeatureToggle from './components/FeatureToggle';

function App() {
    const [isCollapseSharedViewsEnabled, setIsCollapseSharedViewsEnabled] = useState(true);
    const [isHideTicketInfoBarsEnabled, setIsHideTicketInfoBarsEnabled] = useState(true);

    useEffect(() => {
        const chromeStorageValues: string[] = ["collapseSharedViews", "hideTicketInfoBars"];
        chrome.storage.local.get(chromeStorageValues, function (result) {
            chromeStorageValues.forEach((storageValue) => {
                if (result?.[storageValue] === undefined) {
                    chrome.storage.local.set({ [storageValue]: true });
                }
            });
            setIsCollapseSharedViewsEnabled(result?.collapseSharedViews ?? true);
            setIsHideTicketInfoBarsEnabled(result?.hideTicketInfoBars ?? true);
        });
    }, []);

    function handleCollapseSharedViewsChange(event: React.ChangeEvent<HTMLInputElement>) {
        const checked = event.target.checked;
        setIsCollapseSharedViewsEnabled(checked);
        chrome.storage.local.set({ collapseSharedViews: checked },
            function() {
                console.log('Collapse shared views is set to: ' + checked);
            });
    };

    function handleHideTicketInfoBarsChange(event: React.ChangeEvent<HTMLInputElement>) {
        const checked = event.target.checked;
        setIsHideTicketInfoBarsEnabled(checked);
        chrome.storage.local.set({ hideTicketInfoBars: checked },
            function() {
                console.log('Hide ticket info bars is set to: ' + checked);
            });
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Zendesk Tweaker</h1>
            </header>
            <FeatureToggle
                id={"collapse-shared-views"}
                checked={isCollapseSharedViewsEnabled}
                label={"Collapse shared views"}
                onChange={handleCollapseSharedViewsChange}
            />
            <FeatureToggle
                id={"hide-ticket-info-bar"}
                checked={isHideTicketInfoBarsEnabled}
                label={"Hide ticket 'Shared with ...' info bar"}
                onChange={handleHideTicketInfoBarsChange}
            />
            <footer>
                <img src={githubLogo} className="App-github-logo" alt="logo"/>
                <a href="https://github.com/tolache/zd-tweaker">tolache/zd-tweaker</a>
            </footer>
        </div>
    );
}

export default App;
