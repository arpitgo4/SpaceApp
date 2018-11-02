
# React-Redux-Scaffold [![Build Status](https://travis-ci.org/arpitgo4/React-Redux-Scaffold.svg?branch=master)](https://travis-ci.org/arpitgo4/React-Redux-Scaffold)
Client side scaffold with React-Redux on the frontend and Express server to serve built files in the production mode. Scaffold supports production and development modes, with **Best Developer Experience** ( DX ) by Hot-Loading for the client side application. There will be no need to restart during development, hence making the experience smooth and decrease the delivery time.

## Scaffold Structure 

```
	.
	├── src                     	#  Frontend source files
	|   ├── components          	#  React component's source
	|   ├── config              	#  Redux store's configuration
	|   ├── layouts             	#  React layout component's source
	|   |   └── App.Router.js 	#  React Router    
	|   ├── reducers            	#  Redux reducer's source
	|   ├── index.html          	#  Root HTML template
	|   ├── index.js            	#  Frontend source entry point
	|   └── style.scss           	#  Global Sass stylesheet
	├── .babelrc                	#  Babel configuration ( ES6, React, JSX )
	├── .dockerignore				#  Ignored files for docker build
	├── .eslintrc               	#  ESLint configuration
	├── devServer.js            	#  Hot loading server source ( development mode )
	├── Dockerfile					#  Docker image build script
	├── dist                        #  Compiled files
	├── .gitignore                  #  Ignored files from git commit
	├── server.js                   #  Express server to serve index.html and other assets
	├── LICENSE                     #  License to use the project
	├── package.json                #  Frontend and backend dependencies
	├── postcss.config.js 		#  PostCSS configuration
	├── README.md                   #  This file
	├── webpack.config.js           #  Webpack configuration for 'production' 
	└── webpack.dev.config.js 	#  Webpack configuration for 'development' 
```

## Quick Start
### Just to check everything is working
```
# Install the dependencies
npm install

# Build client 
npm run build:production

# To Run Unit Test Cases
npm test

# Start the project ( it will build the client, before starting the server )
npm start

# App will try to bind to port 80 (privileged port), 
# in case of error in above command try to,
sudo npm start

# Open web browser at http://localhost:80
# You will see a sample Single Page Application
```

## Environment Variables
```
# Variables can be found in package.json

NODE_ENV=production 				# app startup mode
SPACE_API_SERVER=localhost 			# hostname for api server
SPACE_API_SERVER_PORT=8080 			# port for api server
PORT=80								# port for client
```

## Quick Start with Docker
### Client App can be deployed as an independent microservice with docker
```
# Build Docker Image
docker build -t atlassian/space-client .

# Run Docker Image
docker run -p 80:80 atlassian/space-client
```

## Feedback
In case of any query or feedback, please feel free to connect via
* arpit.go4@gmail.com (Arpit Goyal)

Or, open an issue at github.
