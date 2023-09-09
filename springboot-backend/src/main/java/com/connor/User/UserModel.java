package com.connor.User;

import com.connor.Listing.ListingModel;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import java.util.*;

/**
 * @author Connor Hunter        connh321@gmail.com
 * <p>
 * A model for a user in the user table
 */
@Entity
@Table(name = "users")
public class UserModel {

    //non-parameterized constructor
    public UserModel() {
    }

    //parameterized constructor
    public UserModel(String username, String password) {
        this.username = username;
        this.password = password;
    }

    //1:M with Listing
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "user")
    private List<ListingModel> listingModels = new ArrayList<>();

    @Id //pk
    @Column(name = "username")
    private String username;

    @Column(name = "password", nullable = false)
    private String password;


    ///
    ///GETTERS AND SETTERS
    ///

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<ListingModel> getListingModels() {
        return listingModels;
    }

    public void setListingModels(List<ListingModel> listingModels) {
        this.listingModels = listingModels;
    }
}