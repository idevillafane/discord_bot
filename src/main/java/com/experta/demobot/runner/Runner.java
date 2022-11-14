package com.experta.demobot.runner;

import com.experta.demobot.configuration.DemoBotConfiguration;
import discord4j.common.JacksonResources;
import discord4j.discordjson.json.ApplicationCommandRequest;
import discord4j.rest.RestClient;
import discord4j.rest.service.ApplicationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Runner {

    public static final Logger log = LoggerFactory.getLogger(Runner.class);

    public static void run(RestClient client) throws IOException {

        System.out.println("El runner esta corriendo");

        //Create an ObjectMapper that supported Discord4J classes
        final JacksonResources d4jMapper = JacksonResources.create();

        // Convenience variables for the sake of easier to read code below.
        PathMatchingResourcePatternResolver matcher = new PathMatchingResourcePatternResolver();
        final ApplicationService applicationService = client.getApplicationService();
        final long applicationId = client.getApplicationId().block();

        //Get our commands json from resources as command data
        List<ApplicationCommandRequest> commands = new ArrayList<>();
        for (Resource resource : matcher.getResources("commands/*.json")) {
            ApplicationCommandRequest request = d4jMapper.getObjectMapper()
                    .readValue(resource.getInputStream(), ApplicationCommandRequest.class);

            commands.add(request);
        }

        Long guildId = 1006242203674365982L;
        // Bulk overwrite commands. This is now idempotent, so it is safe to use this even when only 1 command is changed/added/removed

        applicationService.bulkOverwriteGuildApplicationCommand(applicationId, guildId, commands)
                .doOnNext(ignore -> log.debug("Successfully registered Global Commands"))
                .doOnError(e -> log.error("Failed to register local commands", e))
                .subscribe();
    /*
        applicationService.bulkOverwriteGlobalApplicationCommand(applicationId, commands)
                .doOnNext(ignore -> log.debug("Successfully registered Global Commands"))
                .doOnError(e -> log.error("Failed to register global commands", e))
                .subscribe();

     */

    }

}
