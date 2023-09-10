import { useState, useEffect } from "react";
import ListingsComponent from "../components/ListingComponent";
import "../assets/styles/home.css";
import { useUserContext } from "../contexts/UserContext";
import { listingModelWithId } from "../models/listingModel";
import { getAllListings } from "../services/listingService";
import { Link } from "react-router-dom";
import { useAlertContext } from "../contexts/AlertContext";

const HomePage = () => {
  const userContext = useUserContext();
  const alertContext = useAlertContext();
  const [listings, setListings] = useState<listingModelWithId[]>([]);

  useEffect(() => {
    const getListings = async () => {
      setListings(await getAllListings(userContext.username));
    };
    getListings();
  });

  return (
    <div className="home">
      <main>
        <div className="title-and-create">
          <span>{userContext.username}'s Job Listings</span>
          <Link to="/create-listing" className="create-listing">
            Create Listing
          </Link>
        </div>
        {alertContext.isDisplayed ? (
          <div className="alert-x-out">
            <span className="alert">{alertContext.message}</span>{" "}
            <div
              className="x-out"
              onClick={() => alertContext.setIsDisplayed(false)}
            >
              X
            </div>
          </div>
        ) : (
          ""
        )}
        {listings.length > 0 ? (
          <div className="job-listings">
            {listings.map((listing, idx) => {
              return (
                <ListingsComponent
                  listing={listing}
                  listings={listings}
                  setListings={setListings}
                  key={idx}
                ></ListingsComponent>
              );
            })}
          </div>
        ) : (
          <div className="no-listings">No Listings Found</div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
