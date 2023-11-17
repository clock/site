# Skinport Market Bot
![Alt Text](https://cdn.discordapp.com/attachments/871653775507591208/1174929149530488852/Skinport_Output.png?ex=6569610a&is=6556ec0a&hm=6b356909260bcf76c0e0a93ada6675b05e9d59660b11659e484993a4009b853f&)
Many video games have an in game market place, but none come close to the level that Counter Strike has. Counter Strike is unique as you can cash out virtual item's for real money easily, as well as trade these items for higher or lower priced ones. This creates a supply and demand chain that keeps the market afloat (still very volatile but relatively consistent for what it is). This is why it was possible for me to make a 700% increase on my investment. Some websites are used for trading skins for real money, but the one I targeted was Skinport.
## Issues With Steam Trading Post 2018

Back in March of 2018, Valve (owners of the Counter Strike and Steam) introduced a new system on top of their trading inventory infostructure called a "trade cooldown". Basically after trading that item is locked for 7 days and is not allowed to leave your inventory. This removed users ability's to make a profit without involving real money. After this happened my plans on making a bot hit a stand still.

## Counter Strike 2 Announcement 

On March 22 of 2023 Valve announced Counter Strike 2. As an adult that grew up on the Counter Strike IP I was excited to hear about this, but as someone that had more coding knowledge then he did in 2018 I thought I could capitalize on it; insert Skinport.

Skinport unlike other sites holds onto your items after purchasing in its own inventory system, which somewhat avoids trade cool downs (they are still there, you just don't need to worry about them since you can instantly sell an item after buying). With finding this out and the release of CS2 I got to coding.

## How It Works

It's fairly simple actually! Skinport has an API that developers are allowed to use to track prices of skins. In this API they also have a WebSocket to show all the items being listed in real time. Using this and a chrome extension that connects to a C++ client that connects to the real time data you can get all the information you need to see if an item is "profitable".

The chrome extension is used to get passed CORS errors when using the "add to cart" and other API's that Skinport doesn't publicly display (I got them by staring at the networking tab in dev tools). Using these combined I check the price of the item, if the price is crashing based on the last 10 sales removing outliers, comparing suggested Skinport price to the average price, if the float value is low enough to be desirable, and overall if I think it could sell.

![Alt Text](https://cdn.discordapp.com/attachments/871653775507591208/1174929149983461376/Skinport_Sheets.png?ex=6569610a&is=6556ec0a&hm=11df5a8ef5b72aca7e5ef4f3c38dbd01f6ec3b665de807cb6dbb9bbaec99f14f&)
Items purchased are usually 25% less then the suggested price, which I then resell for 10% less. They take more time then the 25% ones but eventually they sell.






