const { constants } = require("buffer");
const { clearLine } = require("readline");
const { decryptMedia } = require("@open-wa/wa-automate");
const jesonPath = './sticker.json';
var jeson = require(jesonPath);
const fs = require('fs')

module.exports = handle = async (client, message) => {
  //console.log("ini handle msg");
  /*
  jeson = {message};
  await fs.writeFile(jesonPath, JSON.stringify(jeson, null, 2), function writeJSON(err) {
    if (err) console.log(err);
    //console.log(jeson);
    console.log('writing to ' + jesonPath);
  });
  */
  const isQuotedImage = message.quotedMsg && message.quotedMsg.type === "image";
  const isQuotedVideo = message.quotedMsg && message.quotedMsg.type === "video";
  const isQuotedChat = message.quotedMsg && message.quotedMsg.type === "chat";
  const stickerMetadata = { pack: "CRazyzBOT", author: message.sender.pushname, keepScale: true };
  let { isMedia, mimetype } = message;
  const uaOverride = process.env.UserAgent;
  if(message.type == "image"){
    console.log('get image')
    if(message.caption)var body = message.caption
    else var body = ""
  }else if(message.type == "chat"){
    console.log('get chat')
    var body = message.body
  }
  console.log("body:", body)
  const isCmd = body.startsWith('/');
  const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
if(isCmd){
  client.sendSeen(message.from);
  client.simulateTyping(message.from, true)
  switch (command) {
    case "sticker":
    case "stiker":
    if(isQuotedImage || isMedia){
      const encryptMedia = isQuotedImage ? message.quotedMsg : message;
      const _mimetype = isQuotedImage ? message.quotedMsg.mimetype : mimetype;
      const mediaData = await decryptMedia(encryptMedia, uaOverride);
      const imageBase64 = `data:${_mimetype};base64,${mediaData.toString("base64")}`;
      client.sendImageAsSticker(message.from, imageBase64, stickerMetadata).then(() => {
        //console.log(`Sticker Processed for ${processTime(t, moment())} Second`);
      });
    }else{
        sticker(client, message)
    }
      break;
    default:
      sticker(client, message)
    // code block
  }
}
};

function sticker(client, message){
    client.reply(message.from, 'Kirim/reply gambar dengan caption "/sticker"', message.id)
    return
}
