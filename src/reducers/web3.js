import Web3 from 'web3';

const initialState = {
  instance: new Web3(window.web3.currentProvider)
};

export default function (state = initialState) {
  return state;
}