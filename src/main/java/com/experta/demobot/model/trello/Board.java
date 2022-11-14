package com.experta.demobot.model.trello;

import java.util.ArrayList;
import java.util.Date;

public class Board {



    private String id; // The ID of the board
    private String name; // The name of the board
    private String desc; // The description of the board. Deprecated
    private String descData; // If the description includes custom emoji, this will contain the data necessary to display them.
    private boolean closed; // Boolean whether the board has been closed or not.
    private String idOrganization; // MongoID of the organization to which the board belongs.
    private String idMemberCreator; // MongoID of the member that created the board.
    private boolean invited; // NO ESTA DOCUMENTADO
    private Limits limits; // An object containing information on the limits that exist for the board. Read more about at Limits.
    private ArrayList<Membership> memberships; // Array of objects that represent the relationship of users to this board as memberships.
    private boolean pinned; // Boolean whether the board has been pinned or not.
    private boolean starred; // Whether the board has been starred by the current request's user.
    private String url; // Persistent URL for the board.
    private Prefs prefs; // Short for "preferences", these are the settings for the board
    private ArrayList<Object> invitations; // NO ESTA DOCUMENTADO
    private String shortLink; // NO ESTA DOCUMENTADO
    private boolean subscribed; // NO ESTA DOCUMENTADO
    private LabelNames labelNames; // Texto para cada color de etiqueta
    private ArrayList<Object> powerUps; // NO ESTA DOCUMENTADO
    private Date dateLastActivity; // NO ESTA DOCUMENTADO
    private Date dateLastView; // NO ESTA DOCUMENTADO
    private String shortUrl; // URL for the board using only its shortMongoID
    private ArrayList<Object> idTags;
    private Object datePluginDisable;
    private boolean enterpriseOwned; // Whether the board is owned by an Enterprise or not.

    @Override
    public String toString() {
        return "Board{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                ", descData='" + descData + '\'' +
                ", closed=" + closed +
                ", idOrganization='" + idOrganization + '\'' +
                ", idMemberCreator='" + idMemberCreator + '\'' +
                ", invited=" + invited +
                ", limits=" + limits +
                ", memberships=" + memberships +
                ", pinned=" + pinned +
                ", starred=" + starred +
                ", url='" + url + '\'' +
                ", prefs=" + prefs +
                ", invitations=" + invitations +
                ", shortLink='" + shortLink + '\'' +
                ", subscribed=" + subscribed +
                ", labelNames=" + labelNames +
                ", powerUps=" + powerUps +
                ", dateLastActivity=" + dateLastActivity +
                ", dateLastView=" + dateLastView +
                ", shortUrl='" + shortUrl + '\'' +
                ", idTags=" + idTags +
                ", datePluginDisable=" + datePluginDisable +
                ", enterpriseOwned=" + enterpriseOwned +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getDescData() {
        return descData;
    }

    public void setDescData(String descData) {
        this.descData = descData;
    }

    public boolean isClosed() {
        return closed;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }

    public String getIdOrganization() {
        return idOrganization;
    }

    public void setIdOrganization(String idOrganization) {
        this.idOrganization = idOrganization;
    }

    public String getIdMemberCreator() {
        return idMemberCreator;
    }

    public void setIdMemberCreator(String idMemberCreator) {
        this.idMemberCreator = idMemberCreator;
    }

    public boolean isInvited() {
        return invited;
    }

    public void setInvited(boolean invited) {
        this.invited = invited;
    }

    public Limits getLimits() {
        return limits;
    }

    public void setLimits(Limits limits) {
        this.limits = limits;
    }

    public ArrayList<Membership> getMemberships() {
        return memberships;
    }

    public void setMemberships(ArrayList<Membership> memberships) {
        this.memberships = memberships;
    }

    public boolean isPinned() {
        return pinned;
    }

    public void setPinned(boolean pinned) {
        this.pinned = pinned;
    }

    public boolean isStarred() {
        return starred;
    }

    public void setStarred(boolean starred) {
        this.starred = starred;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Prefs getPrefs() {
        return prefs;
    }

    public void setPrefs(Prefs prefs) {
        this.prefs = prefs;
    }

    public ArrayList<Object> getInvitations() {
        return invitations;
    }

    public void setInvitations(ArrayList<Object> invitations) {
        this.invitations = invitations;
    }

    public String getShortLink() {
        return shortLink;
    }

    public void setShortLink(String shortLink) {
        this.shortLink = shortLink;
    }

    public boolean isSubscribed() {
        return subscribed;
    }

    public void setSubscribed(boolean subscribed) {
        this.subscribed = subscribed;
    }

    public LabelNames getLabelNames() {
        return labelNames;
    }

    public void setLabelNames(LabelNames labelNames) {
        this.labelNames = labelNames;
    }

    public ArrayList<Object> getPowerUps() {
        return powerUps;
    }

    public void setPowerUps(ArrayList<Object> powerUps) {
        this.powerUps = powerUps;
    }

    public Date getDateLastActivity() {
        return dateLastActivity;
    }

    public void setDateLastActivity(Date dateLastActivity) {
        this.dateLastActivity = dateLastActivity;
    }

    public Date getDateLastView() {
        return dateLastView;
    }

    public void setDateLastView(Date dateLastView) {
        this.dateLastView = dateLastView;
    }

    public String getShortUrl() {
        return shortUrl;
    }

    public void setShortUrl(String shortUrl) {
        this.shortUrl = shortUrl;
    }

    public ArrayList<Object> getIdTags() {
        return idTags;
    }

    public void setIdTags(ArrayList<Object> idTags) {
        this.idTags = idTags;
    }

    public Object getDatePluginDisable() {
        return datePluginDisable;
    }

    public void setDatePluginDisable(Object datePluginDisable) {
        this.datePluginDisable = datePluginDisable;
    }

    public boolean isEnterpriseOwned() {
        return enterpriseOwned;
    }

    public void setEnterpriseOwned(boolean enterpriseOwned) {
        this.enterpriseOwned = enterpriseOwned;
    }
}
