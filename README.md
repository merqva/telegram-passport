# Telegram Passport

### Parse/Decrypt incoming [Telegram Passport](https://core.telegram.org/passport) data<br/><br/>

#### \* Note: All the type definitions on this library are in compliance with those defined in the Telegram API specification<br/><br/>

## What does this library do?

### Provided your Bot's Private Key, this libary will:

- Decrypt the [EncryptedCredentials](https://core.telegram.org/bots/api#encryptedcredentials) object from the `credentials` field in [PassportData](https://core.telegram.org/bots/api#passportdata)
- Parse the fields on each [EncryptedPassportElement](https://core.telegram.org/bots/api#encryptedpassportelement) from the `data` field in PassportData
- Decrypt de `data` field (if present) from the EncryptedPassportElement
- Validate the integrity of the decryted data

## What doesn't this library do?

- Get the encrypted files corresponding to the requested fields<br/>\* Download the encrypted files using the [getFile](https://core.telegram.org/bots/api#getfile) API endpoint, then use the `decryptData` method to decrypt them
  <br/><br/>

## Usage

- First, create a new instance of the `TelegramPassport` class

```
const telegramPassport = new TelegramPassport(<bot_private_key>);
```

- Parse and decryp de data of all the elements shared with the bot

```
const data = telegramPassport.decryptPassportData(update.message.passport_data);
```

#### \* `update` is the object representing the incoming [Update](https://core.telegram.org/bots/api#update) that was sent to the Bot<br/><br/>

- Decryting files

```
/*
get the data corresponding to the file you want to decryp
for example, the front side of the id card
*/

const id_frontSide = data.identity_card.front_side;

// download the file using the getFile API endpoint

...

// decryp the file

const file = telegramPassport.decryptData(
  <downloaded_file_data>,
  id_fronSide.secret,
  id_fronSide.file_hash,
);
```

- Depending on the fields you requested, you might not need to process the whole `PassportData` object; for example, the "phone_number" and "email" fields are not encrypted. Thus, you only need to decrypt the credentials to obtain the nonce, then, you can get "phone_number" and "email" from `passport_data.data`

```
/*
in this case, data will look like this

data: [
  {
    "type": "phone_number",
    "phone_number": "XXXXXXXXXXX",
    "hash": "the_base64-encoded_hash",
  },
  {
    "type": "email",
    "email": "johndoe@example.com",
    "hash": "the_base64-encoded_hash"
  },
]
*/

// decrypt the credentials

const credentials = telegramPassport.decryptPassportCredentials(
  update.message.passport_data.credentials,
);
```

#### \* `update` is the object representing the incoming [Update](https://core.telegram.org/bots/api#update) that was sent to the Bot<br/><br/>

## What can be inproved?

- The type "handling" in the `decryptData` method<br/>\* Need a TS guru that can give me a hand with that, go check the code<br/><br/>

## Found a bug?

### Open an [issue](https://github.com/merqva/telegram-passport/issues) (PRs are welcome)

#### \* be patient, I might be busy<br/><br/>

## Stay in touch

- Author - [Yoel Navas](mailto:yn4v4s@gmail.com)
- Website - [merqva.com](https://merqva.com/)
