var aesjs = require('aes-js');

// var cle = "toto";

/* Encryption & decryption */

function encrypt(text, cle) {
    if (text === "N/A") {
	return text;
    }
    var key = aesjs.utils.utf8.toBytes(adaptKey(cle));

    // Convert text to bytes
    var textBytes = aesjs.utils.utf8.toBytes(text);

    // The counter is optional, and if omitted will begin at 1
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);

    // To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
}

function decrypt(text, cle) {
    if (text === "N/A") {
        return text;
    } else {
        var key = aesjs.utils.utf8.toBytes(adaptKey(cle));

        // When ready to decrypt the hex string, convert it back to bytes
        var encryptedBytes = aesjs.utils.hex.toBytes(text);

        // The counter mode of operation maintains internal state, so to
        // decrypt a new instance must be instantiated.
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);

        // Convert our bytes back into text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        return decryptedText;
    }
}

function adaptKey(key) {
    // Use a 32 key
    var base = "abcdefghijklmnopqrstuvwxyz123456";
    if (key.toString().length >= 31) {
        // if the key is 16 characters or longer just return the extraction of the 16 max
        return key.substring(0, 31);
    }
    // if the key is shorter than 16, add the number of characters required from the base to the key (starting by the end)
    return key + base.substring(key.toString().length);
}

function toHex(str) {
    var tab = [];
    for (var n = 0, l = str.length; n < l; n++) {
        // transform the decimal value of the character into hex
        var hex = Number(str.charCodeAt(n) * 2).toString(16);
        tab.push(hex);
    }
    // concat table values to a string
    return tab.join('');
}

function fromHex(str) {
    var hex = str.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        // transform each pair into the corresponding ascii char
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16) / 2);
    }
    return str;
}

function genMatrix(len, n) {
    var i, row, delta = 2 * (n - 1);
    // Instanciate n rows table containing maps of char positions from the original string
    var rows = Array.apply(null, Array(n)).map(function () { return [] });
    for (i = 0; i < len; i++) {
        // determining the potential row where the letter will be
        row = i % delta;
        // calculate the actual row
        r = row < (n - 1) ? row : delta - row;
        rows[r].push(i);
    }
    // generating the final table
    return [].concat.apply([], rows);
}


function shuffle(text) {
    if (text === "N/A") {
	return text;
    }
    text = text.toString();
    var i, len = text.length, mapped = genMatrix(len, 3), result = "";
    for (i = 0; i < len; i++)
        result += text.substr(mapped[i], 1); // repositioning the characters
    return toHex(result);
}

function unshuffle(text) {
    if (text === "N/A") {
	return text;
    }
    text = fromHex(text.toString());
    var i, len = text.length, mapped = genMatrix(len, 3), result = "";
    for (i = 0; i < len; i++) result += text.substr(mapped.indexOf(i), 1); // retrieve the original positions
    return result;
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
    shuffle: shuffle,
    unshuffle: unshuffle
};
