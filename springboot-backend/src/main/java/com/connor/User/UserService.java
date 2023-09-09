package com.connor.User;

import com.connor.Exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/***
 * @author Connor Hunter
 *
 * A User service responsible for business logic and making calls so the data accessing repository and returning the
 * proper data.
 *
 */
@Service
public class UserService {

    @Autowired // Injected Singleton
    private final UserRepository userRepository;

    //Constructor
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Gets all users from the database
     *
     * @return A list of all users
     */
    public List<UserModel> getAllUsers() {
        return userRepository.findAll(); // returns a list of users
    }


    /**
     * Gets a user by username and returns it
     *
     * @param username A given username
     * @return A user, or an RNF Exception
     */
    public UserModel getUserById(String username) {
        return userRepository.findById(username)
                .orElseThrow(() -> new ResourceNotFoundException("User With the username: " + username + " does not exist!"));
    }


    /**
     * Saves a new user into the repository
     *
     * @param user A given user
     * @return a newly saved User
     */
    public UserModel createUser(UserModel user) {
        return userRepository.save(user);
    }
}