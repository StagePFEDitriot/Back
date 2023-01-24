const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan")
const path = require('path');
const cron = require('node-cron')
const puppeteer = require('puppeteer')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocument = require("./swagger.json")
const swaggerUi = require("swagger-ui-express");

const userRoute=require('./routes/user')
const AuthentificationRoute=require('./routes/authentification')
const LivreurRoute=require('./routes/livreur')
const PanierRoute=require('./routes/panier')
const ProduitRoute =require('./routes/produit') 
const CommandeRoute =require('./routes/commande') 
const CommentaireRoute =require('./routes/commentaire') 
//mongoose.connect('mongodb://mongo_db:27017/dressing',{useNewUrlParser: true, useUnifiedTopology: true}) // 27017 default port for mongo
//mongoose.connect('mongodb://localhost:27017/dressing',{useNewUrlParser: true, useUnifiedTopology: true}) // 27017 default port for mongo//
mongoose.connect(process.env.DB_URL) 


const db = mongoose.connection
 
db.on('error',(err) => {
    console.log(err) 
    console.log("Error")
})


db.once('open', () => {
    console.log('Database Connection succesfully')
})

const app = express();

app.use(morgan('dev'))

app.use(express.urlencoded({ extended: false }));    
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));////////


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Dressing API",
        description: "Dressing API Information",
        contact: {
          name: "Dressing"
        },
        servers: ["http://localhost:3000"]
      }
    },
    // ['.routes/*.js']
    apis:['./routes/*.js']
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const port = process.env.PORT || 3000

app.listen(port, () => {
    //app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log(`Server is running on port`,port);
}); 

app.use('/authentification', AuthentificationRoute)//swagger done
app.use('/user', userRoute)
app.use('/livreur', LivreurRoute)
app.use('/panier', PanierRoute)
app.use('/produit', ProduitRoute)
app.use('/commande', CommandeRoute)
app.use('/commentaire', CommentaireRoute)
