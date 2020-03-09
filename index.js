// https://vk.cc/8E0H4r

var VK = require("VK-Promise"),
    vk = new VK(" token here ");

// Starting longpoll server
vk.longpoll.start();

var rus = "йцукенгшщзхъфывапролджэячсмитьбю.ё";
var eng = "qwertyuiop[]asdfghjkl;'zxcvbnm,./~";

var enabled = true;

vk.on("message", (event, msg) => {
    if(msg.out && msg.body.toLowerCase() == "!ruseng") return enabled = !enabled;
    if(!msg.out || !enabled) return;
    var newbody = "";

    msg.body.split("").forEach((item) => {
        if(rus.indexOf(item.toLowerCase()) > -1) newbody += item == item.toLowerCase() ? eng[rus.indexOf(item)] : eng[rus.indexOf(item)].toUpperCase();
        else if(eng.indexOf(item.toLowerCase()) > -1) newbody += item == item.toLowerCase() ? rus[eng.indexOf(item)] : rus[eng.indexOf(item)].toUpperCase();
        else newbody += item;
    });

    vk.messages.edit({ message_id: msg.id, peer_id: msg.peer_id, message: newbody });
})
