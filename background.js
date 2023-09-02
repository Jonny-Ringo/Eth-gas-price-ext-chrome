const apiKey = "YOUR_KEY_HERE";

async function fetchGasPrice() {
  try {
    const response = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`);
    const data = await response.json();
    const prices = data.result;

    const gasPriceMediumGwei = prices.ProposeGasPrice / 1;

    // Prepare icon paths
    let iconPaths = {
      "16": "16x16.png",
      "48": "48x48.png",
      "128": "128x128.png"
    };

    // Change icon paths based on gas price condition
    if (gasPriceMediumGwei < 20) {
      iconPaths = {
        "16": "16x16green.png"
      };
    }

    // Set icon
    chrome.action.setIcon({ path: iconPaths });
  } catch (error) {
    console.error("Error fetching gas price:", error);
  }
}

// Update the badge and icon immediately upon extension load
fetchGasPrice();

// Schedule a background fetch task for periodic updates
setInterval(fetchGasPrice, 15000); // Update every 15 seconds

// Add a listener for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
  // Fetch gas price when a tab is activated
  fetchGasPrice();
});















