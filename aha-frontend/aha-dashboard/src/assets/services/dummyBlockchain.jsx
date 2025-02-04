import { ethers } from 'ethers';
import * as LitJsSdk from 'lit-js-sdk';

class BlockchainService {
  constructor() {
    this.litNodeClient = new LitJsSdk.LitNodeClient();
    this.chain = 'ethereum';
  }

  async connect() {
    await this.litNodeClient.connect();
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        return true;
      } catch (error) {
        console.error('User rejected connection:', error);
        return false;
      }
    }
    return false;
  }

  async encryptData(data) {
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: this.chain });
    const accessControlConditions = [
      {
        contractAddress: '',
        standardContractType: '',
        chain: this.chain,
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
          comparator: '>=',
          value: '0',
        },
      },
    ];

    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
      JSON.stringify(data)
    );

    const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain: this.chain,
    });

    return {
      encryptedData: encryptedString,
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, 'base16'),
    };
  }
}

export default new BlockchainService();