document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const tabList = document.getElementById('tabList');
    const clearSearch = document.getElementById('clearSearch');

    // Function to display tabs in the popup
    function displayTabs(tabs) {
        tabList.innerHTML = '';

        tabs.forEach(tab => {
            const tabItem = document.createElement('li');

            // Create a span for the tab title
            const tabTitle = document.createElement('span');
            tabTitle.textContent = tab.title;

            // When clicking on the tab title, activate that tab
            tabTitle.addEventListener('click', () => {
                chrome.tabs.update(tab.id, { active: true });
            });

            // Create the close button for the tab
            const closeButton = document.createElement('button');
            closeButton.textContent = 'x';
            closeButton.addEventListener('click', (event) => {
                event.stopPropagation(); 
                chrome.tabs.remove(tab.id); 
                tabItem.remove(); 
            });

            tabItem.appendChild(tabTitle);
            tabItem.appendChild(closeButton);

            tabList.appendChild(tabItem);
        });
    }

    // Function to filter tabs based on the search query
    function searchTabs() {
        const query = searchInput.value.toLowerCase();

        chrome.tabs.query({}, (tabs) => {
            const filteredTabs = tabs.filter((tab) =>
                tab.title.toLowerCase().includes(query) || tab.url.toLowerCase().includes(query)
            );
            displayTabs(filteredTabs);
        });
    }

    // Function to clear the search input and reset the tab list
    function clearSearchInput() {
        searchInput.value = ''; 
        chrome.tabs.query({}, displayTabs);
    }

    // Display all tabs
    chrome.tabs.query({}, displayTabs);

    // Search functionality filter tabs as the user types
    searchInput.addEventListener('input', searchTabs);

    // Clear search functionality
    clearSearch.addEventListener('click', clearSearchInput);
});
