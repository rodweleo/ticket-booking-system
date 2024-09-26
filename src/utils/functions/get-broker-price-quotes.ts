import { utils } from "ethers";
import { mento } from "../mento";
import { toast } from "react-toastify";

export const getBrokerPriceQuotes = async (fromAddress: string, toAddress: string, amount: string) => {
    try {
        const tokenUnits: number = 18;
        const amountIn = utils.parseUnits(amount, tokenUnits)
        const quoteAmountOut = await mento.getAmountOut(
           fromAddress,
            toAddress,
            amountIn
        );

        return utils.formatUnits(quoteAmountOut, tokenUnits);

    } catch (e) {
        toast.error(e.message)
        return "0"
    }
}