
// left-panel untuk menampilkan hari dan bulan

const hour = new Date().getHours();
const leftPanel = document.querySelector('.left-panel');
const greetingElement = document.getElementById('greeting');

if (hour >= 6 && hour < 12) {
    // Pagi
    leftPanel.style.backgroundImage = 'url("Assets/ioann-mark-kuznietsov-P6uqpNyXcI4-unsplash.jpg")';
} else if (hour >= 12 && hour < 18) {
    // Siang
    leftPanel.style.backgroundImage = 'url("Assets/shifaaz-shamoon-sLAk1guBG90-unsplash.jpg")';
} else {
    // Malam
    leftPanel.style.backgroundImage = 'url("Assets/luca-bravo-a_hPPrncGlQ-unsplash.jpg")';
}

if (hour >= 5 && hour < 11) {
    greetingElement.textContent = 'Halo, selamat pagi!';
} else if (hour >= 11 && hour < 15) {
    greetingElement.textContent = 'Halo, selamat siang!';
} else if (hour >= 15 && hour < 18) {
    greetingElement.textContent = 'Halo, selamat sore!';
} else {
    greetingElement.textContent = 'Halo, selamat malam!';
}


const date = new Date();
const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

document.getElementById('day-name').textContent = dayNames[date.getDay()];
document.getElementById('date-text').textContent = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

// API untuk mendeteksi lokasi dan cuaca berdasarkan lokasi
fetch('https://api.geoapify.com/v1/ipinfo?&apiKey=5d0ff1efa1b4465da0cdec9d9c16f624')
    .then(response => response.json())
    .then(data => {
        const city = data.city.name || '';
        const country = data.country.iso_code || '';

        document.getElementById('location-text').textContent = `${city}, ${country}`;

        // Ambil cuaca
        return fetch(`https://api.weatherapi.com/v1/current.json?key=53379b14a0744e4094f145710252106&q=${city}&aqi=no`);
    })
    .then(response => response.json())
    .then(data => {
        const temp = data.current.temp_c;
        const conditionEN = data.current.condition.text;
        const cuacaTerjemahan = {
            "Sunny": "cerah",
            "Partly cloudy": "berawan sebagian",
            "Cloudy": "berawan",
            "Overcast": "mendung",
            "Mist": "berkabut",
            "Patchy rain possible": "hujan ringan kemungkinan",
            "Light rain": "hujan ringan",
            "Heavy rain": "hujan deras",
            "Thunderstorm": "badai petir",
            "Clear": "cerah",
            "Fog": "kabut",
            "Snow": "salju",
            "Moderate rain at times": "hujan ringan",
            "Patchy light rain" : "hujan ringan",
        };
        const conditionID = cuacaTerjemahan[conditionEN] || conditionEN;
        document.getElementById('temperature-text').innerHTML = `${temp}&deg;C`;
        document.getElementById('weather-description').textContent = conditionID;

        // Ubah icon berdasarkan cuaca ATAU waktu
        const statusIcon = document.getElementById("status-icon");
        const inputIcon = document.getElementById("input-icon");
        const hour = new Date().getHours();

        // Kalau cuaca hujan, icon payung
        if (["Light rain", "Moderate rain", "Heavy rain", "Rain"].includes(conditionEN)) {
            statusIcon.textContent = "umbrella"; // ikon hujan
        } else {
            // Kalau bukan hujan, sesuaikan dengan waktu
            if (hour >= 5 && hour < 11) {
                statusIcon.textContent = "wb_twilight"; // pagi
            } else if (hour >= 11 && hour < 15) {
                statusIcon.textContent = "wb_sunny"; // siang
            } else if (hour >= 15 && hour < 18) {
                statusIcon.textContent = "cloud"; // sore
            } else {
                statusIcon.textContent = "nights_stay"; // malam
            }
        }

        // Kalau cuaca hujan, icon payung
        if (["Light rain", "Moderate rain", "Heavy rain", "Rain"].includes(conditionEN)) {
            inputIcon.textContent = "umbrella"; // ikon hujan
        } else {
            // Kalau bukan hujan, sesuaikan dengan waktu
            if (hour >= 5 && hour < 11) {
                inputIcon.textContent = "wb_twilight"; // pagi
            } else if (hour >= 11 && hour < 15) {
                inputIcon.textContent = "wb_sunny"; // siang
            } else if (hour >= 15 && hour < 18) {
                inputIcon.textContent = "cloud"; // sore
            } else {
                inputIcon.textContent = "nights_stay"; // malam
            }
        }

        const introText = document.getElementById('intro-text');
        let waktu = '';
        if (hour >= 5 && hour < 11) {
            waktu = 'pagi';
        } else if (hour >= 11 && hour < 15) {
            waktu = 'siang';
        } else if (hour >= 15 && hour < 18) {
            waktu = 'sore';
        } else {
            waktu = 'malam';
        }
        
        introText.textContent = `Cuaca ${waktu} ini ${conditionID.toLowerCase()} berikut rekomendasi makananan dan minuman yang pas banget buat makanan yang cocok dinikmati ${waktu} hari!`;

        function tampilkanRekomendasiManual(waktu, cuaca) {
            const rekomendasiBox = document.getElementById('recommendations');
            rekomendasiBox.innerHTML = ''; // Bersihkan isi lama
            const rekomendasiList = getManualRekomendasi(waktu, cuaca);
            rekomendasiList.forEach(item => {
                const card = document.createElement('article');
                card.className = 'recommendation-card';
                card.setAttribute('role', 'listitem');
                card.setAttribute('tabindex', '0');
                card.textContent = item;

                rekomendasiBox.appendChild(card);
            });
        }

        function getManualRekomendasi(waktu, cuaca) {
            // Buat kunci kombinasi waktu dan cuaca
            const kunci = `${waktu}-${cuaca}`;

            const daftarRekomendasi = {
                "pagi-cerah": [
                    "Bubur Ayam Komplit – hangat dan mengenyangkan untuk memulai hari.",
                    "Roti Bakar Isi Cokelat dan Keju – ringan tapi penuh energi.",
                    "Susu Hangat dan Pisang – simpel tapi cukup untuk sarapan."
                ],
                "siang-cerah": [
                    "Nasi Padang Daging Rendang – kalau kamu butuh energi ekstra, ini jawaranya!",
                    "Gado-Gado – sayuran rebus, lontong, tahu, dan bumbu kacang yang gurih!",
                    "Mie Ayam Jamur – ringan tapi tetap bikin kenyang, cocok buat siang."
                ],
                "malam-cerah": [
                    "Soto Ayam – hangat dan cocok untuk malam yang santai.",
                    "Nasi Goreng Spesial – pilihan praktis dan nikmat sebelum tidur.",
                    "Wedang Jahe & Pisang Goreng – ringan tapi menghangatkan."
                ],
                "siang-hujan": [
                    "Bakso Urat – kuah hangat cocok di cuaca hujan.",
                    "Mie Rebus Jawa – pedas gurih untuk semangat siang hujan.",
                    "Teh Hangat dan Tahu Isi – camilan renyah dan menghangatkan."
                ],
                "malam-hujan ringan": [
                    "Sop Buntut – kuah panas dengan daging lembut.",
                    "Nasi Rawon – hangat dan nikmat untuk malam dingin.",
                    "Kacang Rebus & Wedang Ronde – malam hujan makin syahdu."
                ],
                "malam-hujan": [
                    "Sop Buntut – kuah panas dengan daging lembut.",
                    "Nasi Rawon – hangat dan nikmat untuk malam dingin.",
                    "Kacang Rebus & Wedang Ronde – malam hujan makin syahdu."
                ],
                // fallback
                "default": [
                    "Nasi Goreng Spesial – selalu cocok kapan pun.",
                    "Mie Ayam – andalan tiap waktu.",
                    "Roti Bakar Cokelat – buat ngemil ringan."
                ]
            };

            return daftarRekomendasi[kunci] || daftarRekomendasi["default"];
        }

        tampilkanRekomendasiManual(waktu, conditionID.toLowerCase());
    })
    .catch(err => console.log('Error:', err));

document.getElementById('sendButton').addEventListener('click', function() {
    // SEMBUNYIKAN KONTEN AWAL
    const initialContent = document.getElementById('initialContent');
    if (initialContent) {
        initialContent.style.display = 'none';
    }
});

// Trigger tombol kirim saat tekan Enter (kecuali shift + enter)
document.getElementById('userInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Hindari enter bikin baris baru
        document.getElementById('sendButton').click(); // Jalankan klik tombol
    }
});


// Menampilkan pesan ke chat box
function showMessage(message, className) {
    const chatBox = document.getElementById('chatBox');
    const formattedMessage = marked.parse(message); // Gunakan markdown
    const messageDiv = document.createElement('div');

    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = formattedMessage;
    chatBox.appendChild(messageDiv);

    // Scroll otomatis ke bawah
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Tampilkan animasi loading (titik-titik)
function showLoadingIndicator() {
    const chatBox = document.getElementById('chatBox');
    const loader = `
        <div class="message bot-message">
            <div class="loading-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    `;
    chatBox.insertAdjacentHTML('beforeend', loader);
}

// Hapus indikator loading
function removeLoadingIndicator() {
    const loaders = document.querySelectorAll('.loading-dots');
    if (loaders.length > 0) {
        loaders[loaders.length - 1].parentElement.remove();
    }
}

// Tambahkan CSS untuk loading dots langsung lewat JS
const style = document.createElement('style');
style.textContent = `
.loading-dots {
    display: flex;
    padding: 10px 0;
}
.dot {
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background-color: #888;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out;
}
@keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
}
.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }
`;
document.head.appendChild(style);

function showMessage(message, className) {
    const chatBox = document.getElementById('chatBox');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = message;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotReply(userInput) {
    return fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "deepseek/deepseek-r1-0528:free",
            messages: [
                {
                    role: "system",
                    content: "Kamu adalah asisten rekomendasi makanan dan minuman. Tugasmu adalah memberikan saran menu makanan dan minuman yang cocok berdasarkan pertanyaan atau preferensi pengguna. Jawabanmu harus singkat dan to the point, tidak perlu panjang atau berparagraf. Selalu jawab dalam Bahasa Indonesia terlebih dahulu, dan jika user bertanya dengan Bahasa mereka, maka jawab sesuai dengan Bahasa input dari user. Jangan menjawab pertanyaan di luar topik makanan atau minuman. Jika pertanyaan tidak relevan, tolong jawab dengan sopan dan arahkan pengguna untuk bertanya seputar makanan atau minuman."
                },
                {
                    role: "user",
                    content: userInput
                }
            ]
        })
    })
    .then(response => response.json())
    .then(data => {
        const botReply = data.choices?.[0]?.message?.content || "Maaf, tidak ada respon dari AI.";
        return botReply;
    })
    .catch(error => {
        console.error("Error:", error);
        return "Terjadi kesalahan saat mengambil data dari AI.";
    });
}


document.getElementById('sendButton').addEventListener('click', async function () {
    const inputField = document.getElementById('userInput');
    const userInput = inputField.value.trim();

    if (!userInput) {
        alert("Input tidak boleh kosong!");
        return;
    }

    const tanyaRekomendasi = document.getElementById('tanyaRekomendasi');
    if (tanyaRekomendasi) {
        tanyaRekomendasi.style.display = 'none';
    }

    showMessage(userInput, 'user-message');
    inputField.value = '';
    showLoadingIndicator();

    try {
        const reply = await getBotReply(userInput);
        removeLoadingIndicator();
        const formatted = marked.parse(reply); 
        showMessage(formatted, 'bot-message');
    } catch (error) {
        removeLoadingIndicator();
        console.error("Gagal:", error);
        showMessage("Terjadi kesalahan saat menghubungi AI.", 'bot-message');
    }
});

