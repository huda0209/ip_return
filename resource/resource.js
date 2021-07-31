/*
created by huda0209
ip return

resource.js
 
ran by node.js
2021-7-26
*/

/*
DON'T TOUCH!!
*/

module.exports =  {
    "message.json" : {
        pass : "./config/message.json",
        canEmpty : true,
        keys : {
            serviceDown : {
                replace : true,
                default : "Service is down now."
            },
            NotAllowMethod : {
                replace : true,
                default : "This http method don't allow."
            },
            NoSessionID : {
                replace : true,
                default : "You didn't set sessionID on request head."
            },
            UnKnownSessionId : {
                replace : true,
                default : "This session id isn't known."
            },
            CantformatIPv4 : {
                replace : true,
                default : "Your IP Address cannot format ipv4."
            }
        }
    },

    "system.json" : {
        pass : "./config/system.json",
        canEmpty : false,
        keys : {
            port : {
                replace : false,
                default : ""
            },
            protocol : {
                replace : true,
                default : "https"
            }
        }
    },

    "user.json" : {
        pass : "./config/user.json",
        canEmpty : true,
        keys : {}
    }
}
