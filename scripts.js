document.addEventListener("DOMContentLoaded", () => {
    let co2Data = [];
    const co2Table = document.getElementById("co2Table");
    const searchInput = document.getElementById("searchInput");
    const languageDropdownItems = document.querySelectorAll('.dropdown-item');
    const currentLanguageDisplay = document.getElementById("currentLanguage");

    const homeContent = document.getElementById("homeContent");
    const co2Content = document.getElementById("co2Content");
    const aboutUsContent = document.getElementById("aboutUsContent");
    const contactContent = document.getElementById("contactContent");
    const homeLink = document.getElementById("homeLink");
    const co2Link = document.getElementById("co2Link");
    const aboutUsLink = document.getElementById("aboutUsLink");
    const contactLink = document.getElementById("contactLink");
    const legalNoticeLink = document.getElementById("legalNoticeLink");
    const impressumLink = document.getElementById("impressumLink");
    const datenschutzLink = document.getElementById("datenschutzLink");
    const legalNoticeContent = document.getElementById("legalNoticeContent");
    const impressumContent = document.getElementById("impressumContent");
    const datenschutzContent = document.getElementById("datenschutzContent");

    function sanitizeInput(input) {
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML;
    }

    
    function hideAllContents() {
        homeContent.style.display = "none";
        co2Content.style.display = "none";
        aboutUsContent.style.display = "none";
        contactContent.style.display = "none";
        legalNoticeContent.style.display = "none";
        impressumContent.style.display = "none";
        datenschutzContent.style.display = "none";
    }

    
    homeLink.addEventListener("click", () => {
        hideAllContents();
        homeContent.style.display = "block";
    });

    co2Link.addEventListener("click", () => {
        hideAllContents();
        co2Content.style.display = "block";

        if (co2Table.innerHTML === "") {
            fetch('data/co2data.json')
                .then(response => response.json())
                .then(data => {
                    co2Data = data;
                    renderTable(co2Data);
                })
                .catch(error => console.error('Fehler beim Laden der Daten:', error));
        }
    });

    aboutUsLink.addEventListener("click", () => {
        hideAllContents();
        aboutUsContent.style.display = "block";
    });

    contactLink.addEventListener("click", () => {
        hideAllContents();
        contactContent.style.display = "block";
    });

    function renderTable(data) {
        let tableHTML = `<thead><tr>
            <th id="sortLand">Land</th>
            <th id="sortUnternehmen">Unternehmen</th>
            <th>CO₂-Emissionen (Tonnen)</th>
            </tr></thead><tbody>`;

        data.forEach(entry => {
            const land = sanitizeInput(entry.land);
            const unternehmen = sanitizeInput(entry.unternehmen);
            const co2 = sanitizeInput(entry.co2.toString());

            tableHTML += `<tr>
                <td>${land}</td>
                <td>${unternehmen}</td>
                <td>${co2}</td>
            </tr>`;
        });

        tableHTML += "</tbody>";
        co2Table.innerHTML = tableHTML;

        document.getElementById("sortLand").addEventListener("click", () => sortTable("land"));
        document.getElementById("sortUnternehmen").addEventListener("click", () => sortTable("unternehmen"));
    }

    function sortTable(key) {
        co2Data.sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        renderTable(co2Data);
    }

    searchInput.addEventListener("input", () => {
        const filterText = sanitizeInput(searchInput.value.toLowerCase());
        const filteredData = co2Data.filter(entry =>
            entry.land.toLowerCase().includes(filterText) ||
            entry.unternehmen.toLowerCase().includes(filterText)
        );
        renderTable(filteredData);
    });

    
    legalNoticeLink.addEventListener("click", (event) => {
        event.preventDefault();
        hideAllContents();
        const legalNoticeHTML = `
            <h2>Rechtliche Hinweise</h2>
            <p>
                Der gesamte Inhalt der Website von CO2-Footprint ist urheberrechtlich geschützt. Alle Rechte sind vorbehalten.
                Durch den Zugriff auf die CO2-Footprint-Website sowie das Kopieren von Inhalten werden dem Nutzer keine Rechte an Software, Marken oder anderen Bestandteilen der Website eingeräumt.
                Jegliche Reproduktion oder Nutzung der Website, des Logos von CO2-Footprint oder Teile davon für öffentliche oder kommerzielle Zwecke ist ohne vorherige schriftliche Zustimmung von CO2-Footprint strikt untersagt.
            </p>`;
        legalNoticeContent.innerHTML = legalNoticeHTML;
        legalNoticeContent.style.display = "block";
    });

    
    impressumLink.addEventListener("click", (event) => {
        event.preventDefault();
        hideAllContents();
        const impressumHTML = `
            <h2>Impressum</h2>
            <p>
                CO2-Footprint GmbH<br>
                Plutostraße 1, 12345 Unistadt<br>
                Geschäftsführer: Caner Alma<br>
                Handelsregister: Amtsgericht Amtsstadt, HRB 12345<br>
                Umsatzsteuer-ID: DE123456789<br>
                Kontakt: info@co2-footprint.com
            </p>`;
        impressumContent.innerHTML = impressumHTML;
        impressumContent.style.display = "block";
    });

    datenschutzLink.addEventListener("click", (event) => {
        event.preventDefault();
        hideAllContents();
        const datenschutzHTML = `
            <h2>Datenschutz</h2>
            <p>
                Datenschutz ist uns wichtig. CO2-Footprint behandelt Ihre persönlichen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften. 
                Personenbezogene Daten werden auf dieser Website nur im technisch notwendigen Umfang erhoben. In keinem Fall werden die erhobenen Daten verkauft oder aus anderen Gründen an Dritte weitergegeben.
            </p>`;
        datenschutzContent.innerHTML = datenschutzHTML;
        datenschutzContent.style.display = "block";
    });

    
    languageDropdownItems.forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            const selectedLang = item.getAttribute('data-lang');

            document.documentElement.setAttribute('lang', selectedLang);
            
            let direction = 'ltr'; 
            let languageName = 'Deutsch';

            if (selectedLang === 'ar') {
                direction = 'rtl';
                languageName = 'العربية';
            } else if (selectedLang === 'en') {
                direction = 'ltr';
                languageName = 'English';
            } else if (selectedLang === 'de') {
                direction = 'ltr';
                languageName = 'Deutsch';
            }

            document.documentElement.setAttribute('dir', direction);

            currentLanguageDisplay.textContent = languageName;

        });
    });
});
