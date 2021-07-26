/*
created by huda0209
ip return

auth.js
 
ran by node.js
2021-7-26
*/

const fs = require("fs");
const config = require("../config/config");
const userData = config.loadConfig("user.json");

exports.check = function(user_id){
    let hasPerms = false;
    for(const key in userData){
        if(userData[key] == user_id) hasPerms=true;
    }
    return hasPerms;
}

exports.user = function(user_id){
    let result=null
    for(const key in userData){
        if(userData[key] == user_id) result=[key,userData[key]];
    }
    return result;
}