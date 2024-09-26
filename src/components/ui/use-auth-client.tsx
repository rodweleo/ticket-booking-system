import { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";
import { toast} from "react-toastify"

const AuthContext = createContext(null)

export const useAuthClient = () => {
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [warning, setWarning] = useState<string | null>(null);
    const [provider, setProvider] = useState<string | null>(null);
    const [chainId, setChainId] = useState<string | null>(null);
    const [latestBlock, setLatestBlock] = useState<string | null>(null);
    const [accountButtonDisabled, setAccountButtonDisabled] =
        useState<boolean>(false);
    const [accounts, setAccounts] = useState<string[] | null>(null);
    const [connectedAccount, setConnectedAccount] = useState<string>("");

    useEffect(() => {
        // ensure that there is an injected the Ethereum provider
        if (window.ethereum) {
            // use the injected Ethereum provider to initialize Web3.js
            setWeb3(new Web3(window.ethereum));
            // check if Ethereum provider comes from MetaMask
            if (window.ethereum.isMetaMask) {
                setProvider("Connected to Ethereum with MetaMask.");
            } else {
                setProvider("Non-MetaMask Ethereum provider detected.");
            }
        } else {
            // no Ethereum provider - instruct user to install MetaMask
            setWarning("Please install MetaMask");
            setAccountButtonDisabled(true);
        }

        //check active account
        const checkActiveAccount = async () => {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                setConnectedAccount(accounts[0]);
            } else {
                toast.error("Install metamask extension!!");
            }
        }

        checkActiveAccount()
    }, []);

    useEffect(() => {
        async function getChainId() {
            if (web3 === null) {
                return;
            }

            // get chain ID and populate placeholder
            setChainId(`Chain ID: ${await web3.eth.getChainId()}`);
        }

        async function getLatestBlock() {
            if (web3 === null) {
                return;
            }

            // get latest block and populate placeholder
            setLatestBlock(`Latest Block: ${await web3.eth.getBlockNumber()}`);

            // subscribe to new blocks and update UI when a new block is created
            const blockSubscription = await web3.eth.subscribe("newBlockHeaders");
            blockSubscription.on("data", (block) => {
                setLatestBlock(`Latest Block: ${block.number}`);
            });
        }

        getChainId();
        getLatestBlock();
    }, [web3]);

    // click event for "Request MetaMask Accounts" button
    async function requestAccounts() {
        if (web3 === null) {
            return;
        }

        // request accounts from MetaMask
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // get list of accounts
        const allAccounts = await web3.eth.getAccounts();
        setAccounts(allAccounts);
        // get the first account and populate placeholder
        setConnectedAccount(allAccounts[0]);
    }
    
    const connectWalletWithMetamask = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setConnectedAccount(accounts[0]);
        } else {
            toast.error("Install metamask extension!!");
        }
    }


    return {
        connectedAccount, 
        requestAccounts,
        connectWalletWithMetamask
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuthClient()
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
