import web3 from "./web3";
import { AbiItem } from 'web3-utils'
const address = process.env.REACT_APP_ADDRESS_DEPLOYED;
const abi = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
      inputs: [],
      name: 'enter',
      outputs: [],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getPlayers',
      outputs: [{ name: "", type: "address[]" }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getWinner',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'manager',
      outputs: [{ name: "", type: "address" }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ name: "", type: "uint256" }],
      name: 'players',
      outputs: [{ name: "", type: "address" }],
      stateMutability: 'view',
      type: 'function'
    }
  ]
   
  // eslint-disable-next-line import/no-anonymous-default-export
  export default new web3.eth.Contract(abi as AbiItem[], address);