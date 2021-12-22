///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies //////////////////////////////////////////////////////////////////////////////////////////////////////////
const InteractionPagination = require('@acegoal07/discordjs-pagination/lib/interaction');
const MessagePagination = require('@acegoal07/discordjs-pagination/lib/message');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pagination ///////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = pagination = async ({interaction, message, pages, buttonList, timeout = 12000}) => {
  if (!pages) throw new Error("Missing pages");
  if (!buttonList) throw new Error("Missing buttons");
  if (message === undefined) {return InteractionPagination(interaction, pages, buttonList, timeout)}
  else if (interaction === undefined) {return MessagePagination(message, pages, buttonList, timeout)}
  else {throw new Error("Please provide either interaction or message for the pagination to use")}
}