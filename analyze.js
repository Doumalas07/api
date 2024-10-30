document.getElementById("loadButton").addEventListener("click", loadJsonFile);
document.getElementById("exportButton").addEventListener("click", exportToExcel);

async function loadJsonFile() {
    const fileInput = document.getElementById("jsonFileInput").files[0];
    if (!fileInput) {
        alert("Veuillez sélectionner un fichier JSON.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const jsonData = JSON.parse(event.target.result);
        displayData(jsonData);
    };
    reader.readAsText(fileInput);
}

function displayData(data) {
    displayMainTable(data);
    displayTraccarTable(data);
}

// Remplir la table principale avec les dispositifs et capteurs
function displayMainTable(data) {
    const mainTableBody = document.getElementById("main-table").querySelector("tbody");
    mainTableBody.innerHTML = ""; // Vider le contenu précédent
    data.forEach((group) => {
        group.items.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.lat}</td>
                <td>${item.lng}</td>
                <td>${item.total_distance || "N/A"}</td>
                <td>${item.sensors?.find(sensor => sensor.type === "satellites")?.value || "N/A"}</td>
                <td>${item.sensors?.find(sensor => sensor.type === "battery")?.value || "N/A"}</td>
                <td>${item.sensors?.find(sensor => sensor.type === "gsm")?.value || "N/A"}</td>
                <td>${item.sensors?.find(sensor => sensor.type === "acc")?.value || "N/A"}</td>
                <td>${item.sensors?.find(sensor => sensor.type === "odometer")?.value || "N/A"}</td>
                <td>${item.sensors?.find(sensor => sensor.type === "temperature")?.value || "N/A"}</td>
                <td>${item.sensors?.find(sensor => sensor.type === "engine")?.value || "N/A"}</td>
                <td>${item.sensors?.find(sensor => sensor.type === "load")?.value || "N/A"}</td>
                <td>${item.sensors?.find(sensor => sensor.type === "textual")?.value || "N/A"}</td>
                <td>${item.sensors?.find(sensor => sensor.type === "engine_hours")?.value || "N/A"}</td>
                <td>${item.sensors?.find(sensor => sensor.type === "fuel_tank")?.value || "N/A"}</td>
            `;
            mainTableBody.appendChild(row);
        });
    });
}

// Remplir la table de Traccar avec les nouvelles colonnes
function displayTraccarTable(data) {
    const traccarTableBody = document.getElementById("traccar-table").querySelector("tbody");
    traccarTableBody.innerHTML = ""; // Vider le contenu précédent
    data.forEach((group) => {
        group.items.forEach((item) => {
            const traccar = item.device_data.traccar;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${traccar.name}</td>
                <td>${traccar.lastValidLatitude}</td>
                <td>${traccar.lastValidLongitude}</td>
                <td>${traccar.uniqueId || "N/A"}</td>
                <td>${traccar.time || "N/A"}</td>
                <td>${traccar.device_time || "N/A"}</td>
                <td>${traccar.protocol || "N/A"}</td>
                <td>${traccar.latest_positions || "N/A"}</td>
            `;
            traccarTableBody.appendChild(row);
        });
    });
}

// Exporter les tables en fichier Excel
function exportToExcel() {
    const mainTable = document.getElementById("main-table");
    const traccarTable = document.getElementById("traccar-table");

    const workbook = XLSX.utils.book_new();

    const mainSheet = XLSX.utils.table_to_sheet(mainTable);
    XLSX.utils.book_append_sheet(workbook, mainSheet, "Dispositifs et Capteurs");

    const traccarSheet = XLSX.utils.table_to_sheet(traccarTable);
    XLSX.utils.book_append_sheet(workbook, traccarSheet, "Traccar");

    // Générer un nom de fichier avec la date actuelle
    const filename = "data_export_" + new Date().toISOString().slice(0, 10) + ".xlsx";
    XLSX.writeFile(workbook, filename);
}
