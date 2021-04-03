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
                title: "London",
                image: require("assets/places/london.jpg")
            },
            {
                id: 3,
                title: "London",
                image: require("assets/places/london.jpg")
            }
        ];
    }

    setLoginStatus(user) {
        this.user = user;
    }
}