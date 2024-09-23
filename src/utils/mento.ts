import { Mento } from "@mento-protocol/mento-sdk";
import { providers } from "ethers";

const provider = new providers.JsonRpcProvider(
  "https://alfajores-forno.celo-testnet.org"
);
const mento = await Mento.create(provider);

export {
    mento
}