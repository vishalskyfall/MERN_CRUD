const mongoose = require("mongoose");

const db =
  "mongodb+srv://root_mern:root_mern@cluster0.b8jog.mongodb.net/MERN_stack?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e.message));
