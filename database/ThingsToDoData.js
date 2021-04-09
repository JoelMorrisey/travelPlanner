export default class ThingsToDoData {
    static instance = ThingsToDoData.instance || new ThingsToDoData();

    constructor() {
        //All activities
        this.activities = [
            {
                id: 1,
                location_id: 1,
                title: "The Rydges",
                description: "Located just one street back from the Overseas Passenger Terminal, A heritage site dating back to 1926, Rydges Sydney Harbour sits amongst the undisturbed cobblestone laneways of the city’s oldest neighbourhood. You’ll find an array of boutique shops and galleries and plenty of cafes and restaurants on your doorstep. Within a few minutes’ walk you’ll be at Sydney Harbour, where you can check out the Museum of Contemporary Art or the Sydney Opera House, hop on a ferry to Manly Beach or Taronga Zoo, or catch a train to other noted Sydney hotspots.",
                tags: [
                    "Sleep"
                ]
            },
            {
                id: 2,
                location_id: 1,
                title: "Valentine hotel",
                description: "Valentine is a boutique hotel located on the fringe of Darling Harbour and positioned close to Sydney's key attractions including the Sydney Entertainment and Convention Center, Sydney Central Station; central transportation interchange for train and bus for a convenient interstate and city travelling and a direct link to the international and domestic airports, Tour operators provide services such as city sightseeing, including the memorable water cruise. These attractions are within walking distance from the hotel. The Sydney Opera House, Sydney Harbour Bridge and The Rocks are about 15 minutes ride.",
                tags: [
                    "Sleep"
                ]
            },
            {
                id: 3,
                location_id: 1,
                title: "Parallax",
                description: "The cuisine at Parallax is a cutting edge fusion of French and Asian culinary traditions, paired with an extensive and eclectic wine list. Expect top level service in a modern yet comfortable setting.",
                tags: [
                    "Eat"
                ]
            },
            {
                id: 4,
                location_id: 1,
                title: "Norma",
                description: "NORMA. house made semolina pasta. Local wines. beautiful setting. simple.",
                tags: [
                    "Eat"
                ]
            },
            {
                id: 5,
                location_id: 1,
                title: "The coolest rock",
                description: "The rock is super amazing with the coolest curves and turns you will ever see, there is only one rock around like this and it is here the coolest rock of them all.",
                tags: [
                    "Sights"
                ]
            },
            {
                id: 6,
                location_id: 1,
                title: "The white cliff",
                description: "This is the whitest cliff in the world, there is no cliff like it. Come see for your self and be amazed by the magical view you shall see.",
                tags: [
                    "Sights"
                ]
            },
            {
                id: 7,
                location_id: 1,
                title: "The ultimate bike trail",
                description: "The trial to test your biking skills. With many hill and many turn just try to not fall off and fly.",
                tags: [
                    "Adventure"
                ]
            },
            {
                id: 8,
                location_id: 1,
                title: "Super fun land",
                description: "The only place around without any restrictions, come have fun, enjoy your life. Any harm that comes to you here is your fault and no others so don't hurt your self ok?",
                tags: []
            },
            {
                id: 9,
                location_id: 2,
                title: "The monastery",
                description: "Enjoy the peaceful surrounding of the monastery where many come and meditate. The view is wonderful, you probably haven't see something so nice.",
                tags: [
                    "Sights"
                ]
            },
            {
                id: 10,
                location_id: 2,
                title: "Hotel cool",
                description: "The coldest hotel around like seriously this holtel is frozen solid. The hotel is just a freezer that is a building. Would not recommend you go here.",
                tags: [
                    "Stay"
                ]
            },
            {
                id: 11,
                location_id: 2,
                title: "Weird food",
                description: "The weidest food you can find. Where are we located, we are located just around the corner of where you stay. How do we know where your staying, we don't we are just around every corner.",
                tags: [
                    "Eat"
                ]
            },
            {
                id: 12,
                location_id: 3,
                title: "Stone Hendge",
                description: "Literally the only thing to do at this rock is to stare at it and go interesting. Why go here? to tell you family and friends about the cool shiny (not shiny) rocks you saw.",
                tags: [
                    "Sights"
                ]
            },
            {
                id: 13,
                location_id: 3,
                title: "Beach Island",
                description: "Does it make sense to have a beach here... no but there is a beach here and it is beautiful and you should go and see it because why wouldn't you go and see it.",
                tags: [
                    "Beaches"
                ]
            },
            {
                id: 14,
                location_id: 4,
                title: "Winter wonder land",
                description: "The winter wonder land is cold, fun and pretty at the same time. The only place you can throw snow balls around and enjoy the cold at the same time.",
                tags: [
                    "Adventure"
                ]
            },
            {
                id: 15,
                location_id: 4,
                title: "The mountains",
                description: "Beautiful hiking mountains that many come far and wide for. They are very tall and as such very pretty and make nice picture oppertunities.",
                tags: [
                    "Adventure"
                ]
            },
            {
                id: 16,
                location_id: 5,
                title: "Golden bridge",
                description: "You know the bridge, I know the beidge we all know the bridge. It's the one destroyed in every movie it is the Golden bridge.",
                tags: [
                    "Sights"
                ]
            },
        ];
    }

    getByID(id) {
        return this.activities.find(activity => activity.id == id);
    }

    //Get all activities
    getThingsToDo() {
        return this.activities;
    }
}