import React from 'react';
import renderer from 'react-test-renderer';

//Components
import AppButton from 'components/AppButton';
import AppIconButton from 'components/AppIconButton';
import AppModalScreen from 'components/AppModalScreen';
import AppPicker from 'components/AppPicker';
import AppScreen from 'components/AppScreen';
import AppText from 'components/AppText';


//Component tests
describe('AppScreen', () => {
    let testComps = {};

    //Setup
    beforeAll(() => {
        testComps["AppScreen"] = renderer.create(<AppScreen/>).toJSON();
        testComps["AppScreenWithBackGround"] = renderer.create(<AppScreen backgroundImage={require("./testImages/testBackground.jpg")}/>).toJSON();
        testComps["AppScreenContainingAChild"] = renderer.create(<AppScreen>Hello</AppScreen>).toJSON();
    })

    //Tests
    //test no background
    it('no background - renders correctly', () => {
        expect(testComps["AppScreen"]).toMatchSnapshot();
    });

    it('no background -  does not contain image component', () => {
        expect(testComps["AppScreen"].children[0].type).toBe("View");
        expect(testComps["AppScreen"].children[0].children).toBeNull();
    });

    //test back ground
    it('with background - renders correctly', () => {
        expect(testComps["AppScreenWithBackGround"]).toMatchSnapshot();
    });
    it('with background -  contains an image component', () => {
        expect(testComps["AppScreenWithBackGround"].children[0].children[0].type).toBe("Image");
    });

    //test containing a child
    it('with child - renders correctly', () => {
        expect(testComps["AppScreenContainingAChild"]).toMatchSnapshot();
    });
    it('with child - child exists', () => {
        expect(testComps["AppScreenContainingAChild"].children[0].children.includes("Hello")).toMatchSnapshot();
    });
});

describe('AppText', () => {
    let testComps = {};

    //Setup
    beforeAll(() => {
        testComps["AppText"] = renderer.create(<AppText>Hello</AppText>).toJSON();
    })

    //Tests
    it('AppText - renders correctly', () => {
        expect(testComps["AppText"]).toMatchSnapshot();
    });

    it('has 1 child', () => {
        expect(testComps["AppText"].children.length).toBe(1);
    });

    it('has child string \"Hello\"', () => {
        expect(testComps["AppText"].children.includes("Hello")).toBeTruthy();
    }); 
});

describe('AppPicker', () => {
    let testComps = {};

    //Setup
    beforeAll(() => {
        testComps["AppPicker"] = renderer.create(
            <AppPicker
                title={"NONE"}
                selectionOptions={[
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
                    }
                ]}
                onSelect={(tag) => tag}
                buttonStyle={{ width: "85%" }}
                header="Pick a category"
            />
        ).toJSON();
    })

    //Tests
    //Test render
    it('AppPicker - renders correctly', () => {
        expect(testComps["AppPicker"]).toMatchSnapshot();
    });

    //assists to see where error is if error occurs with snapshot if error is to do with expected children
    it('has 2 child', () => {
        expect(testComps["AppPicker"].length).toBe(2);
        expect(testComps["AppPicker"][0].type).toBe("Modal");
        expect(testComps["AppPicker"][1].type).toBe("View");
    });
});

describe('AppModalScreen', () => {
    let testComps = {};

    //Setup
    beforeAll(() => {
        testComps["AppModalScreen - functions no specific"] = renderer.create(
            <AppModalScreen
                active={true}
                activeControl={(value) => value}
            >
                {
                    ({ backButton, closeModal }) => {
                        return `${closeModal} ${backButton}`
                    }
                }
            </AppModalScreen>
        ).toJSON();
        testComps["AppModalScreen - functions specific"] = renderer.create(
            <AppModalScreen
                active={true}
                activeControl={(value) => value}
                backButton={() => "test"}
            >
                {
                    ({ backButton, closeModal }) => {
                        return `${closeModal} ${backButton}`
                    }
                }
            </AppModalScreen>
        ).toJSON();
        testComps["AppModalScreen - active"] = renderer.create(
            <AppModalScreen
                active={true}
                activeControl={(value) => "value to set" + value}
            >
                {
                    ({ backButton }) => {
                        return "test"
                    }
                }
            </AppModalScreen>
        ).toJSON();
        testComps["AppModalScreen - not active"] = renderer.create(
            <AppModalScreen
                active={false}
                activeControl={(value) => "value to set" + value}
            >
                {
                    ({ backButton }) => {
                        return "test"
                    }
                }
            </AppModalScreen>
        ).toJSON();
    })

    //Test active AppModalScreen
    it('AppModalScreen active - renders correctly', () => {
        expect(testComps["AppModalScreen - active"]).toMatchSnapshot();
    });

    it('AppModalScreen active - has 1 child', () => {
        expect(testComps["AppModalScreen - active"].children.length).toBe(1);
        expect(testComps["AppModalScreen - active"].children[0]).toBe("test");
    });

    //Test inactive AppModalScreen
    it('AppModalScreen not active - renders correctly', () => {
        expect(testComps["AppModalScreen - not active"]).toMatchSnapshot();
    });

    it('AppModalScreen not active - has 1 child', () => {
        expect(testComps["AppModalScreen - not active"].children.length).toBe(1);
        expect(testComps["AppModalScreen - not active"].children[0]).toBe("test");
    });

    //Test when backButton function is not specified
    it('AppModalScreen functions no specific - closeModal and backbutton are the same function', () => {
        expect(testComps["AppModalScreen - functions no specific"].children.length).toBe(1);
        expect(testComps["AppModalScreen - functions no specific"]).toMatchSnapshot();
    });

    //Test when backButton function is specified
    it('AppModalScreen functions specific - closeModal and backbutton are different functions', () => {
        expect(testComps["AppModalScreen - functions specific"].children.length).toBe(1);
        expect(testComps["AppModalScreen - functions specific"]).toMatchSnapshot();
    });
});

describe('AppIconButton', () => {
    let testComps = {};

    //Setup
    beforeAll(() => {
        testComps["AppIconButton"] = renderer.create(<AppIconButton name="arrow-left" size={20} onPress={() => "test"}/>).toJSON();
    })

    //Tests
    it('renders correctly', () => {
        expect(testComps["AppIconButton"]).toMatchSnapshot();
    });
});

describe('AppButton', () => {
    let testComps = {};

    //Setup
    beforeAll(() => {
        testComps["AppIconButton - disabled"] = renderer.create(<AppButton title="test" onPress={() => "test"} disabled={true}/>).toJSON();
        testComps["AppIconButton - enabled"] = renderer.create(<AppButton title="test" onPress={() => "test"} disabled={false}/>).toJSON();
    })

    //Tests
    //Test button disabled (should mainly change style)
    it('disabled button - renders correctly', () => {
        expect(testComps["AppIconButton - disabled"]).toMatchSnapshot();
    });

    //Test button enabled (should mainly change style)
    it('enabled button - renders correctly', () => {
        expect(testComps["AppIconButton - enabled"]).toMatchSnapshot();
    });
});