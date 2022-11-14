package com.experta.demobot.model.trello;

public class Limits {

        private PerBoard attachments;
        private PerBoard boards;
        private PerBoard cards;
        private PerBoard checklists;
        private PerBoard customFields;
        private PerBoard labels;
        private PerBoard lists;

        public PerBoard getAttachments() {
                return attachments;
        }

        public void setAttachments(PerBoard attachments) {
                this.attachments = attachments;
        }

        public PerBoard getBoards() {
                return boards;
        }

        public void setBoards(PerBoard boards) {
                this.boards = boards;
        }

        public PerBoard getCards() {
                return cards;
        }

        public void setCards(PerBoard cards) {
                this.cards = cards;
        }

        public PerBoard getChecklists() {
                return checklists;
        }

        public void setChecklists(PerBoard checklists) {
                this.checklists = checklists;
        }

        public PerBoard getCustomFields() {
                return customFields;
        }

        public void setCustomFields(PerBoard customFields) {
                this.customFields = customFields;
        }

        public PerBoard getLabels() {
                return labels;
        }

        public void setLabels(PerBoard labels) {
                this.labels = labels;
        }

        public PerBoard getLists() {
                return lists;
        }

        public void setLists(PerBoard lists) {
                this.lists = lists;
        }
}
