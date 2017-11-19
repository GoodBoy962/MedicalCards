import ipfsAPI from 'ipfs-api';
import {
  IPFS_HOST,
  IPFS_PORT
} from "../properties/properties";

const initialState = {
  instance: ipfsAPI(IPFS_HOST, IPFS_PORT)
};

export default function (state = initialState) {
  return state;
}