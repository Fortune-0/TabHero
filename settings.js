const defaultSettings = {
    inactiveTimeout: 10,
    sleepTimeout: 5,
    closeTimeout: 25,
    groupSimilarTabs: true,
    closeDuplicateTabs: true,
    notifyTabClose: true,
};

function loadSettings() {
    chrome.storage.sync.get(['tabSavvySettings'], function(result) {
        const settings = result.tabSavvySettings || defaultSettings;
        document.getElementById('inactiveTimeout').value = settings.inactiveTimeout;
        document.getElementById('sleepTimeout').value = settings.sleepTimeout;
        document.getElementById('closeTimeout').value = settings.closeTimeout;
        document.getElementById('groupSimilarTabs').checked = settings.groupSimilarTabs;
        document.getElementById('closeDuplicateTabs').checked = settings.closeDuplicateTabs;
        document.getElementById('notifyTabClose').checked = settings.notifyTabClose;
        // Update the displayed values after loading settings
        updateSliderValues();
    });
}

function resetSettings() {
    chrome.storage.sync.set({ tabSavvySettings: defaultSettings }, function() {
        loadSettings();
        alert('Settings reset to default!');
    });
}

function saveSettings(e) {
    e.preventDefault();
    const settings = {
        inactiveTimeout: parseInt(document.getElementById('inactiveTimeout').value),
        sleepTimeout: parseInt(document.getElementById('sleepTimeout').value),
        closeTimeout: parseInt(document.getElementById('closeTimeout').value),
        groupSimilarTabs: document.getElementById('groupSimilarTabs').checked,
        closeDuplicateTabs: document.getElementById('closeDuplicateTabs').checked,
        notifyTabClose: document.getElementById('notifyTabClose').checked,
    };
    chrome.storage.sync.set({ tabSavvySettings: settings}, function() {
        alert('Settings saved!');
    });
}

function updateSliderValues() {
    document.getElementById('inactiveTimeoutValue').textContent = document.getElementById('inactiveTimeout').value;
    document.getElementById('sleepTimeoutValue').textContent = document.getElementById('sleepTimeout').value;
    document.getElementById('closeTimeoutValue').textContent = document.getElementById('closeTimeout').value;
}

// Add event listeners
document.addEventListener('DOMContentLoaded', loadSettings);
document.getElementById('settingsForm').addEventListener('submit', saveSettings);
document.getElementById('resetButton').addEventListener('click', resetSettings);

// Update the displayed value dynamically when sliders are adjusted
document.getElementById('inactiveTimeout').addEventListener('input', updateSliderValues);
document.getElementById('sleepTimeout').addEventListener('input', updateSliderValues);
document.getElementById('closeTimeout').addEventListener('input', updateSliderValues);
