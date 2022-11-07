# WoW Tracker

WoW Tracker is a one page app built with the Angular CLI, and powered by Raider.io's public API.  Its purpose is to allow World of Warcraft players to easily view their various forms of gameplay progression all in one place as opposed to navigating to different websites and different pages within those sites.

The website is available here: https://wow-tracker.cyclic.app/
(For those interested without a World of Warcraft account, feel free to use the character name `Pwsjas`, and the server name `Bleeding-Hollow`)

![image of the entire website](https://github.com/Pwsjas/angular-sandbox/blob/development/app/docs/site.png?raw=true)

## Mythic+ Tracker

The mythic+ section displays the current season's 0.1% cutoff, as well as all of a player's current progress (and whether their progress is above or below the cutoff).

![image of mythic+ progress](https://github.com/Pwsjas/angular-sandbox/blob/development/app/docs/dungeons.png?raw=true)

## Raid Tracker

The raid section displays a player's guild's current raid progression for the active expansion, as well as their world ranking and region ranking.

![image of raid progress](https://github.com/Pwsjas/angular-sandbox/blob/development/app/docs/raids.png?raw=true)

## Friend Tracker

The friend tracker allows users to input their friend's names and server, and conveniently view their current mythic+ rating, along with their Class, Role, and Specialiation.

![image of friends list](https://github.com/Pwsjas/angular-sandbox/blob/development/app/docs/friends.png?raw=true)

### Notes

- The website uses cookies to remember users' inputs when they return
- Friends can be added or removed via the corresponding + and x buttons
- Users can see whether their dungeons are above the current cutoff via the colour of the text (green is above, red is below, yellow is barely above)

## Running the Application

This project was created using the Angular CLI.
Run `npm install` to install all requires packages.
Run `ng serve` to run a development server. Navigate to `http://localhost:4200/` to iew the website

Otherwise, the application is once again available to view at https://wow-tracker.cyclic.app/.