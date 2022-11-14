package com.experta.demobot.client;

import com.experta.demobot.model.PokemonModel;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Random;

@Component
public class PokemonClient {


    private String urlPok = "https://pokeapi.co/api/v2";
    private String uriPok = "/ability/1/";


    public String getPokemon() {

        Random random = new Random();
        int randomId = random.nextInt(100);

        WebClient webClient = WebClient.builder()
                .baseUrl("https://pokeapi.co/api/v2")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        Mono<PokemonModel> respuesta = webClient.get()
                .uri("/ability/" + randomId + "/")
                .retrieve()
                .bodyToMono(PokemonModel.class);

        return respuesta.block().getName() + " ( <- Server de Nacho. )";
    }
}
