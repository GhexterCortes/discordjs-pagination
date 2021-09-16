// Dependencies
const {
    MessageActionRow,
    Message,
    MessageEmbed,
    MessageButton,
} = require("discord.js");

  // Interaction pagination
  /**
   * Creates a pagination embed
   * @param {Interaction} interaction
   * @param {MessageEmbed[]} pages
   * @param {MessageButton[]} buttonList
   * @param {number} timeout
   * @returns
   */
  const interactionEmbed = async (interaction, pages, buttonList, timeout = 120000) => {
    //if (!message && !message.channel) throw new Error("Channel is inaccessible.");
    if (!pages) throw new Error("Pages are not given.");
    if (!buttonList) throw new Error("Buttons are not given.");
    if (buttonList[0].style === "LINK" || buttonList[1].style === "LINK")
      throw new Error(
        "Link buttons are not supported with discordjs-button-pagination"
      );
    if (buttonList.length !== 2) throw new Error("Need two buttons.");
  
    let page = 0;
  
    const row = new MessageActionRow().addComponents(buttonList);
    const curPage = await interaction.reply({
      embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
      components: [row],fetchReply: true,
    });
  
    const filter = (i) =>
      i.customId === buttonList[0].customId ||
      i.customId === buttonList[1].customId;
  
    const collector = await curPage.createMessageComponentCollector({
      filter,
      time: timeout,
    });
  
    collector.on("collect", async (i) => {
      switch (i.customId) {
        case buttonList[0].customId:
          page = page > 0 ? --page : pages.length - 1;
          break;
        case buttonList[1].customId:
          page = page + 1 < pages.length ? ++page : 0;
          break;
        default:
          break;
      }
      await i.deferUpdate();
      await i.editReply({
        embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
        components: [row],
      });
      collector.resetTimer();
    });
  
    collector.on("end", () => {
      if (!curPage.deleted) {
        curPage.edit({
          embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
          components: [],
        });
      }
    });
    return curPage;
};

// Message pagination
  /**
   * Creates a pagination embed
   * @param {Message} message
   * @param {MessageEmbed[]} pages
   * @param {MessageButton[]} buttonList
   * @param {number} timeout
   * @returns
   */

  const messageEmbed = async (message, pages, buttonList, timeout = 12000) => {
    if (!message && !message.channel) throw new Error("Channel is inaccessible.");
    if (!pages) throw new Error("Pages are not given.");
    if (!buttonList) throw new Error("Buttons are not given.");
    if (buttonList[0].style === "LINK" || buttonList[1].style === "LINK")
      throw new Error(
        "Link buttons are not supported with discordjs-button-pagination"
      );
    if (buttonList.length !== 2) throw new Error("Need two buttons.");

    let page = 0;
  
    const row = new MessageActionRow().addComponents(buttonList);
    const curPage = await message.channel.send({
      embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
      components: [row],
    });

    const filter = (i) =>
      i.customId === buttonList[0].customId ||
      i.customId === buttonList[1].customId;
  
    const collector = await curPage.createMessageComponentCollector({
      filter,
      time: timeout,
    });
  
    collector.on("collect", async (i) => {
      switch (i.customId) {
        case buttonList[0].customId:
          page = page > 0 ? --page : pages.length - 1;
          break;
        case buttonList[1].customId:
          page = page + 1 < pages.length ? ++page : 0;
          break;
        default:
          break;
      }
      await i.deferUpdate();
      await i.editReply({
        embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
        components: [row],
      });
      collector.resetTimer();
    });

    collector.on("end", async() => {
      try {
        await message.channel.messages.fetch(curPage.id)
        curPage.edit({
          embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
          components: [],
        });
      } catch (error) {
        return;
      }
    });
    return curPage;
  };

module.exports = { interactionEmbed, messageEmbed };