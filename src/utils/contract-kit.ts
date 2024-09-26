import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const contractKit = newKitFromWeb3(web3);

export {
    contractKit
}