import { useState, useEffect } from "react";
import { ethers } from "ethers";

// USDT Contract Address on Ethereum Mainnet
const USDT_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

// USDT ABI - minimal ABI for balanceOf function
const USDT_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];

function App() {
  const [account, setAccount] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [usdtBalance, setUsdtBalance] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== "undefined";
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    setError(null);

    if (!isMetaMaskInstalled()) {
      setError(
        "MetaMask is not installed. Please install MetaMask to continue.",
      );
      return;
    }

    setIsConnecting(true);

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);

      // Get balances after connection
      await getBalances(accounts[0]);
    } catch (err) {
      console.error("Error connecting to MetaMask:", err);
      if (err.code === 4001) {
        setError("Connection rejected. Please approve the connection request.");
      } else {
        setError("Failed to connect to MetaMask. Please try again.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Get ETH and USDT balances
  const getBalances = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Get ETH balance
      const ethBalanceWei = await provider.getBalance(address);
      const ethBalanceFormatted = ethers.formatEther(ethBalanceWei);
      setEthBalance(parseFloat(ethBalanceFormatted).toFixed(4));

      // Get USDT balance
      const usdtContract = new ethers.Contract(
        USDT_CONTRACT_ADDRESS,
        USDT_ABI,
        provider,
      );

      const usdtBalanceRaw = await usdtContract.balanceOf(address);
      // USDT has 6 decimals
      const usdtBalanceFormatted = ethers.formatUnits(usdtBalanceRaw, 6);
      setUsdtBalance(parseFloat(usdtBalanceFormatted).toFixed(2));
    } catch (err) {
      console.error("Error fetching balances:", err);
      setError(
        "Failed to fetch balances. Please make sure you are connected to Ethereum Mainnet.",
      );
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setEthBalance(null);
    setUsdtBalance(null);
    setError(null);
  };

  // Listen for account changes
  useEffect(() => {
    if (isMetaMaskInstalled()) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
          getBalances(accounts[0]);
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }

    return () => {
      if (isMetaMaskInstalled()) {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      }
    };
  }, []);

  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">🦊 Web3 Wallet</h1>
            {account && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Connected: {formatAddress(account)}
                </span>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Welcome to Your Web3 Wallet
          </h2>
          <p className="text-lg text-gray-600">
            Connect your MetaMask wallet to view your ETH and USDT balances on
            Ethereum Mainnet
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Connect Button or Balance Display */}
        {!account ? (
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="text-center">
              <div className="mb-8">
                <svg
                  className="mx-auto h-24 w-24 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
              >
                {isConnecting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Connecting...
                  </>
                ) : (
                  <>Connect Wallet</>
                )}
              </button>
              <p className="mt-4 text-sm text-gray-500">
                Make sure you have MetaMask installed and are connected to
                Ethereum Mainnet
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* ETH Balance Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-indigo-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 rounded-full p-3">
                    <svg
                      className="h-8 w-8 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Ethereum Balance
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {ethBalance !== null ? `${ethBalance} ETH` : "Loading..."}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    ETH
                  </span>
                </div>
              </div>
            </div>

            {/* USDT Balance Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      USDT Balance
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {usdtBalance !== null
                        ? `${usdtBalance} USDT`
                        : "Loading..."}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    USDT
                  </span>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800">
                    <strong>Connected to:</strong> Ethereum Mainnet
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Your balances are fetched in real-time from the blockchain
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Built with React, Ethers.js & Tailwind CSS | Make sure you're on
            Ethereum Mainnet
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
