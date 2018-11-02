
## Scaffold Structure 

```
	.
	├── bin                	#  Server Configuration File
	├── db               	#  Hardcoded dummy database files
	├── middlewares         #  Express Middlewares
	├── routes              #  Api Routes
	├── .dockerignore       #  Ignored files for docker build
	├── .gitignore          #  Ignored files for git commit
    ├── app.js              #  Express Application configuration
    ├── Dockerfile          #  Docker image build script
	├── package.json        #  Dependency file
	└── README.md           #  This file 
```

## Quick Start
### Just to check everything is working
```
# Install the dependencies
npm install

# Start the project ( it will build the client, before starting the server )
npm start

# Test Apis at http://localhost:8080
```

## Quick Start with Docker
### Api Server can be deployed as an independent microservice with docker
```
# Build Docker Image
docker build -t atlassian/space-server .

# Run Docker Image
docker run -p 8080:8080 atlassian/space-server
```

## Environment Variables
```
# Variables can be found in package.json

NODE_ENV=production 					# app startup mode
PORT=8080								# port for api server
```

## Feedback
In case of any query or feedback, please feel free to connect via
* arpit.go4@gmail.com (Arpit Goyal)
