# Assignment Submission - Web3 Wallet App

## 📋 Assignment Details

**Position**: Frontend Developer - Junior Level  
**Task**: Create and deploy a landing page with MetaMask wallet integration  
**Submission Date**: 12th February 2026

---

## 🎯 Deliverables

### 1. Live Demo
**URL**: [Your deployed URL here]

### 2. Source Code
**GitHub Repository**: [Your GitHub repo URL here]

---

## ✅ Functional Requirements - Implementation Checklist

### Wallet Connection ✓
- [x] "Connect Wallet" button implemented
- [x] MetaMask connection flow handled
- [x] Connected state displayed (shows truncated address)
- [x] Disconnected state displayed
- [x] Disconnect functionality implemented

### Balance Display ✓
- [x] ETH balance displayed after connection
- [x] USDT balance displayed after connection
- [x] Balances fetched from Ethereum Mainnet
- [x] Balances update upon connection
- [x] Proper decimal formatting (ETH: 4 decimals, USDT: 2 decimals)

### Deployment ✓
- [x] Project built successfully
- [x] Deployed to production
- [x] Accessible via public URL
- [x] HTTPS enabled
- [x] Mobile responsive

---

## 🛠️ Technical Implementation

### Technologies Used
- **Framework**: React 18 with Vite
- **Web3 Library**: ethers.js v6.9.0
- **Styling**: Tailwind CSS 3.4
- **Build Tool**: Vite 5.0
- **Deployment**: Vercel/Netlify

### Key Features Implemented

1. **MetaMask Integration**
   - Detects if MetaMask is installed
   - Requests account access
   - Handles user approval/rejection
   - Listens for account changes
   - Listens for network changes

2. **Balance Fetching**
   - Fetches ETH balance using `provider.getBalance()`
   - Fetches USDT balance from contract `0xdAC17F958D2ee523a2206206994597C13D831ec7`
   - Uses minimal ABI for gas optimization
   - Formats balances with appropriate decimals

3. **Error Handling**
   - MetaMask not installed detection
   - Connection rejection handling
   - Wrong network warning
   - Balance fetch error handling
   - User-friendly error messages

4. **UI/UX**
   - Clean, modern design
   - Responsive layout (mobile, tablet, desktop)
   - Loading states during connection
   - Visual feedback for actions
   - Color-coded balance cards
   - Gradient background
   - Shadow effects for depth

---

## 🎨 Design Decisions

### Color Scheme
- Primary: Indigo (for ETH and main actions)
- Success: Green (for USDT)
- Error: Red (for error messages)
- Background: Blue gradient

### Layout
- Centered content with max-width container
- Card-based balance display
- Header with connection status
- Footer with tech stack info

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly button sizes
- Readable font sizes across devices

---

## 🧪 Testing Performed

### Manual Testing

1. **Happy Path**
   - [x] Connect wallet successfully
   - [x] Display balances correctly
   - [x] Disconnect wallet
   - [x] Reconnect with different account

2. **Error Cases**
   - [x] MetaMask not installed
   - [x] User rejects connection
   - [x] Wrong network (Testnet)
   - [x] No internet connection

3. **Edge Cases**
   - [x] Account with 0 balance
   - [x] Account with only ETH (no USDT)
   - [x] Account with only USDT (no ETH)
   - [x] Switch accounts while connected
   - [x] Switch networks while connected

4. **Responsive Testing**
   - [x] Mobile (320px - 640px)
   - [x] Tablet (641px - 1024px)
   - [x] Desktop (1024px+)

---

## 📊 Performance Metrics

- **Build Size**: ~260 KB
- **First Contentful Paint**: ~[Check in production]
- **Time to Interactive**: ~[Check in production]
- **Lighthouse Score**: ~[Check in production]

---

## 🚀 Deployment Process

### Steps Taken
1. Built project locally: `npm run build`
2. Tested build locally: `npm run preview`
3. Pushed to GitHub
4. Connected to Vercel/Netlify
5. Configured build settings
6. Deployed to production
7. Tested deployed version

### Build Configuration
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18.x

---

## 📝 Challenges & Solutions

### Challenge 1: USDT Contract Integration
**Problem**: Finding correct USDT contract address and ABI  
**Solution**: Used official Tether contract address and minimal ABI for balanceOf function

### Challenge 2: Decimal Formatting
**Problem**: USDT uses 6 decimals, not 18 like ETH  
**Solution**: Used `ethers.formatUnits(balance, 6)` for USDT

### Challenge 3: [Add any challenges you faced]
**Problem**: [Describe problem]  
**Solution**: [Describe solution]

---

## 💡 Possible Improvements

If given more time, I would add:

1. **Multi-chain Support**
   - Support for other networks (Polygon, BSC, etc.)
   - Network switcher UI

2. **More Token Support**
   - USDC, DAI, and other ERC-20 tokens
   - Token search/add functionality

3. **Enhanced UI**
   - Dark mode toggle
   - Animation for balance updates
   - Transaction history

4. **Advanced Features**
   - QR code for wallet address
   - Copy address to clipboard
   - Export balances to CSV

5. **Testing**
   - Unit tests with Vitest
   - E2E tests with Playwright
   - Integration tests for Web3 functionality

---

## 📚 Learning Outcomes

Through this assignment, I:

1. Gained hands-on experience with Web3 integration
2. Learned ethers.js v6 API
3. Implemented real-world MetaMask connection flow
4. Handled ERC-20 token balance reading
5. Built responsive UI with Tailwind CSS
6. Deployed React app to production

---

## 🔗 Links

- **Live Demo**: [Your URL]
- **GitHub Repo**: [Repo](https://github.com/fatihabdi/web3-wallet-app)
- **Documentation**: See README.md in repository

---

## 📞 Contact

**Name**: Abdi Fatih  
**Email**: fatihabdi20@gmail.com  
**GitHub**: [fatihabdi](https://github.com/fatihabdi)  
**LinkedIn**: [Abdi Fatih](https://www.linkedin.com/in/fatihabdi/)

---

**Thank you for reviewing my submission! I'm excited about the opportunity to discuss this project further.**