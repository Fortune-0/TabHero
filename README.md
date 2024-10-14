# TabSavvy

TabSavvy is a lightweight Chrome extension designed to help you manage your browser tabs efficiently. It automatically groups similar tabs, discards inactive tabs, and closes duplicate tabs to keep your workspace clean and organized.

## Features

- **Automatic Tab Grouping:** Tabs with similar content are automatically grouped together.
- **Inactive Tab Management:** Tabs are marked as inactive after a user-defined period of inactivity.
- **Put Inactive Tabs to Sleep:** After a certain period of inactivity, tabs are put to sleep to conserve resources.
- **Close Duplicate Tabs:** Automatically closes duplicate tabs after a set time.
- **User Notifications:** Option to notify users when a tab is about to be closed.

## Installation

1. Clone this repository or download the zip file.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** by toggling the switch in the top right corner.
4. Click **Load unpacked** and select the directory where this extension is located.
5. TabSavvy will now be installed and available in your browser.

## Usage

### Settings

You can customize the behavior of TabSavvy by clicking on the extension icon and opening the settings page. The following settings are available:

- **Mark Tabs as Inactive After:** Define the time (in minutes) after which tabs are marked as inactive.
- **Put Inactive Tabs to Sleep:** Set how long (in minutes) inactive tabs remain open before being put to sleep.
- **Close Inactive Tabs:** Set the time after which inactive tabs are automatically closed.
- **Automatically Group Similar Tabs:** Enable/disable automatic grouping of similar tabs.
- **Automatically Close Duplicate Tabs:** Enable/disable automatic closing of duplicate tabs.
- **Notify Before Closing Tabs:** Enable/disable notifications before tabs are closed.

### Reset to Defaults

You can reset all settings to their default values by clicking the **Reset to Defaults** button in the settings menu.

## Roadmap

- **Add Popup Shortcut:** Implement a keyboard shortcut to quickly open the extension popup.
- **Tab Search:** Add a quick tab search feature to find tabs faster.
- **Tab Backup:** Automatically save and restore tabs for future sessions.
- **Analytics:** Show statistics on tab usage and recommend actions to the user.

## Contributing

If you would like to contribute, feel free to open a pull request or submit issues on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
