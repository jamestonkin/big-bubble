# NOTICE: Current API is deprecated. Currently looking for a FREE Stock Market Historical Data API

# Trump and the Big Bubble

#### NSS Front End Capstone by James Tonkin

## Project Goals:
1. Search POTUS Twitter for company mentions and check that company’s stock 1 week before and 3 weeks after to see correlation.
2. Show stock data in a chart and make a tweet look like and act as an embedded tweet.
3. Allow users to sign in and choose which companies they’d like to follow.

## Instructions
1. Clone this repository.
2. Change to the `/lib` directory and run `npm install`.
3. Create a Firebase Database (see below).
4. Create a file in the `app/values` folder named `fb-creds.js` with the following information.

```"use strict";

app.constant("FBCreds", {
	apiKey: "your Firebase Api Key",
	authDomain: "your Firebase authDomain",
	databaseURL: "your Firebase database URL"
});
```


## Firebase database
1. [Firebase Site](https://firebase.google.com/)
2. Set your database rules to the following:

```{
  "rules": {
    ".read": true,
    ".write": true,
      "users":{
        ".indexOn": ["uid"]
      }
		}
}
```

3. Import the `companies.json` file from the `data` folder into your Firebase database.

## Updating 2017 tweets
1. Go here [Trump Twitter Archive] (https://github.com/bpb27/trump_tweet_data_archive)
2. Download the latest `condensed_2017.json.zip` file.
3. Uzip this file.
4. Rename the `condensed_2017.json` file to `tweets-17.json`
5. Drop this file into the `data` folder.
