"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Resultchart = ({ params }) => {
    const [product, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const nomiArr = params.split(',');
    const slpitdArr = nomiArr[0].split('%2C');
    const nomi = product.filter(e => e.organizerid == slpitdArr[1]);
    const rNom = nomi.filter(e => e.category == slpitdArr[0].split('%20').toString().replaceAll(',', ' '));
    const Cname = slpitdArr[0].split('%20').toString().replaceAll(',', ' ');

    const dt = rNom.map(e => { return { name: e.name, vote: e.votes } }).sort((a, b) => a.vote - b.vote);
    const keys = ["vote"];

    useEffect(() => {
        axios
            .get("https://4178h52b-3004.euw.devtunnels.ms/organizer/nominee")
            .then((response) => {
                setProducts(response.data.nominees[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <div className="w-[80vw] h-[90vh] text-[1em] py-[20px] lg:p-[100px] overflow-hidden">
            <h2 className="text-center">{Cname} Votes</h2>
            {!loading && <ResponsiveBar
                data={dt}
                keys={keys}
                indexBy="name"
                margin={{ top: 50, right: 100, bottom: 50, left: 190 }}
                padding={0.5}
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={"green"}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}

                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Votes',
                    legendPosition: 'middle',
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Nominees',
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e => `${e.id}: ${e.formattedValue} votes for ${e.indexValue}`}
            />}
            {loading && (
                <div className="mt-20 flex-col flex gap-2">
                    <Skeleton width={350} height={40} />
                    <Skeleton width={370} height={40} />
                    <Skeleton width={350} height={40} />
                    <Skeleton width={300} height={40} />
                </div>
            )}
        </div>
    );
}

export default Resultchart;