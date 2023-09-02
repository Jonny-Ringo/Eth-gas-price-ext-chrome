const apiKey = "YOUR_KEY_HERE";
async function fetchGasPrice() {
  try {
    const response = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`);
    const data = await response.json();
    console.log("Gas Price Data:", data);
    const prices = data.result;

    // Display medium gas price
    const gasPriceElement = document.getElementById('gas-price');
    const gasPriceMedium = prices.ProposeGasPrice / 1;
    const formattedGasPrice = parseFloat(gasPriceMedium.toFixed(1));
    gasPriceElement.textContent = `${formattedGasPrice} Gwei`;

    // Change the icon based on gas price
    if (formattedGasPrice < 20) {
      chrome.action.setIcon({ path: '16x16green.png' });
    } else {
      chrome.action.setIcon({ path: '16x16.png' });
    }
  } catch (error) {
    console.error("Error fetching gas price:", error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log("Popup loaded");
  await fetchGasPrice();

  // Set up interval to update gas price every 15 seconds
  setInterval(fetchGasPrice, 15000);
});





  
