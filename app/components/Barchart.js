"use client"
import { ResponsiveBar } from "@nivo/bar";

const data = [
  {
    "country": "AD",
    "hot dog": 58,
    "hot dogColor": "hsl(181, 70%, 50%)",
    "burger": 16,
    "burgerColor": "hsl(127, 70%, 50%)",
    "sandwich": 8,
    "sandwichColor": "hsl(126, 70%, 50%)",
    "kebab": 136,
    "kebabColor": "hsl(44, 70%, 50%)",
    "fries": 84,
    "friesColor": "hsl(319, 70%, 50%)",
    "donut": 187,
    "donutColor": "hsl(105, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 123,
    "hot dogColor": "hsl(190, 70%, 50%)",
    "burger": 80,
    "burgerColor": "hsl(346, 70%, 50%)",
    "sandwich": 53,
    "sandwichColor": "hsl(135, 70%, 50%)",
    "kebab": 40,
    "kebabColor": "hsl(293, 70%, 50%)",
    "fries": 68,
    "friesColor": "hsl(349, 70%, 50%)",
    "donut": 200,
    "donutColor": "hsl(216, 70%, 50%)"
  },
  {
    "country": "AF",
    "hot dog": 123,
    "hot dogColor": "hsl(277, 70%, 50%)",
    "burger": 134,
    "burgerColor": "hsl(75, 70%, 50%)",
    "sandwich": 160,
    "sandwichColor": "hsl(273, 70%, 50%)",
    "kebab": 26,
    "kebabColor": "hsl(173, 70%, 50%)",
    "fries": 50,
    "friesColor": "hsl(88, 70%, 50%)",
    "donut": 106,
    "donutColor": "hsl(189, 70%, 50%)"
  },
  {
    "country": "AG",
    "hot dog": 182,
    "hot dogColor": "hsl(28, 70%, 50%)",
    "burger": 138,
    "burgerColor": "hsl(164, 70%, 50%)",
    "sandwich": 143,
    "sandwichColor": "hsl(85, 70%, 50%)",
    "kebab": 17,
    "kebabColor": "hsl(359, 70%, 50%)",
    "fries": 181,
    "friesColor": "hsl(342, 70%, 50%)",
    "donut": 111,
    "donutColor": "hsl(37, 70%, 50%)"
  },
  {
    "country": "AI",
    "hot dog": 36,
    "hot dogColor": "hsl(69, 70%, 50%)",
    "burger": 199,
    "burgerColor": "hsl(262, 70%, 50%)",
    "sandwich": 164,
    "sandwichColor": "hsl(148, 70%, 50%)",
    "kebab": 22,
    "kebabColor": "hsl(113, 70%, 50%)",
    "fries": 118,
    "friesColor": "hsl(115, 70%, 50%)",
    "donut": 65,
    "donutColor": "hsl(273, 70%, 50%)"
  },
  {
    "country": "AL",
    "hot dog": 162,
    "hot dogColor": "hsl(350, 70%, 50%)",
    "burger": 4,
    "burgerColor": "hsl(76, 70%, 50%)",
    "sandwich": 105,
    "sandwichColor": "hsl(221, 70%, 50%)",
    "kebab": 4,
    "kebabColor": "hsl(12, 70%, 50%)",
    "fries": 140,
    "friesColor": "hsl(14, 70%, 50%)",
    "donut": 92,
    "donutColor": "hsl(112, 70%, 50%)"
  },
  {
    "country": "AM",
    "hot dog": 73,
    "hot dogColor": "hsl(278, 70%, 50%)",
    "burger": 177,
    "burgerColor": "hsl(60, 70%, 50%)",
    "sandwich": 100,
    "sandwichColor": "hsl(231, 70%, 50%)",
    "kebab": 152,
    "kebabColor": "hsl(120, 70%, 50%)",
    "fries": 117,
    "friesColor": "hsl(53, 70%, 50%)",
    "donut": 187,
    "donutColor": "hsl(151, 70%, 50%)"
  }
]
const Barchart = () => (
  <ResponsiveBar
    data={data}
    keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
    indexBy="country"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "nivo" }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "fries",
        },
        id: "dots",
      },
      {
        match: {
          id: "sandwich",
        },
        id: "lines",
      },
    ]}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "country",
      legendPosition: "middle",
      legendOffset: 32,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "food",
      legendPosition: "middle",
      legendOffset: -40,
      truncateTickAt: 0,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={(e) =>
      e.id + ": " + e.formattedValue + " in country: " + e.indexValue
    }
  />
);

export default Barchart