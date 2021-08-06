const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Aryan:09876Arya@cluster0.h0l2c.mongodb.net/ToDo?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

mongoose.connection.on("error", (err) => {
    console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
    console.log("Database Connected");
});