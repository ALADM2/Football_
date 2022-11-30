# Football Data

## URL to the application on Heroku
    https://id607001-aladm1-react.herokuapp.com/
    
## Run the app locally
After clonig the repository, open a terminal and introduce the next command:

    npm install
    
Then, introduce this command to start the app:

    npm start
    
## Run Cypress tests  
Introduce the next command:

    npm run cypress

## Deploy the app to Heroku
Deployment happens automatically when the code is pushed on GitHub

## Format the code
To format the code run Prettier with the next command:

    npm run prettier
    
## Known bugs
- If an entry that has a child that depends on one of the parent's fields is deleted, the table where the child element is will crash. Example: if there is an entry for the city Madrid and Spain gets deleted, the user won't be able to get the table where Madrid is located.
- If a modal with a dropdawn menu is submitted without clicking one of the dropdawn values, that field will be submitted without a value and the table will crash. This happens even though the dropdawn menu has a value ser=t by default. To avoid the bug, a value needs to be clicked. 
