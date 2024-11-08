import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  fetch("https://sunteccity.com.sg/Prod/v1/rewards", {
    headers: {
      // accept: "application/json, text/plain, */*",
      // "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      // "cache-control": "no-cache",
      // "content-type": "application/x-www-form-urlencoded",
      "implementation-id": "sg-suntec-city",
      // pragma: "no-cache",
      // priority: "u=1, i",
      // "sec-ch-ua":
      //   '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
      // "sec-ch-ua-mobile": "?0",
      // "sec-ch-ua-platform": '"macOS"',
      // "sec-fetch-dest": "empty",
      // "sec-fetch-mode": "cors",
      // "sec-fetch-site": "same-origin",
    },
    // referrer: "https://sunteccity.com.sg/rewards-catalogue",
    // referrerPolicy: "strict-origin-when-cross-origin",
    // body: "{}",
    method: "POST",
    // mode: "cors",
    // credentials: "include",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return res.status(200).json(data);
    });
}
