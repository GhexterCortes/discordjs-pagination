import { ButtonBuilder, ButtonComponentData, Embed, EmbedBuilder, EmbedData, Interaction, InteractionButtonComponentData, InteractionResponseFields } from 'discord.js';

declare export default class PaginationWrapper {
    public interface: null|Message|Interaction & InteractionResponseFields;
    public pageList: null|EmbedBuilder[];
    public buttonList: null|ButtonBuilder[];
    public timeout: number;
    public replyMessage: boolean;
    public autoDelete: boolean;
    public privateReply: boolean;
    public authorIndependent: boolean;
    public pageBuilderInfo: null|EmbedData[];
    public buttonBuilderInfo: null|InteractionButtonComponentData[];
    public ephemeral: boolean;
    public autoButton: {
        toggle: boolean;
        deleteButton: boolean;
    };
    public progressBar: {
        toggle: boolean;
        slider: string;
        bar: string;
    };
    public selectMenu: {
        toggle: boolean;
        labels: null|any[];
    }
    public pagination: null;
}