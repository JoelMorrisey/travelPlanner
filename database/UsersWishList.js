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
                    "Sleep"
                ]
            },
            {
                id: 2,
                userID: 2,
                countryID: 1,
                title: "Hotel awesome",
                description: "The coolest hotel around",
                notes: "Another user told me about this place so I noted it here!!!!",
                tags: [
                    "Sleep"
                ]
            },
            {
                id: 3,
                userID: 1,
                countryID: 1,
                title: "cool hotel",
                description: "The 2nd coolest hotel around",
                notes: "totally gotta go here",
                tags: [
                    "Sleep"
                ]
            },
            {
                id: 4,
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
                id: 5,
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

        //Ensure all IDs are unique
        this.activityNextID = this.activityData.length+1;
    }

    getActivityByID(id) {
        return this.activityData.find(activity => activity.id === id);
    }

    //Get all countries a user has activities for
    getCounrties(UserID) {
        let countriesForUser = this.countries.filter(country => country.userID === UserID);
        let result = presetLocations.getByIDList(countriesForUser.map(place => place.placeID))
        return result;
    }

    //Get all of a users activities for a specific country
    getActivities(UserID, countryID) {
        return this.activityData.filter(activity => activity.userID === UserID && activity.countryID === countryID);
    }

    //Add a new activity to a user and location
    addItem(activity, userID, location) {
        //Create a country in wishlist if this is the first activity for that user in the specified country
        if (!this.countries.find(place => place.placeID === location.id && place.userID === userID)) {
            console.log("here");
            this.countries.push({
                userID: userID,
                placeID: location.id
            })
        }
        //Create the activity
        this.activityData.push({
            id: this.activityNextID,
            userID: userID,
            countryID: location.id,
            title: activity.title,
            tags: activity.tags,
            description: activity.description,
            notes: activity.notes,
        })
        this.activityNextID++;
    }

    //Edit a activity
    editItem(id, activity, userID, location) {
        for (let i = 0; i<this.activityData.length; i++) {
            if (this.activityData[i].id === id && this.activityData[i].userID === userID) {
                this.activityData[i] = {
                    id: this.activityData.length+1,
                    userID: userID,
                    countryID: location.id,
                    title: activity.title,
                    tags: activity.tags,
                    description: activity.description,
                    notes: activity.notes,
                }
                break;
            }
        }
    }

    //Delete a activity
    deleteItem(id, userID) {
        let countryID;
        for (let i = 0; i<this.activityData.length; i++) {
            if (this.activityData[i].id === id && this.activityData[i].userID === userID) {
                countryID = this.activityData[i].countryID;
                this.activityData.splice(i, 1);
                break;
            }
        }
        if (this.getActivities(countryID, userID).length === 0) {
            for (let i = 0; i<this.countries.length; i++) {
                if (this.countries[i].placeID === countryID && this.countries[i].userID === userID) {
                    this.countries.splice(i, 1);
                    break;
                }
            }
        }
    }
}