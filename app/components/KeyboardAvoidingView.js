import React, { useEffect, useRef } from "react";

import { Keyboard, Animated, View } from "react-native";

function KeyboardAvoidingView({children, maxPushUp=0, style}) {
    const formHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Keyboard.addListener("keyboardDidShow", keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", keyboardDidHide);
  
      // cleanup function
      return () => {
        Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
        Keyboard.removeListener("keyboardDidHide", keyboardDidHide);
      };
    }, []);
  
    const keyboardDidShow = (event) => {
        Animated.timing(formHeight, {
            duration: event.duration,
            toValue: maxPushUp ? Math.max(-event.endCoordinates.height, -maxPushUp):-event.endCoordinates.height,
            useNativeDriver: true
        }).start();
    };
  
    const keyboardDidHide = (event) => {
      Animated.timing(formHeight, {
        duration: event.duration,
        toValue: 0,
        useNativeDriver: true
      }).start();
    };
  
    return (<Animated.View style={[{ translateY: formHeight }]}><View style={style}>{children}</View></Animated.View>);
}
  
export default KeyboardAvoidingView;