package com.experta.demobot.client;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


public class Client<T> {

    public static WebClient.ResponseSpec getClient(String baseUrl, String uri) {

        return  WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build()
                .get()
                .uri(uri)
                .retrieve();


    }

    public <T> Flux<Class<T>> getMono(String baseUrl, String uri, Class<T> tClass) throws InstantiationException, IllegalAccessException {

        return  WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build()
                .get()
                .uri(uri)
                .retrieve()
                .bodyToFlux(tClass.getClass().newInstance());


    }
}
