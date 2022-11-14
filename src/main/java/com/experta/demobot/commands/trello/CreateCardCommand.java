package com.experta.demobot.commands.trello;

import com.experta.demobot.client.TrelloClient;
import com.experta.demobot.commands.SlashCommand;
import discord4j.core.event.domain.interaction.ChatInputInteractionEvent;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class CreateCardCommand implements SlashCommand{

        @Override
        public String getName() {
            return "vertableros";
        }

        @Override
        public Mono<Void> handle(ChatInputInteractionEvent event) {
            TrelloClient trelloClient = new TrelloClient();


            trelloClient.getBoards();


            //Reply to the slash command, with the name the user supplied
            return  event.reply()
                    .withEphemeral(false)
                    .withContent("Hola");
        }



}
