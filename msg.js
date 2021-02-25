const { constants } = require("buffer");
const { clearLine } = require("readline");
const { decryptMedia } = require("@open-wa/wa-automate");

module.exports = handle = async (client, message) => {
  //console.log("ini handle msg");
  const isQuotedImage = message.quotedMsg && message.quotedMsg.type === "image";
  const isQuotedVideo = message.quotedMsg && message.quotedMsg.type === "video";
  const isQuotedChat = message.quotedMsg && message.quotedMsg.type === "chat";
  const stickerMetadata = { pack: "CRazyzBOT", author: message.sender.pushname };
  
  const uaOverride = process.env.UserAgent;

  const isCmd = message.body.startsWith('/');
  const command = message.body.slice(1).trim().split(/ +/).shift().toLowerCase();
if(isCmd){
  switch (command) {
    case "sticker":
    case "stiker":
    if(isQuotedImage == true){
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
    client.reply(message.from, 'Reply gambar dengan pesan "/sticker"', message.id)
    return
}
