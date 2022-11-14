package com.experta.demobot.configuration;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.experta.demobot.runner.Runner;
import discord4j.common.JacksonResources;
import discord4j.core.DiscordClient;
import discord4j.core.object.presence.ClientActivity;
import discord4j.core.object.presence.ClientPresence;
import discord4j.discordjson.json.ApplicationCommandRequest;
import discord4j.rest.RestClient;
import discord4j.rest.service.ApplicationService;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.experta.demobot.client.PokemonClient;
import com.experta.demobot.listeners.EventListener;

import discord4j.core.DiscordClientBuilder;
import discord4j.core.GatewayDiscordClient;
import discord4j.core.event.domain.Event;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;


//implements ApplicationRunner
@Configuration
public class DemoBotConfiguration {

    public static final Logger log = LoggerFactory.getLogger(DemoBotConfiguration.class);

    @Value("${discord.token}")
    private String token;

    @Bean
    public <T extends Event> GatewayDiscordClient gatewayDiscordClient(List<EventListener<T>> eventListeners) {
        GatewayDiscordClient client = null;

        try {
            client = DiscordClientBuilder.create(token)
                    .build()
                    .gateway()
                    .setInitialPresence(ignore -> ClientPresence.online(ClientActivity.listening("a Mirtha Legrand")))
                    .login()
                    .block();

            for(EventListener<T> listener : eventListeners) {

                client.getEventDispatcher().on(listener.getEventType())
                        .flatMap(listener::execute)
                        .onErrorResume(listener::handleError)
                        .subscribe(event -> {System.out.println("Evento registrado: " + listener.getEventType());});
            }

            Runner.run(client.getRestClient());

            client.onDisconnect().block();
        }
        catch (Exception e) {
            log.error( "Controlá estar usando un token válido", e);
        }

        return client;
    }

}
