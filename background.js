// Function to group similar tabs
function groupSimilarTabs() {
  chrome.tabs.query({}, (tabs) => {
    const groups = {};
    tabs.forEach((tab) => {
      const domain = new URL(tab.url).hostname;
      if (!groups[domain]) {
        groups[domain] = [];
      }
      groups[domain].push(tab.id);
    });

    Object.values(groups).forEach((group) => {
      if (group.length > 1) {
        chrome.tabs.group({ tabIds: group });
      }
    });
  });
}

// Function to sleep inactive tabs
function sleepInactiveTabs() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (!tab.active) {
        chrome.tabs.discard(tab.id);
      }
    });
  });
}

// Function to close unused tabs
function closeUnusedTabs() {
  const timeThreshold = 30 * 60 * 1000; // 30 minutes
  chrome.tabs.query({}, (tabs) => {
    const currentTime = Date.now();
    tabs.forEach((tab) => {
      if (currentTime - tab.lastAccessed > timeThreshold) {
        chrome.tabs.remove(tab.id);
      }
    });
  });
}

// Function to close duplicate tabs
function closeDuplicateTabs() {
  chrome.tabs.query({}, (tabs) => {
    const uniqueUrls = new Set();
    tabs.forEach((tab) => {
      if (uniqueUrls.has(tab.url)) {
        chrome.tabs.remove(tab.id);
      } else {
        uniqueUrls.add(tab.url);
      }
    });
  });
}
// Notify the user when tab is about to close
function showTabCloseNotification(tabId) {
  chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png', // Your extension's icon
      title: 'Tab Closing',
      message: 'A tab is about to close.',
      buttons: [{ title: 'Undo' }]
  }, function(notificationId) {
      console.log('Notification shown for tab close', tabId);
  });
}

// Detect tab close and show notification if enabled
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  chrome.storage.sync.get('tabSavvySettings', function(result) {
      const settings = result.tabSavvySettings || defaultSettings;
      if (settings.notifyTabClose) {
          showTabCloseNotification(tabId);
      }
  });
});

// Set up alarms for periodic actions
chrome.alarms.create('groupTabs', { periodInMinutes: 5 });
chrome.alarms.create('sleepTabs', { periodInMinutes: 5 });
chrome.alarms.create('closeUnused', { periodInMinutes: 25 });
chrome.alarms.create('closeDuplicates', { periodInMinutes: 25 });

// Listen for alarms
chrome.alarms.onAlarm.addListener((alarm) => {
  switch (alarm.name) {
    case 'groupTabs':
      groupSimilarTabs();
      break;
    case 'sleepTabs':
      sleepInactiveTabs();
      break;
    case 'closeUnused':
      closeUnusedTabs();
      break;
    case 'closeDuplicates':
      closeDuplicateTabs();
      break;
  }
});

