import PresetLocationData from 'database/PresetLocationData'

const presetLocations = PresetLocationData.instance;

export default class UsersWishList {
    static instance = UsersWishList.instance || new UsersWishList();

    constructor() {
        this.countries = [
            {
                userID: 1,
                placeID: 1
            },
            {
                userID: 1,
                placeID: 3
            },
            {
                userID: 2,
                placeID: 1
            }
        ]

        this.activityData = [
            {
                id: 1,
                userID: 1,
                countryID: 1,
                title: "Hotel awesome",
                description: "The coolest hotel around",
                notes: "totally gotta go here",
                tags: [
                    "places to stay"
                ]
            }
        ]
    }

    getCounrties(UserID) {
        let countriesForUser = this.countries.filter(country => country.userID == UserID);
        let result = presetLocations.getByIDList(countriesForUser.map(place => place.placeID))
        return result;
    }

    getActivities(UserID, countryID) {
        return this.activityData.filter(activity => activity.userID == UserID && activity.countryID == countryID);
    }

    addItem(activity, userID, location) {
        if (!this.countries.find(place => place.id == location.id && place.userID == userID)) {
            this.countries.push({
                userID: userID,
                placeID: location.id
            })
        }
        this.activityData.push({
            id: this.activityData.length+1,
            userID: userID,
            countryID: location.id,
            title: activity.title,
            tags: activity.tags,
            description: activity.description,
            notes: activity.notes,
        })
    }
}