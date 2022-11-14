package com.experta.demobot.client;

import com.experta.demobot.model.trello.Board;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@ConfigurationPropertiesScan
public class TrelloClient {

    @Value("${trello.api.key}")
    private String apiKey = "31cf5834683207d63ebcd671462c56d4";
    @Value("${trello.api.token}")
    private String apiToken = "62ef9fd499264e377a478db5190ca5d0b2dde091ec70002484d041293e3b4e0b";
    @Value("${trello.oauth1.client.secret}")
    private String clientSecret;

    private String baseUrl = "https://api.trello.com/1/";

    private String uri = "members/me/boards?fields=name,url&key=" + apiKey + "&token=" + apiToken;


    public void getBoards() {



        List<Board> boards = Client<Board>
                .bodyToFlux(Board.class)
                .collectList()
                .block();


        System.out.println(boards.get(1).getName());





    }

}
