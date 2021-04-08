export default class Tags {
    static instance = Tags.instance || new Tags();

    constructor() {
        //Tags for activities
        this.tags = [
            {
                id: 1,
                name: "places to stay",
                icon: "home-city-outline",
                size: 20
            },
            {
                id: 2,
                name: "sleep",
                icon: "bed",
                size: 20
            },
            {
                id: 3,
                name: "eat",
                icon: "food",
                size: 20
            }
        ]
    }

    //Get all tags
    getTags() {
        return this.tags;
    }
}