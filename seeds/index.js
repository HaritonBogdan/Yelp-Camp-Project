const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => console.log(err));
async function main() {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log('Connected to db Yelp Camp');
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            image: 'https://source.unsplash.com/collection/483251',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat mollitia pariatur esse ad consectetur itaque magni tempore voluptatibus reiciendis praesentium rerum, fugiat dicta? Sint molestiae architecto facilis enim corrupti accusantium. Odio eos consequuntur doloribus, repudiandae, nihil ad tenetur illum, soluta laudantium laboriosam sequi nobis ea ullam iste ex dolores. Recusandae, assumenda atque. Dolorum vel excepturi aut doloremque cupiditate! In, vero.",
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})