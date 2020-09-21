# Travel Time
A holiday inspiring website that allows users to search for their next holiday destination or choose a destination from a hand-picked selection. Like the name suggests when it’s time to travel this website provides all the information needed to find your next holiday destination. The website features a search bar which allows users to search for any city in the world using the google place API. The website also features carefully selected holiday destination from some of the most attractive cities in the world.

Whether the user searches for a city or chooses a city from the recommended selection they will be greeted with a map which details the best points of interests in the city including tourist attractions and restaurants. Information on the best hotels in the city will also be presented to the users which gives them all the information needed to make a decision on their next holiday destination and book the hotel.

[Travel Time](https://r-prince.github.io/TravelTime/)

The business goals of this website: 
- Provide information on holiday destinations across the world. 
- Provide ideas/inspiration for people that are thinking to go on holiday. 
- Inspire users to go on holiday. 
- Book accommodation/hotel through affiliation links. 

The customer goals of this website are: 
- Search for their next holiday destination.
- Get inspiration/ideas for their next holiday destination. 
- Get more information on a holiday destination they are thinking to visit. 

# UX

## Ideal Client

The ideal client for this business is: 
- Someone looking to go on holiday
- Has disposable income
- Lives in the UK (but can be anywhere in the world)
- Over 16 years old

Visitors to this website are searching for: 
- Information on holiday destinations to suit their needs.
- Inspiration and ideas of where to go on holiday.
- Specific information on holiday destinations they are thinking to visit. i.e tourist attractions, restaurants or hotels. 
-  Book accommodation. 

This website helps users achieve this goal by:
- Allowing the user to search for their next holiday destination. 
- The search bar is very intuitive and suggest cities based on what the user is typing. 
- Information displayed on destinations is concise and easy to read.
- For each search or recommendation a map is displayed which gives the user a visual display of the city.
- Information the user would need to make a decision on their next holiday is displayed in a creative and easy to read manner. 
- The website offers 6 recommendations for users that need inspiration/ ideas on where to go on holiday. 

## Client stories

1. As a new visitor to the website, I want to easily be able to search for my next holiday destination. 
2. As a new visitor to the website, I want concise and easy to read information about the destination I have chosen such as tourist attraction and points of interests. 
3. As a new visitor to the website, I want inspiration/ideas on the best holiday destinations to visit. 
4. As a client who knows where they want to go on holiday, I want to be able to view information on things I can do once I’m there. 
5. As a client who knows where they want to go on holiday, I want to be able to view information on hotels and book accommodation. 
6. As a returning visitor to the website, who has booked a hotel through the link, I want to be able to contact Time Travel if I have any issues. 
7. As a potential customer, I want to be able to contact Time Travel if I have any issues. 

## Wireframes

[Desktop Wireframe](/readme/wireframes/TravelTimeDesktopWireframe.pdf)

[Tablet Wireframe](/readme/wireframes/TravelTimeTabletWireframe.pdf)

[Mobile Wireframe](/readme/wireframes/TravelTimeMobileWireframe.pdf)

# Features

This website is a one page application which is split into five sections and also includes two modal pages. 

### Callout section
The top left hand-side of the page includes a navigation icon which allows the users quick and easy access to different sections on the page (search, recommendations and contact us). On desktop and larger screen sizes there is also a button on the right hand side which prompts user to “get inspired” and directs them to the Travel Time recommendations. Directly underneath the icon and button the hero image is displayed which alternates between two background images every three seconds. In front of the hero images is the main header and a brief description of the website which also helps with SEO. On mobile and smaller screen sizes the description is slightly smaller for a better user experience. 

### Search section
The search section is directly below the callout section and includes a header and a search bar which allows user to type a destination. A placeholder stating “Enter a city…” is used to help prompt the user to type in a city. The search bar uses the google place autocomplete api which predicts the cities based on  what the user types in the search bar. This creates a great user experience by predicting the city and ensures the user spells the city correctly. This can also speed up the process which is also a good user experience.

### Modal One: Autocomplete search results
Once the user selects a city from the autocomplete list a modal page will appear with the results from the search. The modal will first display the name of the city and the country in which the city is in. Secondly using the google maps api a map is displayed with markers showing “Points of Interest” which includes tourist attractions and restaurants in the area. The user can then click on the marker which displays a small info-window which displays information about the attraction/restaurant such as name, address and a rating between 1 and 5 based on reviews from customers. Scrolling down the modal page using the google place api six hotels within the searched city area is then displayed using cards. The card displays an image of the hotel and information about the hotel such as name, address and the hotel-rating out of five displayed using stars. At the bottom of the card there is also a call to action button which prompts the user to “Book Now” which opens a new tab and directs them to a website to book the hotel. The bottom and top of the modal page also includes buttons which allows the user to close the modal page.

### Recommendations section
The recommendation section first includes a header called “TRAVEL TIME PICKS” This section recommends six cities that the users should visit if they want some inspiration on where their next holiday destination should be. These cities have been recommended as the site user has a greater affiliation percentage with the recommended hotels for these cities. Each city is represented with an image of the city and an overlay of text which includes the city name and country. When the user hovers over the image with the mouse a “shrink” animation is used to prompt the user to click on the image. Once the user clicks on the image a modal page is displayed with information on the city. 

### Modal Two: Recommendations results
The modal will first display the name of the city and the country in which the city is in. Unlike the search results modal this modal then includes a carousel of images displaying the beauty of the city. Alongside the images is a “Quick guide” which gives the user more information about the city such as the language spoken, currency used, the nearest airport and a short paragraph describing the beauty of the city. The images and the quick guide is used with this modal as we want to make sure the user has enough information to go ahead and book accommodation. Scrolling down using the google maps api a map is displayed with markers showing “Points of Interest” which includes tourist attractions and restaurants in the area.  The user can then click on the marker which displays an information-windwo which displays information about the attraction/restaurant such as name, address and a rating between 1 and 5 based on reviews from customers. Scrolling down the modal page using the google place api six hotels within the searched city area is then displayed using cards. The card displays an image of the hotel and information about the hotel such as name, address and the hotel-rating out of five displayed using stars. At the bottom of the card there is also a call to action button which prompts the user to “Book Now” which opens a new tab and directs them to a website to book the hotel. The bottom and top of the modal page also includes buttons which allows the user to close the modal page. 

### Contact Us section
This section includes a contact form that the user can use to get in contact with the Travel Time team. The contact form includes four input fields name, email address, contact number and enquiry text box. Using the emailJS SDK the user can send the inquiry by pressing the “send” button at the bottom of the form.

### Footer section
This is the final section of the page and includes the copyright for Time Travel and three icons that lead to Travel Times social media pages (Facebook, Twitter and Instagram).

## Existing Features
Navigation Icon - allows the user to jump to different sections of the page including search, recommendations and contact form. 

Call to Action Buttons - Exists at the top of the callout section and in the hotel cards in the modals. “Get Inspired” is the callout section button and allows the user to jump straight to the Travel Time picks. “Book now” is the second call to action button which prompts the user to book the recommended hotel. 

Autocomplete search bar - this allows the user to search for their next holiday destination. The great feature with this search bar is that it uses the google autocomplete feature which predicts and list cities when the user begins to type in the search bar. When the user selects a city a modal page will pop-up with information on the city.

Travel Time Recommendations - this allows the user to select a recommended city. An image is used to display the recommended city and features a hover animation when the user hovers over the image with the mouse. When the user selects a recommendation a modal page will pop-up with information on the city. 

Pop-up modal pages - this allows the user to view information on the city they have selected. Using a modal page allows the user to clearly and easily see information on a city. There are two different modal pages that are used one for the search results and one page for the Travel Time pick results. 

Google Maps API - this allows the user to view an interactive map of the city in question. Markers are also used with the map to show users points of interests such as restaurants and tourist attractions. The map is responsive and is visible on all screen sizes. This feature allows users to interact with the map and view vital information that can help decide on their next holiday destination. 

Google Place API - this allows the user to get more detailS on the city in question. This is presented in the data returned for the cards used for the hotel recommendations. This includes an image of the hotel, name, address, user rating and the website link which can be used to book the hotel. This feature gives the user the information needed to book a hotel. 

Contact form - this allows the user to contact the Travel Time team if they have any questions or concerns. The contact form includes four input fields name, email address, contact number and enquiry text box. This feature allows the user to communicate with the Travel Time team. 

Footer social icons - this feature allows the users to access Travel Times social media platforms. 

## Features to implement in the future

Option to change the language of the website - as this is a travel website it would be useful to translate the language so that more users can search for their next holiday destination in their preferred language. 

FAQ page - this would help answer any general questions that may accumulate from users using the contact for. 

Travel Time blogs - this would help potential clients/users gather more information on different cities and act as inspiration. This could also help improve traffic to the website. Blogs are also a great way to build trust with the user. 

Live temperature recordings - this would help give a more up to date details on the cities selected. Live temperature checks will also help the user evaluate the temperature and ensure it is inline with their needs. 

More recommended cities - adding more cities can increase site traffic and increase amount of income the site can make from affiliation links. 

Add travel packages - adding travel packages which include booking tourist attractions and restaurants can be added to the site which can help generate more income for the site owner. 

# Technologies Used

HTML, CSS and Javascript languages were used to programme the website.

[Bootstrap CDN](https://getbootstrap.com/) - The project uses Bootstrap4 to easily structure the website, make the website responsive and pop-up modal pages.

[Font Awesome](https://fontawesome.com/) - The project uses font awesome to style the icons throughout the website. 

[Google Fonts](https://fonts.google.com/) - The project uses google fonts to style the font used throughout the website. 

[Hover.css](https://ianlunn.github.io/Hover/) - This project uses hover.css to add hover features throughout the website. 

[jQuery](https://jquery.com/) - The project uses JQuery to simplify DOM manipulation.

[Google Maps API](https://developers.google.com/maps/documentation/javascript/overview) - The project uses the google maps api to generate interactive map with markers.

[Google Place API](https://developers.google.com/places/web-service/overview) - The project uses the google place api to fetch information on the different cities search and recommended.

[Email JS SDK](https://www.emailjs.com/) - The project uses the email JS SDK to allow users to contact the Travel Time team.  

# Testing
Testing information can be found in separate [TESTING.md file](readme/testing/TESTING.md)

# Deployment

This project was developed using Gitpod then committed and pushed to Github.

The project is open source and was deployed using the following steps:
1. Once on the GitHub repository [Travel Time](https://github.com/R-Prince/TravelTime) repository. 
2. Select "Settings" which is located towards the top of the page.
3. Scroll down to the "Source" section within the "GitHub pages" section.
4. From the dropdown menu select "master-branch" and click save.
5. The site is now published and can be found using the link supplied in the Github pages section Travel Time
There is no difference between the the deployed version and the development version.

## How to run this project locally

To clone this project from Github:
1. Follow this link to the [Travel Time](https://github.com/R-Prince/TravelTime) repository.
2. Select the green button which has the options to "clone or download".
3. Copy the "Clone with HTTPS" link.
4. Switch the current working directory to the location where you want to clone the repository.
5. Use command "git clone" followed by pasting the "Clone with HTTPS" link.

# Credits

## Content
- The text used for the short paragraphs on the recommended cities were copied from [Travel Picker](https://travelpicker.com/)

## Media

- All images for the site were obtained from [Unsplash](https://unsplash.com/).

## Acknowledgements

- I received inspiration for this project from a number of different websites;
    - [Travel Picker](https://travelpicker.com/)
    - [Skyscanner](https://www.skyscanner.net/)
    - [Lonely Planet](https://www.lonelyplanet.com/)
    - [Kayak](https://www.kayak.co.uk/)
    - [Expedia](https://www.expedia.co.uk/?pwaLob=wizard-hotel-pwa-v2)
    - [Booking.com](https://www.booking.com/)

    




