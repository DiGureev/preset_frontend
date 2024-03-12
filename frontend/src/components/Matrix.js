import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from '../App.js';
import { ForceGraph2D } from 'react-force-graph';
import '../App.css';
import NavButtons from "./NavButtons.js";

const url = "https://priset-api.onrender.com/";

const Matrix = () => {
    const [matrix, setMat] = useState({ nodes: [], links: [] });
    const { file_path, addedWords} = useContext(AppContext);

    useEffect(()=> {
        fetchData();
    }, []);

    const fetchData = async () => {
        let body = {
            words: addedWords,
            path: file_path
        };

        try {
            const response = await axios.post(`${url}matrix`, body);
            let data = response.data;
            const mat = JSON.parse(data.matrix);
            const obj = {};
            obj["nodes"] = mat.nodes;
            obj["links"] = mat.links;
            setMat(obj);

        } catch (error) {
            console.log('There was an error', error);
        }
    }



    return (
        <div className="result-div">
            <h2>Document Word Web</h2>
            <div style={{ width: "60%", margin: "auto"}}>
                <ForceGraph2D
                    graphData={matrix}
                    backgroundColor={'white'}
                    linkColor = {"white"}
                    width={700}
                    height={500}
                    linkWidth={2}
                    nodeAutoColorBy="group"
                    nodeCanvasObject={(node, ctx, globalScale) => {
                        const label = node.id;
                        const fontSize = 12 / globalScale;
                        ctx.font = `${fontSize}px Sans-Serif`;
                        const textWidth = ctx.measureText(label).width;
                        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                        ctx.fillStyle = 'rgba(255, 255, 255, 0)';
                        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

                        // ctx.textAlign = 'center';
                        // ctx.textBaseline = 'middle';
                        ctx.fillStyle = node.color;
                        ctx.fillText(label, node.x, node.y);

                        node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
                    }}
                    nodePointerAreaPaint={(node, color, ctx) => {
                        ctx.fillStyle = color;
                        const bckgDimensions = node.__bckgDimensions;
                        bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
                    }}
                />
            </div>
            <NavButtons/>
        </div>
    )
}

export default Matrix;
