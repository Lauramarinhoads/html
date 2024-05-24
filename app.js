
const mysql = require('mysql2');
const express = require ('express');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended:true}));

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'login'
});


db.connect((error) =>{
if(error){
  console.log("Erro ao conectar com o banco de dados")
} else{
    console.log ("Conectado ao Mysql");
}
});


app.get("/", (req, res)=>{
   res.sendFile(__dirname + '/login.html')
});

app.post("/login", (req, res) =>{
    const username = req.body.usuario
    const password = req.body.senha
    //Cadastrou errado no banco a coluna username
    db.query('select password from user where username = ?', [username], (error, results) => {
      if(results.length>0){
       const passwordDB= results[0].password;
       const userdDB = results[0].username;

       if(password === passwordDB){
        console.log("Bem vinda Isadora")
        res.redirect("/welcome.html")
       }  else{
        console.log("Senha não reconhecida")
        res.redirect("/Senha_errada.html")
       }

      }else {
        console.log('usuário não cadastrado!')
        res.redirect("/cadastrar.html")
      }
    })

});

app.listen(port, ()=> {
    console.log(`Servidor rodando no endereço: http://localhost:${port}`)
});


