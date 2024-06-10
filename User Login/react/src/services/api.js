import { client } from "./client";

export const addData = (finalData) => {
  // debugger;
  return client(`add`, { method: "POST", body: finalData });
};

export const Data = () => {
  // debugger;
  return client(``, { method: "GET" });
};

export const Reset = (ResetPass) => {
  // debugger;
  return client(`reset`, { method: "POST", body: ResetPass });
};

export const Attempt = (attemptPass) => {
  // debugger;
  return client(`attempt`, { method: "POST", body: attemptPass });
};
