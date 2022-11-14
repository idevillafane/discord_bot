package com.experta.demobot.model.trello;

public class Badges {

    public int votes;
    public boolean viewingMemberVoted;
    public boolean subscribed;
    public String fogbugz;
    public int checkItems;
    public int checkItemsChecked;
    public int comments;
    public int attachments;
    public boolean description;
    public Object due;
    public boolean dueComplete;

    public int getVotes() {
        return votes;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    public boolean isViewingMemberVoted() {
        return viewingMemberVoted;
    }

    public void setViewingMemberVoted(boolean viewingMemberVoted) {
        this.viewingMemberVoted = viewingMemberVoted;
    }

    public boolean isSubscribed() {
        return subscribed;
    }

    public void setSubscribed(boolean subscribed) {
        this.subscribed = subscribed;
    }

    public String getFogbugz() {
        return fogbugz;
    }

    public void setFogbugz(String fogbugz) {
        this.fogbugz = fogbugz;
    }

    public int getCheckItems() {
        return checkItems;
    }

    public void setCheckItems(int checkItems) {
        this.checkItems = checkItems;
    }

    public int getCheckItemsChecked() {
        return checkItemsChecked;
    }

    public void setCheckItemsChecked(int checkItemsChecked) {
        this.checkItemsChecked = checkItemsChecked;
    }

    public int getComments() {
        return comments;
    }

    public void setComments(int comments) {
        this.comments = comments;
    }

    public int getAttachments() {
        return attachments;
    }

    public void setAttachments(int attachments) {
        this.attachments = attachments;
    }

    public boolean isDescription() {
        return description;
    }

    public void setDescription(boolean description) {
        this.description = description;
    }

    public Object getDue() {
        return due;
    }

    public void setDue(Object due) {
        this.due = due;
    }

    public boolean isDueComplete() {
        return dueComplete;
    }

    public void setDueComplete(boolean dueComplete) {
        this.dueComplete = dueComplete;
    }
}
