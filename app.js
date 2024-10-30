let jsonData = [];

// Fonction pour appeler l'API et afficher les données
async function fetchJsonData() {
    try {
        const response = await fetch('https://freetrack.di-oxygene.com/api/get_devices?email=gestcarb1@polerd.com&password=Gestcarb1@polerd&user_api_hash=$2y$10$epQDi0gaB529UL.RquZA9uyNlqJooySxyot6P2wOOmV/NAxIhG5oW');
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        jsonData = await response.json();
        document.getElementById('json-display').value = JSON.stringify(jsonData, null, 4); // Affichage dans le textarea
    } catch (error) {
        console.error('Erreur lors de l\'appel API:', error);
        alert('Erreur lors de l\'appel API. Veuillez réessayer.');
    }
}

// Fonction pour télécharger les données JSON sous forme de fichier
function downloadJson() {
    if (jsonData.length === 0) {
        alert('Aucune donnée à télécharger.');
        return;
    }
    const dataStr = JSON.stringify(jsonData, null, 4);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    alert('Fichier JSON téléchargé avec succès.');
}
