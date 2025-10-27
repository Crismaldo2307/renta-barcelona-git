document.addEventListener('DOMContentLoaded', () => {
  if (typeof Chart === 'undefined') return;

  const rentToggle = document.getElementById('toggle-renta');
  const tourismToggle = document.getElementById('toggle-turismo');
  const commerceToggle = document.getElementById('toggle-comercio');

  const barCtx = document.getElementById('rentBarChart');
  const lineCtx = document.getElementById('correlationLineChart');

  const years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  const rentData = [780, 810, 860, 920, 990, 970, 1020, 1110, 1190];

  const barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Renta promedio (€/mes)',
          data: rentData,
          backgroundColor: 'rgba(112, 130, 56, 0.7)',
          borderRadius: 12,
          maxBarThickness: 40
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#222'
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => `Renta promedio: ${context.parsed.y} €`
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#222' },
          grid: { color: 'rgba(0,0,0,0.05)' }
        },
        y: {
          beginAtZero: true,
          ticks: { color: '#222', callback: (value) => `${value} €` },
          grid: { color: 'rgba(0,0,0,0.05)' }
        }
      }
    }
  });

  if (rentToggle) {
    rentToggle.addEventListener('change', () => {
      barChart.getDatasetMeta(0).hidden = !rentToggle.checked;
      barChart.update();
    });
  }

  const tourismData = [18, 19.5, 21, 23, 25, 8, 12, 18, 20];
  const commerceData = [105, 107, 110, 114, 118, 112, 116, 121, 127];

  const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Renta promedio (€/mes)',
          data: rentData,
          borderColor: 'rgba(112, 130, 56, 1)',
          backgroundColor: 'rgba(112, 130, 56, 0.15)',
          tension: 0.3,
          fill: true,
          yAxisID: 'y'
        },
        {
          label: 'Turismo (millones de visitantes)',
          data: tourismData,
          borderColor: 'rgba(34, 34, 34, 0.9)',
          backgroundColor: 'rgba(34, 34, 34, 0.12)',
          tension: 0.3,
          fill: false,
          yAxisID: 'y1'
        },
        {
          label: 'Índice de comercio (base 100)',
          data: commerceData,
          borderColor: 'rgba(92, 107, 75, 1)',
          backgroundColor: 'rgba(92, 107, 75, 0.1)',
          tension: 0.3,
          fill: false,
          yAxisID: 'y2'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: { color: '#222' }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              if (label.includes('Renta')) return `${label}: ${value} €`;
              if (label.includes('Turismo')) return `${label}: ${value} M`; 
              return `${label}: ${value}`;
            }
          }
        }
      },
      scales: {
        y: {
          type: 'linear',
          position: 'left',
          ticks: { color: '#222', callback: (value) => `${value} €` },
          grid: { color: 'rgba(0,0,0,0.05)' }
        },
        y1: {
          type: 'linear',
          position: 'right',
          ticks: { color: '#222', callback: (value) => `${value} M` },
          grid: { drawOnChartArea: false }
        },
        y2: {
          type: 'linear',
          position: 'right',
          offset: true,
          ticks: { color: '#222' },
          grid: { drawOnChartArea: false }
        },
        x: {
          ticks: { color: '#222' }
        }
      }
    }
  });

  const toggleDatasetVisibility = (toggle, datasetIndex) => {
    if (!toggle) return;
    toggle.addEventListener('change', () => {
      lineChart.getDatasetMeta(datasetIndex).hidden = !toggle.checked;
      lineChart.update();
    });
  };

  toggleDatasetVisibility(tourismToggle, 1);
  toggleDatasetVisibility(commerceToggle, 2);
});
