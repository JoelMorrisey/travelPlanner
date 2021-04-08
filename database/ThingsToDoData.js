export default class ThingsToDoData {
    static instance = ThingsToDoData.instance || new ThingsToDoData();

    constructor() {
        //All activities
        this.activities = [
            {
                id: 1,
                location_id: 1,
                title: "Hotel 1",
                description: "Somewhere great to sleep",
                tags: [
                    "places to stay"
                ]
            },
            {
                id: 2,
                location_id: 1,
                title: "Hotel 2",
                description: "Don't stay here xD",
                tags: [
                    "sleep"
                ]
            },
            {
                id: 3,
                location_id: 1,
                title: "Eating place 1",
                description: "Very long description which should wrap eventuall so I an going to keep typeing to ensure that this is stupidly long lalalalalalal lol this is so stupid and I ahve no idea what I am typing any more this is just a stupidly long text now lmao",
                tags: [
                    "eat"
                ]
            },
            {
                id: 4,
                location_id: 1,
                title: "Test 1",
                description: "test",
                tags: []
            },
            {
                id: 5,
                location_id: 1,
                title: "Test 2",
                description: "test",
                tags: []
            },
            {
                id: 6,
                location_id: 1,
                title: "Test 3",
                description: "test",
                tags: []
            },
            {
                id: 7,
                location_id: 1,
                title: "Test 4",
                description: "test",
                tags: []
            },
            {
                id: 8,
                location_id: 1,
                title: "Test 5",
                description: "test",
                tags: []
            },
            {
                id: 9,
                location_id: 1,
                title: "Test 6",
                description: "test",
                tags: []
            },
            {
                id: 10,
                location_id: 2,
                title: "Hotel 1",
                description: "Somewhere great to sleep 2",
                tags: [
                    "places to stay"
                ]
            }
        ];
    }

    //Get all activities
    getThingsToDo() {
        return this.activities;
    }
}