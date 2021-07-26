/*
created by huda0209
ip return

status.js
 
ran by node.js
2021-7-26
*/

const router = require("express").Router();
const log = require("../../util/logFile");
const auth = require("../../auth/auth");
const config = require("../../config/config");
const main = require("../../../main");
const messageTemplate = config.loadConfig("message.json");

router.get('/',async(req,res)=>{
    
    if(main.serviceStatus.system != "green"){
        res.status(503).send(messageTemplate.serviceDown);
        log.info(`Unknown User(${req.ip}) accessed for status. Method: Get, ResponceCode: 503, ResponceBody: ${messageTemplate.serviceDown}`);
        return;
    }
    
    const sessionId = req.headers.sessionid

    if(!sessionId){
        res.status(400).send(messageTemplate.NoSessionID);
        log.info(`Unknown User(${req.ip}) accessed for status. Method: Get, ResponceCode: 400, ResponceBody: ${messageTemplate.NoSessionID}`);
        return;
    }

    if(!auth.check(sessionId)){
        res.status(403).send(messageTemplate.UnKnownSessionId);
        log.info(`Unknown User(${req.ip}) accessed for status. Method: Get, ResponceCode: 403, ResponceBody: ${messageTemplate.UnKnownSessionId}`);
        return;
    }
    
    res.status(200).json(main.serviceStatus);
    log.info(`Unknown User(${req.ip}) accessed for status. Method: Get, ResponceCode: 200, ResponceBody: \n${JSON.stringify(main.serviceStatus, null, 2)}`);
})




router.post('/',(req,res,next)=>{
    if(main.serviceStatus.system != "green"){
        res.status(503).send(messageTemplate.serviceDown);
        log.info(`Unknown User(${req.ip}) accessed for status. Method: Post, ResponceCode: 503, ResponceBody: ${messageTemplate.serviceDown}`);
        return;
    }
    res.status(405).send(messageTemplate.NotAllowMethod);
    log.info(`Unknown User(${req.ip}) accessed for status. Method: Post, ResponceCode: 405, ResponceBody: ${messageTemplate.NotAllowMethod}`);
})

router.put('/',(req,res,next)=>{
    if(main.serviceStatus.system != "green"){
        res.status(503).send(messageTemplate.serviceDown);
        log.info(`Unknown User(${req.ip}) accessed for status. Method: Put, ResponceCode: 503, ResponceBody: ${messageTemplate.serviceDown}`);
        return;
    }
    res.status(405).send(messageTemplate.NotAllowMethod);
    log.info(`Unknown User(${req.ip}) accessed for status. Method: Put, ResponceCode: 405, ResponceBody: ${messageTemplate.NotAllowMethod}`);
})

router.delete('/',(req,res,next)=>{
    if(main.serviceStatus.system != "green"){
        res.status(503).send(messageTemplate.serviceDown);
        log.info(`Unknown User(${req.ip}) accessed for status. Method: delete, ResponceCode: 503, ResponceBody: ${messageTemplate.serviceDown}`);
        return;
    }
    res.status(405).send(messageTemplate.NotAllowMethod);
    log.info(`Unknown User(${req.ip}) accessed for status. Method: delete, ResponceCode: 405, ResponceBody: ${messageTemplate.NotAllowMethod}`);
})


module.exports=router;