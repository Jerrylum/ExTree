var t;

function eventTreeTypeChange() {
    let option = document.getElementById("TreeType").value;

    if (option == "bst") {
        t = new Tree();
    } else if (option == "avl") {
        t = new AvlTree();
    }

    document.getElementById("Steps").innerHTML = "";
    updateInfomation(t);
}

function eventInsertFieldChange(event) {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();

        let field = document.getElementById("InsertField");

        let value = field.value;

        field.value = "";

        value = value.replace(/\s/gi, "");

        let nodes = value.split(",");

        for (let idx in nodes) {
            const node = nodes[idx];
            if (node != "") t.insert(node);
        }
    }
}

function eventDeleteFieldChange(event) {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();

        let field = document.getElementById("DeleteField");

        let value = field.value;

        field.value = "";

        value = value.replace(/\s/gi, "");

        nodes = value.split(",");

        for (let idx in nodes) {
            const node = nodes[idx];
            if (node != "") t.remove(node);
        }
    }
}

eventTreeTypeChange(); // trigger once at the beginning
