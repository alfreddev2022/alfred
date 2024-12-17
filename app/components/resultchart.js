"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Resultchart = ({ params }) => {
    const [product, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const nomiArr = params.split(",");
    const splitdArr = nomiArr[0].split("%2C");
    const nomi = product.filter((e) => e.organizerid == splitdArr[1]);
    const rNom = nomi.filter(
        (e) => e.category == splitdArr[0].split("%20").toString().replaceAll(",", " ")
    );
    const Cname = splitdArr[0].split("%20").toString().replaceAll(",", " ");

    // Prepare data for the chart
    const dt = rNom
        .map((e) => ({ name: e.name, vote: e.votes }))
        .sort((a, b) => a.vote - b.vote);

    // Get the max vote value for scaling
    const maxVotes = Math.max(...dt.map((d) => d.vote), 0);
    const keys = ["vote"];

    useEffect(() => {
        axios
            .get("https://api.allvotesgh.com/organizer/nominee")
            .then((response) => {
                setProducts(response.data.nominees[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <div
            className="w-[100vw] h-[100vh] p-4 sm:w-[90vw] sm:h-[90vh] lg:p-[100px] overflow-hidden flex flex-col items-center"
        >
            <h2 className="text-center text-lg sm:text-xl font-semibold mb-4">
                {Cname} Votes
            </h2>
            {!loading && (
                <div className="w-full h-full">
                    <ResponsiveBar
                        data={dt}
                        keys={keys}
                        indexBy="name"
                        margin={{
                            top: 50,
                            right: 30,
                            bottom: 50,
                            left: 100,
                        }}
                        padding={dt.length > 10 ? 0.2 : 0.4} // Reduce padding for large datasets
                        layout="horizontal"
                        valueScale={{ type: "linear", min: 0, max: maxVotes + 10 }} // Dynamically scale values
                        indexScale={{ type: "band", round: true }}
                        colors={({ data }) => {
                            const maxVote = Math.max(...dt.map((d) => d.vote));
                            const minVote = Math.min(...dt.map((d) => d.vote));

                            if (data.vote === maxVote) return "green"; // Highest bar
                            if (data.vote === minVote) return "red";   // Lowest bar
                            return "yellow";                           // Other bars
                        }}
                        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                        axisTop={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: window.innerWidth < 640 ? -30 : 0, // Rotate ticks on mobile
                            legend: "Votes",
                            legendPosition: "middle",
                            legendOffset: 32,
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Nominees",
                            legendPosition: "middle",
                            legendOffset: -40,
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        enableLabel={true}
                        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
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
                            `${e.id}: ${e.formattedValue} votes for ${e.indexValue}`
                        }
                    />
                </div>
            )}
            {loading && (
                <div className="mt-20 w-full flex flex-col gap-2">
                    <Skeleton width="100%" height={40} />
                    <Skeleton width="100%" height={40} />
                    <Skeleton width="100%" height={40} />
                    <Skeleton width="90%" height={40} />
                </div>
            )}
        </div>
    );
};

export default Resultchart;