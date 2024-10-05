// Group similar tabs
chrome.tabs.query({}, (tabs) => {
    let groupedTabs = {};
    tabs.forEach(tab => {
      let domain = new URL(tab.url).hostname;
      if (!groupedTabs[domain]) {
        groupedTabs[domain] = [];
      }
      groupedTabs[domain].push(tab);
    });
    console.log(groupedTabs);
  });

// Sleep inactive tabs after 3 mins
let tabLastActive ={};

chrome.tabs.onUpdated.addListener((activeInfo) => {
    const currentTime = new Date().getTime();
    tabLastActive[activeInfo.id] = currentTime;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
      const currentTime = new Date().getTime();
      tabLastActive[tabId] = currentTime;
    }
  });


  setInterval(() => {
    const now = new Date().getTime();
    for (let tabId in tabLastActive) {
      if (now - tabLastActive[tabId] > 1000 * 60 * 3) {
        chrome.tabs.discard(Number(tabId));
      }
    }
  }, 1000 * 60)

// close opened tabs
let tabLastUsed = {};
chrome.tabs.onActivated.addListener((activeInfo) => {
    const currentTime = new Date().getTime();
    tabLastUsed[activeInfo.tabId] = currentTime;
});

setInterval(() => {
    const now = new Date().getTime();
    for (let tabId in tabLastUsed) {
        if (now - tabLastUsed[tabId] > 1000 * 30 * 60) {
            chrome.tabs.remove(Number (tabId));
        }
    }
}, 1000 * 60 * 5);

// close duplicate tabs
let tabUrls = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        if (tabUrls[tab.url] && tabUrls[tab.url] !== tabId) {
            setTimeout(() => {
                chrome.tabs.remove(tabId);
            }, 1000 * 60 * 30);
        } else {
            tabUrls[tab.url] = tabId;
        }
    }
});