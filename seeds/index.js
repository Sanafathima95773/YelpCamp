const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];
const images = [
    {
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
        filename: "camp1"
    },
    {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200",
        filename: "camp2"
    },
    {
        url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200",
        filename: "camp3"
    },
    {
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200",
        filename: "camp4"
    },
    {
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
        filename: "camp5"
    }
];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '6a43ecd46949b540a0f01e3a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [sample(images)]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})