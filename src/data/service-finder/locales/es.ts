import type { ServiceFinderLocale } from '../types';

export const es: ServiceFinderLocale = {
  market: 'es',
  intro: {
    h1: 'Descubre qu\u00e9 Necesita tu Negocio',
    subheading: '\u00bfNo sabes por d\u00f3nde empezar? Responde 4 preguntas r\u00e1pidas y te mostramos exactamente qu\u00e9 servicios necesitas \u2014 en 60 segundos.',
    trustLine: 'M\u00e1s de 500 negocios en EE.UU., Per\u00fa, Alemania y Suiza ya lo usaron.',
  },
  steps: {
    role: {
      heading: '\u00bfCu\u00e1l describe mejor tu rol?',
      options: [
        { id: 'R1', label: 'Due\u00f1o / Gerente General', subtitle: 'Yo dirijo el negocio y tomo las decisiones' },
        { id: 'R2', label: 'Responsable de Marketing', subtitle: 'Manejo el marketing pero necesito apoyo especializado' },
        { id: 'R3', label: 'Gerente de Cl\u00ednica / Socio', subtitle: 'Administro una cl\u00ednica, estudio o consultora' },
        { id: 'R4', label: 'Director/a Digital / CMO', subtitle: 'Lidero la estrategia digital e innovaci\u00f3n' },
        { id: 'R5', label: 'Emprendedor/a', subtitle: 'Estoy lanzando o acabo de lanzar un nuevo negocio' },
        { id: 'R6', label: 'Agencia', subtitle: 'Busco un partner o agencia de marca blanca' },
        { id: 'R7', label: 'Otro/a', subtitle: 'Ninguna de las anteriores' },
      ],
    },
    industry: {
      heading: '\u00bfEn qu\u00e9 sector est\u00e1 tu negocio?',
      options: [
        { id: 'I1', label: 'Cl\u00ednica Dental / Salud' },
        { id: 'I2', label: 'Estudio de Abogados' },
        { id: 'I3', label: 'Taller / Servicio Automotriz' },
        { id: 'I6', label: 'Restaurante / Hosteler\u00eda' },
        { id: 'I7', label: 'E-Commerce / Tienda Online' },
        { id: 'I10', label: 'Inmobiliaria' },
        { id: 'I11', label: 'Educaci\u00f3n / Capacitaci\u00f3n' },
        { id: 'I12', label: 'Turismo / Viajes' },
        { id: 'I15', label: 'Otro' },
      ],
    },
    questions: {
      heading: '\u00bfCu\u00e1les de estos problemas tiene tu negocio?',
      hint: 'Selecciona todos los que apliquen',
      universal: [
        { id: 'Q-U1', text: 'Nuestra web no genera consultas ni ventas' },
        { id: 'Q-U2', text: 'Nuestra competencia aparece antes que nosotros en Google' },
        { id: 'Q-U3', text: 'No aparecemos en ChatGPT, Perplexity ni b\u00fasquedas con IA' },
        { id: 'Q-U4', text: 'Estamos gastando en Google Ads pero no sabemos si funciona' },
        { id: 'Q-U5', text: 'No sabemos qu\u00e9 funciona y qu\u00e9 no en nuestro marketing' },
      ],
      byRole: {
        R1: [
          { id: 'Q-R1a', text: 'No tengo p\u00e1gina web, o es muy antigua' },
          { id: 'Q-R1b', text: 'No tengo tiempo para marketing \u2014 hago todo yo' },
          { id: 'Q-R1c', text: 'Ya pagu\u00e9 a una agencia y no funcion\u00f3' },
        ],
        R5: [
          { id: 'Q-R1a', text: 'No tengo p\u00e1gina web, o es muy antigua' },
          { id: 'Q-R1b', text: 'No tengo tiempo para marketing \u2014 hago todo yo' },
          { id: 'Q-R1c', text: 'Ya pagu\u00e9 a una agencia y no funcion\u00f3' },
        ],
        R2: [
          { id: 'Q-R2a', text: 'Nuestro equipo interno no tiene experiencia profunda en SEO' },
          { id: 'Q-R2b', text: 'Perdimos tr\u00e1fico despu\u00e9s de redise\u00f1ar la web' },
          { id: 'Q-R2c', text: 'Necesito demostrar el ROI de marketing al directorio' },
          { id: 'Q-R2d', text: 'Nuestra agencia actual manda reportes pero nada mejora' },
        ],
        R4: [
          { id: 'Q-R2a', text: 'Nuestro equipo interno no tiene experiencia profunda en SEO' },
          { id: 'Q-R2b', text: 'Perdimos tr\u00e1fico despu\u00e9s de redise\u00f1ar la web' },
          { id: 'Q-R2c', text: 'Necesito demostrar el ROI de marketing al directorio' },
          { id: 'Q-R2d', text: 'Nuestra agencia actual manda reportes pero nada mejora' },
        ],
        R3: [
          { id: 'Q-R3a', text: 'Nuestras sedes tienen resultados desiguales en Google' },
          { id: 'Q-R3b', text: 'Las normas y regulaciones frenan la creaci\u00f3n de contenido' },
          { id: 'Q-R3c', text: 'Estamos abriendo nuevas sedes y necesitamos visibilidad ah\u00ed' },
        ],
      },
      byIndustry: {
        I1: [
          { id: 'Q-I1a', text: 'No aparecemos en Google Maps para nuestra zona' },
          { id: 'Q-I1b', text: 'Nuestras rese\u00f1as de Google est\u00e1n estancadas o bajando' },
          { id: 'Q-I1c', text: 'Necesitamos p\u00e1ginas para cada procedimiento que ofrecemos' },
        ],
        I2: [
          { id: 'Q-I2a', text: 'Necesitamos m\u00e1s consultas de casos de nuestra zona' },
          { id: 'Q-I2b', text: 'Los perfiles de nuestros abogados no aparecen en b\u00fasquedas' },
          { id: 'Q-I2c', text: 'Las normas del colegio de abogados frenan nuestro marketing' },
        ],
        I3: [
          { id: 'Q-I3a', text: 'Los clientes buscan nuestros servicios pero encuentran a la competencia primero' },
          { id: 'Q-I3b', text: 'Tenemos buenos trabajos antes/despu\u00e9s pero no est\u00e1n en l\u00ednea' },
        ],
        I6: [
          { id: 'Q-I6a', text: 'Nuestro restaurante no aparece en b\u00fasquedas "cerca de m\u00ed"' },
          { id: 'Q-I6b', text: 'Recibimos malas rese\u00f1as y no sabemos c\u00f3mo responder' },
        ],
        I7: [
          { id: 'Q-I7a', text: 'Nuestro costo de adquisici\u00f3n de clientes sigue subiendo' },
          { id: 'Q-I7b', text: 'Nuestra web es lenta y perdemos ventas' },
          { id: 'Q-I7c', text: 'Nuestros productos no aparecen en Google Shopping ni en recomendaciones de IA' },
          { id: 'Q-I7d', text: 'Queremos expandirnos a nuevos mercados (EE.UU., LATAM)' },
        ],
        I10: [
          { id: 'Q-I10a', text: 'Nuestras propiedades no aparecen cuando buscan inmuebles en nuestra zona' },
          { id: 'Q-I10b', text: 'Dependemos de portales (Urbania, Adondevivir) y necesitamos tr\u00e1fico propio' },
        ],
        I11: [
          { id: 'Q-I11a', text: 'Los estudiantes no encuentran nuestros programas en Google' },
          { id: 'Q-I11b', text: 'Nuestra competencia nos supera en b\u00fasquedas de programas' },
        ],
        I12: [
          { id: 'Q-I12a', text: 'Los turistas buscan experiencias como las nuestras pero no nos encuentran' },
          { id: 'Q-I12b', text: 'Necesitamos contenido en varios idiomas para turistas extranjeros' },
        ],
      },
    },
    result: {
      heading: 'Esto es lo que recomendamos para tu negocio',
      subheading: 'Seg\u00fan tus respuestas, estos servicios tendr\u00e1n el mayor impacto.',
      submitButton: 'Mostrar mis resultados',
      startOver: 'Empezar de nuevo',
      secondaryCta: {
        text: '\u00bfNo est\u00e1s seguro por d\u00f3nde empezar? Chequea gratis si tu negocio aparece en Google y las b\u00fasquedas con IA.',
        buttonText: 'Chequear Gratis',
        link: '/pe/apareces-en-google/',
      },
      emailCapture: {
        heading: '\u00bfQuieres recibir estas recomendaciones por correo?',
        subtext: 'Te enviamos una explicaci\u00f3n de cada servicio y los pr\u00f3ximos pasos sugeridos. Sin spam, sin llamadas de ventas a menos que t\u00fa lo pidas.',
        buttonText: 'Enviar Mis Resultados',
        fields: [
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'firstname', label: 'Nombre', type: 'text', required: false },
          { name: 'phone', label: 'WhatsApp', type: 'tel', required: false },
        ],
      },
      serviceCards: {
        'ai-search-optimization': {
          headline: 'Tu negocio es invisible para la b\u00fasqueda con IA',
          description: 'ChatGPT, Perplexity y Google AI son parte de c\u00f3mo los clientes descubren negocios hoy. Hacemos que te encuentren.',
          ctaText: 'Saber m\u00e1s',
        },
        'aiso-score': {
          headline: 'Tu negocio es invisible para la b\u00fasqueda con IA',
          description: 'ChatGPT, Perplexity y Google AI son parte de c\u00f3mo los clientes descubren negocios hoy. Hacemos que te encuentren.',
          ctaText: 'Check gratuito',
        },
        'local-seo': {
          headline: 'Est\u00e1s perdiendo clientes locales',
          description: 'Cuando buscan tus servicios cerca, tu competencia aparece primero. Eso lo arreglamos.',
          ctaText: 'Saber m\u00e1s',
        },
        'technical-seo': {
          headline: 'Tu web tiene problemas t\u00e9cnicos que la frenan',
          description: 'Velocidad, rastreo y estructura \u2014 los problemas t\u00e9cnicos te cuestan posiciones y ventas.',
          ctaText: 'Saber m\u00e1s',
        },
        'content-marketing': {
          headline: 'Necesitas contenido que posicione y convierta',
          description: 'P\u00e1ginas de servicios, p\u00e1ginas por ciudad y contenido experto que genera tr\u00e1fico y autoridad.',
          ctaText: 'Saber m\u00e1s',
        },
        'google-ads-audit': {
          headline: 'Tu inversi\u00f3n en Ads necesita una revisi\u00f3n',
          description: 'Auditor\u00eda gratuita para ver d\u00f3nde se pierde tu presupuesto \u2014 y d\u00f3nde invertir mejor.',
          ctaText: 'Auditor\u00eda gratis',
        },
        'paid-strategy': {
          headline: 'Tu inversi\u00f3n en Ads necesita una revisi\u00f3n',
          description: 'Auditor\u00eda gratuita para ver d\u00f3nde se pierde tu presupuesto \u2014 y d\u00f3nde invertir mejor.',
          ctaText: 'Saber m\u00e1s',
        },
        'multi-location-seo': {
          headline: 'Tus sedes necesitan visibilidad consistente',
          description: 'Algunas sedes funcionan bien, otras son invisibles. Creamos un sistema que funcione para todas.',
          ctaText: 'Saber m\u00e1s',
        },
        'review-management': {
          headline: 'Tus rese\u00f1as necesitan atenci\u00f3n',
          description: 'La velocidad y calificaci\u00f3n de tus rese\u00f1as impactan directamente tu posicionamiento. Te ayudamos a mantener el impulso.',
          ctaText: 'Saber m\u00e1s',
        },
        'website-design-brief': {
          headline: 'Necesitas una web que funcione',
          description: 'Creamos la especificaci\u00f3n completa para un sitio construido para buscadores y conversiones \u2014 ll\u00e9vala a cualquier desarrollador.',
          ctaText: 'Saber m\u00e1s',
        },
        'multilingual-seo': {
          headline: 'Est\u00e1s listo para llegar a mercados internacionales',
          description: 'SEO multiling\u00fce profesional \u2014 no solo traducci\u00f3n \u2014 para cada mercado objetivo.',
          ctaText: 'Saber m\u00e1s',
        },
        'roi-analytics': {
          headline: 'Necesitas saber qu\u00e9 funciona realmente',
          description: 'Reportes claros que conectan tu inversi\u00f3n en marketing con ingresos reales.',
          ctaText: 'Saber m\u00e1s',
        },
        'authority-building': {
          headline: 'Necesitas construir autoridad online',
          description: 'Backlinks y se\u00f1ales de entidad que hacen que Google y las plataformas de IA conf\u00eden en tu marca.',
          ctaText: 'Saber m\u00e1s',
        },
        'entity-building': {
          headline: 'Necesitas construir autoridad online',
          description: 'Backlinks, menciones en medios y se\u00f1ales de entidad que hacen que Google y las plataformas de IA conf\u00eden en tu marca.',
          ctaText: 'Saber m\u00e1s',
        },
        'compliance-content': {
          headline: 'Necesitas contenido que posicione y convierta',
          description: 'P\u00e1ginas de servicios, p\u00e1ginas por ciudad y contenido experto que genera tr\u00e1fico y autoridad.',
          ctaText: 'Saber m\u00e1s',
        },
        'seo-retainer': {
          headline: 'Est\u00e1s perdiendo clientes locales',
          description: 'Cuando buscan tus servicios cerca, tu competencia aparece primero. Eso lo arreglamos.',
          ctaText: 'Saber m\u00e1s',
        },
        'free-audit': {
          headline: 'Tu negocio es invisible para la b\u00fasqueda con IA',
          description: 'ChatGPT, Perplexity y Google AI son parte de c\u00f3mo los clientes descubren negocios hoy. Hacemos que te encuentren.',
          ctaText: 'Check gratuito',
        },
        'full-service-retainer': {
          headline: 'Est\u00e1s perdiendo clientes locales',
          description: 'Cuando buscan tus servicios cerca, tu competencia aparece primero. Eso lo arreglamos.',
          ctaText: 'Saber m\u00e1s',
        },
        'competitive-analysis': {
          headline: 'Est\u00e1s perdiendo clientes locales',
          description: 'Cuando buscan tus servicios cerca, tu competencia aparece primero. Eso lo arreglamos.',
          ctaText: 'Saber m\u00e1s',
        },
        'landing-page-audit': {
          headline: 'Tu web tiene problemas t\u00e9cnicos que la frenan',
          description: 'Velocidad, rastreo y estructura \u2014 los problemas t\u00e9cnicos te cuestan posiciones y ventas.',
          ctaText: 'Saber m\u00e1s',
        },
        'strategy': {
          headline: 'Est\u00e1s perdiendo clientes locales',
          description: 'Cuando buscan tus servicios cerca, tu competencia aparece primero. Eso lo arreglamos.',
          ctaText: 'Saber m\u00e1s',
        },
        'monthly-reporting': {
          headline: 'Necesitas saber qu\u00e9 funciona realmente',
          description: 'Reportes claros que conectan tu inversi\u00f3n en marketing con ingresos reales.',
          ctaText: 'Saber m\u00e1s',
        },
        'gbp-audit': {
          headline: 'Est\u00e1s perdiendo clientes locales',
          description: 'Cuando buscan tus servicios cerca, tu competencia aparece primero. Eso lo arreglamos.',
          ctaText: 'Saber m\u00e1s',
        },
        'gbp-photos': {
          headline: 'Necesitas contenido que posicione y convierta',
          description: 'P\u00e1ginas de servicios, p\u00e1ginas por ciudad y contenido experto que genera tr\u00e1fico y autoridad.',
          ctaText: 'Saber m\u00e1s',
        },
        'schema-eeat': {
          headline: 'Tu web tiene problemas t\u00e9cnicos que la frenan',
          description: 'Velocidad, rastreo y estructura \u2014 los problemas t\u00e9cnicos te cuestan posiciones y ventas.',
          ctaText: 'Saber m\u00e1s',
        },
        'consent-audit': {
          headline: 'Tu web tiene problemas t\u00e9cnicos que la frenan',
          description: 'Velocidad, rastreo y estructura \u2014 los problemas t\u00e9cnicos te cuestan posiciones y ventas.',
          ctaText: 'Saber m\u00e1s',
        },
      },
    },
  },
  faq: [
    {
      question: '\u00bfC\u00f3mo funciona el Diagn\u00f3stico R\u00e1pido?',
      answer: 'Respondes 4 preguntas r\u00e1pidas sobre tu rol, industria y desaf\u00edos de tu negocio. Nuestro diagn\u00f3stico cruza tus respuestas con los servicios que tendr\u00e1n mayor impacto \u2014 en menos de 60 segundos.',
    },
    {
      question: '\u00bfEs realmente gratis?',
      answer: 'S\u00ed. No necesitas registrarte para ver tus resultados. Opcionalmente puedes ingresar tu correo para recibir una copia.',
    },
    {
      question: '\u00bfQu\u00e9 pasa despu\u00e9s de ver mis resultados?',
      answer: 'Cada recomendaci\u00f3n tiene un enlace a la p\u00e1gina del servicio con todos los detalles. Si quieres avanzar, la mayor\u00eda de servicios empiezan con una auditor\u00eda o consulta gratuita.',
    },
    {
      question: 'Seleccion\u00e9 "Otro" para mi industria \u2014 \u00bflos resultados ser\u00e1n precisos?',
      answer: 'Ver\u00e1s las recomendaciones m\u00e1s comunes seg\u00fan tu rol y desaf\u00edos generales. Para una evaluaci\u00f3n personalizada, agenda una consulta gratuita por WhatsApp.',
    },
    {
      question: '\u00bfCu\u00e1l es la diferencia entre esto y el check "\u00bfApareces en Google?"?',
      answer: 'El check de visibilidad analiza espec\u00edficamente si tu negocio aparece en Google y b\u00fasquedas con IA. Este diagn\u00f3stico es m\u00e1s amplio \u2014 te ayuda a identificar cu\u00e1l de nuestros servicios se ajusta mejor a tus necesidades.',
    },
  ],
};
