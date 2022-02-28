import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts, Jost_400Regular } from "@expo-google-fonts/jost";

const Home = ({ navigation }) => {
  // State
  const [coins, setCoins] = useState([]);
  const [coinsBitcoin, setCoinsBitcoin] = useState([]);
  const [coinsEthereum, setCoinsEthereum] = useState([]);
  const [coinsTether, setCoinsTether] = useState([]);
  const [coinsRipple, setCoinsRipple] = useState([]);
  const [coinsBinance, setCoinsBinance] = useState([]);
  const [coinsSolana, setCoinsSolana] = useState([]);
  const [coinsTerraLuna, setCoinsTerraLuna] = useState([]);
  const [coinsCardano, setCoinsCardano] = useState([]);
  const [coinsLitecoin, setCoinsLitecoin] = useState([]);
  const [coinsNkn, setCoinsNkn] = useState([]);

  // Font

  let fontStuff = useFonts({
    Jost_400Regular,
  });

  // API calls

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2Cbitcoin%2Cripple%2Csolana%2Ccardano%2Cterra-luna%2Cbinancecoin%2Cnkn%2Clitecoin&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
      )
      .then((res) => {
        setCoins(res.data);
      });

    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=8&interval=daily"
      )
      .then((res) => {
        setCoinsBitcoin(res.data);
      });
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=8&interval=daily"
      )
      .then((res) => {
        setCoinsEthereum(res.data);
      });
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=usd&days=8&interval=daily"
      )
      .then((res) => {
        setCoinsTether(res.data);
      });
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=usd&days=8&interval=daily"
      )
      .then((res) => {
        setCoinsRipple(res.data);
      });
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/binancecoin/market_chart?vs_currency=usd&days=8&interval=daily"
      )
      .then((res) => {
        setCoinsBinance(res.data);
      });
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=8&interval=daily"
      )
      .then((res) => {
        setCoinsSolana(res.data);
      });
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/terra-luna/market_chart?vs_currency=usd&days=8&interval=daily"
      )
      .then((res) => {
        setCoinsTerraLuna(res.data);
      });
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/cardano/market_chart?vs_currency=usd&days=8&interval=daily"
      )
      .then((res) => {
        setCoinsCardano(res.data);
      });
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/litecoin/market_chart?vs_currency=usd&days=8&interval=daily"
      )
      .then((res) => {
        setCoinsLitecoin(res.data);
      });
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/nkn/market_chart?vs_currency=usd&days=8&interval=daily"
      )
      .then((res) => {
        setCoinsNkn(res.data);
      });
  }, []);

  // Making the shadow under each coin item dynamic

  const marketVibe = coins.map((coin) => coin.market_cap_change_percentage_24h);

  const marketColorNumber =
    marketVibe.reduce((x, y) => x + y, 0).toFixed(3) / coins.length;

  const marketColor =
    marketColorNumber > 5
      ? "rgba(0, 250, 52, 1)"
      : marketColorNumber <= 5 && marketColorNumber >= 2
      ? "rgba(0, 250, 52, 0.77)"
      : marketColorNumber < 2 && marketColorNumber >= 0
      ? "rgba(0, 250, 52, 0.41)"
      : marketColorNumber < 0 && marketColorNumber >= -2
      ? "rgba(255, 0, 52, 0.65)"
      : marketColorNumber < -2 && marketColorNumber >= -5
      ? "rgba(255, 0, 0, 0.83)"
      : marketColorNumber < -5
      ? "rgba(255, 0, 0, 1)"
      : "rgba(0, 0, 0, 1)";

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "black",
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          zIndex: 0,
        }}
      ></View>
      <ScrollView
        bounces={true}
        bouncesZoom={true}
        contentContainerStyle={styles.scrollViewContainer}
      >
        {coins.map((coin) => {
          const upperCaseMe = coin.id
            .replace("-", " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          return (
            <View
              style={[styles.coinItemWrapper, { shadowColor: marketColor }]}
              key={coin.id}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate("CoinPage", {
                    title: coin.id,
                    price: coin.current_price,
                    image: coin.image,
                    low_24: coin.low_24h,
                    high_24: coin.high_24h,
                    price_change: coin.price_change_24h,
                    current_price: coin.current_price,
                    change_percentage: coin.price_change_percentage_24h,

                    pricesBitcoin: coinsBitcoin.prices,
                    pricesEthereum: coinsEthereum.prices,
                    pricesTether: coinsTether.prices,
                    pricesRipple: coinsRipple.prices,
                    pricesBinance: coinsBinance.prices,
                    pricesSolana: coinsSolana.prices,
                    pricesTerraLuna: coinsTerraLuna.prices,
                    pricesCardano: coinsCardano.prices,
                    pricesLitecoin: coinsLitecoin.prices,
                    pricesNkn: coinsNkn.prices,
                  })
                }
                style={styles.coinItemStyle}
              >
                <View style={styles.leftWrapper}>
                  <Image
                    source={{ uri: coin.image }}
                    style={styles.leftWrapperImage}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Jost_400Regular",
                      fontSize: 18,
                    }}
                  >
                    {upperCaseMe}
                  </Text>
                </View>
                <View style={styles.middleWrapper}>
                  <Text
                    style={[
                      coin.price_change_percentage_24h < 0
                        ? styles.redFont
                        : styles.greenFont,
                      {
                        fontFamily: "Jost_400Regular",
                        fontSize: 15,
                        marginRight: 19,
                      },
                    ]}
                  >
                    {coin.price_change_percentage_24h > 0
                      ? coin.price_change_percentage_24h.toFixed(2)
                      : coin.price_change_percentage_24h.toFixed(2)}
                    %
                  </Text>
                </View>
                <View style={styles.rightWrapper}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontFamily: "Jost_400Regular",
                    }}
                  >
                    {coin.current_price > 1
                      ? Number(coin.current_price.toFixed(2)).toLocaleString(
                          "en-US"
                        )
                      : Number(coin.current_price.toFixed(3)).toLocaleString(
                          "en-US"
                        )}
                    $
                  </Text>
                  <AntDesign
                    name="caretright"
                    size={19}
                    color="white"
                    style={{ marginLeft: 9 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollViewContainer: { backgroundColor: "black" },
  container: {},
  coinItemWrapper: {
    shadowOffset: {
      width: 0,
      height: 1,

    },
    shadowOpacity: 0.22,
    shadowRadius: 9.35,
    elevation: 19,
  },
  coinItemStyle: {
    flexDirection: "row",
    backgroundColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 10,

    flex: 1,
    justifyContent: "space-between",
    borderWidth: 0,
    borderTopColor: "black",
  },
  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    minWidth: 100,
    justifyContent: "flex-end",
  },
  middleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 30,
  },
  leftWrapperImage: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  redFont: { color: "rgba(255, 45, 0, 0.8)" },
  greenFont: { color: "rgba(66, 254, 97, 0.8)" },
});
