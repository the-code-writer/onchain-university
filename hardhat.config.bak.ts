import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  defaultNetwork: process.env.NETWORK,
  networks: {
    localhost: {
      url: process.env.URL_LOCAL_HOST_URL + ":" + process.env.URL_LOCAL_PORT,
    },
    goerli: {
      url: process.env.URL_ETH_GOERLI + process.env.INFURA_API_KEY || "",
      chainId: 3,
      accounts:
          process.env.DEPLOYMENT_ACCOUNT_KEY !== undefined
              ? [process.env.DEPLOYMENT_ACCOUNT_KEY]
              : [],
    },
    mainnet: {
      url: process.env.URL_ETH_MAINNET + process.env.INFURA_API_KEY || "",
      chainId: 1,
      accounts:
          process.env.DEPLOYMENT_ACCOUNT_KEY !== undefined
              ? [process.env.DEPLOYMENT_ACCOUNT_KEY]
              : [],
    },
    bsc_testnet: {
      url: process.env.URL_BSC_TESTNET,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic: process.env.MNEMONIC },
    },
    bsc_mainnet: {
      url: process.env.URL_BSC_MAINNET,
      chainId: 56,
      gasPrice: 20000000000,
      accounts: { mnemonic: process.env.MNEMONIC },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: process.env.REPORT_GAS_CURRENCY,
  },
  etherscan: {
    apiKey:
        process.env.BLOCKCHAIN === "ETH"
            ? process.env.ETHERSCAN_API_KEY
            : process.env.BLOCKCHAIN === "BSC"
            ? process.env.BSCSCAN_API_KEY
            : process.env.POLYGON_API_KEY
  },
  solidity: {
    compilers: [
      {
        version: process.env.SOLC_VERSION_5,
        settings: {},
      },
      {
        version: process.env.SOLC_VERSION_6,
        settings: {},
      },
      {
        version: process.env.SOLC_VERSION_7,
        settings: {},
      },
      {
        version: process.env.SOLC_VERSION_8,
        settings: {},
      },
      {
        version: process.env.SOLC_VERSION,
        settings: {},
      },
    ],
    overrides: {
      "./src/contracts/BEP20SmartContract.sol": {
        version: process.env.SOLC_VERSION,
        settings: { }
      },
      "./src/contracts/ERC20SmartContract.sol": {
        version: process.env.SOLC_VERSION,
        settings: { }
      },
      "./src/contracts/ERC721SmartContract.sol": {
        version: process.env.SOLC_VERSION,
        settings: { }
      },
      "./src/contracts/ERC1155SmartContract.sol": {
        version: process.env.SOLC_VERSION,
        settings: { }
      },
    },
    optimizer: {
      enabled: process.env.OPTIMIZER_ENABLED === 1,
      runs: process.env.OPTIMIZER_RUNS,
    },
  },
  paths: {
    sources: process.env.CONTRACT_DIR_SOURCES+"/"+process.env.CONTRACT_NAME+"/",
    tests: process.env.CONTRACT_DIR_DEPLOYMENTS_HARDHAT+'/'+process.env.CONTRACT_NAME+"/"+process.env.CONTRACT_DIR_TESTS,
    cache: process.env.CONTRACT_DIR_DEPLOYMENTS_HARDHAT+'/'+process.env.CONTRACT_NAME+"/"+process.env.CONTRACT_DIR_CACHE,
    artifacts: process.env.CONTRACT_DIR_DEPLOYMENTS_HARDHAT+'/'+process.env.CONTRACT_NAME+"/"+process.env.CONTRACT_DIR_ARTIFACTS,
  },
  mocha: {
    timeout: process.env.MOCHA_TIMEOUT,
  },
};

export default config;
