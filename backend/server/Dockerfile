# Use OpenJDK base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy JAR file (Make sure to build the JAR first using `mvn package`)
COPY target/*.jar app.jar

# Expose port (should match application.properties)
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
