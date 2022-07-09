class Event {
    id;
    url;
    title;

    /*constructor(id, url, title) {
        this.id = id;
        this.url = url;
        this.title = title;
    }*/
    constructor(data) {
        Object.assign(this, data)
    }
}

module.exports = Event;