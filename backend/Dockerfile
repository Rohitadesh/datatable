FROM node:18.9.1
# Set the working directory in the container
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# ... Copying files, installing dependencies ...
# Expose the port your app is running on (e.g., 3000)
EXPOSE 5000
# Define the command to run your Node.js application
CMD [ "node", "index.js" ]