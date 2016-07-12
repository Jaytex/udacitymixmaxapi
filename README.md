# Udacity Slash Command for Mixmax

This is an open source Mixmax Slash Command. See <http://sdk.mixmax.com/docs/tutorial-giphy-slash-command> for more information about how to use this example code in Mixmax.

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the typeahead URL (to return a JSON list of typeahead results), run:

```
curl https://localhost:9145/typeahead?text=<course title>
```

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl https://localhost:9145/resolver?text=<course id>
```

## What does it do?

It allwos you to search for a Udacity course by doing: ````/udacitysearch [coursename]````. It the shows a drop down list with the top courses that match your search. Clicking on one them will leave a link to the actual Udacity course.

## How does it work?

During the typeahead phase, all requests are made to the Udacity Catalog API to fetch the top results fitting your query. 

Once you select one of the courses, it ends up passing to the resolver a ```key```. This property is used to check the Udacity Catalog API to get more details about the specific course you selected. 

Note: The typeahead is a little slow as it has to filter out relevant courses from the Catalog API based on title (the API does not provide query parameters).

## Setup

This API also assumes you're running a secure http connection. Read <https://www.sitepoint.com/how-to-use-ssltls-with-node-js/> for more information on how to use https with nodejs.

## How to add to Mixmax?

Begin by going to your Mixmax settings page, then in Interactions, under Slash Commands add a slash command with the following values:

__Name__ : Udacity seach<br>
__Command__ : udacitysearch<br>
__Parameter Placeholder__: [search course name]<br>
__Command Parameter Suggestions API URL__ : https://localhost:9145/typeahead<br>
__Command Parameter Resolver API URL__ : https://localhost:9145/resolver<br>