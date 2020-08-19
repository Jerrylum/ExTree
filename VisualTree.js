function printTitle(title) {
    let p = document.createElement("p");
    p.innerText = title;

    let area = document.querySelector("#Steps");
    area.appendChild(p);
}

function paintTree(tree, brief="") {
    const level = tree.root ? tree.root.height + 1 : 0;

    const canvas_margin = 10;
    const node_width = 30;
    const node_split_space = 10;

    function calcCanvasWidth(tree) {
        if (level == 0) return 60;
        return canvas_margin + (2 ** (level - 1)) * (node_width + node_split_space) + canvas_margin;
    }

    const canvas_width = calcCanvasWidth(tree);
    const canvas_height = level * (12 + 30);

    let canvas = document.createElement("canvas");
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    let ctx = canvas.getContext("2d");
    ctx.font = "12px Arial";


    if (tree.root) {
        const array = tree.array();
        const tree_height = tree.root.height;
        let height = 0;
        let rootIndex = 0;
        let maxIndex = 1;

        while (height <= tree_height) {
            const level_margin = (canvas_width - canvas_margin * 2) / (maxIndex); // be careful
            const next_level_margin = (canvas_width - canvas_margin * 2) / (maxIndex * 2);

            const draw_text_y = height * (12 + 30) + 20;
            const next_draw_line_end_y = (height + 1) * (12 + 30) + 5;

            for (var index = 0; index < maxIndex; index++) {
                const value = array[rootIndex + index];
                if (value == null) continue; // detect undefined or null

                const draw_text_x = canvas_margin +
                    index * (level_margin) +
                    level_margin / 2 -
                    ctx.measureText(value).width / 2;



                function nodeDrawLine(p, d) {
                    const loc = 2 * p + d;
                    if (array.length > loc && array[loc] != null) {
                        const draw_line_start_x = canvas_margin +
                            index * (level_margin) +
                            level_margin / 2;
                        const draw_line_end_x = canvas_margin +
                            (index * 2 + d - 1) * (next_level_margin) +
                            next_level_margin / 2;

                        ctx.beginPath();
                        ctx.moveTo(draw_line_start_x, draw_text_y + 5);
                        ctx.lineTo(draw_line_end_x, next_draw_line_end_y);
                        ctx.stroke();
                    }
                }

                ctx.fillText(value + "", draw_text_x, draw_text_y);

                nodeDrawLine(rootIndex + index, 1); // left
                nodeDrawLine(rootIndex + index, 2); // right
            }

            height++;
            rootIndex = 2 ** height - 1;
            maxIndex *= 2;
        }
    }

    var span = document.createElement("span");
    span.innerText = brief;

    var area = document.querySelector("#Steps")

    area.appendChild(span);
    area.appendChild(canvas);

    updateInfomation(tree);
}

function updateInfomation(tree) {
    var preOrder = document.querySelector("#Information #PreOrder");
    var inOrder = document.querySelector("#Information #InOrder");
    var postOrder = document.querySelector("#Information #PostOrder");
    var treeArray = document.querySelector("#TreeArray");

    preOrder.innerText = tree.traversePreOrder().join(", ");
    inOrder.innerText = tree.traverseInOrder().join(", ");
    postOrder.innerText = tree.traversePostOrder().join(", ");

    //treeArray.innerText = tree.array().join(", ");

    let rtn = tree.array();


    let idx_tr = document.querySelector("#TreeArray #IdxTr");
    idx_tr.innerHTML = ""; // remove all children

    let content_tr = document.querySelector("#TreeArray #ContentTr");
    content_tr.innerHTML = ""; // remove all children

    for (let i = 0; i < rtn.length; i++) {
        let idx_td = document.createElement("td");
        idx_td.innerText = i + "";

        let content_td = document.createElement("td");
        let value = rtn[i];
        content_td.innerText = value == null ? "" : value + "";

        idx_tr.appendChild(idx_td);
        content_tr.appendChild(content_td);
    }

}