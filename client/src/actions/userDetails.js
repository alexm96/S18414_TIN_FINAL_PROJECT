import axios from "axios";

export const update = (searchResult) => ({
  type: "UPDATE",
  userDetails: searchResult,
});
export const set = (getResult) => ({
  type: "SET",
  userDetails: getResult,
});
export const setAds=(userAds)=>({
  type:"SETADS",
  userAds
})
