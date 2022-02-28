import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const Chart = ({ prices }) => {
  // Date Configuration
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dataReconfig = prices.map((price) => price[1]);

  return (
    <View>
      <LineChart
        data={{
          labels: [
            `${mm.slice(1)}/${dd - 7}`,
            `${mm.slice(1)}/${dd - 6}`,
            `${mm.slice(1)}/${dd - 5}`,
            `${mm.slice(1)}/${dd - 4}`,
            `${mm.slice(1)}/${dd - 3}`,
            `${mm.slice(1)}/${dd - 2}`,
            `${mm.slice(1)}/${dd - 1}`,
            `${mm.slice(1)}/${dd}`,
          ],
          datasets: [
            {
              data: [
                dataReconfig[0].toFixed(4),
                dataReconfig[1].toFixed(4),
                dataReconfig[2].toFixed(4),
                dataReconfig[3].toFixed(4),
                dataReconfig[4].toFixed(4),
                dataReconfig[5].toFixed(4),
                dataReconfig[6].toFixed(4),
                dataReconfig[7].toFixed(4),
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width + 10}
        height={400}
        yAxisLabel="$"
        yAxisSuffix=""
        yAxisInterval={200}
        chartConfig={{
          backgroundColor: "black",
          backgroundGradientFrom: "black",
          backgroundGradientTo: "black",
          fillShadowGradientFrom: "black",
          fillShadowGradientTo: "blue",
          fillShadowGradientFromOpacity: 0.3,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "2",
            strokeWidth: "2",
            stroke: "rgba(233, 254, 243, 0.7)",
          },
        }}
        bezier
        style={{
          marginVertical: 0,
          borderRadius: 16,
          transform: [{ translateX: 4 }],
        }}
      />
      <View
        style={{
          height: Dimensions.get("window").height / 2.2,
          position: "absolute",
          width: 24,
          backgroundColor: "black",
          right: 0,
          bottom: 0,
        }}
      ></View>
    </View>
  );
};

export default Chart;
