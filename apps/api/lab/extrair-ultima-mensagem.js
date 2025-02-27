const cheerio = require('cheerio');

const messageHtml = `<html>\r\n<head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=us-ascii\">\r\n<style type=\"text/css\" style=\"display:none;\"> P {margin-top:0;margin-bottom:0;} </style>\r\n</head>\r\n<body dir=\"ltr\">\r\n<div class=\"elementToProof\" style=\"font-family: Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\ncomo vai ??&nbsp;<br>\r\n<br>\r\nSegunda mensagem</div>\r\n<div id=\"appendonsend\"></div>\r\n<hr style=\"display:inline-block;width:98%\" tabindex=\"-1\">\r\n<div id=\"divRplyFwdMsg\" dir=\"ltr\"><font face=\"Calibri, sans-serif\" style=\"font-size:11pt\" color=\"#000000\"><b>De:</b> Estevao TurboGmail &lt;estevaoblv@gmail.com&gt;<br>\r\n<b>Enviado:</b> segunda-feira, 23 de setembro de 2024 11:01<br>\r\n<b>Para:</b> estevao.vasques@bmlog.com.br &lt;estevao.vasques@bmlog.com.br&gt;; estevaovasques@hotmail.com &lt;estevaovasques@hotmail.com&gt;<br>\r\n<b>Assunto:</b> [TESTE-33] consequuntur odio ut</font>\r\n<div>&nbsp;</div>\r\n</div>\r\n<div>Try to input the IB port, maybe it will input the multi-byte protocol! </div>\r\n</body>\r\n</html>\r\n`;

const $ = cheerio.load(messageHtml);

//resposta do gmail
$('.gmail_quote').remove();

// trata resposta do hotmail
$('#appendonsend').nextAll().remove();
$('#appendonsend').remove();

const newMessage = $('body').html().trim();

console.log({ newMessage });
