// Konfiguration: Die PLZ der Geschäftsstelle
const OFFICE_ZIP = "70173"; // Beispiel (Stuttgart)

// Hilfsfunktion: Umschalten der Adressfelder
function toggleAddress(show) {
    const addressDiv = document.getElementById('addressFields');
    const zipInput = document.getElementById('zipCode');
    const streetInput = document.getElementById('street');

    if (show) {
        addressDiv.classList.remove('d-none'); // Einblenden
        zipInput.setAttribute('required', 'required'); // Pflichtfeld machen
        streetInput.setAttribute('required', 'required');
    } else {
        addressDiv.classList.add('d-none'); // Ausblenden
        zipInput.removeAttribute('required');
        streetInput.removeAttribute('required');
        zipInput.value = ''; // Reset
    }
}

// Event Listener für das Absenden des Formulars
document.getElementById('donationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Verhindert das Neuladen der Seite

    // Werte auslesen
    const isPickup = document.getElementById('typePickup').checked;
    const clothesType = document.getElementById('clothesType').value;
    const region = document.getElementById('crisisRegion').value;
    const zip = document.getElementById('zipCode').value;
    const street = document.getElementById('street').value;
    const zipError = document.getElementById('zipError');

    // Validierung für Abholung (Anforderung h)
    if (isPickup) {
        // Prüfe ob die ersten 2 Ziffern übereinstimmen
        const officePrefix = OFFICE_ZIP.substring(0, 2);
        const userPrefix = zip.substring(0, 2);

        if (userPrefix !== officePrefix) {
            zipError.classList.remove('d-none');
            return; // Stoppt hier
        } else {
            zipError.classList.add('d-none');
        }
    }

    // Wenn alles ok ist: Bestätigung anzeigen (Anforderung i)
    const now = new Date();
    const timestamp = now.toLocaleDateString() + " um " + now.toLocaleTimeString() + " Uhr";
    
    let locationText = "Geschäftsstelle";
    if(isPickup) {
        locationText = `Abholung bei: ${street}, ${zip}`;
    }

    // Zusammenfassung bauen
    const summaryHtml = `
        <strong>Art:</strong> ${clothesType}<br>
        <strong>Krisengebiet:</strong> ${region}<br>
        <strong>Zeitpunkt:</strong> ${timestamp}<br>
        <strong>Ort:</strong> ${locationText}
    `;

    document.getElementById('summary').innerHTML = summaryHtml;
    
    // Umschalten der Ansicht
    document.getElementById('registration-section').classList.add('d-none');
    document.getElementById('success-section').classList.remove('d-none');
});