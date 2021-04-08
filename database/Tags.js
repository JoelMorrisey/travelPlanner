export default class Tags {
    static instance = Tags.instance || new Tags();

    constructor() {
        //Tags for activities
        this.tags = [
            {
                id: 1,
                name: "Sleep",
                icon: "bed",
                size: 20
            },
            {
                id: 2,
                name: "Eat",
                icon: "food",
                size: 20
            },
            {
                id: 3,
                name: "Adventure",
                icon: "biathlon",
                size: 20
            },
            {
                id: 4,
                name: "Sights",
                icon: "bridge",
                size:20
            },
            {
                id: 5,
                name: "Beaches",
                icon: "beach",
                size: 20
            }
        ]
    }

    //Get all tags
    getTags() {
        return this.tags;
    }
}