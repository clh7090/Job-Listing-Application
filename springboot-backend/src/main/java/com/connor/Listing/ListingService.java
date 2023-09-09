package com.connor.Listing;

import com.connor.Exception.ResourceNotFoundException;
import com.connor.User.UserModel;
import com.connor.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/***
 * @author Connor Hunter
 * A Listing service responsible for business logic and making calls so the data accessing repository and returning the
 * proper data.
 */
@Service
public class ListingService {
    @Autowired // Injected Singleton
    private final ListingRepository listingRepository;

    @Autowired // Injected Singleton
    private final UserService userService;

    //Constructor
    public ListingService(ListingRepository listingRepository, UserService userService) {
        this.listingRepository = listingRepository;
        this.userService = userService;
    }


    /**
     * Gets all listings from the database
     * @param username query param username
     * @return A list of all listings belonging to a given user
     */
    public List<ListingModel> getAllListings(String username) {
        return listingRepository.findAllByUsername(username); // returns a list of listings
    }


    /**
     * Creates a listing for a certain user,
     *
     * @param listing    a listing in json format
     * @param username A given username
     * @return A response body in json format
     */
    public ListingModel createListing(String username, ListingModel listing) {
        //add listing to users listings
        UserModel currentUser = userService.getUserById(username);
        listing.setUser(currentUser);
        currentUser.getListingModels().add(listing);
        //Cascade.All saves the details
        return listingRepository.save(listing);
    }

    public ListingModel updateListing(Long lid, ListingModel updatedListing) {
        ListingModel listing = listingRepository.findById(lid)
                .orElseThrow(() -> new ResourceNotFoundException("Listing With the mid: " + lid + " does not exist!"));
        listing.setIsDraft(updatedListing.getIsDraft());
        listing.setCreationDate(updatedListing.getCreationDate());
        return listingRepository.save(listing);
    }


    /**
     * Deletes a listing given a lid
     *
     * @param lid A long lid
     */
    public void deleteListing(Long lid) {
        ListingModel listing = listingRepository.findById(lid)
                .orElseThrow(() -> new ResourceNotFoundException("Listing With the mid: " + lid + " does not exist!"));
        listingRepository.delete(listing);
    }

}