import PresetLocationData from 'database/PresetLocationData'

const presetLocations = PresetLocationData.instance;

export default class UsersWishList {
    static instance = UsersWishList.instance || new UsersWishList();

    constructor() {
        //List of countries users have activities in (mappings)
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
                userID: 1,
                placeID: 5
            },
            {
                userID: 2,
                placeID: 1
            }
        ]

        //List of activities created by users
        this.activityData = [
            {
                id: 1,
                userID: 1,
                countryID: 1,
                title: "Hotel awesome",
                description: "The coolest hotel around",
                notes: "totally gotta go here",
                tags: [
                    "Stay"
                ]
            },
            {
                id: 1,
                userID: 2,
                countryID: 1,
                title: "Hotel awesome",
                description: "The coolest hotel around",
                notes: "Another user told me about this place so I noted it here!!!!",
                tags: [
                    "Stay"
                ]
            },
            {
                id: 1,
                userID: 1,
                countryID: 1,
                title: "Hotel awesome",
                description: "The coolest hotel around",
                notes: "totally gotta go here",
                tags: [
                    "Stay"
                ]
            },
            {
                id: 1,
                userID: 1,
                countryID: 3,
                title: "My cool secret place",
                description: "The coolest eating place to eat every to exist",
                notes: "Man the food was super tasty here 100% have to go back and eat here again",
                tags: [
                    "Eat"
                ]
            },
            {
                id: 1,
                userID: 1,
                countryID: 5,
                title: "Golden bridge",
                description: "You know the bridge, I know the beidge we all know the bridge. It's the one destroyed in every movie it is the Golden bridge.",
                notes: undefined,
                tags: [
                    "Sights"
                ]
            }
        ]
    }

    //Get all countries a user has activities for
    getCounrties(UserID) {
        let countriesForUser = this.countries.filter(country => country.userID == UserID);
        let result = presetLocations.getByIDList(countriesForUser.map(place => place.placeID))
        return result;
    }

    //Get all of a users activities for a specific country
    getActivities(UserID, countryID) {
        return this.activityData.filter(activity => activity.userID == UserID && activity.countryID == countryID);
    }

    //Add a new activity to a user and location
    addItem(activity, userID, location) {
        //Create a country in wishlist if this is the first activity for that user in the specified country
        if (!this.countries.find(place => place.id == location.id && place.userID == userID)) {
            this.countries.push({
                userID: userID,
                placeID: location.id
            })
        }
        //Create the activity
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