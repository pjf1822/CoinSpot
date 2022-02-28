import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const Header = () => {
  const spinny = useSharedValue(0);
  const handleRotation = () => {
    "worklet";
    return `${spinny.value * 2 * Math.PI}rad`;
  };

  const rSpin = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: handleRotation(spinny) }],
      backgroundColor: "#212121",
      opacity: 0.6,
      borderRadius: 20,
      shadowColor: "white",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 12.35,
      elevation: 19,

      height: 100,
      width: 100,
    };
  });
  useEffect(() => {
    spinny.value = withRepeat(
      withTiming(1, {
        duration: 15000,
      }),
      -1,
      true
    );
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#000000",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        height: 170,
        zIndex: 999,
      }}
    >
      <Animated.View style={[rSpin, styles.positionAbsol]}></Animated.View>
      <View
        style={[
          styles.positionAbsol,
          {
            borderRadius: 40,
            height: 100,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          },
        ]}
      >
        <Image
          source={require("../assets/logo_size_invert_new.jpg")}
          style={{
            height: 150,
            width: 150,
            borderRadius: 100,
            zIndex: 99,
            resizeMode: "cover",
          }}
        />
      </View>
      <View
        style={{
          borderRadius: 80,
          marginRight: 2,
        }}
      >
        <Image
          source={require("../assets/tag-removebg-preview.png")}
          style={{
            height: 60,
            width: 290,
            zIndex: 99,
            resizeMode: "cover",
            borderRadius: 20,
            transform: [{ rotate: "4deg" }],
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  positionAbsol: {
    position: "absolute",
    top: 54,
    left: 20,
    transform: [{ scale: 0.8 }],
  },
});
