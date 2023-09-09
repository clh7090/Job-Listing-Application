FROM openjdk:17

EXPOSE 8080
# job-listings from final-name in build in pom.xml
ADD target/job-listings.jar job-listings.jar 
ENTRYPOINT ["java", "-jar", "/job-listings.jar"]