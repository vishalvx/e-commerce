import express, { json } from "express";
import "./config.js";
import { connectDb } from "./db.js";
//import Router and rename it
import products from "./routes/productsRoutes.js"


// making instance
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
// Routes 

app.use("/api",products)




const startApp = async () => {
  try {
    // create home route
    app.get("/", (request, respone) => {
      respone.send({
        data: "Hello World!!",
      });
    });

    app.listen(process.env.PORT, () => {
      console.log(`Backend running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

connectDb().then(() => {
  startApp();
});
