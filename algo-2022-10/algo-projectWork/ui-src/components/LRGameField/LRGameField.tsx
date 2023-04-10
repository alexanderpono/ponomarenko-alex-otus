import { GameField } from '@ui-src/GameField';
import { Graph, RenderOptions } from '@ui-src/Graph';
import React from 'react';
import { GRField } from '../../GR/GRField';
import { GRGraph } from '../../GR/GRGraph';

interface LRGameFieldProps {
    field: GameField;
    graph: Graph;
    render: RenderOptions;
    id: string;
    title: string;
}

export const LRGameField: React.FC<LRGameFieldProps> = ({
    field,
    graph,
    render: startRender,
    id,
    title
}) => {
    const canvasRef = React.useRef(null);

    let canvas: HTMLCanvasElement | null = null;
    let context: CanvasRenderingContext2D | null = null;

    const [nodesChecked, setNodesChecked] = React.useState(startRender.nodes);
    const [linesChecked, setLinesChecked] = React.useState(startRender.lines);
    const [pathChecked, setPathChecked] = React.useState(startRender.path);
    const [nodesCostChecked, setNodesCostChecked] = React.useState(startRender.nodesCost);
    const [mapChecked, setMapChecked] = React.useState(startRender.map);
    const nodesClicked = () => setNodesChecked(!nodesChecked);
    const linesClicked = () => setLinesChecked(!linesChecked);
    const pathClicked = () => setPathChecked(!pathChecked);
    const nodesCostClicked = () => setNodesCostChecked(!nodesCostChecked);
    const mapClicked = () => setMapChecked(!mapChecked);
    const [picLoaded, setPicLoaded] = React.useState(false);
    const [pic] = React.useState(new Image());

    React.useEffect(() => {
        pic.src = 'sprite.png';

        pic.onload = function () {
            setPicLoaded(true);
        };
    }, []);

    React.useEffect(() => {
        if (!picLoaded) {
            return;
        }

        canvas = canvasRef.current as unknown as HTMLCanvasElement;
        if (canvas === null) {
            return;
        }
        context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.fillStyle = 'orange';
        context.strokeStyle = '#FF0000';
        context.lineWidth = 3;
        context.strokeRect(0, 0, canvas.width, canvas.height);

        if (canvas === null || context === null) {
            return;
        }

        const options: RenderOptions = {
            nodes: nodesChecked,
            lines: linesChecked,
            path: pathChecked,
            nodesCost: nodesCostChecked,
            map: mapChecked
        };

        GRField.create(context, field, pic, options).draw();
        GRGraph.create(context, field, graph, options).draw();
    }, [picLoaded, nodesChecked, linesChecked, pathChecked, nodesCostChecked, mapChecked]);

    return (
        <div>
            <h1>{title}</h1>
            <canvas height="320" width="670" id="GraphUI" ref={canvasRef}></canvas>
            <fieldset>
                <legend>Отображать</legend>
                {Label(nodesChecked, nodesClicked, `${id}-nodes`, 'Узлы сетки')}
                {Label(linesChecked, linesClicked, `${id}-lines`, 'Линии сетки')}
                {Label(pathChecked, pathClicked, `${id}-path`, 'Траектория')}
                {Label(nodesCostChecked, nodesCostClicked, `${id}-nodesCost`, 'Стоимость узлов')}
                {Label(mapChecked, mapClicked, `${id}-map`, 'Карта')}
            </fieldset>
        </div>
    );
};

function Label(val: boolean, setter: () => void, id: string, caption: string) {
    return (
        <label htmlFor={id}>
            <input type="checkbox" checked={val} onChange={setter} id={id} />
            {caption}
        </label>
    );
}
