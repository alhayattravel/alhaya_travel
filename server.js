// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/**
 * دالة محاكاة للاتصال بمزودي خدمات الطيران (APIs)
 * يمكنك استبدال هذه البيانات بالاتصال بـ Amadeus API أو Duffel API مستقبلاً.
 */
async function fetchFlightData(origin, destination, date) {
    // محاكاة استجابة من أكثر من مصدر (Provider A & Provider B)
    const mockProviders = [
        {
            airline: 'الخطوط السعودية',
            logo: 'https://via.placeholder.com/40',
            flightNumber: 'SV-102',
            departure: '10:00 AM',
            arrival: '01:30 PM',
            duration: '3h 30m',
            price: 280,
            currency: 'USD'
        },
        {
            airline: 'طيران الإمارات',
            logo: 'https://via.placeholder.com/40',
            flightNumber: 'EK-203',
            departure: '02:15 PM',
            arrival: '05:45 PM',
            duration: '3h 30m',
            price: 340,
            currency: 'USD'
        },
        {
            airline: 'مصر للطيران',
            logo: 'https://via.placeholder.com/40',
            flightNumber: 'MS-777',
            departure: '11:30 PM',
            arrival: '03:00 AM',
            duration: '3h 30m',
            price: 250,
            currency: 'USD'
        }
    ];

    return mockProviders;
}

// Endpoint لتلقي طلبات البحث عن الرحلات
app.get('/api/flights/search', async (req, res) => {
    try {
        const { origin, destination, departureDate } = req.query;

        if (!origin || !destination || !departureDate) {
            return res.status(400).json({ error: 'جميع الحقول مطلوبة: Origin, Destination, Date' });
        }

        // جلب البيانات
        const flights = await fetchFlightData(origin, destination, departureDate);

        // ترتيب النتائج تلقائياً من الأرخص إلى الأغلى
        flights.sort((a, b) => a.price - b.price);

        return res.json({
            success: true,
            count: flights.length,
            data: flights
        });

    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({ error: 'حدث خطأ أثناء جلب أسعار التذاكر' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
