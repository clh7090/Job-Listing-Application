import { useForm } from "react-hook-form";
import "../assets/styles/login.css";
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../assets/styles/create-listing.css";
import { listingModel } from "../models/listingModel";
import { createListing } from "../services/listingService";
import { useAlertContext } from "../contexts/AlertContext";

const CreateListingPage = () => {
  const navigate = useNavigate();
  const userContext = useUserContext();
  const alertContext = useAlertContext();
  const { register, handleSubmit, resetField } = useForm();
  const [isRemote, setIsRemote] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    const jobTitle: string = data.jobTitle;
    const companyTitle: string = data.companyTitle;
    const locationCity: string = data.isRemote ? "" : data.locationCity;
    const locationState: string = data.isRemote ? "" : data.locationState;
    const isRemote: boolean = data.isRemote;
    const salary: number = data.salary;
    let isPartTime: boolean = false;
    let isFullTime: boolean = false;
    let isJuniorLevel: boolean = false;
    let isMidLevel: boolean = false;
    let isSeniorLevel: boolean = false;
    const description: string = data.description;
    const isDraft: boolean = data.isDraft;
    const creationDate: string = new Date().toISOString().slice(0, -1);

    if (data.fullOrPart === "Part Time") {
      isPartTime = true;
    } else {
      isFullTime = true;
    }

    if (data.jrMidSr === "Junior") {
      isJuniorLevel = true;
    } else if (data.jrMidSr === "Mid") {
      isMidLevel = true;
    } else {
      isSeniorLevel = true;
    }

    const listing: listingModel = {
      jobTitle: jobTitle,
      companyTitle: companyTitle,
      locationCity: locationCity,
      locationState: locationState,
      isRemote: isRemote,
      salary: salary,
      isPartTime: isPartTime,
      isFullTime: isFullTime,
      isJuniorLevel: isJuniorLevel,
      isMidLevel: isMidLevel,
      isSeniorLevel: isSeniorLevel,
      description: description,
      isDraft: isDraft,
      creationDate: creationDate,
    };
    await createListing(userContext.username, listing);
    alertContext.setMessage("Listing published");
    alertContext.setIsDisplayed(true);
    navigate("/");
  };

  return (
    <>
      <div className="create-listing-form">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <span className="create-listing-text">Create Listing</span>

          <input
            {...register("jobTitle")}
            type="text"
            placeholder="Job Title"
            maxLength={20}
            required
          />

          <input
            {...register("companyTitle")}
            type="text"
            placeholder="Company Title"
            maxLength={20}
            required
          />

          <input
            {...register("locationCity")}
            type="text"
            placeholder="City"
            maxLength={20}
            required
            disabled={isRemote ? true : false}
          />

          <input
            {...register("locationState")}
            type="text"
            placeholder="State"
            maxLength={2}
            required
            disabled={isRemote ? true : false}
          />

          <input
            {...register("salary")}
            type="number"
            placeholder="Salary"
            maxLength={8}
            required
          />
          <input
            {...register("description")}
            type="text"
            placeholder="Description"
            maxLength={3000}
            required
          />

          <div className="full-or-part-container">
            <input
              {...register("fullOrPart")}
              type="radio"
              id="isPartTime"
              value="Part Time"
            />
            <label htmlFor="isPartTime">Part Time</label>
            <input
              {...register("fullOrPart")}
              type="radio"
              id="isFullTime"
              value="Full Time"
            />
            <label htmlFor="isFullTime">Full Time</label>
          </div>

          <div className="jr-mid-sr-container">
            <input
              {...register("jrMidSr")}
              type="radio"
              id="isJuniorLevel"
              value="Junior"
            />
            <label htmlFor="isJuniorLevel">Junior</label>
            <input
              {...register("jrMidSr")}
              type="radio"
              id="isMidLevel"
              value="Mid"
            />
            <label htmlFor="isMidLevel">Mid</label>
            <input
              {...register("jrMidSr")}
              type="radio"
              id="isSeniorLevel"
              value="Senior"
            />
            <label htmlFor="isSeniorLevel">Senior</label>
          </div>

          <div className="checkboxes">
            <input
              {...register("isDraft")}
              type="checkbox"
              id="draft-checkbox"
            />
            <label htmlFor="isDraft">Draft</label>
            <input
              {...register("isRemote")}
              type="checkbox"
              id="remote-checkbox"
              onChange={() => {
                resetField("locationCity");
                resetField("locationState");
                setIsRemote(isRemote ? false : true);
              }}
            />
            <label htmlFor="isRemote">Remote</label>
          </div>
          <button className="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CreateListingPage;
