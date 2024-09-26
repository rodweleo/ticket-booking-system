import { MENTO_TRADABLE_PAIRS } from "../data/data";

export const getAddressBySymbol = (symbol: string) => {
    // Loop through the MENTO_TRADABLE_PAIRS array
    for (const pair of MENTO_TRADABLE_PAIRS) {
        // Loop through each item in the pair
        for (const token of pair) {
            if (token.symbol === symbol) {
                return token.address;
            }
        }
    }
    // Return null if no symbol is found
    return null;
}