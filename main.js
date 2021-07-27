/*
created by huda0209
ip return

main.js
 
ran by node.js
2021-7-26
*/

const fs = require("fs");
const express = require("express");
const bodyParser = require('body-parser');
const dateUtils = require("date-utils");

const log = require("./src/util/logFile");
log.info(`This service is standing now...`);

const ipreturn = require("./src/route/ipreturn/ipreturn");
const status = require("./src/route/status/status");
const config = require("./src/config/config");
const package = require("./package.json");

const app = express();

process.on("exit", ()=>{
    log.info(`service end.`);
    log.hasLastLog();
    console.log("Exitting...");
})
process.on("SIGINT", ()=>{
    process.exit(0);
});


const serviceStatus = {
    system : "red",
    responce : "red"
}
if(!config.exist(true)) process.exit();
const messageData = config.loadConfig("message.json");
const systemData = config.loadConfig("system.json");
const userData = config.loadConfig("user.json");

if(systemData.protocol=="https"){
    if(!fs.existsSync('./keys/private.pem') || !fs.existsSync('./keys/cert.pem')){
        log.error(`{red}Cannot find "private key" or "server certificate".{reset} Please set files in keys directory.`);
        process.exit(0);
    }
    require('https').createServer({
        key: fs.readFileSync('./keys/private.pem'),
        cert: fs.readFileSync('./keys/cert.pem'),
    }, app)
    .listen(systemData.port, ()=>{
        serviceStatus.responce = "green";
        log.info(`IP RETURN is ready.\n        ver. {green}${package.version}{reset}\n        protocol : {green}https{reset}\n        start up : {green}${(new Date()).toFormat('DDD MMM DD YYYY HH24:MI:SS')}{reset}\n        repository : {green}${package.repository}{reset}\n        created by {green}${package.author}{reset}\n`);
    });
}else if(systemData.protocol=="http"){
    app.listen(systemData.port, ()=>{
        serviceStatus.responce = "green";
        log.info(`IP RETURN is ready.\n        ver. {green}${package.version}{reset}\n        protocol : {green}http{reset} \n        start up : {green}${(new Date()).toFormat('DDD MMM DD YYYY HH24:MI:SS')}{reset}\n        repository : {green}${package.repository}{reset}\n        created by {green}${package.author}{reset}\n`);
    });
}else{
    log.error(`{red}Invalid protocol.{reset} Please set protocol {green}"https"{reset} or {green}"http"{reset}.`);
    process.exit(0);
}

app.use(bodyParser.json({extended: true}));
app.use('/',ipreturn);
app.use('/status',status);

exports.serviceStatus = serviceStatus;
serviceStatus.system = "green";
