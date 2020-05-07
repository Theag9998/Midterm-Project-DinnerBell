
## PROJECT REQUIREMENTS
Option 10: Food Pick-up Ordering 

A food ordering experience for a single restaurant. Hungry clients of this fictitious restaurant can visit its website, select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready.

The restaurant and client both need to be notified since this app serves as an intermediary.
When an order is placed the restaurant receives the order via SMS. The restaurant can then specify how long it will take to fulfill it. Once they provide this information, the website updates for the client and also notifies them via SMS.

You can use a modern telecomm API service such as Twilio to implement SMS communication from the website to the client and restaurant.
For inspiration check out how Ritual works, but keep in mind that's implemented as a native app and serves more than one restaurant.


## USER STORIES/SCENARIOS

USER:
 1. As a USER, I want to VIEW the MENU and VIEW PICTURES
 2. As a USER, I want to be able to VIEW my PREVIOUS ORDERS
 3. As a USER, I want to select ONE dish, because I am hungry.
 4. As a USER, I want to select MULTIPLE dishes, because I am very hungry.
 5. As a USER, I want to know what STAGE my order is on the website, because it allows me to know WHEN to expect my ORDER.
 6. As a USER, I should be able to change my order because I made a mistake
 7. As a USER, I should be able to see my CURRENT/PENDING ORDRES because I can VERIFY what I have ordered
 8. As a USER, I want to see SUMMARY of order before committing to it (price, details, quantity, etc.)
 9. As a USER, I should NOT be able to submit an EMPTY order
 
RESTAURANT:
 1. As the RESTAURANT, I want to VIEW all PENDING ORDERS in ORDER of REQUEST
 2. As the RESTAURANT, I want to VIEW all PREVIOUS ORDERS
 3. As the RESTAURANT, I want to be able to CHECK OFF COMPLETED ORDERS
 4. As the RESTAURANT, I want to know WHEN the food will be PICKED UP because it allows me to prioritize my cooking order. 
 

STRETCH:
 1. As a USER, I want to be able to SPECIFY INSTRUCTIONS about food (preferences/allergies)
 2. As a USER, I want to know the restaurant LOCATION and CONTACT DETAILS (STRETCH: google maps api)
 3. As a USER, I want to see food REVIEWS



## PLANNED ROUTES

 1. Home page (client side)
    - GET "/"
      - Just needs styling
      - Will link to other pages via Nav Bar
 2. Menu (client side)
    - GET "/menu"
      - will list items available for purchase
      - pulls foods table
    - Front-end > Cart (ADD) 
      - not leaving the page, storing into temporary db (object)
      - Local storage only takes in strings - maybe simpler than cookies?
 3. Cart (client side)
    - GET "/checkout"
    - Front End > Client edits item (EDIT) 
      - manage in front end using local storage
    - Front End > Client deletes item (DELETE) 
      - manage in front end using local storage
    - POST > "/confirmation" (ADD) 
      - post to database <- submitting the order
    - POST > Twilio SMS
 4. Confirmation page (client side)
    - GET "/confirmation"
 5. My Orders (client side) 
    - GET "/my-orders"
      - Gets previous order(s) and any current pending orders
    - POST > Cart (ADD) 
      - Order again! (STRETCH)
 6. Orders (restaurant side)
    - GET "/restaurant"
    - POST > My Orders & Confirmation Page (update time) (EDIT)
    - POST > TWILIO (update time)






