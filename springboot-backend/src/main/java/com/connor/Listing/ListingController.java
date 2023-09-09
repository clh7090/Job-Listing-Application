package com.connor.Listing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/***
 * @author Connor Hunter
 * A Listing controller responsible for recieving calls for data from the front-end of the Listing Application and
 * returning data resources about a listing.
 *
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/")
public class ListingController {

    @Autowired // Injected Singleton
    private final ListingService listingService;

    //Constructor
    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    /***
     * Gets all listings in json format for a certain user
     * {domain}/api/{version}/listing/?username=
     *
     * @param username a username query param
     * @return Json List of all listings in the db
     */
    @GetMapping("/listings")
    public List<ListingModel> getAllListings(@RequestParam(value = "username") String username) {
        return listingService.getAllListings(username);
    }


    /**
     * Creates a listing for a certain user given a request body & username on
     * {domain}/api/listing/?username=
     *
     * @param username username query param
     * @param listing a listing in json format
     * @return A response body in json format
     */
    @PostMapping("/listings")
    public ListingModel createListing(@RequestParam(value = "username") String username,
                                  @RequestBody ListingModel listing) {
        return listingService.createListing(username, listing); // creates a  listing for a certain user
    }

    @PutMapping("/listings/{lid}")
    public ResponseEntity<ListingModel> updateListing(@PathVariable(value = "lid") Long lid, @RequestBody ListingModel updatedListing) {
        return ResponseEntity.ok(listingService.updateListing(lid, updatedListing));
    }

    /**
     * Deletes a listing given an lid
     *
     * @param lid A given lid path variable
     * @return deleted : ok response body on ok, otherwise 404 not found rnf exception
     */
    @DeleteMapping("/listings/{lid}")
    public ResponseEntity<Map<String, Boolean>> deleteListing(@PathVariable Long lid) {
        listingService.deleteListing(lid);
        //only done on success
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", true); // if the resource didn't exist it will send a 404 not found, rnf exception
        return ResponseEntity.ok(response);
    }

}
