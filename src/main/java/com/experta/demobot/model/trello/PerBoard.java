package com.experta.demobot.model.trello;

public class PerBoard {
    public String status;
    public int disableAt;
    public int warnAt;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getDisableAt() {
        return disableAt;
    }

    public void setDisableAt(int disableAt) {
        this.disableAt = disableAt;
    }

    public int getWarnAt() {
        return warnAt;
    }

    public void setWarnAt(int warnAt) {
        this.warnAt = warnAt;
    }
}
