import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { Entypo } from "@expo/vector-icons";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

import Chart from "../components/Chart";
const CoinPage = ({ route }) => {
  const {
    title,
    price,
    image,
    price_change,
    change_percentage,
    pricesBitcoin,
    pricesEthereum,
    pricesTether,
    pricesRipple,
    pricesBinance,
    pricesSolana,
    pricesTerraLuna,
    pricesCardano,
    pricesLitecoin,
    pricesNkn,
  } = route.params;

  //Animation

  const scale = useSharedValue(1.2);
  const scale2 = useSharedValue(1);
  const transformY = useSharedValue(-100);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      position: "absolute",
      top: 5,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    };
  });
  const rArrow = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale2.value }, { translateY: transformY.value }],
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    };
  });

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.1, {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      2,
      true
    );
    transformY.value = withSpring(2, {
      damping: 8,
    });
  }, []);

  // Capitalizing the coin name

  const upperCaseMe = title
    .replace("-", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // assigning prices which prices data to be passed down to the chart component

  const prices =
    title.toString() === "ethereum"
      ? pricesEthereum
      : title.toString() === "bitcoin"
      ? pricesBitcoin
      : title.toString() === "tether"
      ? pricesTether
      : title.toString() === "ripple"
      ? pricesRipple
      : title.toString() === "binancecoin"
      ? pricesBinance
      : title.toString() === "solana"
      ? pricesSolana
      : title.toString() === "terra-luna"
      ? pricesTerraLuna
      : title.toString() === "cardano"
      ? pricesCardano
      : title.toString() === "litecoin"
      ? pricesLitecoin
      : title.toString() === "nkn"
      ? pricesNkn
      : pricesBitcoin;

  return (
    <View style={styles.coinPageWrapper}>
      <Animated.View style={rStyle}>
        <Image source={{ uri: image }} style={{ height: 60, width: 60 }} />
      </Animated.View>
      <Text style={styles.coinStyle}>{upperCaseMe}</Text>
      <View style={styles.infoWrapper}>
        <Text style={[styles.ourFont, { color: "white", fontSize: 37 }]}>
          {Number(price.toFixed(2)).toLocaleString("en-US")}$
        </Text>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={[
              change_percentage < 0 ? styles.redFont : styles.greenFont,
              styles.ourFont,
              { fontSize: 16 },
            ]}
          >
            {price_change.toFixed(2)}$ (
            {change_percentage.toString().charAt(0) == "-"
              ? change_percentage.toFixed(2).toString().slice(1)
              : change_percentage.toFixed(2)}
            %) today
          </Text>
        </View>
        <Animated.View style={rArrow}>
          {change_percentage > 0 ? (
            <Entypo
              name="arrow-bold-up"
              size={34}
              color={change_percentage < 0 ? "red" : "green"}
            />
          ) : (
            <Entypo
              name="arrow-bold-down"
              size={34}
              color={change_percentage < 0 ? "red" : "green"}
            />
          )}
        </Animated.View>
      </View>
      <Chart prices={prices} />
    </View>
  );
};

export default CoinPage;
const styles = StyleSheet.create({
  coinStyle: {
    fontSize: 40,
    color: "white",
    marginBottom: 40,
    transform: [{ translateY: 76 }],

    fontFamily: "Jost_400Regular",
    flex: 1,
  },
  coinPageWrapper: { flex: 1, alignItems: "center", backgroundColor: "black" },
  infoWrapper: {
    flexDirection: "column",
    transform: [{ translateY: -14 }],
    justifyContent: "center",
    alignItems: "center",
  },
  redFont: { color: "red" },
  greenFont: { color: "green" },
  ourFont: {
    fontFamily: "Jost_400Regular",
  },
});
