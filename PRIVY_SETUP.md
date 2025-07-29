# Privy Setup Guide

## Migration from RainbowKit to Privy

This project has been migrated from RainbowKit to Privy for wallet authentication.

### Environment Variables

Create a `.env.local` file in your project root with:

```env
# Privy Configuration
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
```

### Getting Your Privy App ID

1. Go to [console.privy.io](https://console.privy.io)
2. Create a new app or select an existing one
3. Copy your App ID from the dashboard
4. Replace `your_privy_app_id_here` in your `.env.local` file

### Features

- **Email & Wallet Login**: Users can connect with email or wallet
- **Light Theme**: Clean, modern UI
- **Violet Accent**: Matches your app's design
- **Wallet First**: Shows wallet login as the primary option

### Components

- `PrivyConnectButton`: Handles connect/disconnect functionality
- `Providers`: Wraps the app with Privy authentication
- Updated `Header`: Now uses Privy instead of RainbowKit

### Removed Dependencies

- `@rainbow-me/rainbowkit`
- `wagmi`
- `viem`

### Next Steps

1. Get your Privy App ID from the console
2. Add it to your `.env.local` file
3. Test the authentication flow
4. Customize the appearance if needed

The migration is complete! Your app now uses Privy for wallet authentication. 