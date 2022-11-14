package com.experta.demobot.commands;

import discord4j.core.event.domain.interaction.ChatInputInteractionEvent;
import discord4j.core.object.command.ApplicationCommandInteractionOption;
import discord4j.core.object.command.ApplicationCommandInteractionOptionValue;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Component
public class SaludoCommand implements SlashCommand {
    @Override
    public String getName() {
        return "saludo";
    }

    @Override
    public Mono<Void> handle(ChatInputInteractionEvent event) {
        /*
        Since slash command options are optional according to discord, we will wrap it into the following function
        that gets the value of our option as a String without chaining several .get() on all the optional values
        In this case, there is no fear it will return empty/null as this is marked "required: true" in our json.
         */
        String name = event.getOption("nombre")
                .flatMap(ApplicationCommandInteractionOption::getValue)
                .map(ApplicationCommandInteractionOptionValue::asString)
                .orElse("soy la Chiqui"); //This is warning us that we didn't check if its present, we can ignore this on required options

        //Reply to the slash command, with the name the user supplied
        return  event.reply()
                .withEphemeral(false)
                .withContent("¡Hola " + name + "!");
    }
}
