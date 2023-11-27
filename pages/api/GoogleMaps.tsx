// pages/api/GoogleMaps.ts

import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { input } = req.query;

  try {
    // Fetch place predictions from Google Places Autocomplete API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyDtB1MH9LamNQQgmM23wWqKYWCL33IQRDc`
    );

    if (!response.ok) {
      throw new Error("Google Places Autocomplete API request failed");
    }

    const data = await response.json();

    // Handle the data, filter relevant information, and send it in the response
    const predictions = data.predictions.map((prediction) => ({
      description: prediction.description,
      placeId: prediction.place_id,
    }));

    res.status(200).json(predictions);
  } catch (error) {
    console.error(
      "Error fetching data from Google Places Autocomplete API:",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
}
