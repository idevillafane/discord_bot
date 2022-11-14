package com.experta.demobot.model.trello;

import java.util.Date;

public class MessagesDismissed {

    private String _id;
    private String name;
    private int count;
    private Date lastDismissed;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public Date getLastDismissed() {
        return lastDismissed;
    }

    public void setLastDismissed(Date lastDismissed) {
        this.lastDismissed = lastDismissed;
    }
}
