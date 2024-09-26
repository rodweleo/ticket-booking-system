import { mento } from "../mento";

async function getMentoTradablePairs() {
    const pairs = await mento.getTradeablePairs();
    return pairs;
}

export default getMentoTradablePairs
