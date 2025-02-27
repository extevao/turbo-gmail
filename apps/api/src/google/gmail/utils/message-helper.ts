import * as cheerio from 'cheerio';

export class MessageHelper {
  static extractLastMessage(messageHtml: string) {
    const $ = cheerio.load(messageHtml);

    //resposta do gmail vem dentro do de uma div com essa classe
    $('.gmail_quote').remove();
    $('.gmail_signature').remove();

    // respostas do hotmail vem apos a tag
    $('#appendonsend').nextAll().remove();
    $('#appendonsend').remove();

    const lastMessage = $('body').html().trim();

    return lastMessage;
  }
}
