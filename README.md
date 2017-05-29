# Aggle!

A word game built with Angular 1 on the front end and an Node/Express backend that's _surprisingly_ similar to a very popular word game with a title that may or may not contain most of the same letters.

## The Problem
This started as a challenge to write a command line Boggle-style game with Node. Once I had that I decided to write a client for it in Angular.

## The Tools
Angular 1, Sass, Node, Express, Gulp, Webpack, Karma, Mocha, Chai, Eslint.

## The Approach
To generate the board I used a random selection from different "dice" for each square and represented the results as a 2-D array. To solve the board I created a map of all of the words in a wordlist. Then converted that wordlist to a Trie. Solving the board involves going along each possible path in the board, continuing to check the path as long as it's a valid prefix and finally validating it against the word list.

The front end involves rendering that board using Angular directives and making some custom directives for given parts of the UI. To keep track of which squares had currently been selected and which were possible I made a map of all of the coordinates in the board.

## Challenges
On the client I've opted to use the map of words to validate correct answers as opposed to sending a list of answers or validating each answer with a server request. Ultimately this is the most performant after the initial page load but the map itself is big. I didn't want to make the answers available on the client side before the game was over and also didn't want to make a bunch of requests. I handled this in part by caching it to local storage.

Keeping track of which letters could be selected next was a bit trickier than I pictured originally. I ended up handling it by using a map of all of the coordinates on the board. When a given letter is selected it and all adjacent coordinates are set to true in the map. If it's also in the word that's being worked on it's a selected letter, if it's true in the map it's a possible letter.

## What I'd Do Differently
I started writing this a couple years ago and have been refactoring and reworking it recently. I opted to leave the syntax at ES5, I can see plenty of places where involving more modern syntax would be cleaner.

The solver itself didn't really end up involved in the client very much. In the future I'd like to include that functionality. Maybe at the end of a given game it will tell the user the percent of possible answers they got.

Even though the layout is responsive the aforementioned local storage caching broke the game functionality on mobile. In the future I may try something like a Redis layer or just leave it to the requests.