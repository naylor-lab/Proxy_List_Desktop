"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_cache_1 = __importDefault(require("@cacheable/node-cache"));
var readline_1 = __importDefault(require("readline"));
var baileys_1 = __importStar(require("@whiskeysockets/baileys"));
var pino_1 = __importDefault(require("pino"));
var qrcode = require('qrcode-terminal');
var logger = (0, pino_1.default)({
    level: "trace",
    transport: {
        targets: [
            {
                target: "pino-pretty", // pretty-print for console
                options: { colorize: true },
                level: "trace",
            },
            {
                target: "pino/file", // raw file output
                options: { destination: './wa-logs.txt' },
                level: "trace",
            },
        ],
    },
});
logger.level = 'trace';
var doReplies = process.argv.includes('--do-reply');
var usePairingCode = process.argv.includes('--use-pairing-code');
// external map to store retry counts of messages when decryption/encryption fails
// keep this out of the socket itself, so as to prevent a message decryption/encryption loop across socket restarts
var msgRetryCounterCache = new node_cache_1.default();
var onDemandMap = new Map();
// Read line interface
var rl = readline_1.default.createInterface({ input: process.stdin, output: process.stdout });
var question = function (text) { return new Promise(function (resolve) { return rl.question(text, resolve); }); };
// start a connection
var startSock = function () { return __awaiter(void 0, void 0, void 0, function () {
    function getMessage(key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Implement a way to retreive messages that were upserted from messages.upsert
                // up to you
                // only if store is present
                return [2 /*return*/, baileys_1.proto.Message.create({ conversation: 'test' })];
            });
        });
    }
    var _a, state, saveCreds, _b, version, isLatest, sock, phoneNumber, code, sendMessageWTyping;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, baileys_1.useMultiFileAuthState)('baileys_auth_info')
                // fetch latest version of WA Web
            ];
            case 1:
                _a = _c.sent(), state = _a.state, saveCreds = _a.saveCreds;
                return [4 /*yield*/, (0, baileys_1.fetchLatestBaileysVersion)()];
            case 2:
                _b = _c.sent(), version = _b.version, isLatest = _b.isLatest;
                console.log("using WA v".concat(version.join('.'), ", isLatest: ").concat(isLatest));
                sock = (0, baileys_1.default)({
                    version: version,
                    logger: logger,
                    auth: {
                        creds: state.creds,
                        /** caching makes the store faster to send/recv messages */
                        keys: (0, baileys_1.makeCacheableSignalKeyStore)(state.keys, logger),
                    },
                    msgRetryCounterCache: msgRetryCounterCache,
                    generateHighQualityLinkPreview: true,
                    // ignore all broadcast messages -- to receive the same
                    // comment the line below out
                    // shouldIgnoreJid: jid => isJidBroadcast(jid),
                    // implement to handle retries & poll updates
                    getMessage: getMessage
                });
                if (!(usePairingCode && !sock.authState.creds.registered)) return [3 /*break*/, 5];
                return [4 /*yield*/, question('Please enter your phone number:\n')];
            case 3:
                phoneNumber = _c.sent();
                return [4 /*yield*/, sock.requestPairingCode(phoneNumber)];
            case 4:
                code = _c.sent();
                console.log("Pairing code: ".concat(code));
                _c.label = 5;
            case 5:
                sendMessageWTyping = function (msg, jid) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, sock.presenceSubscribe(jid)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, (0, baileys_1.delay)(500)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, sock.sendPresenceUpdate('composing', jid)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, (0, baileys_1.delay)(2000)];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, sock.sendPresenceUpdate('paused', jid)];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, sock.sendMessage(jid, msg)];
                            case 6:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                // the process function lets you process all events that just occurred
                // efficiently in a batch
                sock.ev.process(
                // events is a map for event name => event data
                function (events) { return __awaiter(void 0, void 0, void 0, function () {
                    var update, connection, lastDisconnect, qr, _a, chats, contacts, messages, isLatest_1, progress, syncType, upsert, _i, _b, msg, text, messageId, messageId, _c, _d, _e, key, update, pollCreation, _f, _g, contact, newUrl, _h;
                    var _j, _k, _l, _m, _o, _p, _q, _r, _s;
                    return __generator(this, function (_t) {
                        switch (_t.label) {
                            case 0:
                                // something about the connection changed
                                // maybe it closed, or we received all offline message or connection opened
                                if (events['connection.update']) {
                                    update = events['connection.update'];
                                    connection = update.connection, lastDisconnect = update.lastDisconnect, qr = update.qr;
                                    if (qr) {
                                        qrcode.generate(qr, { small: true });
                                    }
                                    if (connection === 'close') {
                                        // reconnect if not logged out
                                        if (((_k = (_j = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _j === void 0 ? void 0 : _j.output) === null || _k === void 0 ? void 0 : _k.statusCode) !== baileys_1.DisconnectReason.loggedOut) {
                                            startSock();
                                        }
                                        else {
                                            console.log('Connection closed. You are logged out.');
                                        }
                                    }
                                    console.log('connection update', update);
                                }
                                if (!events['creds.update']) return [3 /*break*/, 2];
                                return [4 /*yield*/, saveCreds()];
                            case 1:
                                _t.sent();
                                _t.label = 2;
                            case 2:
                                if (events['labels.association']) {
                                    console.log(events['labels.association']);
                                }
                                if (events['labels.edit']) {
                                    console.log(events['labels.edit']);
                                }
                                if (events.call) {
                                    console.log('recv call event', events.call);
                                }
                                // history received
                                if (events['messaging-history.set']) {
                                    _a = events['messaging-history.set'], chats = _a.chats, contacts = _a.contacts, messages = _a.messages, isLatest_1 = _a.isLatest, progress = _a.progress, syncType = _a.syncType;
                                    if (syncType === baileys_1.proto.HistorySync.HistorySyncType.ON_DEMAND) {
                                        console.log('received on-demand history sync, messages=', messages);
                                    }
                                    console.log("recv ".concat(chats.length, " chats, ").concat(contacts.length, " contacts, ").concat(messages.length, " msgs (is latest: ").concat(isLatest_1, ", progress: ").concat(progress, "%), type: ").concat(syncType));
                                }
                                if (!events['messages.upsert']) return [3 /*break*/, 13];
                                upsert = events['messages.upsert'];
                                console.log('recv messages ', JSON.stringify(upsert, undefined, 2));
                                if (!!upsert.requestId) {
                                    console.log("placeholder message received for request of id=" + upsert.requestId, upsert);
                                }
                                if (!(upsert.type === 'notify')) return [3 /*break*/, 13];
                                _i = 0, _b = upsert.messages;
                                _t.label = 3;
                            case 3:
                                if (!(_i < _b.length)) return [3 /*break*/, 13];
                                msg = _b[_i];
                                if (!(((_l = msg.message) === null || _l === void 0 ? void 0 : _l.conversation) || ((_o = (_m = msg.message) === null || _m === void 0 ? void 0 : _m.extendedTextMessage) === null || _o === void 0 ? void 0 : _o.text))) return [3 /*break*/, 12];
                                text = ((_p = msg.message) === null || _p === void 0 ? void 0 : _p.conversation) || ((_r = (_q = msg.message) === null || _q === void 0 ? void 0 : _q.extendedTextMessage) === null || _r === void 0 ? void 0 : _r.text);
                                if (!(text == "requestPlaceholder" && !upsert.requestId)) return [3 /*break*/, 5];
                                return [4 /*yield*/, sock.requestPlaceholderResend(msg.key)];
                            case 4:
                                messageId = _t.sent();
                                console.log('requested placeholder resync, id=', messageId);
                                _t.label = 5;
                            case 5:
                                if (!(text == "onDemandHistSync")) return [3 /*break*/, 7];
                                return [4 /*yield*/, sock.fetchMessageHistory(50, msg.key, msg.messageTimestamp)];
                            case 6:
                                messageId = _t.sent();
                                console.log('requested on-demand sync, id=', messageId);
                                _t.label = 7;
                            case 7:
                                if (!(text == "testZenkai")) return [3 /*break*/, 9];
                                return [4 /*yield*/, sendMessageWTyping({ text: 'Hello there!' }, msg.key.remoteJid)];
                            case 8:
                                _t.sent();
                                _t.label = 9;
                            case 9:
                                if (!(!msg.key.fromMe && doReplies && !(0, baileys_1.isJidNewsletter)((_s = msg.key) === null || _s === void 0 ? void 0 : _s.remoteJid))) return [3 /*break*/, 12];
                                console.log('replying to', msg.key.remoteJid);
                                return [4 /*yield*/, sock.readMessages([msg.key])];
                            case 10:
                                _t.sent();
                                return [4 /*yield*/, sendMessageWTyping({ text: 'Hello there!' }, msg.key.remoteJid)];
                            case 11:
                                _t.sent();
                                _t.label = 12;
                            case 12:
                                _i++;
                                return [3 /*break*/, 3];
                            case 13:
                                // messages updated like status delivered, message deleted etc.
                                if (events['messages.update']) {
                                    console.log(JSON.stringify(events['messages.update'], undefined, 2));
                                    for (_c = 0, _d = events['messages.update']; _c < _d.length; _c++) {
                                        _e = _d[_c], key = _e.key, update = _e.update;
                                        if (update.pollUpdates) {
                                            pollCreation = {} // get the poll creation message somehow
                                            ;
                                            if (pollCreation) {
                                                console.log('got poll update, aggregation: ', (0, baileys_1.getAggregateVotesInPollMessage)({
                                                    message: pollCreation,
                                                    pollUpdates: update.pollUpdates,
                                                }));
                                            }
                                        }
                                    }
                                }
                                if (events['message-receipt.update']) {
                                    console.log(events['message-receipt.update']);
                                }
                                if (events['messages.reaction']) {
                                    console.log(events['messages.reaction']);
                                }
                                if (events['presence.update']) {
                                    console.log(events['presence.update']);
                                }
                                if (events['chats.update']) {
                                    console.log(events['chats.update']);
                                }
                                if (!events['contacts.update']) return [3 /*break*/, 19];
                                _f = 0, _g = events['contacts.update'];
                                _t.label = 14;
                            case 14:
                                if (!(_f < _g.length)) return [3 /*break*/, 19];
                                contact = _g[_f];
                                if (!(typeof contact.imgUrl !== 'undefined')) return [3 /*break*/, 18];
                                if (!(contact.imgUrl === null)) return [3 /*break*/, 15];
                                _h = null;
                                return [3 /*break*/, 17];
                            case 15: return [4 /*yield*/, sock.profilePictureUrl(contact.id).catch(function () { return null; })];
                            case 16:
                                _h = _t.sent();
                                _t.label = 17;
                            case 17:
                                newUrl = _h;
                                console.log("contact ".concat(contact.id, " has a new profile pic: ").concat(newUrl));
                                _t.label = 18;
                            case 18:
                                _f++;
                                return [3 /*break*/, 14];
                            case 19:
                                if (events['chats.delete']) {
                                    console.log('chats deleted ', events['chats.delete']);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/, sock];
        }
    });
}); };
startSock();
