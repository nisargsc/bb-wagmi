import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Chain } from "wagmi";

const bbtestnet = {
  id: 12_263,
  name: "Buildbear Testnet",
  network: "bbtestnet",
  nativeCurrency: {
    decimals: 18,
    name: "BB ETH",
    symbol: "BBETH",
  },
  rpcUrls: {
    public: { http: ["https://rpc.buildbear.io/awake-sly-moore-9489068e"] },
    default: { http: ["https://rpc.buildbear.io/awake-sly-moore-9489068e"] },
  },
  blockExplorers: {
    etherscan: {
      name: "BBExplorer",
      url: "https://explorer.buildbear.io/awake-sly-moore-9489068e",
    },
    default: {
      name: "BBExplorer",
      url: "https://explorer.buildbear.io/awake-sly-moore-9489068e",
    },
  },
} as const satisfies Chain;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bbtestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://rpc.buildbear.io/awake-sly-moore-9489068e`,
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
