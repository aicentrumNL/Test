import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { ChevronLeft, ChevronRight, Check, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'happiness-dashboard-v2';

const DIMENSIONS = [
  { id: 'zingeving',  label: 'Zingeving',  emoji: '🎯', color: '#E8A838', desc: 'Het gevoel dat wat je doet ertoe doet en aansluit bij wie je bent' },
  { id: 'verbinding', label: 'Verbinding', emoji: '🤝', color: '#4ECDC4', desc: 'Kwaliteit van echte relaties, niet hoeveelheid contacten' },
  { id: 'groei',      label: 'Groei',      emoji: '📈', color: '#95E06C', desc: 'Het ervaren van vooruitgang en meesterschap' },
  { id: 'vitaliteit', label: 'Vitaliteit', emoji: '⚡', color: '#7BB3FF', desc: 'Energieniveau, levenskracht, herstelcapaciteit' },
  { id: 'flow',       label: 'Flow',       emoji: '🌊', color: '#C084FC', desc: 'Momenten van volledige absorptie in een uitdagende taak' },
];

const SABOTEURS = [
  { id: 'dopamine',    label: 'Dopamine-traps',  emoji: '📱', color: '#FF6B6B', desc: 'Scrollen, snacks, likes — korte piek, geen duurzame waarde' },
  { id: 'vergelijking', label: 'Vergelijkgedrag', emoji: '👁️', color: '#FF8C42', desc: 'Externe maatstaven laten bepalen of je goed genoeg bent' },
  { id: 'vermijding',  label: 'Vermijdgedrag',   emoji: '🏃', color: '#FFB347', desc: 'Afleiden in plaats van voelen, uitstellen in plaats van confronteren' },
];

const DIM_LABELS = ['', 'Laag', 'Matig', 'Oké', 'Goed', 'Top'];
const SAB_LABELS = ['', 'Nauwelijks', 'Soms', 'Regelmatig', 'Vaak', 'Dominant'];

const JOURNAL_FIXED = [
  { id: 'q_intentie', label: 'Wat deed ik deze week met intentie — niet op automatische piloot?' },
  { id: 'q_energie',  label: 'Wat gaf me deze week het meeste energie?' },
];

const JOURNAL_DIM = {
  zingeving:  { id: 'q_zingeving',  label: 'Wanneer had ik het gevoel dat wat ik deed er echt niet toe deed? Wat ontbrak er?' },
  verbinding: { id: 'q_verbinding', label: 'Met wie had ik een echt gesprek deze week? Als het antwoord "niemand" is — wat hield me tegen?' },
  groei:      { id: 'q_groei',      label: 'Waar liep ik vast en voelde ik me incompetent? Was het de taak, of mijn verwachting?' },
  vitaliteit: { id: 'q_vitaliteit', label: 'Wanneer voelde ik me het meest uitgeput? Wat kostte energie zonder dat het iets opleverde?' },
  flow:       { id: 'q_flow',       label: 'Had ik deze week één moment van volledige concentratie? Zo nee — wat stond in de weg?' },
};

const JOURNAL_SAB = {
  dopamine:    { id: 'q_dopamine',    label: 'Hoeveel uur ging deze week op aan scrollen, snacken, of andere snelle bevrediging? Hoe voelde ik me erna?' },
  vergelijking: { id: 'q_vergelijking', label: 'Met wie of wat vergeleek ik mezelf? Was die maatstaf van mij, of van buiten opgelegd?' },
  vermijding:  { id: 'q_vermijding',  label: 'Wat stelde ik uit of vermeed ik? Wat is het gevoel dat ik probeer te ontwijken?' },
};

const INTERVENTIONS = {
  zingeving: [
    'Schrijf in 2 zinnen op: voor wie of wat maak ik vandaag een verschil? Plak het op je scherm.',
    'Kies één taak van deze week en documenteer de impact ervan op iemand anders — maak het concreet.',
    'Vraag iemand: "Wat is iets dat ik deed dat voor jou verschil maakte?" Luister zonder te relativeren.',
  ],
  verbinding: [
    'Stuur vandaag een bericht aan iemand met de vraag: "Wat is iets waar je over nadenkt dat niemand je vroeg?"',
    'Plan deze week 30 minuten met iemand — telefoon weg, geen agenda, gewoon aanwezig zijn.',
    'Schrijf iemand een compliment dat specifiek is — niet "je bent top" maar "ik waardeer dat je [x] deed omdat [y]."',
  ],
  groei: [
    'Blokkeer morgen 1 uur voor één taak die je uitdaagt. Geen mail, geen Slack, alleen die taak.',
    'Benoem drie dingen die je deze maand hebt geleerd — klein of groot. Schrijf ze op.',
    'Kies één vaardigheid waar je beter in wilt worden en besteed er 20 minuten aan deze week. Niet om resultaat, maar om het proces.',
  ],
  vitaliteit: [
    'Identificeer het ene ding dat deze week de meeste energie kostte zonder opbrengst. Kun je het volgende week elimineren of delegeren?',
    'Plan één moment van bewust niets doen — geen telefoon, geen podcast, geen input. 15 minuten stilte.',
    'Beweeg morgen de eerste 15 minuten na het opstaan. Wandelen telt.',
  ],
  flow: [
    'Verwijder morgenochtend alle afleiding vóór je begint aan je belangrijkste taak. Telefoon in andere kamer, notificaties uit.',
    'Kies een taak die net iets boven je comfortniveau ligt — niet te makkelijk (verveling), niet te moeilijk (angst). Dat is de flow-zone.',
    'Merk op: wanneer deze week verloor je het besef van tijd? Wat deed je? Doe daar meer van.',
  ],
  dopamine: [
    'Stel een concrete regel: geen social media voor 10:00. Eén week. Merk op wat er verandert.',
    'Vervang vanavond één scroll-sessie door 10 minuten iets dat echte voldoening geeft — lezen, tekenen, bewegen.',
    'Tel morgen hoe vaak je je telefoon pakt zonder reden. Alleen het tellen verandert al het gedrag.',
  ],
  vergelijking: [
    'Schrijf op: welke maatstaf gebruik ik om mezelf te beoordelen? Is die van mij, of overgenomen?',
    'Unfollow deze week één account dat vergelijkgedrag triggert. Eén is genoeg.',
    'Vraag jezelf: "Is dit iets dat IK wil, of iets waarvan ik denk dat ik het zou moeten willen?"',
  ],
  vermijding: [
    'Benoem het ding dat je uitstelt. Schrijf op: wat is het ergste dat kan gebeuren als je het doet? Vaak valt het mee.',
    'Doe de eerste 2 minuten van de taak die je vermijdt. Alleen de eerste 2 minuten. De drempel is het moeilijkste.',
    'Vraag jezelf: welk gevoel probeer ik te ontwijken? Benoem het. Dat is stap één.',
  ],
};

// ─── Week utilities ────────────────────────────────────────────────────────────

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getWeekKey(date = new Date()) {
  const week = getISOWeek(date);
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const year = d.getUTCFullYear();
  return `${year}-W${String(week).padStart(2, '0')}`;
}

function parseWeekKey(key) {
  const [yearStr, wStr] = key.split('-W');
  return { year: parseInt(yearStr), week: parseInt(wStr) };
}

function weekKeyToDate(key) {
  const { year, week } = parseWeekKey(key);
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const startOfWeek = new Date(jan4);
  startOfWeek.setUTCDate(jan4.getUTCDate() - (jan4.getUTCDay() || 7) + 1 + (week - 1) * 7);
  return startOfWeek;
}

function addWeeks(key, delta) {
  const date = weekKeyToDate(key);
  date.setUTCDate(date.getUTCDate() + delta * 7);
  return getWeekKey(date);
}

function formatWeekLabel(key) {
  const { year, week } = parseWeekKey(key);
  return `W${week} '${String(year).slice(2)}`;
}

function sortedWeekKeys(data) {
  return Object.keys(data).sort();
}

// ─── Storage ──────────────────────────────────────────────────────────────────

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // silently ignore storage errors
  }
}

function getWeekData(data, key) {
  return data[key] || {
    scores: {},
    saboteurs: {},
    journal: {},
    intervention_shown: [],
    date: new Date().toISOString(),
  };
}

// ─── Sparkline (inline SVG) ───────────────────────────────────────────────────

function Sparkline({ values, color }) {
  if (!values || values.length < 2) return null;
  const w = 64, h = 20, pad = 2;
  const min = 1, max = 5;
  const points = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / (max - min)) * (h - pad * 2);
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <circle
        cx={points[points.length - 1].split(',')[0]}
        cy={points[points.length - 1].split(',')[1]}
        r="2"
        fill={color}
      />
    </svg>
  );
}

// ─── Score buttons ────────────────────────────────────────────────────────────

function ScoreButtons({ value, onChange, labels, accent }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3, 4, 5].map(n => {
        const active = value === n;
        return (
          <button
            key={n}
            onClick={() => onChange(n)}
            title={labels[n]}
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: active ? `2px solid ${accent}` : '2px solid #2e2a26',
              background: active ? accent + '22' : '#242020',
              color: active ? accent : '#8a8480',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

// ─── Dimension Card ───────────────────────────────────────────────────────────

function DimensionCard({ dim, score, sparkValues, onScore, saved }) {
  const borderColor = score >= 4 ? dim.color + '66'
    : score <= 2 && score > 0 ? '#FF6B6B44'
    : '#2e2a26';

  return (
    <div style={{
      background: '#201e1b',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 16,
      padding: '16px 20px',
      transition: 'border-color 0.3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 18 }}>{dim.emoji}</span>
            <span style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 18,
              color: dim.color,
              letterSpacing: '-0.02em',
            }}>{dim.label}</span>
            {score > 0 && (
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: dim.color,
                background: dim.color + '18',
                padding: '1px 7px',
                borderRadius: 6,
              }}>{DIM_LABELS[score]}</span>
            )}
          </div>
          <div style={{ fontSize: 12, color: '#7a7570', lineHeight: 1.4 }}>{dim.desc}</div>
        </div>
        {sparkValues && sparkValues.length >= 2 && (
          <div style={{ marginLeft: 12, marginTop: 2 }}>
            <Sparkline values={sparkValues} color={dim.color} />
          </div>
        )}
      </div>
      <ScoreButtons value={score} onChange={onScore} labels={DIM_LABELS} accent={dim.color} />
    </div>
  );
}

// ─── Saboteur Card ────────────────────────────────────────────────────────────

function SaboteurCard({ sab, score, onScore }) {
  const isHigh = score >= 4;
  return (
    <div style={{
      background: isHigh ? '#2a1c1c' : '#201e1b',
      border: `1.5px solid ${isHigh ? sab.color + '66' : '#2e2a26'}`,
      borderRadius: 16,
      padding: '16px 20px',
      transition: 'all 0.3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 18 }}>{sab.emoji}</span>
            <span style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 17,
              color: sab.color,
            }}>{sab.label}</span>
            {score > 0 && (
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: sab.color,
                background: sab.color + '18',
                padding: '1px 7px',
                borderRadius: 6,
              }}>{SAB_LABELS[score]}</span>
            )}
          </div>
          <div style={{ fontSize: 12, color: '#7a7570' }}>{sab.desc}</div>
        </div>
      </div>
      <ScoreButtons value={score} onChange={onScore} labels={SAB_LABELS} accent={sab.color} />
    </div>
  );
}

// ─── Save indicator ───────────────────────────────────────────────────────────

function SavedBadge({ visible }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      color: '#95E06C',
      fontSize: 12,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.4s',
    }}>
      <Check size={13} />
      <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>opgeslagen</span>
    </div>
  );
}

// ─── Progress indicator ───────────────────────────────────────────────────────

function Progress({ scores, saboteurs }) {
  const dimFilled = DIMENSIONS.filter(d => scores[d.id] > 0).length;
  const sabFilled = SABOTEURS.filter(s => saboteurs[s.id] > 0).length;
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      color: '#5a5550',
    }}>
      {dimFilled}/5 dimensies · {sabFilled}/3 saboteurs
    </div>
  );
}

// ─── Average score display ────────────────────────────────────────────────────

function AverageScore({ scores }) {
  const vals = DIMENSIONS.map(d => scores[d.id]).filter(Boolean);
  if (vals.length === 0) return null;
  const avg = (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  return (
    <div style={{ textAlign: 'right' }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 36,
        fontWeight: 600,
        color: '#e8e4dc',
        lineHeight: 1,
      }}>{avg}</div>
      <div style={{ fontSize: 11, color: '#5a5550', marginTop: 2 }}>gemiddeld</div>
    </div>
  );
}

// ─── Score Tab ────────────────────────────────────────────────────────────────

function ScoreTab({ weekKey, data, allData, onUpdate }) {
  const [savedVisible, setSavedVisible] = useState(false);
  const saveTimer = useRef(null);

  const weekData = getWeekData(allData, weekKey);
  const scores = weekData.scores || {};
  const saboteurs = weekData.saboteurs || {};

  const sparkValues = useCallback((dimId) => {
    const keys = sortedWeekKeys(allData);
    if (keys.length < 2) return null;
    return keys.slice(-6).map(k => allData[k]?.scores?.[dimId]).filter(v => v != null);
  }, [allData]);

  const handleScore = useCallback((dimId, val) => {
    const wd = getWeekData(allData, weekKey);
    const updated = {
      ...allData,
      [weekKey]: {
        ...wd,
        scores: { ...wd.scores, [dimId]: val },
        date: new Date().toISOString(),
      },
    };
    onUpdate(updated);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSavedVisible(true);
    saveTimer.current = setTimeout(() => setSavedVisible(false), 1500);
  }, [allData, weekKey, onUpdate]);

  const handleSaboteur = useCallback((sabId, val) => {
    const wd = getWeekData(allData, weekKey);
    const updated = {
      ...allData,
      [weekKey]: {
        ...wd,
        saboteurs: { ...wd.saboteurs, [sabId]: val },
        date: new Date().toISOString(),
      },
    };
    onUpdate(updated);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSavedVisible(true);
    saveTimer.current = setTimeout(() => setSavedVisible(false), 1500);
  }, [allData, weekKey, onUpdate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 22,
            color: '#e8e4dc',
            marginBottom: 4,
          }}>Vijf dimensies</div>
          <Progress scores={scores} saboteurs={saboteurs} />
        </div>
        <AverageScore scores={scores} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {DIMENSIONS.map(dim => (
          <DimensionCard
            key={dim.id}
            dim={dim}
            score={scores[dim.id] || 0}
            sparkValues={sparkValues(dim.id)}
            onScore={val => handleScore(dim.id, val)}
            saved={savedVisible}
          />
        ))}
      </div>

      <div>
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 18,
          color: '#e8e4dc',
          marginBottom: 4,
        }}>Saboteurs</div>
        <div style={{ fontSize: 12, color: '#5a5550', marginBottom: 12 }}>
          Wat ondermijnt duurzame voldoening?
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SABOTEURS.map(sab => (
            <SaboteurCard
              key={sab.id}
              sab={sab}
              score={saboteurs[sab.id] || 0}
              onScore={val => handleSaboteur(sab.id, val)}
            />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', height: 20 }}>
        <SavedBadge visible={savedVisible} />
      </div>
    </div>
  );
}

// ─── Journal Tab ──────────────────────────────────────────────────────────────

function JournalTab({ weekKey, allData, onUpdate }) {
  const weekData = getWeekData(allData, weekKey);
  const scores = weekData.scores || {};
  const saboteurs = weekData.saboteurs || {};
  const journal = weekData.journal || {};

  const debounceRefs = useRef({});

  const adaptiveQuestions = useMemo(() => {
    const qs = [];
    DIMENSIONS.forEach(dim => {
      if (scores[dim.id] > 0 && scores[dim.id] <= 2) {
        qs.push({ ...JOURNAL_DIM[dim.id], trigger: `${dim.label} ≤ 2`, color: dim.color });
      }
    });
    SABOTEURS.forEach(sab => {
      if (saboteurs[sab.id] >= 4) {
        qs.push({ ...JOURNAL_SAB[sab.id], trigger: `${sab.label} ≥ 4`, color: sab.color });
      }
    });
    return qs;
  }, [scores, saboteurs]);

  const handleChange = useCallback((qId, text) => {
    if (debounceRefs.current[qId]) clearTimeout(debounceRefs.current[qId]);
    debounceRefs.current[qId] = setTimeout(() => {
      const wd = getWeekData(allData, weekKey);
      const updated = {
        ...allData,
        [weekKey]: {
          ...wd,
          journal: { ...wd.journal, [qId]: text },
        },
      };
      onUpdate(updated);
    }, 500);
  }, [allData, weekKey, onUpdate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 22,
          color: '#e8e4dc',
          marginBottom: 4,
        }}>Journal</div>
        <div style={{ fontSize: 12, color: '#5a5550' }}>
          Vragen passen zich aan op basis van jouw scores.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {JOURNAL_FIXED.map(q => (
          <JournalCard
            key={q.id}
            question={q.label}
            value={journal[q.id] || ''}
            onChange={text => handleChange(q.id, text)}
          />
        ))}
      </div>

      {adaptiveQuestions.length > 0 && (
        <div>
          <div style={{
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            color: '#5a5550',
            marginBottom: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>Op basis van jouw scores</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {adaptiveQuestions.map(q => (
              <JournalCard
                key={q.id}
                question={q.label}
                value={journal[q.id] || ''}
                onChange={text => handleChange(q.id, text)}
                trigger={q.trigger}
                color={q.color}
              />
            ))}
          </div>
        </div>
      )}

      {adaptiveQuestions.length === 0 && (
        <div style={{
          background: '#201e1b',
          border: '1.5px dashed #2e2a26',
          borderRadius: 12,
          padding: '20px',
          textAlign: 'center',
          color: '#5a5550',
          fontSize: 13,
        }}>
          Geen aanvullende vragen — alle dimensies scoren goed en saboteurs zijn laag.
        </div>
      )}
    </div>
  );
}

function JournalCard({ question, value, onChange, trigger, color }) {
  const [localVal, setLocalVal] = useState(value);

  useEffect(() => {
    setLocalVal(value);
  }, [value]);

  const handleInput = (e) => {
    setLocalVal(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div style={{
      background: '#201e1b',
      border: `1.5px solid ${color ? color + '33' : '#2e2a26'}`,
      borderRadius: 14,
      padding: '16px 18px',
    }}>
      {trigger && (
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: color || '#5a5550',
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          opacity: 0.8,
        }}>{trigger}</div>
      )}
      <div style={{
        fontSize: 14,
        color: '#c8c4bc',
        marginBottom: 12,
        lineHeight: 1.5,
      }}>{question}</div>
      <textarea
        value={localVal}
        onChange={handleInput}
        placeholder="Schrijf hier..."
        rows={3}
        style={{
          width: '100%',
          background: '#18161480',
          border: '1px solid #2e2a26',
          borderRadius: 8,
          color: '#e8e4dc',
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          lineHeight: 1.6,
          padding: '10px 12px',
          resize: 'vertical',
          outline: 'none',
        }}
      />
    </div>
  );
}

// ─── Trends Tab ───────────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: '#2a2522',
      border: '1px solid #3e3a36',
      borderRadius: 10,
      padding: '10px 14px',
      fontSize: 12,
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <div style={{ color: '#8a8480', marginBottom: 6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: {p.value}
        </div>
      ))}
    </div>
  );
};

function TrendIcon({ delta }) {
  if (delta > 0.3) return <TrendingUp size={14} color="#95E06C" />;
  if (delta < -0.3) return <TrendingDown size={14} color="#FF6B6B" />;
  return <Minus size={14} color="#8a8480" />;
}

function pearson(xs, ys) {
  const n = xs.length;
  if (n < 3) return 0;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  const num = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0);
  const dx = Math.sqrt(xs.reduce((s, x) => s + (x - mx) ** 2, 0));
  const dy = Math.sqrt(ys.reduce((s, y) => s + (y - my) ** 2, 0));
  return (dx && dy) ? num / (dx * dy) : 0;
}

function findCorrelation(allData) {
  const keys = sortedWeekKeys(allData).slice(-8);
  if (keys.length < 4) return null;

  const series = {};
  [...DIMENSIONS, ...SABOTEURS].forEach(item => {
    const isSab = SABOTEURS.includes(item);
    series[item.id] = keys.map(k => isSab
      ? allData[k]?.saboteurs?.[item.id]
      : allData[k]?.scores?.[item.id]
    ).filter(v => v != null);
  });

  let best = { r: 0, a: null, b: null };

  const allIds = [...DIMENSIONS.map(d => d.id), ...SABOTEURS.map(s => s.id)];
  for (let i = 0; i < allIds.length; i++) {
    for (let j = i + 1; j < allIds.length; j++) {
      const a = allIds[i], b = allIds[j];
      const xs = series[a], ys = series[b];
      const len = Math.min(xs.length, ys.length);
      if (len < 3) continue;
      const r = pearson(xs.slice(-len), ys.slice(-len));
      if (Math.abs(r) > Math.abs(best.r)) {
        best = { r, a, b };
      }
    }
  }

  if (Math.abs(best.r) < 0.5) return null;

  const labelA = [...DIMENSIONS, ...SABOTEURS].find(x => x.id === best.a)?.label || best.a;
  const labelB = [...DIMENSIONS, ...SABOTEURS].find(x => x.id === best.b)?.label || best.b;

  if (best.r > 0) {
    return `Weken met hoge ${labelA} scoren ook hoog op ${labelB}.`;
  } else {
    return `${labelA} daalt vaak wanneer ${labelB} stijgt.`;
  }
}

function TrendsTab({ allData }) {
  const keys = sortedWeekKeys(allData).slice(-8);

  if (keys.length < 2) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
        gap: 12,
        color: '#5a5550',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 40 }}>📊</div>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: '#8a8480' }}>
          Trends verschijnen na week 2
        </div>
        <div style={{ fontSize: 13, maxWidth: 280, lineHeight: 1.6 }}>
          Vul nog een week in en je ziet hier je patronen over tijd.
        </div>
      </div>
    );
  }

  const chartData = keys.map(k => {
    const row = { week: formatWeekLabel(k) };
    DIMENSIONS.forEach(d => {
      row[d.label] = allData[k]?.scores?.[d.id] ?? null;
    });
    return row;
  });

  const sabChartData = keys.map(k => {
    const row = { week: formatWeekLabel(k) };
    SABOTEURS.forEach(s => {
      row[s.label] = allData[k]?.saboteurs?.[s.id] ?? null;
    });
    return row;
  });

  const correlation = keys.length >= 4 ? findCorrelation(allData) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 22,
          color: '#e8e4dc',
          marginBottom: 4,
        }}>Trends</div>
        <div style={{ fontSize: 12, color: '#5a5550' }}>Laatste {keys.length} weken</div>
      </div>

      <div style={{ background: '#201e1b', borderRadius: 16, padding: '20px 8px 12px' }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: '#8a8480', marginLeft: 12, marginBottom: 12 }}>
          Vijf dimensies
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData} margin={{ left: -20, right: 12, top: 4, bottom: 4 }}>
            <CartesianGrid stroke="#2a2622" strokeDasharray="3 3" />
            <XAxis dataKey="week" tick={{ fill: '#5a5550', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <YAxis domain={[1, 5]} ticks={[1,2,3,4,5]} tick={{ fill: '#5a5550', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'Inter', paddingTop: 8 }} />
            {DIMENSIONS.map(d => (
              <Line
                key={d.id}
                type="monotone"
                dataKey={d.label}
                stroke={d.color}
                strokeWidth={2}
                dot={{ fill: d.color, r: 3 }}
                activeDot={{ r: 5 }}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: '#201e1b', borderRadius: 16, padding: '20px 8px 12px' }}>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: '#8a8480', marginLeft: 12, marginBottom: 12 }}>
          Saboteurs
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={sabChartData} margin={{ left: -20, right: 12, top: 4, bottom: 4 }}>
            <CartesianGrid stroke="#2a2622" strokeDasharray="3 3" />
            <XAxis dataKey="week" tick={{ fill: '#5a5550', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <YAxis domain={[1, 5]} ticks={[1,2,3,4,5]} tick={{ fill: '#5a5550', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'Inter', paddingTop: 8 }} />
            {SABOTEURS.map(s => (
              <Line
                key={s.id}
                type="monotone"
                dataKey={s.label}
                stroke={s.color}
                strokeWidth={2}
                dot={{ fill: s.color, r: 3 }}
                activeDot={{ r: 5 }}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {DIMENSIONS.map(dim => {
          const vals = keys.map(k => allData[k]?.scores?.[dim.id]).filter(Boolean);
          if (vals.length === 0) return null;
          const avg = (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
          const delta = vals.length >= 2 ? vals[vals.length - 1] - vals[vals.length - 2] : 0;
          return (
            <div key={dim.id} style={{
              background: '#201e1b',
              border: `1.5px solid ${dim.color}22`,
              borderRadius: 12,
              padding: '12px 14px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ fontSize: 14 }}>{dim.emoji}</span>
                <span style={{ fontSize: 12, color: dim.color, fontFamily: "'DM Serif Display', serif" }}>{dim.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, color: '#e8e4dc' }}>{avg}</span>
                <TrendIcon delta={delta} />
              </div>
              <Sparkline values={vals} color={dim.color} />
            </div>
          );
        })}
      </div>

      {correlation && (
        <div style={{
          background: '#201e1b',
          border: '1.5px solid #3e3a36',
          borderRadius: 12,
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
        }}>
          <div style={{ fontSize: 18, flexShrink: 0 }}>🔗</div>
          <div>
            <div style={{ fontSize: 11, color: '#5a5550', fontFamily: "'JetBrains Mono', monospace", marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Patroon opgemerkt
            </div>
            <div style={{ fontSize: 14, color: '#c8c4bc', lineHeight: 1.5 }}>{correlation}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Insights Tab ─────────────────────────────────────────────────────────────

function pickIntervention(category, shown) {
  const options = INTERVENTIONS[category];
  if (!options) return null;
  const available = options.filter(o => !shown.includes(o));
  const pool = available.length > 0 ? available : options;
  return pool[Math.floor(Math.random() * pool.length)];
}

function InsightsTab({ weekKey, allData, onUpdate }) {
  const weekData = getWeekData(allData, weekKey);
  const scores = weekData.scores || {};
  const saboteurs = weekData.saboteurs || {};
  const shown = weekData.intervention_shown || [];

  const hasScores = DIMENSIONS.some(d => scores[d.id] > 0);

  const lowestDim = useMemo(() => {
    if (!hasScores) return null;
    return DIMENSIONS.reduce((best, d) => {
      const s = scores[d.id] || 6;
      return (!best || s < (scores[best.id] || 6)) ? d : best;
    }, null);
  }, [scores, hasScores]);

  const highestSab = useMemo(() => {
    const withScore = SABOTEURS.filter(s => saboteurs[s.id] > 0);
    if (withScore.length === 0) return null;
    return withScore.reduce((best, s) => {
      return (saboteurs[s.id] || 0) > (saboteurs[best.id] || 0) ? s : best;
    }, withScore[0]);
  }, [saboteurs]);

  const priority = useMemo(() => {
    if (!lowestDim && !highestSab) return null;
    const dimScore = lowestDim ? (scores[lowestDim.id] || 6) : 6;
    const sabScore = highestSab ? (saboteurs[highestSab.id] || 0) : 0;
    if (highestSab && sabScore >= 4 && sabScore > 6 - dimScore) {
      return { item: highestSab, category: highestSab.id, type: 'saboteur' };
    }
    if (lowestDim) {
      return { item: lowestDim, category: lowestDim.id, type: 'dimension' };
    }
    return null;
  }, [lowestDim, highestSab, scores, saboteurs]);

  const priorityIntervention = useMemo(() => {
    if (!priority) return null;
    return pickIntervention(priority.category, shown);
  }, [priority, shown]);

  const secondaryItem = useMemo(() => {
    if (!priority) return null;
    if (priority.type === 'dimension' && highestSab && (saboteurs[highestSab.id] || 0) >= 4) {
      return { item: highestSab, category: highestSab.id, type: 'saboteur' };
    }
    if (priority.type === 'saboteur' && lowestDim) {
      return { item: lowestDim, category: lowestDim.id, type: 'dimension' };
    }
    return null;
  }, [priority, highestSab, lowestDim, saboteurs]);

  const secondaryIntervention = useMemo(() => {
    if (!secondaryItem) return null;
    return pickIntervention(secondaryItem.category, shown);
  }, [secondaryItem, shown]);

  const weeklySummary = useMemo(() => {
    if (!hasScores) return null;
    const sorted = DIMENSIONS.filter(d => scores[d.id] > 0)
      .sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));
    const keys = sortedWeekKeys(allData);
    const declining = DIMENSIONS.filter(d => {
      if (keys.length < 3) return false;
      const recent = keys.slice(-3).map(k => allData[k]?.scores?.[d.id]).filter(Boolean);
      return recent.length >= 2 && recent[recent.length - 1] < recent[0];
    });
    const highSabs = SABOTEURS.filter(s => (saboteurs[s.id] || 0) >= 4);
    let text = '';
    if (sorted.length > 0) {
      const high = sorted.slice(0, 2).map(d => d.label).join(' en ');
      text += `Deze week scoor je hoog op ${high}.`;
    }
    if (declining.length > 0) {
      text += ` ${declining.map(d => d.label).join(', ')} daalt de laatste weken.`;
    }
    if (highSabs.length > 0) {
      text += ` ${highSabs.map(s => s.label).join(' en ')} ${highSabs.length === 1 ? 'was' : 'waren'} dominant.`;
    }
    return text || null;
  }, [scores, saboteurs, allData, hasScores]);

  if (!hasScores) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
        gap: 12,
        color: '#5a5550',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 40 }}>💡</div>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: '#8a8480' }}>
          Vul eerst je scores in
        </div>
        <div style={{ fontSize: 13, maxWidth: 280, lineHeight: 1.6 }}>
          Inzichten en interventies verschijnen zodra je de dimensies hebt beoordeeld.
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 22,
          color: '#e8e4dc',
          marginBottom: 4,
        }}>Inzichten</div>
        <div style={{ fontSize: 12, color: '#5a5550' }}>
          Gerichte interventies op basis van jouw scores deze week.
        </div>
      </div>

      {priority && priorityIntervention && (
        <InterventionCard
          item={priority.item}
          intervention={priorityIntervention}
          isPriority
        />
      )}

      {secondaryItem && secondaryIntervention && (
        <InterventionCard
          item={secondaryItem.item}
          intervention={secondaryIntervention}
          isPriority={false}
        />
      )}

      {weeklySummary && (
        <div style={{
          background: '#201e1b',
          border: '1.5px solid #2e2a26',
          borderRadius: 14,
          padding: '16px 18px',
        }}>
          <div style={{
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            color: '#5a5550',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>Weekoverzicht</div>
          <div style={{ fontSize: 14, color: '#c8c4bc', lineHeight: 1.6 }}>
            {weeklySummary}
          </div>
        </div>
      )}
    </div>
  );
}

function InterventionCard({ item, intervention, isPriority }) {
  return (
    <div style={{
      background: isPriority ? '#201e1b' : '#1c1a17',
      border: `1.5px solid ${item.color}${isPriority ? '55' : '33'}`,
      borderRadius: 16,
      padding: '18px 20px',
    }}>
      {isPriority && (
        <div style={{
          fontSize: 10,
          fontFamily: "'JetBrains Mono', monospace",
          color: item.color,
          marginBottom: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>Prioriteit deze week</div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 16 }}>{item.emoji}</span>
        <span style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 16,
          color: item.color,
        }}>{item.label}</span>
      </div>
      <div style={{
        fontSize: 14,
        color: '#e8e4dc',
        lineHeight: 1.7,
        padding: '12px 14px',
        background: '#18161480',
        borderRadius: 10,
        borderLeft: `3px solid ${item.color}`,
      }}>
        {intervention}
      </div>
      <div style={{
        marginTop: 10,
        fontSize: 11,
        color: '#5a5550',
        fontFamily: "'JetBrains Mono', monospace",
      }}>Doe dit deze week</div>
    </div>
  );
}

// ─── Tab bar ──────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'score',    label: 'Score',    emoji: '📊' },
  { id: 'journal',  label: 'Journal',  emoji: '✍️' },
  { id: 'trends',   label: 'Trends',   emoji: '📈' },
  { id: 'inzichten', label: 'Inzichten', emoji: '💡' },
];

function TabBar({ active, onChange }) {
  return (
    <div style={{
      display: 'flex',
      background: '#181614',
      borderTop: '1px solid #2a2622',
      padding: '8px 4px',
      position: 'sticky',
      bottom: 0,
      zIndex: 10,
    }}>
      {TABS.map(tab => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: '6px 0',
              color: isActive ? '#e8a838' : '#5a5550',
              transition: 'color 0.15s',
            }}
          >
            <span style={{ fontSize: 18 }}>{tab.emoji}</span>
            <span style={{
              fontSize: 10,
              fontFamily: "'Inter', sans-serif",
              fontWeight: isActive ? 600 : 400,
              letterSpacing: '0.02em',
            }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Week navigation header ───────────────────────────────────────────────────

function WeekHeader({ weekKey, onPrev, onNext, isCurrentWeek }) {
  const { week, year } = parseWeekKey(weekKey);
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 20px 12px',
      background: '#181614',
      borderBottom: '1px solid #2a2622',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <button onClick={onPrev} style={navBtnStyle}>
        <ChevronLeft size={18} />
      </button>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 17,
          color: '#e8e4dc',
        }}>Week {week}, {year}</div>
        {isCurrentWeek && (
          <div style={{
            fontSize: 10,
            fontFamily: "'JetBrains Mono', monospace",
            color: '#E8A838',
            marginTop: 1,
          }}>deze week</div>
        )}
      </div>
      <button onClick={onNext} style={navBtnStyle} disabled={isCurrentWeek}>
        <ChevronRight size={18} color={isCurrentWeek ? '#3a3630' : undefined} />
      </button>
    </div>
  );
}

const navBtnStyle = {
  background: 'none',
  border: '1.5px solid #2a2622',
  borderRadius: 8,
  width: 36,
  height: 36,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#8a8480',
};

// ─── Root component ───────────────────────────────────────────────────────────

export default function HappinessDashboard() {
  const currentWeekKey = getWeekKey();
  const [activeTab, setActiveTab] = useState('score');
  const [weekKey, setWeekKey] = useState(currentWeekKey);
  const [allData, setAllData] = useState(loadData);

  const handleUpdate = useCallback((updated) => {
    setAllData(updated);
    saveData(updated);
  }, []);

  const goToPrev = () => setWeekKey(k => addWeeks(k, -1));
  const goToNext = () => {
    if (weekKey !== currentWeekKey) setWeekKey(k => addWeeks(k, 1));
  };

  return (
    <div style={{
      maxWidth: 480,
      margin: '0 auto',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      background: '#1a1a17',
    }}>
      <WeekHeader
        weekKey={weekKey}
        onPrev={goToPrev}
        onNext={goToNext}
        isCurrentWeek={weekKey === currentWeekKey}
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 12px' }}>
        {activeTab === 'score' && (
          <ScoreTab
            weekKey={weekKey}
            data={allData[weekKey]}
            allData={allData}
            onUpdate={handleUpdate}
          />
        )}
        {activeTab === 'journal' && (
          <JournalTab
            weekKey={weekKey}
            allData={allData}
            onUpdate={handleUpdate}
          />
        )}
        {activeTab === 'trends' && (
          <TrendsTab allData={allData} />
        )}
        {activeTab === 'inzichten' && (
          <InsightsTab
            weekKey={weekKey}
            allData={allData}
            onUpdate={handleUpdate}
          />
        )}
      </div>

      <TabBar active={activeTab} onChange={setActiveTab} />
    </div>
  );
}
