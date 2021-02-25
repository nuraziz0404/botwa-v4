const wa = require("@open-wa/wa-automate");
const handle = require("./msg.js");

wa.create({
    useChrome: true,
    sessionId: "CRazyzBOT",
    authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
    blockCrashLogs: true,
    disableSpins: true,
    headless: false,
    killProcessOnBrowserClose: true,
    autoRefresh:true, //default to true
    safeMode: true,
    hostNotificationLang: 'PT_BR',
    logConsole: false,
    popup: true,
    qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
    chromiumArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--aggressive-cache-discard',
        '--disable-cache',
        '--disable-application-cache',
        '--disable-offline-load-stale-cache',
        '--disk-cache-size=0'
    ]
  }).then((client) => start(client));

function start(client) {
    client.onStateChanged((state) => {
        console.log(color('[~>>]', 'red'), state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
    });
  client.onMessage((message) => {
    //console.log('konten: ', message.body);
    client.sendSeen(message.from);
    client.simulateTyping(message.from, true).then(async () => {
      //console.log("new message: ", message.body);
      if (message.body === "tes") {
        client.reply(message.from, "masok", message.id);
      } else {
        handle(client, message);
      }
    });
  });
}
