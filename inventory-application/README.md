# Character Inventory

This is a character inventory for a popular video game. Note that while this uses "characters", the application can easily be adapted to hold any kind of data such as that of a real store inventory or some other similar system. 

It shows various information about each character, how much of them are in the inventory, and a number rating to quantify the character's popularity and value, analogous to the buying price of a store item. 

Users can add new characters, update existing characters, remove characters, and look at character details. 

# Roadblocks

I was unaware that find() in mongoose returns a pointer (cursor), and so accessing a field directly will return undefined. However, findOne() will return a document and hence  you can access its fields directly