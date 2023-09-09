package com.connor.Listing;



import com.connor.User.UserModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import java.util.*;

/**
 * @author Connor Hunter        connh321@gmail.com
 * <p>
 * A model for a listing in the listing table
 */
@Entity
@Table(name = "listings")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ListingModel {

    //non-parameterized constructor
    public ListingModel() {
    }

    //parameterized constructor
    public ListingModel(String jobTitle, String companyTitle, String locationCity,String locationState,Boolean isRemote, Long salary, Boolean isPartTime, Boolean isFullTime, Boolean isJuniorLevel, Boolean isMidLevel, Boolean isSeniorLevel, String description,Boolean isDraft, Date creationDate ) {
        this.jobTitle = jobTitle;
        this.companyTitle = companyTitle;
        this.locationCity = locationCity;
        this.locationState = locationState;
        this.isRemote = isRemote;
        this.salary = salary;
        this.isPartTime = isPartTime;
        this.isFullTime = isFullTime;
        this.isJuniorLevel = isJuniorLevel;
        this.isMidLevel =  isMidLevel;
        this.isSeniorLevel = isSeniorLevel;
        this.description = description;
        this.isDraft = isDraft;
        this.creationDate = creationDate;
    }

    //M:1 with User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user")
    @JsonIgnore
    private UserModel user;

    @Id //pk
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lid")
    private Long lid;

    @Column(name = "jobTitle", nullable = false)
    private String jobTitle;

    @Column(name = "companyTitle", nullable = false)
    private String companyTitle;

    @Column(name = "locationCity", nullable = false)
    private String locationCity;

    @Column(name = "locationState", nullable = false)
    private String locationState;

    @Column(name = "isRemote", nullable = false)
    private Boolean isRemote;

    @Column(name = "salary", nullable = false)
    private Long salary;

    @Column(name = "isPartTime", nullable = false)
    private Boolean isPartTime;

    @Column(name = "isFullTime", nullable = false)
    private Boolean isFullTime;

    @Column(name = "isJuniorLevel", nullable = false)
    private Boolean isJuniorLevel;

    @Column(name = "isMidLevel", nullable = false)
    private Boolean isMidLevel;

    @Column(name = "isSeniorLevel", nullable = false)
    private Boolean isSeniorLevel;

    @Column(name = "description", length = 9999, nullable = false)
    private String description;

    @Column(name = "isDraft", nullable = false)
    private Boolean isDraft;

    @Column(name = "creationDate", nullable = false)
    private Date creationDate;

    ///
    ///GETTERS AND SETTERS
    ///


    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public Long getLid() {
        return lid;
    }

    public void setLid(Long lid) {
        this.lid = lid;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompanyTitle() {
        return companyTitle;
    }

    public void setCompanyTitle(String companyTitle) {
        this.companyTitle = companyTitle;
    }

    public String getLocationCity() {
        return locationCity;
    }

    public void setLocationCity(String locationCity) {
        this.locationCity = locationCity;
    }

    public String getLocationState() {
        return locationState;
    }

    public void setLocationState(String locationState) {
        this.locationState = locationState;
    }

    public Boolean getIsRemote() {
        return isRemote;
    }

    public void setIsRemote(Boolean remote) {
        isRemote = remote;
    }

    public Long getSalary() {
        return salary;
    }

    public void setSalary(Long salary) {
        this.salary = salary;
    }

    public Boolean getIsPartTime() {
        return isPartTime;
    }

    public void setIsPartTime(Boolean partTime) {
        isPartTime = partTime;
    }

    public Boolean getIsFullTime() {
        return isFullTime;
    }

    public void setIsFullTime(Boolean fullTime) {
        isFullTime = fullTime;
    }

    public Boolean getIsJuniorLevel() {
        return isJuniorLevel;
    }

    public void setIsJuniorLevel(Boolean juniorLevel) {
        isJuniorLevel = juniorLevel;
    }

    public Boolean getIsMidLevel() {
        return isMidLevel;
    }

    public void setIsMidLevel(Boolean midLevel) {
        isMidLevel = midLevel;
    }

    public Boolean getIsSeniorLevel() {
        return isSeniorLevel;
    }

    public void setIsSeniorLevel(Boolean seniorLevel) {
        isSeniorLevel = seniorLevel;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getIsDraft() {
        return isDraft;
    }

    public void setIsDraft(Boolean draft) {
        isDraft = draft;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }
}