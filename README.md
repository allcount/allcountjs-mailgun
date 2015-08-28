#AllcountJS Mailgun integration module

## What is it?
This is extension for the AllcountJS RAD Framework that allows you to process POST requests generated by Mailgun.

## Prerequisites
In order to use this extension you should have AllcountJS. 
Please, read up [getting started guide](https://allcountjs.com/docs/getting-started).

Also you need to configure Mailgun's router pointed to the URL 
`https://<your-allcountjs-application>/api/mailgun/inbound`. To learn about Mailgun visit 
[it's site](http://www.mailgun.com/).


## Installation
1. Being inside your AllcountJS application's directory, run ```npm-install allcountjs-mailgun --save```. *Note that `--save` 
option is vital because that's how the framework detects extensions.*
1. Add following handler to the root of your AllcountJS configuration object:
```javascript
 A.app({
 // . . .
     mailgun: {
         onMessage: function (Message) {
             //todo: paste your handler code here
         }
     }
 // . . .
 });
```

## The Message object
The Message object is JSON received from Mailgun. For example:
```
{
    "recipient": "my-name@sandbox2ddd4e88.mailgun.org",
    "sender": "me@me.com",
    "subject": "test-final",
    "from": "Georgy Chikhladze <georgiy.chikhladze@gmail.com>",
    "X-Mailgun-Incoming": "Yes",
    "X-Envelope-From": "<me@me.com>",
    "Received": [
        "from forward12h.cmail.yandex.net (forward12h.cmail.yandex.net [87.250.230.154]) by mxa.mailgun.org with ESMTP id 55c0d260.7f8bb8de6730-in02; Tue, 04 Aug 2015 14:55:28 -0000 (UTC)",
        "by 10.202.243.194 with HTTP; Tue, 4 Aug 2015 07:55:23 -0700 (PDT)"
    ],
    "Mime-Version": "1.0",
    "X-Received": "by 10.60.69.39 with SMTP id b7mr3399860oeu.51.1438700123701; Tue, 04 Aug 2015 07:55:23 -0700 (PDT)",
    "Date": "Tue, 4 Aug 2015 17:55:23 +0300",
    "Message-Id": "<CAAL6Ai0k22ыва6oDtHGRT7KnUNyy1h2w-8GKYvXoGK8+RufYO0A@mail.gmail.com>",
    "Subject": "test-final",
    "From": "Georgy Chikhladze <georgiy.chikhladze@gmail.com>",
    "To": "me@me.com",
    "Content-Type": "multipart/alternative; boundary=\"001a11330e68cfc691051c7d793d\"",
    "X-Yandex-Forward": "650f5f4b89f691ad0711c670ef3b32",
    "message-headers": "[[\"X-Mailgun-Incoming\", \"Yes\"], [\"X-Envelope-From\", \"<me@ya.ru>\"], [\"Received\", \"from forward12h.cmail.yandex.net (forward12h.cmail.yandex.net [87.250.230.154]) by mxa.mailgun.org with ESMTP id 55c0d260.7f8bb8de6730-in02; Tue, 04 Aug 2015 14:55:28 -0000 (UTC)\"], [\"Received\", \"from mxfront4h.mail.yandex.net (mxfront4h.mail.yandex.net [84.201.187.136])\\tby forward12h.cmail.yandex.net (Yandex) with ESMTP id B87E021DEE\\tfor <gera@sandbox7f7a0397a0b7431a8d5ece4e2ddd4e88.mailgun.org>; Tue,  4 Aug 2015 17:55:25 +0300 (MSK)\"], [\"Received\", \"from mxfront4h.mail.yandex.net ([127.0.0.1])\\tby mxfront4h.mail.yandex.net with LMTP id syF6NeQR\\tfor <me@ya.ru>; Tue, 4 Aug 2015 17:55:25 +0300\"], [\"Received\", \"from mail-ob0-x231.google.com (mail-ob0-x231.google.com [2607:f8b0:4003:c01::231])\\tby mxfront4h.mail.yandex.net (nwsmtp/Yandex) with ESMTPS id f4fTmjGGxC-tOGGtuYe;\\tTue,  4 Aug 2015 17:55:24 +0300\\t(using TLSv1.2 with cipher ECDHE-RSA-AES128-GCM-SHA256 (128/128 bits))\\t(Client certificate not present)\"], [\"Authentication-Results\", \"mxfront4h.mail.yandex.net; spf=pass (mxfront4h.mail.yandex.net: domain of gmail.com designates 2607:f8b0:4003:c01::231 as permitted sender) smtp.mail=georgiy.chikhladze@gmail.com; dkim=pass header.i=@gmail.com\"], [\"Received\", \"by obre1 with SMTP id e1so8956693obr.1        for <me@ya.ru>; Tue, 04 Aug 2015 07:55:23 -0700 (PDT)\"], [\"Dkim-Signature\", \"v=1; a=rsa-sha256; c=relaxed/relaxed;        d=gmail.com; s=20120113;        h=mime-version:date:message-id:subject:from:to:content-type;        bh=EeoaC0QeHL2cDmX+Ft+5R7FmDJmW9VnM1iaWbB3wfGg=;        b=do14bAib6lIehfl7nGjkfzt3F00MRoU07Jm3A8RYFvHK8EmgLCvXxH8Ljd1JIhd/kC         4RqSF/tN3hsO5ic5YYgrqo12vSd2s2g7R9S4ztKWZ7WMAUN0z1a/q75kqXGo8ApQJHQo         5oLq8Sd4+p4rUf+NKtwh/D8JL958ssPAWdxgsSY9clcBEAdUtxVoNXSChfpCR3afCOT8         ZiKWqB18qWC5XjAggSVwD2eAwlDyBnxgEDxCs9MQ6p/wzbxzVF9FNxAHK8PBswj+fjdC         CL6DXjRZYu+oL/PXtmI2LcjZ9Xj5qhd16eYTAWxfadVCF6GTcZ8nW30AJaS5fGId2HRg         r6dA==\"], [\"Mime-Version\", \"1.0\"], [\"X-Received\", \"by 10.60.69.39 with SMTP id b7mr7799860oeu.51.1438788123701; Tue, 04 Aug 2015 07:55:23 -0700 (PDT)\"], [\"Received\", \"by 10.202.243.194 with HTTP; Tue, 4 Aug 2015 07:55:23 -0700 (PDT)\"], [\"Date\", \"Tue, 4 Aug 2015 17:55:23 +0300\"], [\"Message-Id\", \"<CAAL6Ai0k2345DtHGRT7KKTnUNyy1h2w-8GKYvXoGK8+RufYO0A@mail.gmail.com>\"], [\"Subject\", \"test-final\"], [\"From\", \"Georgy Chikhladze <georgiy.chikhladze@gmail.com>\"], [\"To\", \"me@ya.ru\"], [\"Content-Type\", \"multipart/alternative; boundary=\\\"001a11330e68cf8891051c7d793d\\\"\"], [\"X-Yandex-Forward\", \"650f5f4b89f691f5a88711c670ef3b32\"]]",
    "timestamp": "1438700130",
    "body-plain": "This is test.\r\nBest regards,\r\nGeorgy Chikhladze\r\n",
    "body-html": "<div dir=\"ltr\">This is test.<br clear=\"all\"><div><div class=\"gmail_signature\"><div dir=\"ltr\"><div><div dir=\"ltr\">Best regards,<div>Georgy Chikhladze</div></div></div></div></div></div>\r\n</div>\r\n",
    "stripped-html": "<div dir=\"ltr\">This is test.<br clear=\"all\"><div><div class=\"gmail_signature\"><div dir=\"ltr\"><div><div dir=\"ltr\">Best regards,<div>Georgy Chikhladze</div></div></div></div></div></div>\r\n</div>\r\n",
    "stripped-text": "This is test.",
    "stripped-signature": "Best regards,\r\nGeorgy Chikhladze"
}
```

## Example
The following example logs received message to the console:
```javascript
 A.app({
 // . . .
     mailgun: {
         onMessage: function (Message, Console) {
             Console.log('message received: %s', JSON.stringify(Message));
         }
     }
 // . . .
 });
```