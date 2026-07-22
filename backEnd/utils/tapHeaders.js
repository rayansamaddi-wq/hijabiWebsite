import tapConfig from "../config/tap.js";

export const tapHeaders = () => {
  return {
    Authorization: `Bearer ${tapConfig.secretKey}`,
    "Content-Type": "application/json",
  };
};