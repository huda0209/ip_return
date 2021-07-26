/*
created by huda0209
ip return

ipreturn.js
 
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
    const date = (new Date()).toFormat('DDD MMM DD YYYY HH24:MI:SS');
    if(main.serviceStatus.system != "green"){
        res.status(503).send(messageTemplate.serviceDown);
        log.info(`Unknown User(${req.ip}) accessed for main(ip return). Method: Get, ResponceCode: 503, ResponceBody: ${messageTemplate.serviceDown}`);
        return;
    }
    
    const sessionId = req.headers.sessionid

    if(!sessionId){
        res.status(400).send(messageTemplate.NoSessionID);
        log.info(`Unknown User(${req.ip}) accessed for main(ip return). Method: Get, ResponceCode: 400, ResponceBody: ${messageTemplate.NoSessionID}`);
        return;
    }

    if(!auth.check(sessionId)){
        res.status(403).send(messageTemplate.UnKnownSessionId);
        log.info(`Unknown User(${req.ip}) accessed for main(ip return). Method: Get, ResponceCode: 403, ResponceBody: ${messageTemplate.UnKnownSessionId}`);
        return;
    }
    const user = auth.user(sessionId);
    const headIP = req.ip;
    let startOfIpv4 = null;
    const resultData = {
        userName : user[0],
        ip : "",
        date : date
    }

    for(let i=0;i<headIP.length;i++){
        if(!isNaN(Number(headIP[i]))){
            startOfIpv4 = i;
            break;
        }
    }

    if(startOfIpv4==null){
        res.status(500).send(messageTemplate.CantformatIPv4);
        log.info(`${user[0]}(${req.ip}) accessed for main(ip return). Method: Get, ResponceCode: 500, ResponceBody: ${messageTemplate.CantformatIPv4}`);
        return;
    }
    resultData.ip = headIP.slice(startOfIpv4, headIP.length);
    res.status(200).json(resultData);
    log.info(`${user[0]}(${req.ip}) accessed for main(ip return). Method: Get, ResponceCode: 200, ResponceBody: \n${JSON.stringify(resultData, null, 2)}`);
})


router.post('/',(req,res,next)=>{
    if(main.serviceStatus.system != "green"){
        res.status(503).send(messageTemplate.serviceDown);
        log.info(`Unknown User(${req.ip}) accessed for main(ip return). Method: Post, ResponceCode: 503, ResponceBody: ${messageTemplate.serviceDown}`);
        return;
    }
    res.status(405).send(messageTemplate.NotAllowMethod);
    log.info(`Unknown User(${req.ip}) accessed for main(ip return). Method: Post, ResponceCode: 405, ResponceBody: ${messageTemplate.NotAllowMethod}`);
})

router.put('/',(req,res,next)=>{
    if(main.serviceStatus.system != "green"){
        res.status(503).send(messageTemplate.serviceDown);
        log.info(`Unknown User(${req.ip}) accessed for main(ip return). Method: Put, ResponceCode: 503, ResponceBody: ${messageTemplate.serviceDown}`);
        return;
    }
    res.status(405).send(messageTemplate.NotAllowMethod);
    log.info(`Unknown User(${req.ip}) accessed for main(ip return). Method: Put, ResponceCode: 405, ResponceBody: ${messageTemplate.NotAllowMethod}`);
})

router.delete('/',(req,res,next)=>{
    if(main.serviceStatus.system != "green"){
        res.status(503).send(messageTemplate.serviceDown);
        log.info(`Unknown User(${req.ip}) accessed for main(ip return). Method: Delete, ResponceCode: 503, ResponceBody: ${messageTemplate.serviceDown}`);
        return;
    }
    res.status(405).send(messageTemplate.NotAllowMethod);
    log.info(`Unknown User(${req.ip}) accessed for main(ip return). Method: Delete, ResponceCode: 405, ResponceBody: ${messageTemplate.NotAllowMethod}`);
})


module.exports=router;