document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('map');
  if (!mapContainer || typeof L === 'undefined') return;

  const map = L.map('map', {
    scrollWheelZoom: false,
    tap: false
  }).setView([41.3851, 2.1734], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contribuidores'
  }).addTo(map);

  const districts = [
    { name: 'Ciutat Vella', coords: [41.3825, 2.1769], rent: '1.350 €' },
    { name: 'Eixample', coords: [41.3917, 2.1649], rent: '1.450 €' },
    { name: 'Sants-Montjuïc', coords: [41.3729, 2.1540], rent: '1.180 €' },
    { name: 'Les Corts', coords: [41.3860, 2.1280], rent: '1.320 €' },
    { name: 'Sarrià-Sant Gervasi', coords: [41.4015, 2.1342], rent: '1.550 €' },
    { name: 'Gràcia', coords: [41.4099, 2.1521], rent: '1.240 €' },
    { name: 'Horta-Guinardó', coords: [41.4301, 2.1670], rent: '1.050 €' },
    { name: 'Nou Barris', coords: [41.4416, 2.1774], rent: '980 €' },
    { name: 'Sant Andreu', coords: [41.4357, 2.1903], rent: '1.020 €' },
    { name: 'Sant Martí', coords: [41.4087, 2.2068], rent: '1.210 €' }
  ];

  districts.forEach((district) => {
    const marker = L.marker(district.coords).addTo(map);
    marker.bindTooltip(`<strong>${district.name}</strong><br>Renta media estimada: ${district.rent}`);
  });
});
