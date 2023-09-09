import { listingModel, listingModelWithId } from "../models/listingModel";
import axios from "axios";

const getAllListings = async (
  username: string
): Promise<listingModelWithId[]> => {
  const params = {
    username: username,
  };

  const { data } = await axios.get<listingModelWithId[]>(
    `http://localhost:8080/api/listings`,
    { params: params }
  );
  return data;
};

const createListing = async (
  username: string,
  listing: listingModel
): Promise<void> => {
  const params = {
    username: username,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const { data } = await axios.post(
    `http://localhost:8080/api/listings`,
    listing,
    {
      headers: headers,
      params: params,
    }
  );
  return data;
};

export const updateListing = async (
  lid: number,
  newListing: listingModelWithId
): Promise<void> => {
  const headers = {
    "Content-Type": "application/json",
  };

  const { data } = await axios.put(
    `http://localhost:8080/api/listings/${lid}`,
    newListing,
    {
      headers: headers,
    }
  );
  return data;
};

const deleteListing = async (lid: number): Promise<void> => {
  const { data } = await axios.delete(
    `http://localhost:8080/api/listings/${lid}`
  );
  return data;
};

export { getAllListings, createListing, deleteListing };
