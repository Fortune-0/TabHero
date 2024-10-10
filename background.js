let tabLastActive = {};

// Listen to tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
    const currentTime = new Date().getTime();
    tabLastActive[activeInfo.tabId] = currentTime;
    console.log(`Tab ${activeInfo.tabId} activated at ${currentTime}`);
});

// Listen to tab updates (e.g., URL changes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === "complete") {
        const currentTime = new Date().getTime();
        tabLastActive[tabId] = currentTime;
        console.log(`Tab ${tabId} updated at ${currentTime}`);
    }
});

// Set an alarm to periodically check for unused tabs
chrome.alarms.create("checkTabs", { periodInMinutes: 5 });
console.log('Alarm set to check tab every 5 minutes')

// Handle the alarm and close unused tabs
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "checkTabs") {
        const now = new Date().getTime();
        for (let tabId in tabLastActive) {
            // Close tabs that have been inactive for over 30 minutes
            if (now - tabLastActive[tabId] > 1000 * 60 * 30) {
                chrome.tabs.remove(parseInt(tabId));
            }
        }
    }
});

// For example, group tabs when a new one is opened or updated:
chrome.tabs.onUpdated.addListener(() => {
    chrome.tabs.query({}, (tabs) => {
        let groupedTabs = {};
        tabs.forEach(tab => {
            let domain = new URL(tab.url).hostname;
            if (!groupedTabs[domain]) {
                groupedTabs[domain] = [];
            }
            groupedTabs[domain].push(tab);
        });
        console.log("Grouped tabs:", groupedTabs);
    });
});