# Testing 
[README.md](README.md)

[W3C Markup validation service](https://validator.w3.org/) was used to test site and ensure no errors were made. When the website was run through the website 5 errors were found;

1. The element “button” must not appear as a descendant of the “a” element - This was present throughout the pages on the website which have now been fixed.
2. The element “hr” not allowed as child of element “ul” in this context.
	- This was present throughout the pages on the website which have now 	been fixed.
3.  Element “img” is missing required attribute “src” (line 264).
4. An “img” element must have an “alt” attribute. 
	- This was present throughout the pages on the website which have now 	been fixed.
5. The “aria-labelledby” attribute must point to an element in the same document (line 242).

[JSHint](https://jshint.com/) was used to test the javascript code and ensure no errors or typos were returned . When the JS code was run through the website a total of [51 warnings](/readme/testing/testingScreenshots/jsHintTesting.png) was returned which mostly consisted of missing semi-colons and undefined variables. 

## Testing client stories from UX section of README

1. As a new visitor to the website, I want to easily be able to search for my next holiday destination. 
    1. Once the user lands on the page they are able to see the title “Search for your next destination”
    2. Scrolling down the page slightly the user can then type into the search bar and search for their next holiday destination. 
    3. Also by pressing the navigation bar they have a link to the search section of the page.
    4. Landing section > scroll down slightly > search for holiday destination.
2. As a new visitor to the website, I want concise and easy to read information about the destination I have chosen such as tourist attraction and points of interests. 
    1. On the landing page of the website there is a call to action button “Get Inspired” which jumps the user to the recommended destinations. The user can then select a city. A modal page pops up with information about the destination. 
    2. On the landing page of the website they can scroll down to the search bar and type in their desired city. Once selected a modal page pops up with information about the destination. 
    3. If the user clicks on a recommended city or searches the same city in the search bar the google map and place api returns the same information. 
3. As a new visitor to the website, I want inspiration/ideas on the best holiday destinations to visit. 
    1. The recommended section of the website recommends to the user 6 ideas from the best destinations around the world. 
    2. On the landing page of the website there is a call to action button “Get Inspired” which jumps the user to the recommended destinations. The user can then select a city. A modal page pops up with information about the destination. 
4. As a client who knows where they want to go on holiday, I want to be able to view information on things I can do once I’m there. 
    1. On the landing page the user can scroll down to the search bar and type in the city they want to go on holiday. A modal page will then pop up with information on the city such as tourist attraction, restaurants and hotels.
5. As a client who knows where they want to go on holiday, I want to be able to view information on hotels and book accommodation. 
    1. On the landing page the user can scroll down to the search bar and type in the city they want to go on holiday. A modal page will then pop up with information on the city and hotels in the area. A call to action button is present “Book now” which then leads the user to the hotel website to book accommodation.  
6. As a returning visitor to the website, who has booked a hotel through the link, I want to be able to contact Time Travel if I have any issues. 
    1. On the landing page the user can scroll down to the contact us section of the page and fill out contact form which is then sent to Travel Time team. The user needs to provide contact details such as name, phone number and email address. 
    2. Also by pressing the navigation bar they have a link to the contact us section of the page.
7. As a potential customer, I want to be able to contact Time Travel if I have any issues. 
    1. On the landing page the user can scroll down to the contact us section of the page and fill out contact form which is then sent to Travel Time team. The user needs to provide contact details such as name, phone number and email address. 
    2. Also by pressing the navigation bar they have a link to the contact us section of the page.

## Manual Logical testingScreenshots

The manual logical testing consisted of opening each section of the page and modals on different devices to ensure the content was displayed correctly. Clicking on each link in the navigation bar was also tested to ensure they work and direct the user to the correct page. Any buttons on the page was tested to verify they work and direct to the correct section. Social media links in the footer was tested to confirm they direct the user to the correct platform. Please see below for breakdown on each individual section.

## Further Testing

- Asked friends and family to test website on their own devices and report any errors.
- I viewed my website on several devices to check for any errors.
- I viewed website on Safari, Firefox and Chrome to check for any errors.

### Callout section
Navigation Icon;
1. Open page on desktop to verify navigation bar is displaying correctly.
2. Click on each navigation bar link to ensure they work and direct to the correct page.
3. Change display from desktop to mobile to ensure navigation icon is positioned correctly.

Issues
1. On tablet and medium screen sizes the search section did display correctly as the navigation bar pushed content over the search bar [preview](/readme/testing/testingScreenshots/tabletDisplayError.png)

Call to action button;
1. Click on “get inspired” button and ensure it directs the user to the recommendation section.

Callout text;
1. Ensure on smaller screen sizes the text is responsive and the paragraph length changes to suit smaller screen sizes. 

Background Image; 
1. Ensure the background image for the callout section changes every 3 seconds. 

### Search Section 
Search bar;
1. Ensure the google auto place feature activates and predicts the city name when the user begins to type. 
2. When you click on a city from the auto place feature a modal page pops up with information about the city. 
3. Change the screen size from desktop to tablet and smaller screen sizes to ensure the bar is displayed correctly. 

### Recommendation Section
Recommendations;
1. Ensure that when you hover over each recommendations the “shrink” animation is activated.
2. Ensure when you click on a recommendation a modal page pops up with information regarding the selected city. 
3. Change the screen size from desktop to tablet and smaller screen sizes to ensure the recommendations are responsive and displayed correctly on the grid.

### Contact Us Section
Contact form;
1. Open on desktop and ensure content is being displayed correctly.
2. Change display from desktop to mobile and ensure content is being displayed correctly.
3. Try to submit form without any details to confirm error message appears.
4. Try to submit form with incorrect email format to confirm error message appears.

### Footer Section
Footer;
1. Open on desktop and ensure content is being displayed correctly.
2. Change display from desktop to mobile and ensure content is being displayed correctly.
3. Click on each social media icon to ensure the user is directed to the correct social media platform.

### Modal page: Search results
Header;
1. Ensure the correct city appears as the header based on the user search.
2. Ensure the correct country appears as the sub-header based on the user search. 
3.  Change display from desktop to mobile and ensure content is being displayed correctly.

Google Map;
1. Change display from desktop to mobile and ensure content is being displayed correctly.
2. Click on markers to ensure an information window pops up. 

Hotel Section;
1. Ensure hotel cards are displayed correctly with the correct information. 
2. Change display from desktop to mobile and ensure content is being displayed correctly.

Close buttons;
1. Ensure when the “close” icon and “close” button is clicked the modal collapses.
2. Change display from desktop to mobile and ensure content is being displayed correctly and the buttons again close the modal. 

### Modal page: Recommendation results
Header;
1. Ensure the correct city appears as the header based on the user search.
2. Ensure the correct country appears as the sub-header based on the user search. 
3.  Change display from desktop to mobile and ensure content is being displayed correctly.

Image carousel;
1. Ensure the correct images are being displayed in relation to the city selected.
2. Ensure the carousel is working correctly and the images are changing every 3 seconds in a loop. 
3. Change display from desktop to mobile and ensure content is being displayed correctly.

Quick Guide Section;
1. Ensure the correct information appears in relation to the city selected.
2. Change display from desktop to mobile and ensure content is being displayed correctly. 

Google Map;
1. Change display from desktop to mobile and ensure content is being displayed correctly.
2. Click on markers to ensure an information window pops up. 

Hotel Section;
1. Ensure hotel cards are displayed correctly with the correct information. 
2. Change display from desktop to mobile and ensure content is being displayed correctly.

Close buttons;
1. Ensure when the “close” icon and “close” button is clicked the modal collapses.
2. Change display from desktop to mobile and ensure content is being displayed correctly and the buttons again close the modal. 

## Javascript manual logical testing

### Contact form
1. Enter details into the form and click send to ensure the correct information is sent to the site owners email address. 

Issues
1. No success notification appeared to confirm to the user that their message was sent. 
2. The data remained in the contact form after submission [preview](/readme/testing/testingScreenshots/contactFormError.png)

### Google Maps Api
1. Ensure the location on the map is correct in relation to the city searched. 
2. Ensure the markers displayed are within the radius specified. 
3. Ensure the markers displayed on the map are in relation to the desired points of interest.
4. Click on markers to ensure an information window appears. 
5. Ensure the data in the information window is correct [preview](/readme/testing/testingScreenshots/googleMapsInfoWindow.png).

### Google Place Api
1. Ensure the returned information from the google place API is in relation to the city selected. 
2. Ensure the data returned is displayed correctly in the hotel cards i.e image, name, address, user rating and website link. 

Issues
1. Some hotels did not return the correct data or was missing data such as an image of the facility [preview](/readme/testing/testingScreenshots/googlePlaceApiImageError.png).

### Google Autocomplete Place Search
1. Ensure when you click the search bar and start to type data the google autocomplete predicts the city based on the data typed [preview](/readme/testing/testingScreenshots/googleAutoSearchBar.png).



