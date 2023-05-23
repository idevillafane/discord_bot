

export async function discordReply(interaction, content, row) {

    if (interaction.replied || interaction.deferred) {

        console.log('editedReply')

        return await interaction.followUp({ content: content, components: row, ephemeral:  true });
    }
    else {

        console.log('reply')

        return await interaction.reply({ content: content, components: row, ephemeral: true });
    }

}