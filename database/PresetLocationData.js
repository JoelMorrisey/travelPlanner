export default class PresetLocationData {
    static instance = PresetLocationData.instance || new PresetLocationData();

    constructor() {
        //List of places that a user can have activities for 
        this.places = [
            {
                id: 1,
                title: "London",
                image: require("assets/places/london.jpg")
            },
            {
                id: 2,
                title: "Japan",
                image: require("assets/places/japan.png")
            },
            {
                id: 3,
                title: "Stone Hendge",
                image: require("assets/places/stoneHendge.jpeg")
            },
            {
                id: 4,
                title: "Canada",
                image: require("assets/places/canada.jpg")
            },
            {
                id: 5,
                title: "San Francisco",
                image: require("assets/places/sanFrancisco.jpg")
            }
        ];
    }

    //Get all places
    getAll() {
        return this.places;
    }

    //Get place by a list of IDs
    getByIDList(ids) {
        return this.places.filter(country => ids.includes(country.id))
    }
}