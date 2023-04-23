// Variable untuk mengakses dan menyimpan data pada localStorage
const CACHE_KEY = "calculation_history";

function checkForStorage() {
    return typeof(Storage) != "undefined";
}

// Fungsi untuk menyimpan data riwayat kalkulasi pada localStorage
function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        }
        else {
            // JSON.parse untuk mengubah nilai objek bentuk string menjadi bentuk objek JavaScript
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        // Fungsi unshift() untuk menambahkan nilai baru pada array yang ditempatkan pada awal index
        // dan mengembalikan nilai panjang array setelah ditambahkan dengan nilai baru
        historyData.unshift(data);

        if (historyData.length > 5) {
            historyData.pop();
        }

        // JSON.stringify untuk mengubah objek JavaScript menjadi bentuk String
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

// Fungsi untuk mendapatkan data dari localStorage
function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    }
    else {
        return [];
    }
}

// Fungsi untuk merender data riwayat kalkulasi pada tabel HTML
function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");

    // Selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = [];

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}

renderHistory();