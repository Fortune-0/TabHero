document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const tabList = document.getElementById('tabList');

    function displayTabs(tabs) {
         tabList.innerHTML = '';
                 tabs.forEach(tab => {
                     const tabItem = document.createElement('li');
                     tabItem.textContent = tab.title;
                     tabItem.addEventListener('click', () => {
                                              chrome.tabs.update(tab.id, { active: true });
                                          });
                                          tabList.appendChild(tabItem);
                 })
    }

    function searchTabs() {
         const query = searchInput.value.toLowerCase();
         chrome.tabs.query({}, (tabs) => {
            const filteredTabs = tabs.filter((tab) => 
              tab.title.toLowerCase().includes(query) || tab.url.toLowerCase().includes(query)
            );
            displayTabs(filteredTabs);
          });
    }

    chrome.tabs.query({}, displayTabs);

    searchInput.addEventListener('input', debounce(searchTabs, 70));
})   