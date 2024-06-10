import React from "react";
import axios from "axios";

/** FM_PD_04 In the client file we have the header, body, customconfig, method.At first import the AXIOS, which is used to connect the react and node, then we configure the request and response from this client file. */
export async function client(
  endpoint,
  { requestType, body, ...customConfig } = {}
) {
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
  };

  const requestConfig = {
    method: requestType,

    ...customConfig,

    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  // GD_PD_10 In the client file we have the header, body, customconfig, method.At first import the AXIOS, which is used to connect the react and node, then we configure the request and response from this client file.
  if (body) {
    requestConfig.data = JSON.stringify(body);
  }
  // debugger;
  const url = `http://localhost:5000/${endpoint}`;
  const apiResponse = await axios(url, requestConfig);
  return apiResponse;
}
