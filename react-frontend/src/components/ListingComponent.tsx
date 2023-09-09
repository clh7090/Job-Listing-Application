import "../assets/styles/listing.css";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import { listingModelWithId } from "../models/listingModel";
import { useAlertContext } from "../contexts/AlertContext";
import { deleteListing, updateListing } from "../services/listingService";

interface Props {
  listing: listingModelWithId;
  listings: listingModelWithId[];
  setListings: (newListings: listingModelWithId[]) => void;
}

const ListingComponent = ({ listing, listings, setListings }: Props) => {
  const alertContext = useAlertContext();

  const checkListingExpired = (givenDateString: string): boolean => {
    const givenDate = new Date(givenDateString);
    const currentDate = new Date(new Date().toISOString().slice(0, -1));

    // Calculate the difference in years and months
    const yearsDiff = currentDate.getFullYear() - givenDate.getFullYear();
    const monthsDiff = currentDate.getMonth() - givenDate.getMonth();

    // Check if it has been at least one month
    if (yearsDiff < 0 || monthsDiff < 0) {
      return true;
    }
    return false;
  };

  const getDraftExpiredActiveText = () => {
    if (listing.isDraft) {
      return <div className="draft">Draft</div>;
    }
    const isExpired = checkListingExpired(listing.creationDate);
    return isExpired ? (
      <div className="expired">Expired</div>
    ) : (
      <div className="active">Active</div>
    );
  };

  return (
    <div className="listing">
      <div className="job-title">{listing.jobTitle}</div>
      <div className="draft-expired-active">{getDraftExpiredActiveText()}</div>

      <div className="company-title">{listing.companyTitle}</div>
      {/* if the location is remote we put remote otherwise we put city state */}
      {listing.locationCity && listing.locationState ? (
        <div className="city-state">
          <div className="location-city">{listing.locationCity}</div>,
          <div className="location-state">{listing.locationState}</div>
        </div>
      ) : (
        <></>
      )}
      <div className="remote">{listing.isRemote ? "Remote" : <></>}</div>

      <div className="information-containers">
        <div className="salary">
          <div className="icon">
            <LocalAtmIcon></LocalAtmIcon>
          </div>
          {/** We convert the integer money amount to include commas and a $ */}
          ${listing.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>

        {listing.isPartTime ? (
          <div className="part-time">
            <div className="icon">
              <CalendarMonthIcon></CalendarMonthIcon>
            </div>
            Part Time
          </div>
        ) : (
          <></>
        )}

        {listing.isFullTime ? (
          <div className="full-time">
            <div className="icon">
              <CalendarMonthIcon></CalendarMonthIcon>
            </div>
            Full Time
          </div>
        ) : (
          <></>
        )}

        {listing.isJuniorLevel ? (
          <div className="junior-level">
            <div className="icon">
              <SchoolIcon></SchoolIcon>
            </div>
            Junior Level
          </div>
        ) : (
          <></>
        )}

        {listing.isMidLevel ? (
          <div className="mid-level">
            <div className="icon">
              <SchoolIcon></SchoolIcon>
            </div>
            Mid Level
          </div>
        ) : (
          <></>
        )}

        {listing.isSeniorLevel ? (
          <div className="senior-level">
            <div className="icon">
              <SchoolIcon></SchoolIcon>
            </div>
            Senior Level
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="description">{listing.description}</div>
      <div className="buttons">
        <div
          className="delete"
          onClick={async () => {
            await deleteListing(listing.lid);
            const newListings = listings.filter(
              (currentListing: listingModelWithId) =>
                currentListing.lid !== listing.lid
            );
            setListings(newListings);
            alertContext.setMessage("Listing Deleted");
            alertContext.setIsDisplayed(true);
          }}
        >
          Delete
        </div>
        {/* if the listing is expired, we have the republish button but if it is a draft we need the publish button */}
        {checkListingExpired(listing.creationDate) && !listing.isDraft ? (
          <div
            className="republish"
            onClick={async () => {
              listing.creationDate = new Date().toISOString().slice(0, -1);
              await updateListing(listing.lid, listing);
              let newListings = listings.filter(
                (currentListing: listingModelWithId) =>
                  currentListing.lid !== listing.lid
              );
              newListings = [...newListings, listing];
              setListings(newListings);
              alertContext.setMessage("Listing Republished");
              alertContext.setIsDisplayed(true);
            }}
          >
            Republish
          </div>
        ) : listing.isDraft ? (
          <div
            className="publish"
            onClick={async () => {
              listing.isDraft = false;
              await updateListing(listing.lid, listing);
              let newListings = listings.filter(
                (currentListing: listingModelWithId) =>
                  currentListing.lid !== listing.lid
              );
              newListings = [...newListings, listing];
              setListings(newListings);
              alertContext.setMessage("Listing Published");
              alertContext.setIsDisplayed(true);
            }}
          >
            Publish
          </div>
        ) : (
          <></>
        )}
        {/** we don't show publish if the listing isn't a draft and it isn't expired, only delete.  */}
      </div>
    </div>
  );
};

export default ListingComponent;
