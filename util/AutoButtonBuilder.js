///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const { ButtonBuilder, ButtonStyle } = require("discord.js");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Buttons ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const next = new ButtonBuilder()
   .setLabel(`>`)
   .setStyle(ButtonStyle.Secondary)
   .setDisabled(false)
   .setCustomId(`nextbtn`);
const previous = new ButtonBuilder()
   .setLabel(`<`)
   .setStyle(ButtonStyle.Secondary)
   .setDisabled(false)
   .setCustomId(`previousbtn`);
const first = new ButtonBuilder()
   .setLabel(`<<`)
   .setStyle(ButtonStyle.Secondary)
   .setDisabled(false)
   .setCustomId(`firstbtn`);
const last = new ButtonBuilder()
   .setLabel(`>>`)
   .setStyle(ButtonStyle.Secondary)
   .setDisabled(false)
   .setCustomId(`lastbtn`);
const del = new ButtonBuilder()
   .setLabel(`🗑`)
   .setStyle(ButtonStyle.Danger)
   .setDisabled(false)
   .setCustomId(`delbtn`);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Params ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sends back a list of buttons to be used
 * @param {Number} pageListLength
 * @param {Boolean} autoDelButton
 * @returns {ButtonBuilder[]}
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Portal ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = AutoButtonBuilder = async(pageListLength, autoDelButton) => {
   try {
      let buttonList
      if (pageListLength <= 3) {
         buttonList = [previous, next];
      } else {
         buttonList = [first, previous, next, last];
      }
      if (autoDelButton) buttonList.push(del)
      return buttonList;
   } catch(error) {
      return console.log(`Error occured with ${__filename.split(/[\\/]/).pop().replace(".js","")} ${error}`)
   }
}
