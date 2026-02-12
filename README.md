# Web3 Wallet App 🦊

A modern Web3 application that connects to MetaMask and displays ETH and USDT balances on Ethereum Mainnet.

## 🚀 Features

- ✅ MetaMask wallet connection
- ✅ Display ETH balance on Ethereum Mainnet
- ✅ Display USDT balance on Ethereum Mainnet
- ✅ Responsive and clean UI with Tailwind CSS
- ✅ Real-time balance updates
- ✅ Error handling for edge cases

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Web3 Library**: ethers.js v6
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 16+ and npm
- MetaMask browser extension
- Connection to Ethereum Mainnet

## 🏃 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to `http://localhost:5173`

4. **Connect MetaMask**:
   - Make sure you're on Ethereum Mainnet
   - Click "Connect Wallet" button
   - Approve connection in MetaMask popup

## 🌐 Deployment

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   npm run build
   vercel --prod
   ```

### Option 2: Deploy via GitHub

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Deploy!

## 🔧 Configuration

The app uses the following configuration:

- **USDT Contract Address**: `0xdAC17F958D2ee523a2206206994597C13D831ec7`
- **Network**: Ethereum Mainnet
- **USDT Decimals**: 6

## 📱 How to Use

1. **Install MetaMask**: If you don't have MetaMask, install it from [metamask.io](https://metamask.io)

2. **Switch to Ethereum Mainnet**: Make sure you're connected to Ethereum Mainnet (not testnet)

3. **Connect Wallet**: Click the "Connect Wallet" button

4. **Approve Connection**: Approve the connection request in MetaMask

5. **View Balances**: Your ETH and USDT balances will be displayed automatically

## 🛡️ Error Handling

The app handles various edge cases:

- ❌ MetaMask not installed
- ❌ Connection rejected by user
- ❌ Wrong network (not Ethereum Mainnet)
- ❌ Account changes
- ❌ Network changes
- ❌ Balance fetch failures

## 🎨 UI/UX Features

- Clean and modern design
- Responsive layout (mobile, tablet, desktop)
- Loading states
- Error messages
- Visual feedback for actions
- Address truncation for better display
- Color-coded balance cards

## 📝 Project Structure

```
web3-wallet-app/
├── public/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## 🔐 Security Notes

- Never share your private keys
- Always verify the network before connecting
- This app only reads balances (no transactions)
- All Web3 interactions happen client-side

## 🐛 Troubleshooting

**Balance shows 0 but I have tokens**:
- Make sure you're on Ethereum Mainnet
- Check if your MetaMask is connected to the correct account

**MetaMask not connecting**:
- Refresh the page
- Try disconnecting and reconnecting
- Check MetaMask extension is unlocked

**Balances not updating**:
- Try disconnecting and reconnecting your wallet
- Refresh the page

**Note**: This application requires MetaMask and connection to Ethereum Mainnet to function properly.