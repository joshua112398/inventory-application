# Character Inventory

This is a character inventory for a popular video game. Note that while this uses "characters", the application can easily be adapted to hold any kind of data such as that of a real store inventory or some other similar system. 

It shows various information about each character, how much of them are in the inventory, and a number rating to quantify the character's popularity and value, analogous to the buying price of a store item. 

Users can add new characters, update existing characters, remove characters, and look at character details. 

# Roadblocks

I was unaware that find() in mongoose returns a pointer (cursor), and so accessing a field directly will return undefined. However, findOne() will return a document and hence  you can access its fields directly.

I find myself having to look up syntax a lot in this project for Bootstrap, EJS, Express.js/Node.js, and Mongoose/MongoDB. I haven't used any of these extensively before in any previous projects so I don't have a lot of the syntax memorized yet. 

I was unsure what the best way was of storing images uploaded from the application client. I could either store it as binary data directly in the database, or store it on a disk somewhere and only upload the absolute path of the image to the database. The third simpler option was to simply ask users to paste a link to an image online instead of uploading one. I went with the database option since my project's scale isn't big enough to worry about performance and database size.

# Frontend Roadblocks

Using the <Link> component to go to another route that reuses the same component <A> will not remount the
component, causing it to retain the state that it had before but having the new prop that got passed to it. This caused a desync between the prop and the data it's trying to render since useEffect's fetch() does not run until after the first render. Thus, for the first render, it saw that the new prop is Character, but the state still contains info for a Vision. So when it tries to use the template for Character to render it, it doesn't see the info it needs from state and throws an error due to undefined fields.

To fix this, I created a new state that holds the previous prop Prop A and had the render method check this state instead of checking the passed prop (Prop B) directly. The state will retain Prop A, and so the first render will use the correct template Prop A for the old data, and then useEffect is finally run which will update the state to contain Prop B and fetch the new data which needs to use Prop B as a template, and so the second render will now use the new template with the new data. 

---

I had to use the useNavigate() hook from react router instead of Link so that I can delay the rerouting until a fetch promise has returned (for deleting objects). This is to ensure that the deleted object won't still be shown in the list of items.