//React native
import React, { useEffect, useRef } from "react";
import { Keyboard, Animated, View } from "react-native";

function KeyboardAvoidingView({children, maxPushUp=0, style}) {
    //Get keyboard height
    const keyboardHeight = useRef(new Animated.Value(0)).current;

    //Set/unset listeners for keyboard
    useEffect(() => {
      Keyboard.addListener("keyboardDidShow", keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", keyboardDidHide);
  
      //Cleanup function
      return () => {
        Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
        Keyboard.removeListener("keyboardDidHide", keyboardDidHide);
      };
    }, []);

    //Animate based on keyboard event
    const keyboardDidShow = (event) => {
        Animated.timing(keyboardHeight, {
            duration: event.duration,
            toValue: maxPushUp ? Math.max(-event.endCoordinates.height, -maxPushUp):-event.endCoordinates.height,
            useNativeDriver: true
        }).start();
    };
    const keyboardDidHide = (event) => {
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: 0,
        useNativeDriver: true
      }).start();
    };

    //Surround children in animated view
    return (<Animated.View style={[{ translateY: keyboardHeight }]}><View style={style}>{children}</View></Animated.View>);
}
  
export default KeyboardAvoidingView;