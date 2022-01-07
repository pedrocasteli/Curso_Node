const fs = require("fs");
const http = require("http");
const url = require("url");

//Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

//Non-blocking, asynchronous
//O segundo parâmetro da maioria dos métodos assíncronos é uma função callback, que vai ser chamada quando o processo terminar.
//Geralmente, nessas funções, o primeiro parâmetro que ela recebe é o erro
//=>Dentro de uma estrutura assíncrona, o código é executado de forma síncrona, um depois do outro
// fs.readFile("./txt/start.txt", "utf-8", (erro, dados1) => {
//     console.log(dados1);
//     fs.readFile(`./txt/${dados1}.txt`, "utf-8", (erro, dados2) => {
//         console.log(dados2);
//         fs.readFile(`./txt/append.txt`, "utf-8", (erro, dados3) => {
//             console.log(dados3);

//             fs.writeFile(
//                 "./txt/final.txt",
//                 `${dados2}\n${dados3}`,
//                 "utf-8",
//                 (erro) => {
//                     console.log("Your file has been written!");
//                 }
//             );
//         });
//     });
// });
// console.log("Will read file!");

//***********************************************************************************
const dados = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(dados);

const server = http.createServer((req, res) => {
    const nomeCaminho = req.url;

    if (nomeCaminho === "/") {
        res.end("---------\nINICIAL\n----------");
    } else if (nomeCaminho === "/overview") {
        res.end("----------\nOVERVIEW\n----------");
    } else if (nomeCaminho === "/product") {
        res.end("----------\nPRODUCT\n----------");
    } else if (nomeCaminho === "/api") {
        res.writeHead(404, {
            "Content-type": "application/json",
        });
        res.end(dados);
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "meu-proprio-header": "Ola, mundo!",
        });
        res.end("<h1>PAGE NOT FOUND! =(</h1>");
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to requests on port 8000");
});
