package com.experta.demobot.listeners;


import com.experta.demobot.commands.PingCommand;

import discord4j.core.event.domain.message.MessageCreateEvent;
import discord4j.core.object.entity.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.experta.demobot.client.PokemonClient;

import reactor.core.publisher.Mono;

@Service
public class MessageCreateListener implements EventListener<MessageCreateEvent> {

    @Override
    public Class<MessageCreateEvent> getEventType() {
        return MessageCreateEvent.class;
    }

    @Override
    public Mono<Void> execute(MessageCreateEvent event) {
        return processCommand(event.getMessage());
    }

    private Mono<Void> processCommand(Message eventMessage) {

        if (eventMessage.getContent().startsWith("!pokemon")) {
            return Mono.just(eventMessage)
                    .filter(message -> message.getAuthor().map(user -> !user.isBot()).orElse(false))
                    .flatMap(Message::getChannel)
                    .flatMap(channel -> channel.createMessage("pokemonClient.getPokemon()"))
                    .then();
        } else if (eventMessage.getContent().startsWith("/greet")) {
            return Mono.just(eventMessage)
                    .filter(message -> message.getAuthor().map(user -> !user.isBot()).orElse(false))
                    .flatMap(Message::getChannel)
                    .flatMap(channel -> channel.createMessage("pokemonClient.getPokemon()"))
                    .then();
        }
        return Mono.just(eventMessage).then();
    }

}
