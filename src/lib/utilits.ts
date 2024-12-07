import { ethers } from "ethers";

export function arrayString(valu: any) {
    let a = typeof valu;
    if (a == "object") {
        let error: any = {};
        for (const val of Object.entries(valu)) {
            const [key, value]: any = val;
            if (key != "status") {
                if (key === "error") {
                    error["message"] = Array.isArray(value) ? value[0] : value;
                } else {
                    error[key] = Array.isArray(value) ? value[0] : value;
                }
            }
        }
        return error;
    } else return valu;
}

export const onKeyPress = (evt: any, reg?: any) => {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = reg ? reg : /^[0-9\b]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
};

// Define the types for the MetaMask response
interface MetaMaskConnection {
  account: string;
  provider: ethers.BrowserProvider;
  signer: any;
  network: ethers.Network;
}

export const connectMetaMask = async (): Promise<MetaMaskConnection | null> => {
    const ethereum = (window as any).ethereum;
  if (!ethereum) {
    alert("MetaMask is not installed. Please install it to use this app.");
    return null;
  }

  try {
    // Request account access
    const accounts: string[] = await ethereum.request({ method: "eth_requestAccounts" });

    // Get the first account
    const account = accounts[0];

    // Set up a provider
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = provider.getSigner();

    // Get the current network
    const network = await provider.getNetwork();

    return { account, provider, signer, network };
  } catch (error: any) {
    console.error("Error connecting to MetaMask:", error.message || error);
    throw new Error("Failed to connect to MetaMask");
  }
};
