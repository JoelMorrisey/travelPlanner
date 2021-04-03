export default class PresetLocationData {
    static instance = PresetLocationData.instance || new PresetLocationData();

    constructor() {
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
            }
        ];
    }

    getAll() {
        return this.places;
    }
}