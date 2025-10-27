document.addEventListener('DOMContentLoaded', () => {
  const chatbot = document.querySelector('.chatbot');
  if (!chatbot) return;

  const toggleButton = chatbot.querySelector('.chatbot-toggle');
  const closeButton = chatbot.querySelector('.chatbot-close');
  const windowEl = chatbot.querySelector('.chatbot-window');
  const messagesEl = chatbot.querySelector('.chatbot-messages');
  const form = chatbot.querySelector('.chatbot-form');
  const input = chatbot.querySelector('#chatbot-input');

  const responses = [
    { keywords: ['hola', 'buenas', 'saludos'], reply: '¡Hola! Soy el asistente IA de Cristian y Alonso Data. ¿En qué puedo ayudarte?' },
    { keywords: ['renta', 'alquiler', 'precio'], reply: 'Los precios de la renta han mostrado un incremento sostenido en Barcelona, con especial presión en zonas céntricas y turísticas.' },
    { keywords: ['turismo', 'visitantes'], reply: 'El turismo influye directamente en la demanda de vivienda temporal y puede elevar los precios del alquiler en áreas con alta ocupación.' },
    { keywords: ['comercio', 'negocios'], reply: 'El dinamismo comercial genera empleos y atrae talento, incrementando la demanda residencial en distritos con mayor actividad.' },
    { keywords: ['correlacion', 'correlación'], reply: 'Nuestros modelos correlacionan series de renta, turismo y comercio para identificar patrones de crecimiento simultáneo.' },
    { keywords: ['bigquery', 'proceso'], reply: 'El flujo en BigQuery incluye limpieza, unificación y enriquecimiento de datos antes de generar los dashboards en Looker Studio.' },
    { keywords: ['contacto', 'email'], reply: 'Puedes escribirnos desde el formulario de contacto o al correo cmaldonadoa@student.eae.es.' },
    { keywords: ['looker', 'dashboard'], reply: 'Las visualizaciones en Looker Studio muestran indicadores clave para comprender el incremento de precios y su contexto.' },
    { keywords: ['mapa'], reply: 'El mapa interactivo resalta las diferencias de renta media por distrito, ayudando a detectar zonas con mayor tensión.' },
    { keywords: ['grafico', 'gráfico', 'chart'], reply: 'Los gráficos permiten explorar la evolución anual de la renta y la relación con turismo y comercio mediante datasets activables.' },
    { keywords: ['privacidad', 'datos'], reply: 'Protegemos la privacidad siguiendo la normativa vigente y detallamos nuestras políticas en la sección Política de Datos.' },
    { keywords: ['adios', 'gracias'], reply: 'Gracias por contactar. Si necesitas más información, estaré disponible en este chat.' }
  ];

  const defaultReply = 'Puedo ayudarte con información sobre renta, turismo, comercio, procesos de datos o cómo contactarnos. ¿Qué tema te interesa?';

  const createMessage = (text, sender) => {
    const bubble = document.createElement('div');
    bubble.className = `chat-message ${sender}`;
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  let greeted = false;

  const openChat = () => {
    if (windowEl.hasAttribute('hidden')) {
      windowEl.removeAttribute('hidden');
      toggleButton.setAttribute('aria-expanded', 'true');
      if (!greeted) {
        createMessage('¡Hola! Soy el asistente IA de Cristian y Alonso Data. ¿En qué puedo ayudarte?', 'bot');
        greeted = true;
      }
      input.focus();
    }
  };

  const closeChat = () => {
    windowEl.setAttribute('hidden', '');
    toggleButton.setAttribute('aria-expanded', 'false');
    input.value = '';
  };

  toggleButton.addEventListener('click', () => {
    if (windowEl.hasAttribute('hidden')) {
      openChat();
    } else {
      closeChat();
    }
  });

  closeButton.addEventListener('click', () => {
    closeChat();
    toggleButton.focus();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    createMessage(text, 'user');
    input.value = '';

    const lowerText = text.toLowerCase();
    const match = responses.find((response) => response.keywords.some((keyword) => lowerText.includes(keyword)));
    const reply = match ? responseText(match.reply) : defaultReply;
    setTimeout(() => createMessage(reply, 'bot'), 300);
  });

  const responseText = (text) => text;
});
