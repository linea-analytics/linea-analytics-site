

function translateData(language, csvData) {
    if (!['eng', 'ita', 'de'].includes(language)) {
        console.error(`Unsupported language: ${language}`);
        return;
    }

    Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,       // optional: skip empty lines
        complete: (results) => {
            const rows = results.data;

            // Quick check to see if the CSV includes the needed columns
            if (rows.length === 0 || !rows[0]['html-class'] || !rows[0][language]) {
                console.error('CSV missing required columns (e.g. "html-class" or selected language).');
                return;
            }

            // Iterate through each row (each row is an object, e.g.: { "html-class": "headline", "eng": "Hello" })
            for (const row of rows) {
                // Row keys correspond to the CSV headers (e.g. row["html-class"], row["eng"], row["ita"]...)
                const className = row['html-class'];
                const textValue = row[language];

                if (className && textValue) {
                    const elements = document.getElementsByClassName(className);
                    for (const el of elements) {
                        el.textContent = textValue;
                    }
                }
            }

            // Save the user’s language choice
            localStorage.setItem('userLang', language);
        },
        error: (err) => {
            console.error('Error parsing CSV:', err);
        }
    });
}

function translateContent(language) {
    fetch('/js/lang-map.csv')
        .then(res => res.text())
        .then(csvData => {
            translateData(language, csvData);
        });
}