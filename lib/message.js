///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const {
   Message,
   MessageActionRow,
   MessageEmbed,
   MessageButton
} = require("discord.js");
const disabledButtons = require('../util/disabledButtons');
const progressBarBuilder = require('../util/progressBarBuilder');
const { filterBuilder } = require('../util/filter');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param {Message} message - Discord.js interface
 * @param {MessageEmbed[]} pageList - An array of the embeds
 * @param {MessageButton[]} buttonList - An array of the buttons
 * @param {Number} timeout - How long the timeout lasts
 * @param {Boolean} replyMessage - If replyMessage is enabled
 * @param {Boolean} autoDelete - If autoDelete is enabled
 * @param {Boolean} privateReply - If privateReply is enabled
 * @param {Boolean} progressBar - ProgressBar settings
 * @param {String} proSlider - The symbol used to symbolise position on the progressBar
 * @param {String} proBar - The symbol used to symbolise pages to go on the progressBar
 * @param {Boolean} authorIndependent - Only the author can use pagination
 * @returns {MessageEmbed[]} The pagination
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Message pagination ////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = MessagePagination = async(message, pageList, buttonList, timeout, replyMessage, autoDelete, privateReply, progressBar, proSlider, proBar, authorIndependent) => {
   // Set page number
   let pageNumber = 0;
   // Create embed
   const row = new MessageActionRow().addComponents(buttonList);
   const curPageContent = {
      embeds: [pageList[pageNumber].setFooter({text: `${progressBar? `${progressBarBuilder(pageList.length, pageNumber, proSlider, proBar)}` : `Page ${pageNumber + 1} / ${pageList.length}`}`})],
      components: [row]
   };
   let curPage;
   if (privateReply) {
      await message.channel.send("The reply has been sent privately");
      curPage = await message.author.send(curPageContent);
   } else {
      curPage = replyMessage ? await message.reply(curPageContent) : await message.channel.send(curPageContent);
   }
   // Create filter
   let filter = filterBuilder({message, buttonList, authorIndependent});
   // Create collector
   const collector = await curPage.createMessageComponentCollector({
      filter,
      time: timeout
   });
   // Button inputs
   collector.on("collect", async (i) => {
      switch (i.customId) {
         // Button 1
         case buttonList[0].customId:
            if (buttonList.length > 3) {
               pageNumber = 0;
               break;
            }
            pageNumber = pageNumber > 0 ? --pageNumber : pageList.length - 1;
            break;
         // Button 2
         case buttonList[1].customId:
            if (buttonList.length > 3) {
               pageNumber = pageNumber > 0 ? --pageNumber : pageList.length - 1;
               break;
            }
            pageNumber = pageNumber + 1 < pageList.length ? ++pageNumber : 0;
            break;
         // Button 3
         case buttonList[2].customId:
            if (buttonList.length > 3) {
               pageNumber = pageNumber + 1 < pageList.length ? ++pageNumber : 0;
               break
            }
            curPage.delete();
            return;
         // Button 4
         case buttonList[3].customId:
            pageNumber = pageList.length - 1 ;
            break;
            // Button 5
            case buttonList[4].customId:
            curPage.delete();
            return;
         // Default
         default:
            break;
      }
      if (!i.deferred) await i.deferUpdate();
      // Edit page after input
      await i.editReply({
         embeds: [pageList[pageNumber].setFooter({text: `${progressBar ? `${progressBarBuilder(pageList.length, pageNumber, proSlider, proBar)}` : `Page ${pageNumber + 1} / ${pageList.length}`}`})],
         components: [row]
      }).catch(error => {return console.log(error)});
      // Refresh timeout timer
      collector.resetTimer();
   });
   // Timeout ended or embed was deleted
   collector.on("end", async() => {
      try {
         // Make sure the embed exists
         await message.channel.messages.fetch(curPage.id);
         // Delete if autoDelete in enabled
         if (autoDelete) return curPage.delete();
         try {
            // Disable buttons
            curPage.edit({
               embeds: [pageList[pageNumber].setFooter({text: `${progressBar ? `${progressBarBuilder(pageList.length, pageNumber, proSlider, proBar)}` : `Page ${pageNumber + 1} / ${pageList.length}`}`})],
               components: [await disabledButtons(buttonList)]
            });
         } catch (error) {return}
      } catch (error) {return}
   });
   return curPage;
};