chrome.runtime.onInstalled.addListener(async () => {
	const tabs = await chrome.tabs.query({ url: "*://docs.google.com/*" });
	console.log(tabs);
	if (tabs.length > 0) {
		for (const tab of tabs) {
			chrome.scripting.executeScript(
				{ target: { tabId: tab.id }, files: ["inject.js"] },
				() => {}
			);
		}
	}
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status == "complete") {
		chrome.scripting.executeScript(
			{ target: { tabId: tab.id }, files: ["inject.js"] },
			() => {}
		);
	}
});
