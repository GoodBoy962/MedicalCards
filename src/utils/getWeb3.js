import Web3 from 'web3'

let getWeb3 = new Promise((resolve, reject) => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider)
      console.log('Injected web3 detected.');
      resolve({
        web3: web3
      })
    } else {

      // Fallback to localhost if no web3 injection.
      var provider = new Web3.providers.HttpProvider('http://localhost:8545')
      web3 = new Web3(provider)
      console.log('No web3 instance injected, using Local web3.');
      resolve({
        web3: web3
      })
    }
  })
})

export default getWeb3
