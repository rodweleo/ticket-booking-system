import {Button} from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator"
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useAuth } from "@/components/ui/use-auth-client"
import Web3 from "web3";
import {toast} from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { getAddressBySymbol } from "@/utils/functions/getAddressBySymbol";
import { utils } from "ethers";
import { mento } from "@/utils/mento";
import { getBrokerPriceQuotes } from "@/utils/functions/get-broker-price-quotes";

const CoinSwap = () => {
    const {connectedAccount} = useAuth();
    const [fromCoin, setFromCoin] = useState({
        symbol: "cUSD",
        amount: "0.00",
        address: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    })
    const [toCoin, setToCoin] = useState({
        symbol: "cKES",
        amount: "0.00",
        address: "0x1E0433C1769271ECcF4CFF9FDdD515eefE6CdF92"
    })

    const dexRef = useRef<HTMLSpanElement | null>(null)

    const [privateKey, setPrivateKey] = useState("");


    const swapCoinForm = useForm()
    async function onSubmit() {
        const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
        const cKESAddress = '0x456a3D042C0DbD3db53D5489e98dFb038553B0d0'; // cKES contract
        const erc20Abi = [
            {
                "constant": true,
                "inputs": [{ "name": "_owner", "type": "address" }],
                "name": "balanceOf",
                "outputs": [{ "name": "balance", "type": "uint256" }],
                "type": "function"
            }
        ];

        // try{
        //     const tokenContract = new web3.eth.Contract(erc20Abi, cKESAddress);
        //     const balance = await tokenContract.methods.balanceOf(connectedAccount).call();
        //     const formattedBalance = web3.utils.fromWei(balance, 'ether');  // Convert from wei to ether (or tokens)
        //     console.log('cKES Balance:', formattedBalance);
        // }catch(e){
        //     toast.error(e.message)
        // }

    }

    const handleFromCoinChange = (e) => {
        setFromCoin((prev) => ({ ...prev, symbol: e.target.value }))

        if (fromCoin.symbol) {
            const address = getAddressBySymbol(toCoin.symbol);
            if (address) {
                setFromCoin((prev) => ({ ...prev, address: address }));
            }
        }
    }

    const handleFromCoinAmountChange = (e) => {
        setFromCoin((prev) => ({...prev, amount: e.target.value}))
        
        if (dexRef.current) {
            //get the ex rate
            const rate: string = dexRef.current.innerText;
            
            //calculate the total amount of coin to get after exchange
            const totalAmountOut = (Number(rate) * Number(e.target.value)).toPrecision(6);

            //set the input of the amount out to the above amount
            setToCoin((prev) => ({...prev, amount: totalAmountOut}))
            // console.log(totalAmountOut)
        }
    }

    const handleToCoinChange = (e) => {
        setToCoin((prev) => ({...prev, symbol: e.target.value}))
        if (toCoin.symbol) {
            const address = getAddressBySymbol(toCoin.symbol);
            if(address){
                setToCoin((prev) => ({ ...prev, address: address }));
            }
        }
    } 
    const handleToCoinAmountChange = (e) => {
        setToCoin((prev) => ({...prev, amount:e.target.value}))
    }



    useEffect(() => {
        
        if (fromCoin.symbol === "CELO" && toCoin.symbol === "cKES") {
            return;
        }

        if(fromCoin.symbol === toCoin.symbol){
            toast.error("You cannot swap the same tokens.");
            return;
        }else{
            if (fromCoin.address && toCoin.address) {
                console.log('Getting price quotation...')
                getBrokerPriceQuotes(fromCoin.address, toCoin.address, "1").then((quote) => {
                    if(dexRef.current){
                        dexRef.current.innerText = Number(quote).toPrecision(8)
                    }
                });
            }
        }
    }, [fromCoin, toCoin])

    const balance = 2.0
    return (
        <main className="h-screen grid place-items-center">
            <form onSubmit={swapCoinForm.handleSubmit(onSubmit)} className="bg-white width-[500px] rounded-lg p-5 space-y-5 shadow-md">
                <h1 className="text-2xl font-bold">Swap</h1>
                <div className="space-y-5 grid place-items-center relative">
                    <div className="p-2.5 space-y-2 bg-slate-100 rounded-md">
                        <h2 className="flex items-center justify-between text-slate-500 font-semibold">You Pay <span>Balance: {balance}</span></h2>
                        <div>
                            <input type="text" placeholder="0.00" value={fromCoin.amount} onChange={handleFromCoinAmountChange} className="font-bold outline-none border-none text-2xl w-fit bg-transparent" />
                            <select title="Coin to Swap" className="bg-transparent border border-slate-200 rounded-md px-5 py-2.5" defaultValue={fromCoin.symbol} onChange={handleFromCoinChange}>
                                <option value="cUSD">cUSD</option>
                                <option value="cKES">cKES</option>
                                <option value="CELO">CELO</option>
                            </select>
                            
                        </div>
                    </div>
                    <FaArrowRightArrowLeft className="absolute top-[30%] text-white bg-blue-800 p-3 text-5xl rounded-full rotate-90"/>
                    <div className="p-2.5 space-y-2 bg-slate-100 rounded-md">
                        <h2 className="flex items-center justify-between text-slate-500 font-semibold">You Get <span>{balance}</span></h2>
                        <div>
                            <input type="text" placeholder="0.00" value={toCoin.amount} onChange={handleToCoinAmountChange} className="font-bold outline-none border-none text-2xl w-fit bg-transparent" />
                            <select title="Coin Swapped" className="bg-transparent border border-slate-200 rounded-md px-5 py-2.5" defaultValue={toCoin.symbol} onChange={handleToCoinChange}>
                                <option value="cUSD">cUSD</option>
                                <option value="cKES">cKES</option>
                                <option value="CELO">CELO</option>
                            </select>
                        </div>
                    </div>
                </div>
                <Separator/>
                <table className="w-full">
                    <tbody className="w-full">
                        <tr>
                            <th>Rate</th>
                            <td className="flex items-center gap-2.5 w-full">
                                <span>1 {fromCoin.symbol}</span>
                                <div className="flex flex-col -space-y-5">
                                    <span>~</span>
                                    <span>~</span>
                                </div>
                                <div>
                                    <span ref={dexRef}></span>
                                    <span> {toCoin.symbol}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Max. Spillage</th>
                            <td>1%</td>
                        </tr>
                    </tbody>
                </table>
                {
                    connectedAccount ? 
                    <Button type="submit" className="rounded-full bg-blue-900 hover:bg-blue-800 w-full text-lg py-7">SWAP</Button>
                    : 
                    <Button type="button" className="rounded-full bg-blue-900 hover:bg-blue-800 w-full text-lg py-7">CONNECT ACCOUNT</Button>
                }
            </form>
        </main>
    )
}

export default CoinSwap