# React Exchange
[![Netlify Status](https://api.netlify.com/api/v1/badges/e8d8f7c0-0f2b-4b3c-a613-9ec1fa92b47d/deploy-status)](https://app.netlify.com/sites/react-exchange/deploys)

Live web app:
- [https://react-exchange.netlify.com/]https://react-exchange.netlify.com/)
- [demo on https://pleasant-gram.glitch.me/](https://pleasant-gram.glitch.me/)
or go to project repository [on github](https://github.com/hantumobil/react-exchange)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
You can find the most recent version of Create React App [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Usage

### Node
1. clone this repo and run `npm install` or `yarn install` in terminal, in project's root folder
2. after packages installation finish, run `npm start` or `yarn start`

### Docker
1. build image `docker build -t react-exchange .`
2. Run the container
```
docker run -it \
-v ${PWD}:/usr/src/app \
-v /usr/src/app/node_modules \
-p 3000:3000 \
--rm \
react-exchange
```

### Keyboard Shortcut
You can use `Enter` and `Esc` key when adding exchange currency

## Development Note
### UI Component Hierarchy
Basic component hierarchy for this app are like this:

* Exchange App
    * BaseInput in USD
    * Currencies
        * Currency
    * AddCurrency
    
![image](https://w-digital.co/react-exchange/assets/img/react-exchange-mockup-1.png "mockup 1")

### Styling
This project using [SASS/SCSS](http://sass-lang.com) and [RSCSS](http://rscss.io/) and also Chris Coyier's reboot style

all scss files are put into scss folder, and with master file ___./src/App.scss)___

### Testing
We are test using Jest and React-Testing-Library
Each component have their own test
- To run all test, write `yarn test` from root folder

### Public API used
* openexchangerates.org - to get currency names
* exchangeratesapi.io - to get their rates
