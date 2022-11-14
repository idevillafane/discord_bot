package com.experta.demobot.model.trello;

import java.util.ArrayList;
import java.util.Date;

public class Card {

        private String id; // The ID of the card
        private Badges badges; // 	Pieces of information about the card that are displayed on the front of the card.
        private ArrayList<Object> checkItemStates; // NO DOCUMENTADO
        private boolean closed; // Whether the card is closed (archived). Note: Archived lists and boards do not cascade archives to cards. A card can have closed: false but be on an archived board.
        private boolean dueComplete; // Whether the due date has been marked complete
        private Date dateLastActivity; // The datetime of the last activity on the card. Note: There are activities that update dateLastActivity that do not create a corresponding action. For instance, updating the name field of a checklist item on a card does not create an action but does update the card and board's dateLastActivity value.
        private String desc; // The description for the card. Up to 16384 chars.
        private Object descData; // If the description has custom emoji, this field will provide the data necessary to display them.
        private Date due; // The due date on the card, if one exists
        private String email; // NO DOCUMENTADO
        private String idBoard; // The ID of the board the card is on
        private ArrayList<String> idChecklists; // An array of checklist IDs that are on this card
        private String idList; // The ID of the list the card is in
        private ArrayList<String> idMembers;
        private ArrayList<String> idMembersVoted;
        private int idShort; // Numeric ID for the card on this board. Only unique to the board, and subject to change as the card moves
        private String idAttachmentCover; // The id of the attachment selected as the cover image, if one exists
        private boolean manualCoverAttachment;
        private ArrayList<Label> labels; // Array of label objects on this card
        private ArrayList<String> idLabels; // 	An array of label IDs that are on this card
        private String name; // Name of the card
        private int pos; // Position of the card in the list
        private String shortLink; // The 8 character shortened ID for the card
        private String shortUrl; // URL to the card without the name slug
        private boolean subscribed; // Whether this member is subscribed to the card
        private String url; // Full URL to the card, with the name slug
        private String address; // Address of card location
        private String locationName; // Name of card location
        private Coordinates coordinates; // Either a comma-separated string in the format latitude,longitude or an object containing keys for latitude and longitude whose values are numbers between -180 and 180.

        @Override
        public String toString() {
                return "Card{" +
                        "id='" + id + '\'' +
                        ", badges=" + badges +
                        ", checkItemStates=" + checkItemStates +
                        ", closed=" + closed +
                        ", dueComplete=" + dueComplete +
                        ", dateLastActivity=" + dateLastActivity +
                        ", desc='" + desc + '\'' +
                        ", descData=" + descData +
                        ", due=" + due +
                        ", email='" + email + '\'' +
                        ", idBoard='" + idBoard + '\'' +
                        ", idChecklists=" + idChecklists +
                        ", idList='" + idList + '\'' +
                        ", idMembers=" + idMembers +
                        ", idMembersVoted=" + idMembersVoted +
                        ", idShort=" + idShort +
                        ", idAttachmentCover='" + idAttachmentCover + '\'' +
                        ", manualCoverAttachment=" + manualCoverAttachment +
                        ", labels=" + labels +
                        ", idLabels=" + idLabels +
                        ", name='" + name + '\'' +
                        ", pos=" + pos +
                        ", shortLink='" + shortLink + '\'' +
                        ", shortUrl='" + shortUrl + '\'' +
                        ", subscribed=" + subscribed +
                        ", url='" + url + '\'' +
                        ", address='" + address + '\'' +
                        ", locationName='" + locationName + '\'' +
                        ", coordinates=" + coordinates +
                        '}';
        }

        public String getId() {
                return id;
        }

        public void setId(String id) {
                this.id = id;
        }

        public Badges getBadges() {
                return badges;
        }

        public void setBadges(Badges badges) {
                this.badges = badges;
        }

        public ArrayList<Object> getCheckItemStates() {
                return checkItemStates;
        }

        public void setCheckItemStates(ArrayList<Object> checkItemStates) {
                this.checkItemStates = checkItemStates;
        }

        public boolean isClosed() {
                return closed;
        }

        public void setClosed(boolean closed) {
                this.closed = closed;
        }

        public boolean isDueComplete() {
                return dueComplete;
        }

        public void setDueComplete(boolean dueComplete) {
                this.dueComplete = dueComplete;
        }

        public Date getDateLastActivity() {
                return dateLastActivity;
        }

        public void setDateLastActivity(Date dateLastActivity) {
                this.dateLastActivity = dateLastActivity;
        }

        public String getDesc() {
                return desc;
        }

        public void setDesc(String desc) {
                this.desc = desc;
        }

        public Object getDescData() {
                return descData;
        }

        public void setDescData(Object descData) {
                this.descData = descData;
        }

        public Date getDue() {
                return due;
        }

        public void setDue(Date due) {
                this.due = due;
        }

        public String getEmail() {
                return email;
        }

        public void setEmail(String email) {
                this.email = email;
        }

        public String getIdBoard() {
                return idBoard;
        }

        public void setIdBoard(String idBoard) {
                this.idBoard = idBoard;
        }

        public ArrayList<String> getIdChecklists() {
                return idChecklists;
        }

        public void setIdChecklists(ArrayList<String> idChecklists) {
                this.idChecklists = idChecklists;
        }

        public String getIdList() {
                return idList;
        }

        public void setIdList(String idList) {
                this.idList = idList;
        }

        public ArrayList<String> getIdMembers() {
                return idMembers;
        }

        public void setIdMembers(ArrayList<String> idMembers) {
                this.idMembers = idMembers;
        }

        public ArrayList<String> getIdMembersVoted() {
                return idMembersVoted;
        }

        public void setIdMembersVoted(ArrayList<String> idMembersVoted) {
                this.idMembersVoted = idMembersVoted;
        }

        public int getIdShort() {
                return idShort;
        }

        public void setIdShort(int idShort) {
                this.idShort = idShort;
        }

        public String getIdAttachmentCover() {
                return idAttachmentCover;
        }

        public void setIdAttachmentCover(String idAttachmentCover) {
                this.idAttachmentCover = idAttachmentCover;
        }

        public boolean isManualCoverAttachment() {
                return manualCoverAttachment;
        }

        public void setManualCoverAttachment(boolean manualCoverAttachment) {
                this.manualCoverAttachment = manualCoverAttachment;
        }

        public ArrayList<Label> getLabels() {
                return labels;
        }

        public void setLabels(ArrayList<Label> labels) {
                this.labels = labels;
        }

        public ArrayList<String> getIdLabels() {
                return idLabels;
        }

        public void setIdLabels(ArrayList<String> idLabels) {
                this.idLabels = idLabels;
        }

        public String getName() {
                return name;
        }

        public void setName(String name) {
                this.name = name;
        }

        public int getPos() {
                return pos;
        }

        public void setPos(int pos) {
                this.pos = pos;
        }

        public String getShortLink() {
                return shortLink;
        }

        public void setShortLink(String shortLink) {
                this.shortLink = shortLink;
        }

        public String getShortUrl() {
                return shortUrl;
        }

        public void setShortUrl(String shortUrl) {
                this.shortUrl = shortUrl;
        }

        public boolean isSubscribed() {
                return subscribed;
        }

        public void setSubscribed(boolean subscribed) {
                this.subscribed = subscribed;
        }

        public String getUrl() {
                return url;
        }

        public void setUrl(String url) {
                this.url = url;
        }

        public String getAddress() {
                return address;
        }

        public void setAddress(String address) {
                this.address = address;
        }

        public String getLocationName() {
                return locationName;
        }

        public void setLocationName(String locationName) {
                this.locationName = locationName;
        }

        public Coordinates getCoordinates() {
                return coordinates;
        }

        public void setCoordinates(Coordinates coordinates) {
                this.coordinates = coordinates;
        }
}
