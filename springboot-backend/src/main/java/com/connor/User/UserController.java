package com.connor.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/***
 * @author Connor Hunter
 * A User controller responsible for recieving calls for data from the front-end of the Job Listing Application and
 * returning data resources about users.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/")
public class UserController {

    @Autowired // Injected Singleton
    private final UserService userService;

    //Constructor
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /***
     * Gets all users in json format at
     * {domain}/api/users/
     *
     * @return Json List of all users in the db
     */
    @GetMapping("/users")
    public List<UserModel> getAllUsers() {
        return userService.getAllUsers(); // returns a list of users
    }


    /**
     * Gets a user by username on
     * {domain}/api/users/{username}/
     *
     * @param username A given username path variable
     * @return Http response 200 with user response body if ok, otherwise 404 not found rnf exception
     */
    @GetMapping("/users/{username}")
    public ResponseEntity<UserModel> getUserById(@PathVariable String username) {
        UserModel user = userService.getUserById(username);
        return ResponseEntity.ok(user);
    }


    /**
     * Creates a user, given a request body containing the proper details on
     * {domain}/api/users/
     *
     * @param user a user in json format
     * @return A response body in json format
     */
    @PostMapping("/users")
    public UserModel createUser(@RequestBody UserModel user) {
        return userService.createUser(user);
    }

}