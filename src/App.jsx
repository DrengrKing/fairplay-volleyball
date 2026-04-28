import { useState, useEffect, Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  render() {
    if (this.state.err) {
      return (
        <div style={{padding:24,fontFamily:"monospace",fontSize:12,color:"#f87171",background:"#0b1424",minHeight:"100vh"}}>
          <div style={{fontWeight:700,marginBottom:8}}>App crashed — error details:</div>
          <pre style={{whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{String(this.state.err)}</pre>
          <pre style={{whiteSpace:"pre-wrap",wordBreak:"break-word",color:"#7a93b4",marginTop:8}}>{this.state.err?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}


// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg:     "#0b1424",
  surf:   "#14233a",
  navy:   "#0d1829",
  border: "#1e3050",
  text:   "#dde8f8",
  muted:  "#7a93b4",
  light:  "#3d5470",
  orange: "#f97316",
  gold:   "#d4a83a",
  gold2:  "#b8911f",
  green:  "#4ade80",
  red:    "#f87171",
};

const DIVS   = ["Coed B/C-ish","Coed C","Coed C-"];
const DIVC   = { "Coed B/C-ish":"#e85d04","Coed C":"#2563eb","Coed C-":"#16a34a" };
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri"];

// ─── Data ─────────────────────────────────────────────────────────────────────
const TEAMS_INIT = [
  {id:51,name:"Stranger Swings",               captain:"TBD",div:"Coed B/C-ish",color:"#e85d04",roster:[]},
  {id:52,name:"Power Rage-ers",                captain:"TBD",div:"Coed B/C-ish",color:"#dc2626",roster:[]},
  {id:53,name:"Notorious DIG",                 captain:"TBD",div:"Coed B/C-ish",color:"#db2777",roster:[]},
  {id:54,name:"Oddball Express",               captain:"TBD",div:"Coed B/C-ish",color:"#9333ea",roster:[]},
  {id:55,name:"Go Loko",                       captain:"TBD",div:"Coed B/C-ish",color:"#2563eb",roster:[]},
  {id:56,name:"King Pins",                     captain:"TBD",div:"Coed B/C-ish",color:"#0891b2",roster:[]},
  {id:57,name:"Circle Delivers",               captain:"TBD",div:"Coed B/C-ish",color:"#059669",roster:[]},
  {id:58,name:"Rea's Six Pack",                captain:"TBD",div:"Coed B/C-ish",color:"#d97706",roster:[]},
  {id:59,name:"TBD",                           captain:"TBD",div:"Coed B/C-ish",color:"#64748b",roster:[]},
  {id:60,name:"TBD",                           captain:"TBD",div:"Coed B/C-ish",color:"#64748b",roster:[]},
  {id:61,name:"Jungle Ballers",                captain:"TBD",div:"Coed C",color:"#1d4ed8",roster:[]},
  {id:62,name:"Balls Deep",                    captain:"TBD",div:"Coed C",color:"#7c3aed",roster:[]},
  {id:63,name:"Veracruz",                      captain:"TBD",div:"Coed C",color:"#be185d",roster:[]},
  {id:64,name:"Ball Fondlers",                 captain:"TBD",div:"Coed C",color:"#0d9488",roster:[]},
  {id:65,name:"Crushers",                      captain:"TBD",div:"Coed C",color:"#b45309",roster:[]},
  {id:66,name:"My Neck My Back Sand All Down My Crack",captain:"TBD",div:"Coed C",color:"#0f766e",roster:[]},
  {id:71,name:"3Rivers Set Me Outside",        captain:"TBD",div:"Coed C-",color:"#16a34a",roster:[]},
  {id:72,name:"Voss Spikers",                  captain:"TBD",div:"Coed C-",color:"#0284c7",roster:[]},
  {id:73,name:"Turn Down for Watt",            captain:"TBD",div:"Coed C-",color:"#6d28d9",roster:[]},
  {id:74,name:"Overserved",                    captain:"TBD",div:"Coed C-",color:"#c2410c",roster:[]},
  {id:75,name:"Crushers",                      captain:"TBD",div:"Coed C-",color:"#0f766e",roster:[]},
];

const GAMES_INIT = [
  {id:1, day:"Mon",date:"May 5", time:"6:00 PM",home:51,away:52,court:"River City — Court 1",status:"Final",   hs:3,   as_:1  },
  {id:2, day:"Mon",date:"May 5", time:"7:30 PM",home:53,away:54,court:"River City — Court 2",status:"Final",   hs:2,   as_:3  },
  {id:3, day:"Mon",date:"May 5", time:"6:00 PM",home:61,away:62,court:"River City — Court 3",status:"Final",   hs:3,   as_:0  },
  {id:4, day:"Mon",date:"May 5", time:"6:00 PM",home:71,away:72,court:"Empowered — Court 1", status:"Final",   hs:3,   as_:2  },
  {id:5, day:"Wed",date:"May 7", time:"6:00 PM",home:55,away:56,court:"River City — Court 1",status:"Live",    hs:2,   as_:1  },
  {id:6, day:"Wed",date:"May 7", time:"7:30 PM",home:57,away:58,court:"River City — Court 2",status:"Live",    hs:0,   as_:1  },
  {id:7, day:"Wed",date:"May 7", time:"6:00 PM",home:65,away:66,court:"River City — Court 3",status:"Live",    hs:2,   as_:2  },
  {id:8, day:"Wed",date:"May 7", time:"7:30 PM",home:73,away:74,court:"Empowered — Court 1", status:"Live",    hs:1,   as_:1  },
  {id:9, day:"Fri",date:"May 9", time:"6:00 PM",home:51,away:53,court:"River City — Court 1",status:"Upcoming",hs:null,as_:null},
  {id:10,day:"Fri",date:"May 9", time:"7:30 PM",home:52,away:54,court:"River City — Court 2",status:"Upcoming",hs:null,as_:null},
  {id:11,day:"Fri",date:"May 9", time:"6:00 PM",home:61,away:63,court:"River City — Court 3",status:"Upcoming",hs:null,as_:null},
  {id:12,day:"Fri",date:"May 9", time:"7:30 PM",home:71,away:73,court:"Empowered — Court 1", status:"Upcoming",hs:null,as_:null},
  {id:13,day:"Fri",date:"May 9", time:"9:00 PM",home:72,away:75,court:"Empowered — Court 2", status:"Upcoming",hs:null,as_:null},
  {id:14,day:"Mon",date:"May 12",time:"6:00 PM",home:55,away:53,court:"River City — Court 1",status:"Upcoming",hs:null,as_:null},
  {id:15,day:"Mon",date:"May 12",time:"7:30 PM",home:56,away:54,court:"River City — Court 2",status:"Upcoming",hs:null,as_:null},
];

const BRACKET_INIT = [
  {id:"qf0",round:"QF",home:51,away:52,hs:3,   as_:1,   done:true },
  {id:"qf1",round:"QF",home:53,away:54,hs:2,   as_:3,   done:true },
  {id:"qf2",round:"QF",home:55,away:56,hs:2,   as_:1,   done:true },
  {id:"qf3",round:"QF",home:57,away:58,hs:0,   as_:1,   done:true },
  {id:"sf0",round:"SF",home:51,away:54,hs:null,as_:null,done:false},
  {id:"sf1",round:"SF",home:55,away:58,hs:null,as_:null,done:false},
  {id:"f0", round:"F", home:"W SF 1",away:"W SF 2",hs:null,as_:null,done:false},
];

const INFO_INIT = {
  announcements:[
    {id:1,date:"Apr 28",tag:"Open Court",title:"Open Court This Wed & Thu!",         body:"Beach open court 6–9 pm at River City (1550 Griffin St). Free to use — come practice, form teams, and support the bar."},
    {id:2,date:"Apr 24",tag:"Tournament", title:"Tournament Registration Now Open",   body:"Spring Championship sign-ups are live. All teams must register by May 15."},
    {id:3,date:"Apr 22",tag:"Facility",   title:"Court Maintenance — May 3 & 4",     body:"Court 1 at River City unavailable for resurfacing. Affected games will be rescheduled."},
    {id:4,date:"Apr 18",tag:"League",     title:"Full Schedule Released",             body:"The complete 2025 Spring season schedule is now posted in the Schedule tab."},
    {id:5,date:"Apr 14",tag:"League",     title:"Season Kick-Off — Welcome!",         body:"Welcome to Fairplay 2025 Spring Season! 21 teams across 3 divisions. First games May 5th."},
  ],
  openCourt:{days:"Wed & Thu",time:"6–9 PM",location:"River City (1550 Griffin St)",note:"No kids under 13 or pets at River City."},
  rules:[
    "Seasons are typically 10 matches. Teams normally play 2 matches per night (~25 min each).",
    "All leagues finish with a seeded double-elimination tournament.",
    "No third game until the league tourney — tight schedule.",
    "Full schedule is made the weekend after the first week of play.",
    "Coed Sixes: no more than 3 men on court at any time.",
    "Players may play on 2 teams per night if in different divisions.",
    "Rain is not a problem — we have a lightning detector.",
    "No kids under 13 or pets at River City.",
    "Time requests for the league tourney cannot be granted.",
  ],
  payment:{venmo:"@fairplaybeach",zelle:"fairplaybeach@yahoo.com",cash:"Pay on site at the bar/shack",check:'Make out to "Fair Play"',earlyNote:"Pay in full on the first night in one handoff to get the early entry fee (~$5 off per player)."},
  requestNote:"Send requests to fairplaybeach@yahoo.com or text (260) 402-3999. No refunds after the full schedule is made.",
  locations:[
    {name:"River City",    addr:"1550 Griffin St, Fort Wayne IN",note:"Primary venue. No kids under 13 or pets."},
    {name:"Empowered",     addr:"Fort Wayne, IN",               note:"Backup / overflow courts."},
    {name:"The Seminary",  addr:"Fort Wayne, IN",               note:"Indoor leagues."},
    {name:"Electric Works",addr:"Fort Wayne, IN",               note:"Indoor overflow venue."},
  ],
  contact:{email:"fairplaybeach@yahoo.com",phone:"(260) 402-3999",facebook:"FairPlay Players Group",website:"fairplayvolleyball.com"},
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const tById = (teams, id) => teams.find(t => t.id === id);

const bName = (teams, val) => {
  if (typeof val === "number") { const t = tById(teams, val); return t ? t.name : "TBD"; }
  return val || "TBD";
};

function calcStandings(games, teams) {
  const s = {};
  teams.forEach(t => { s[t.id] = {w:0,l:0,pf:0,pa:0}; });
  games.filter(g => g.status === "Final" && g.hs != null).forEach(g => {
    if (!s[g.home] || !s[g.away]) return;
    if (g.hs > g.as_)      { s[g.home].w++; s[g.away].l++; }
    else if (g.as_ > g.hs) { s[g.away].w++; s[g.home].l++; }
    s[g.home].pf += g.hs;  s[g.home].pa += g.as_;
    s[g.away].pf += g.as_; s[g.away].pa += g.hs;
  });
  return teams.map(t => ({...t, ...s[t.id]}));
}

function saveLocal(key, val) {
  try { localStorage.setItem(key, typeof val === "string" ? val : JSON.stringify(val)); } catch(e) {}
}
function loadLocal(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch(e) { return fallback; }
}
function removeLocal(key) {
  try { localStorage.removeItem(key); } catch(e) {}
}
// Keep old names as aliases so all existing call sites work without changes
const storageSet = (key, val) => saveLocal(key, val);
const storageDel = (key)      => removeLocal(key);


// ─── Shared UI ────────────────────────────────────────────────────────────────
// ─── Shared radius / spacing constants ───────────────────────────────────────
const R  = 12;   // standard card radius
const R2 = 8;    // inner element radius (inputs, inner cards)
const R3 = 20;   // pill radius (badges, filter chips)
const SP = 14;   // standard card padding

function Avatar({team, size=36}) {
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:team.color,flexShrink:0,
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:Math.round(size*.32),fontWeight:700,color:"#fff",
      fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"0.3px"}}>
      {team.id}
    </div>
  );
}

function StatusBadge({status}) {
  const m = {
    Live:     {bg:"#2a1400", c:C.orange, dot:true },
    Final:    {bg:"#0d1b30", c:C.muted,  dot:false},
    Upcoming: {bg:"#081830", c:"#60a5fa",dot:false},
  };
  const s = m[status] || m.Final;
  return (
    <span style={{background:s.bg,color:s.c,fontSize:10,fontWeight:600,
      padding:"2px 9px",borderRadius:R3,display:"inline-flex",alignItems:"center",gap:4,whiteSpace:"nowrap",
      letterSpacing:"0.2px"}}>
      {s.dot && <span style={{width:5,height:5,borderRadius:"50%",background:C.orange,display:"inline-block"}}/>}
      {status}
    </span>
  );
}

function DivPill({div}) {
  const c = DIVC[div] || C.muted;
  return (
    <span style={{background:c+"18",color:c,fontSize:10,fontWeight:600,
      padding:"2px 9px",borderRadius:R3,whiteSpace:"nowrap",letterSpacing:"0.2px"}}>
      {div}
    </span>
  );
}

// Section label — consistent uppercase heading above a group
function SLabel({children, style={}}) {
  return (
    <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",
      letterSpacing:"1.2px",marginBottom:10,...style}}>
      {children}
    </div>
  );
}

// Filter chip button
function FBtn({label,active,color,onClick}) {
  const col = color || C.gold;
  return (
    <button onClick={onClick} style={{
      padding:"5px 14px",borderRadius:R3,fontSize:12,fontWeight:500,cursor:"pointer",
      border:active?`1.5px solid ${col}`:`1px solid ${C.border}`,
      background:active?col:C.surf,color:active?"#000":C.muted,
      whiteSpace:"nowrap",letterSpacing:"0.1px",
    }}>
      {label}
    </button>
  );
}

// Score counter
function Counter({value,onChange}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <button onClick={()=>onChange(Math.max(0,value-1))}
        style={{width:32,height:32,borderRadius:R2,border:`1px solid ${C.border}`,background:C.bg,
          color:C.muted,fontSize:18,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
        −
      </button>
      <span style={{fontSize:24,fontWeight:700,minWidth:32,textAlign:"center",
        fontFamily:"'Barlow Condensed',sans-serif",color:C.text,letterSpacing:"-0.5px"}}>
        {value}
      </span>
      <button onClick={()=>onChange(value+1)}
        style={{width:32,height:32,borderRadius:R2,border:`1px solid ${C.gold}44`,background:`${C.gold}14`,
          color:C.gold,fontSize:18,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
        +
      </button>
    </div>
  );
}

// Text field
function TF({label,value,onChange,placeholder}) {
  return (
    <div style={{marginBottom:12}}>
      {label && (
        <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",
          letterSpacing:"0.8px",marginBottom:5}}>{label}</div>
      )}
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder||""}
        style={{width:"100%",padding:"9px 12px",borderRadius:R2,border:`1px solid ${C.border}`,
          fontSize:13,color:C.text,background:C.bg,boxSizing:"border-box",outline:"none",
          lineHeight:1.4}}/>
    </div>
  );
}

// Textarea
function TA({label,value,onChange,rows=3}) {
  return (
    <div style={{marginBottom:12}}>
      {label && (
        <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",
          letterSpacing:"0.8px",marginBottom:5}}>{label}</div>
      )}
      <textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows}
        style={{width:"100%",padding:"9px 12px",borderRadius:R2,border:`1px solid ${C.border}`,
          fontSize:13,color:C.text,background:C.bg,boxSizing:"border-box",outline:"none",
          resize:"vertical",fontFamily:"inherit",lineHeight:1.5}}/>
    </div>
  );
}

// Primary + cancel button pair
function SaveCancel({onSave,onCancel,label="Save"}) {
  return (
    <div style={{display:"flex",gap:8,marginTop:8}}>
      <button onClick={onCancel}
        style={{flex:1,padding:"10px",borderRadius:R2,border:`1px solid ${C.border}`,
          background:"none",color:C.muted,fontSize:13,fontWeight:500,cursor:"pointer",
          letterSpacing:"0.2px"}}>
        Cancel
      </button>
      <button onClick={onSave}
        style={{flex:2,padding:"10px",borderRadius:R2,border:"none",
          background:C.gold,color:"#000",fontSize:13,fontWeight:700,cursor:"pointer",
          fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"0.8px",textTransform:"uppercase"}}>
        {label}
      </button>
    </div>
  );
}

// Inline edit button (ref mode)
function EditBtn({onClick}) {
  return (
    <button onClick={onClick}
      style={{padding:"3px 10px",borderRadius:6,fontSize:10,fontWeight:700,
        border:`1px solid ${C.gold}55`,background:`${C.gold}14`,color:C.gold,
        cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,letterSpacing:"0.5px",
        textTransform:"uppercase"}}>
      Edit
    </button>
  );
}

// Empty state helper
function Empty({text="Nothing here yet."}) {
  return (
    <div style={{padding:"20px 0",textAlign:"center",color:C.light,fontSize:13}}>
      {text}
    </div>
  );
}

// ── DatePick — native date picker that stores/shows as display string ─────────
// Stores value as "YYYY-MM-DD" internally, displays as "Wed May 7"
// The `value` prop coming in may be a display string or ISO string.
function DatePick({ label, value, onChange }) {
  // Convert a display string like "May 7" / "Mon May 5" to YYYY-MM-DD
  const toISO = (str) => {
    if (!str) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
    try {
      const d = new Date(str + " 2025");
      if (isNaN(d)) return "";
      return d.toISOString().slice(0,10);
    } catch(e) { return ""; }
  };
  // Convert YYYY-MM-DD to display "Wed, May 7"
  const toDisplay = (iso) => {
    if (!iso) return "";
    try {
      const d = new Date(iso + "T12:00:00");
      return d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});
    } catch(e) { return iso; }
  };
  const isoVal = toISO(value) || value;
  const handleChange = (e) => {
    const iso = e.target.value;
    onChange(toDisplay(iso));  // store as readable display string
  };
  return (
    <div style={{marginBottom:12}}>
      {label && <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:5}}>{label}</div>}
      <input
        type="date"
        value={isoVal}
        onChange={handleChange}
        style={{width:"100%",padding:"9px 12px",borderRadius:R2,border:`1px solid ${C.border}`,
          fontSize:13,color:C.text,background:C.bg,boxSizing:"border-box",outline:"none",
          colorScheme:"dark"}}
      />
    </div>
  );
}

// ── TeamPick — grouped select for choosing a team ─────────────────────────────
function TeamPick({ label, value, onChange, teams, myTeamIds=[], allowAny=false }) {
  const myTeams = myTeamIds.map(id => teams.find(t=>t.id===id)).filter(Boolean);
  return (
    <div style={{marginBottom:12}}>
      {label && <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:5}}>{label}</div>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{width:"100%",padding:"9px 12px",borderRadius:R2,border:`1px solid ${C.border}`,
          fontSize:13,color:C.text,background:C.bg,boxSizing:"border-box",outline:"none",
          appearance:"none",WebkitAppearance:"none"}}>
        <option value="">Select a team…</option>
        {allowAny && <option value="Any team">Any team</option>}
        {myTeams.length > 0 && (
          <optgroup label="My Teams">
            {myTeams.map(t => (
              <option key={t.id} value={`${t.name} (#${t.id})`}>
                #{t.id} {t.name}
              </option>
            ))}
          </optgroup>
        )}
        {DIVS.map(div => {
          const ts = teams.filter(t => t.div === div && !myTeamIds.includes(t.id));
          if (ts.length === 0) return null;
          return (
            <optgroup key={div} label={div}>
              {ts.map(t => (
                <option key={t.id} value={`${t.name} (#${t.id})`}>
                  #{t.id} {t.name}
                </option>
              ))}
            </optgroup>
          );
        })}
      </select>
    </div>
  );
}




function GameCard({game,teams,compact=false,refMode=false,editId,setEditId,updateGame,myTeamIds=[]}) {
  const home = tById(teams, game.home);
  const away = tById(teams, game.away);
  const [hs,    setHs]     = useState(game.hs  ?? 0);
  const [as_,   setAs]     = useState(game.as_ ?? 0);
  const [stat,  setStat]   = useState(game.status);
  const [court, setCourt]  = useState(game.court);
  const [time,  setTime]   = useState(game.time);
  const [date,  setDate]   = useState(game.date);
  const [day,   setDay]    = useState(game.day);

  if (!home || !away) return null;
  const scored   = game.status === "Live" || game.status === "Final";
  const editing  = refMode && editId === game.id;
  const isMyGame = myTeamIds.length > 0 && (myTeamIds.includes(game.home) || myTeamIds.includes(game.away));

  const openEdit = () => { setHs(game.hs??0); setAs(game.as_??0); setStat(game.status); setCourt(game.court); setTime(game.time); setDate(game.date); setDay(game.day); setEditId(game.id); };

  return (
    <div style={{background:C.surf,borderRadius:12,padding:compact?"11px 14px":"14px 16px",marginBottom:8,
      border:editing?`1.5px solid ${C.gold}`:isMyGame?`1.5px solid ${C.gold}44`:game.status==="Live"?`1.5px solid ${C.orange}`:`1px solid ${C.border}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:11,color:C.muted}}>{game.day} {game.date} · {game.time}</span>
          {isMyGame && <span style={{fontSize:9,fontWeight:700,color:C.gold,textTransform:"uppercase",letterSpacing:"1px",background:`${C.gold}18`,padding:"1px 6px",borderRadius:4}}>My Team</span>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <StatusBadge status={game.status}/>
          {refMode && !editing && <EditBtn onClick={openEdit}/>}
          {refMode &&  editing && <span style={{fontSize:10,color:C.gold,fontWeight:600}}>Editing…</span>}
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:0}}>
          <Avatar team={home} size={30}/>
          <span style={{fontSize:13,fontWeight:600,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{home.name}</span>
        </div>
        {scored
          ? <div style={{padding:"3px 12px",background:C.bg,borderRadius:8,flexShrink:0,fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:700,color:C.text,display:"flex",gap:8,alignItems:"center"}}>
              <span>{game.hs}</span><span style={{fontSize:11,color:C.light}}>–</span><span>{game.as_}</span>
            </div>
          : <div style={{padding:"3px 12px",background:C.bg,borderRadius:8,fontSize:11,fontWeight:600,color:C.muted,flexShrink:0}}>VS</div>
        }
        <div style={{display:"flex",alignItems:"center",gap:8,flex:1,justifyContent:"flex-end",minWidth:0}}>
          <span style={{fontSize:13,fontWeight:600,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"right"}}>{away.name}</span>
          <Avatar team={away} size={30}/>
        </div>
      </div>
      {!compact && (
        <div style={{marginTop:9,paddingTop:9,borderTop:`1px solid ${C.border}`,fontSize:11,color:C.muted,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span>📍 {game.court}</span>
          <DivPill div={home.div}/>
        </div>
      )}
      {editing && (
        <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",minWidth:46}}>Status</span>
            <div style={{display:"flex",gap:5}}>
              {["Upcoming","Live","Final"].map(s=>(
                <button key={s} onClick={()=>setStat(s)} style={{padding:"3px 11px",borderRadius:R,fontSize:11,fontWeight:500,cursor:"pointer",
                  border:stat===s?`1.5px solid ${C.orange}`:`1px solid ${C.border}`,background:stat===s?C.orange:C.surf,color:stat===s?"#fff":C.muted}}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{background:C.bg,borderRadius:8,padding:"10px 12px",marginBottom:10}}>
            <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",marginBottom:10}}>Score</div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:12,fontWeight:500,color:C.text,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{home.name}</span>
              <Counter value={hs} onChange={setHs}/>
              <span style={{fontSize:12,color:C.light}}>–</span>
              <Counter value={as_} onChange={setAs}/>
              <span style={{fontSize:12,fontWeight:500,color:C.text,flex:1,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{away.name}</span>
            </div>
          </div>
          <div style={{background:C.bg,borderRadius:8,padding:"10px 12px",marginBottom:10}}>
            <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",marginBottom:10}}>Details</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <DatePick label="Date" value={date} onChange={v=>{ setDate(v); const d=new Date(v+" 2025"); if(!isNaN(d)) setDay(d.toLocaleDateString("en-US",{weekday:"short"})); }}/>
              <TimePick label="Time" value={time} onChange={setTime}/>
              <TF label="Court" value={court} onChange={setCourt}/>
            </div>
          </div>
          <SaveCancel label="Save Game" onCancel={()=>setEditId(null)}
            onSave={()=>updateGame(game.id,{hs,as_:as_,status:stat,court,time,date,day})}/>
        </div>
      )}
    </div>
  );
}

// ── TimePick — 30-min increment dropdown ─────────────────────────────────────
const TIME_SLOTS = (() => {
  const slots = [];
  for (let h = 5; h <= 23; h++) {
    for (const m of [0, 30]) {
      const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
      const ampm   = h < 12 ? "AM" : "PM";
      const mStr   = m === 0 ? "00" : "30";
      slots.push(`${hour12}:${mStr} ${ampm}`);
    }
  }
  return slots;
})();

function TimePick({ label, value, onChange, optional=false }) {
  return (
    <div style={{marginBottom:12}}>
      {label && <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:5}}>{label}</div>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{width:"100%",padding:"9px 12px",borderRadius:R2,border:`1px solid ${C.border}`,
          fontSize:13,color:value?C.text:C.muted,background:C.bg,boxSizing:"border-box",
          outline:"none",appearance:"none",WebkitAppearance:"none"}}>
        <option value="">{optional ? "Any time" : "Select time…"}</option>
        {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
    </div>
  );
}


function Drawer({open,onClose,setTab,refMode,adminMode,enableRef,disableRef,enableAdmin,disableAdmin,setEditId}) {
  const [showRefPw,   setShowRefPw]   = useState(false);
  const [showAdminPw, setShowAdminPw] = useState(false);
  const [pw,          setPw]          = useState("");
  const [pwErr,       setPwErr]       = useState(false);

  const closeAll = () => { setShowRefPw(false); setShowAdminPw(false); setPw(""); setPwErr(false); };

  const tryRef = () => {
    if (pw === "fairplayref") { enableRef(); closeAll(); onClose(); }
    else setPwErr(true);
  };
  const tryAdmin = () => {
    if (pw === "fairplayadmin") { enableAdmin(); closeAll(); onClose(); }
    else setPwErr(true);
  };

  const items = [
    {id:"home",        icon:"🏠",label:"Home"},
    {id:"schedule",    icon:"📅",label:"Schedule"},
    {id:"teams",       icon:"👥",label:"Teams"},
    {id:"teams",       icon:"📊",label:"Standings"},
    {id:"bracket",      icon:"🏆",label:"Tournament Bracket"},
    {id:"announcements",icon:"📣",label:"Announcements"},
    {id:"subs",         icon:"🔄",label:"Subs Board"},
    {id:"info",         icon:"📋",label:"Rules"},
    {id:"info",        icon:"💳",label:"Payments"},
    {id:"info",        icon:"🏖",label:"Open Court"},
    {id:"info",        icon:"📷",label:"Gallery"},
    {id:"info",        icon:"📞",label:"Contact"},
  ];
  const nav = id => { setTab(id); closeAll(); onClose(); };

  // Inline password input
  const PwInput = ({onSubmit, label}) => (
    <div style={{padding:"8px 20px 12px",borderTop:`1px solid ${C.border}`}}>
      <div style={{fontSize:11,color:C.muted,marginBottom:6}}>{label}</div>
      <div style={{display:"flex",gap:6}}>
        <input
          type="password" value={pw} autoFocus
          onChange={e=>{setPw(e.target.value);setPwErr(false);}}
          onKeyDown={e=>e.key==="Enter"&&onSubmit()}
          placeholder="Password"
          style={{flex:1,padding:"7px 10px",borderRadius:R2,border:`1px solid ${pwErr?C.red:C.border}`,fontSize:13,color:C.text,background:C.bg,outline:"none"}}
        />
        <button onClick={onSubmit} style={{padding:"7px 14px",borderRadius:R2,border:"none",background:C.gold,color:"#000",fontSize:13,fontWeight:700,cursor:"pointer"}}>→</button>
        <button onClick={()=>{closeAll();setPw("");}} style={{padding:"7px 10px",borderRadius:R2,border:`1px solid ${C.border}`,background:"none",color:C.muted,fontSize:13,cursor:"pointer"}}>✕</button>
      </div>
      {pwErr && <div style={{fontSize:11,color:C.red,marginTop:4}}>Incorrect password.</div>}
    </div>
  );

  return (
    <>
      {open && <div onClick={()=>{closeAll();onClose();}} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:100}}/>}
      <div style={{position:"fixed",top:0,left:0,bottom:0,width:270,background:C.navy,zIndex:101,
        transform:open?"translateX(0)":"translateX(-100%)",transition:"transform 0.26s cubic-bezier(0.4,0,0.2,1)",
        overflowY:"auto",boxShadow:"2px 0 24px rgba(0,0,0,0.5)"}}>
        <div style={{padding:"20px 20px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,borderRadius:8,background:C.gold,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🏐</div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:C.text,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"1px"}}>FAIRPLAY VOLLEYBALL</div>
              <div style={{fontSize:10,color:C.muted}}>2025 Spring Season</div>
            </div>
          </div>
          <button onClick={()=>{closeAll();onClose();}} style={{width:30,height:30,borderRadius:"50%",background:`${C.border}`,border:"none",color:C.muted,fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>
        <div style={{padding:"8px 0"}}>
          {items.map((item,i) => (
            <button key={i} onClick={()=>nav(item.id)} style={{width:"100%",background:"none",border:"none",padding:"11px 20px",
              display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left"}}>
              <span style={{fontSize:17,width:24,textAlign:"center",flexShrink:0,opacity:0.6}}>{item.icon}</span>
              <span style={{fontSize:14,fontWeight:500,color:C.text}}>{item.label}</span>
            </button>
          ))}
        </div>

        <div style={{margin:"4px 20px",borderTop:`1px solid ${C.border}`}}/>

        {/* Ref Mode */}
        {refMode
          ? <button onClick={()=>{disableRef();setEditId(null);onClose();}} style={{width:"100%",background:"none",border:"none",padding:"11px 20px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left"}}>
              <span style={{fontSize:17,width:24,textAlign:"center",opacity:0.6}}>🟢</span>
              <div>
                <div style={{fontSize:14,fontWeight:500,color:C.gold}}>Ref Mode — On</div>
                <div style={{fontSize:11,color:C.muted,marginTop:1}}>Tap to disable</div>
              </div>
            </button>
          : <>
              <button onClick={()=>{setShowAdminPw(false);setPw("");setPwErr(false);setShowRefPw(s=>!s);}} style={{width:"100%",background:"none",border:"none",padding:"11px 20px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left"}}>
                <span style={{fontSize:17,width:24,textAlign:"center",opacity:0.6}}>🔴</span>
                <div>
                  <div style={{fontSize:14,fontWeight:500,color:C.text}}>Ref Mode — Off</div>
                  <div style={{fontSize:11,color:C.muted,marginTop:1}}>Score editing only</div>
                </div>
              </button>
              {showRefPw && <PwInput label="Enter Ref password:" onSubmit={tryRef}/>}
            </>
        }

        {/* Admin Mode */}
        {adminMode
          ? <button onClick={()=>{disableAdmin();onClose();}} style={{width:"100%",background:"none",border:"none",padding:"11px 20px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left"}}>
              <span style={{fontSize:17,width:24,textAlign:"center",opacity:0.6}}>🔐</span>
              <div>
                <div style={{fontSize:14,fontWeight:500,color:C.gold}}>Admin Mode — Active</div>
                <div style={{fontSize:11,color:C.muted,marginTop:1}}>Tap to log out</div>
              </div>
            </button>
          : <>
              <button onClick={()=>{setShowRefPw(false);setPw("");setPwErr(false);setShowAdminPw(s=>!s);}} style={{width:"100%",background:"none",border:"none",padding:"11px 20px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left"}}>
                <span style={{fontSize:17,width:24,textAlign:"center",opacity:0.6}}>🔐</span>
                <div>
                  <div style={{fontSize:14,fontWeight:500,color:C.text}}>Admin Mode</div>
                  <div style={{fontSize:11,color:C.muted,marginTop:1}}>Full league management</div>
                </div>
              </button>
              {showAdminPw && <PwInput label="Enter Admin password:" onSubmit={tryAdmin}/>}
            </>
        }
        {adminMode && (
          <button onClick={()=>nav("admin")} style={{width:"100%",background:"none",border:"none",padding:"9px 20px 11px 54px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left"}}>
            <span style={{fontSize:13,color:C.gold}}>→ Open Admin Dashboard</span>
          </button>
        )}

        <div style={{margin:"4px 20px",borderTop:`1px solid ${C.border}`}}/>
        <button onClick={()=>nav("about")} style={{width:"100%",background:"none",border:"none",padding:"11px 20px",
          display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left"}}>
          <span style={{fontSize:17,width:24,textAlign:"center",opacity:0.6}}>ℹ️</span>
          <span style={{fontSize:14,fontWeight:500,color:C.text}}>About</span>
        </button>
        <div style={{padding:"8px 20px 24px",fontSize:10,color:C.light,textAlign:"center"}}>Fairplay Volleyball © 2025</div>
      </div>
    </>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
const NAV_CARDS = [
  {id:"schedule", label:"Schedule",   sub:"Games & courts",    img:"https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=70&fit=crop&crop=center"},
  {id:"teams",    label:"Teams",      sub:"Rosters & captains", img:"https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=70&fit=crop"},
  {id:"teams",    label:"Standings",  sub:"Rankings & records", img:"https://images.unsplash.com/photo-1592656094267-764a45160876?w=600&q=70&fit=crop"},
  {id:"bracket",  label:"Tournament", sub:"Brackets & scores",  img:"https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=70&fit=crop&crop=center"},
];

function HomeScreen({setTab,info,profile,games,teams}) {
  const latest      = info.announcements?.[0];
  const myTeamIds   = profile?.teamIds || (profile?.teamId ? [profile.teamId] : []);
  const nextGame    = myTeamIds.length > 0
    ? games.find(g => (myTeamIds.includes(g.home) || myTeamIds.includes(g.away)) && g.status !== "Final")
    : null;
  const isH         = nextGame ? myTeamIds.includes(nextGame.home) : false;
  const myTeam      = nextGame ? tById(teams, isH ? nextGame.home : nextGame.away) : null;
  const opp         = nextGame ? tById(teams, isH ? nextGame.away : nextGame.home) : null;

  // Load subs count for alerts
  const openSubsCount = (() => {
    const posts = loadLocal(SUBS_STORAGE_KEY, []);
    return posts.filter(p => p.type==="needed" && p.status==="open").length;
  })();

  // Build alerts — max 3, priority order
  const liveCount = games.filter(g => g.status==="Live").length;
  const alerts = [];

  // 1. My team is live/up next
  if (nextGame && myTeam) {
    const isLive = nextGame.status === "Live";
    alerts.push({
      key:"mygame",
      dot: isLive ? C.orange : C.gold,
      label: isLive
        ? `🔴 Now: ${myTeam.name} vs ${opp?.name||"TBD"}`
        : `Your next game: vs ${opp?.name||"TBD"} · ${nextGame.day} ${nextGame.date} ${nextGame.time}`,
      sub: nextGame.court.split("—")[0].trim(),
      tab:"schedule",
    });
  }

  // 2. Other live games (if my game isn't live or not set)
  const otherLive = liveCount - (nextGame?.status==="Live" ? 1 : 0);
  if (otherLive > 0 && alerts.length < 3) {
    alerts.push({
      key:"live",
      dot: C.orange,
      label: `${otherLive} game${otherLive!==1?"s":""} live right now`,
      sub: "Tap to view scores",
      tab:"schedule",
    });
  }

  // 3. Open subs
  if (openSubsCount > 0 && alerts.length < 3) {
    alerts.push({
      key:"subs",
      dot: C.gold,
      label: `${openSubsCount} team${openSubsCount!==1?"s":""} looking for subs`,
      sub: "Check the Subs Board",
      tab:"subs",
    });
  }

  // 4. Latest announcement (only if space remains)
  if (latest && alerts.length < 3) {
    alerts.push({
      key:"ann",
      dot: C.muted,
      label: latest.title,
      sub: latest.tag,
      tab:"announcements",
    });
  }

  return (
    <div style={{background:C.bg,height:"100%",display:"flex",flexDirection:"column",padding:"14px 14px 0"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 1fr",gap:8,marginBottom:12,aspectRatio:"1",width:"100%"}}>
        {NAV_CARDS.map(card=>(
          <button key={card.id} onClick={()=>setTab(card.id)} style={{position:"relative",borderRadius:R,overflow:"hidden",border:"none",cursor:"pointer",padding:0,
            backgroundImage:`url(${card.img})`,backgroundSize:"cover",backgroundPosition:"center"}}>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(5,14,28,0.3) 0%,rgba(5,14,28,0.82) 100%)"}}/>
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 14px",textAlign:"left"}}>
              <div style={{fontSize:17,fontWeight:700,color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",textTransform:"uppercase",letterSpacing:"0.8px",lineHeight:1}}>
                {card.label}
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",marginTop:3}}>{card.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Alerts strip */}
      {alerts.length > 0 && (
        <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:12}}>
          {alerts.map((a, i) => (
            <button key={a.key} onClick={()=>setTab(a.tab)}
              style={{width:"100%",background:"none",border:"none",cursor:"pointer",textAlign:"left",
                padding:"9px 14px",display:"flex",alignItems:"center",gap:10,
                borderBottom:i<alerts.length-1?`1px solid ${C.border}`:"none"}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:a.dot,flexShrink:0,display:"block"}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontWeight:500,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.label}</div>
                {a.sub && <div style={{fontSize:10,color:C.muted,marginTop:1}}>{a.sub}</div>}
              </div>
              <span style={{color:C.light,fontSize:14,flexShrink:0}}>›</span>
            </button>
          ))}
        </div>
      )}

      {latest && (
        <div style={{marginBottom:14,padding:"13px 15px",background:C.surf,border:`1px solid ${C.border}`,borderRadius:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <span style={{fontSize:9,fontWeight:700,color:C.gold,textTransform:"uppercase",letterSpacing:"2px"}}>Notice</span>
            <button onClick={()=>setTab("announcements")} style={{background:"none",border:"none",cursor:"pointer",padding:0,fontSize:11,fontWeight:600,color:C.gold}}>View all →</button>
          </div>
          <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:4,lineHeight:1.3}}>{latest.title}</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>{latest.body}</div>
        </div>
      )}
    </div>
  );
}

// ─── Announcements ────────────────────────────────────────────────────────────
function AnnouncementsTab({announcements}) {
  return (
    <div>
      <SLabel>All Announcements</SLabel>
      {announcements.map(item=>(
        <div key={item.id} style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:C.gold}}>{item.tag}</span>
            <span style={{fontSize:11,color:C.light}}>{item.date}</span>
          </div>
          <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:6,lineHeight:1.3}}>{item.title}</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>{item.body}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Schedule ─────────────────────────────────────────────────────────────────
function ScheduleTab({games,teams,refMode,editId,setEditId,updateGame,myTeamIds=[]}) {
  const [dayF,  setDayF]  = useState("All");
  const [divF,  setDivF]  = useState("All");
  const [statF, setStatF] = useState("All");
  const [q,     setQ]     = useState("");
  const gp = {teams,refMode,editId,setEditId,updateGame,myTeamIds};
  const shown = games.filter(g=>{
    const h=tById(teams,g.home); const a=tById(teams,g.away);
    if(!h||!a) return false;
    const mq=!q||[h.name,a.name,String(h.id),String(a.id)].some(v=>v.toLowerCase().includes(q.toLowerCase()));
    return (dayF==="All"||g.day===dayF)&&(divF==="All"||h.div===divF)&&(statF==="All"||g.status===statF)&&mq;
  });
  return (
    <div>
      <div style={{display:"flex",gap:5,marginBottom:7,overflowX:"auto",scrollbarWidth:"none",paddingBottom:2}}>
        <FBtn label="All" active={dayF==="All"} onClick={()=>setDayF("All")}/>
        {DAYS.map(d=><FBtn key={d} label={d} active={dayF===d} onClick={()=>setDayF(d)}/>)}
      </div>
      <div style={{display:"flex",gap:5,marginBottom:7,overflowX:"auto",scrollbarWidth:"none",paddingBottom:2}}>
        <FBtn label="All Divs" active={divF==="All"} onClick={()=>setDivF("All")}/>
        {DIVS.map(d=><FBtn key={d} label={d} active={divF===d} color={DIVC[d]} onClick={()=>setDivF(d)}/>)}
      </div>
      <div style={{display:"flex",gap:5,marginBottom:12,flexWrap:"wrap"}}>
        {["All","Live","Upcoming","Final"].map(f=><FBtn key={f} label={f} active={statF===f} onClick={()=>setStatF(f)}/>)}
      </div>
      <div style={{position:"relative",marginBottom:14}}>
        <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:13,color:C.muted}}>🔍</span>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search team name or number…"
          style={{width:"100%",padding:"8px 34px",borderRadius:10,border:`1px solid ${C.border}`,fontSize:13,color:C.text,background:C.surf,boxSizing:"border-box",outline:"none"}}/>
        {q&&<button onClick={()=>setQ("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",fontSize:16,color:C.muted,cursor:"pointer"}}>×</button>}
      </div>
      {shown.length===0
        ?<Empty text="No games match this filter."/>
        :shown.map(g=><GameCard key={g.id} game={g} {...gp}/>)}
    </div>
  );
}

// ─── Teams ────────────────────────────────────────────────────────────────────
function TeamDetail({team,refMode,updateTeam,onBack}) {
  const [editing, setEditing] = useState(false);
  const [name,   setName]     = useState(team.name);
  const [cap,    setCap]      = useState(team.captain);
  const [div,    setDiv]      = useState(team.div);
  const [np,     setNp]       = useState("");
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:C.gold,fontSize:13,fontWeight:600,cursor:"pointer",padding:0}}>← All Teams</button>
        {refMode&&!editing&&<EditBtn onClick={()=>{setName(team.name);setCap(team.captain);setDiv(team.div);setEditing(true);}}/>}
      </div>
      <div style={{background:C.surf,borderRadius:12,border:editing?`1.5px solid ${C.gold}`:`1px solid ${C.border}`,overflow:"hidden"}}>
        <div style={{background:`${team.color}12`,borderBottom:`1px solid ${C.border}`,padding:"18px 16px",display:"flex",alignItems:"center",gap:14}}>
          <Avatar team={team} size={52}/>
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:3}}>Team #{team.id}</div>
            <div style={{fontSize:19,fontWeight:700,color:C.text,lineHeight:1.2,marginBottom:6,fontFamily:"'Barlow Condensed',sans-serif"}}>{team.name}</div>
            <DivPill div={team.div}/>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:`1px solid ${C.border}`}}>
          {[["Captain",team.captain],["Record",`${team.w??0}–${team.l??0}`],["Div",team.div.replace("Coed ","")]].map(([l,v])=>(
            <div key={l} style={{padding:"12px 0",textAlign:"center",borderRight:`1px solid ${C.border}`}}>
              <div style={{fontSize:14,fontWeight:600,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",padding:"0 4px"}}>{v}</div>
              <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.5px",marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
        {editing&&(
          <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`}}>
            <TF label="Team Name" value={name} onChange={setName}/>
            <TF label="Captain"   value={cap}  onChange={setCap}/>
            <div style={{marginBottom:10}}>
              <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",marginBottom:6}}>Division</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {DIVS.map(d=><button key={d} onClick={()=>setDiv(d)} style={{padding:"4px 12px",borderRadius:R,fontSize:11,fontWeight:500,cursor:"pointer",
                  border:div===d?`1.5px solid ${DIVC[d]}`:`1px solid ${C.border}`,background:div===d?DIVC[d]:C.surf,color:div===d?"#fff":C.muted}}>{d}</button>)}
              </div>
            </div>
            <SaveCancel label="Save Team" onCancel={()=>setEditing(false)}
              onSave={()=>{updateTeam(team.id,{name:name.trim()||team.name,captain:cap.trim(),div});setEditing(false);}}/>
          </div>
        )}
        <div style={{padding:"14px 16px"}}>
          <SLabel>Roster</SLabel>
          {team.roster.length===0
            ?<Empty text="No roster added yet."/>
            :<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
              {team.roster.map((p,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:C.bg,borderRadius:8}}>
                  <div style={{width:22,height:22,borderRadius:"50%",background:`${team.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:team.color,flexShrink:0}}>{i+1}</div>
                  <span style={{fontSize:13,color:C.text,flex:1}}>{p}</span>
                  {refMode&&<button onClick={()=>updateTeam(team.id,{roster:team.roster.filter((_,j)=>j!==i)})} style={{background:"none",border:"none",color:C.red,fontSize:14,cursor:"pointer",padding:0}}>×</button>}
                </div>
              ))}
            </div>
          }
          {refMode&&(
            <div style={{display:"flex",gap:8}}>
              <input value={np} onChange={e=>setNp(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"&&np.trim()){updateTeam(team.id,{roster:[...team.roster,np.trim()]});setNp("");}}}
                placeholder="Add player name…"
                style={{flex:1,padding:"8px 10px",borderRadius:7,border:`1px solid ${C.border}`,fontSize:13,outline:"none",color:C.text,background:C.surf}}/>
              <button onClick={()=>{if(np.trim()){updateTeam(team.id,{roster:[...team.roster,np.trim()]});setNp("");}}}
                style={{padding:"8px 14px",borderRadius:7,background:C.gold,border:"none",color:"#000",fontSize:13,fontWeight:600,cursor:"pointer"}}>Add</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TeamsTab({standings,refMode,updateTeam}) {
  const [selId, setSelId] = useState(null);
  const sel = selId ? standings.find(t=>t.id===selId) : null;
  if (sel) return <TeamDetail team={sel} refMode={refMode} updateTeam={updateTeam} onBack={()=>setSelId(null)}/>;
  return (
    <div>
      {DIVS.map(div=>{
        const ts = standings.filter(t=>t.div===div);
        return (
          <div key={div} style={{marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:DIVC[div]}}/>
              <span style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"1px"}}>{div}</span>
              <span style={{fontSize:11,color:C.light}}>· {ts.length} teams</span>
            </div>
            {ts.map(t=>(
              <div key={t.id} onClick={()=>setSelId(t.id)}
                style={{background:C.surf,borderRadius:12,border:`1px solid ${C.border}`,padding:"12px 15px",marginBottom:8,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
                <Avatar team={t} size={40}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                    <span style={{color:C.muted,marginRight:4}}>#{t.id}</span>{t.name}
                  </div>
                  <div style={{fontSize:11,color:C.muted,marginTop:2}}>Capt: {t.captain}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.text}}>{t.w??0}–{t.l??0}</div>
                  <div style={{fontSize:10,color:C.muted}}>{t.roster.length>0?`${t.roster.length} players`:"No roster"}</div>
                </div>
                <span style={{color:C.light,fontSize:18}}>›</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ─── Standings ────────────────────────────────────────────────────────────────
function StandingsTab({standings, myTeamIds=[]}) {
  const gc = "26px 1fr 28px 28px 36px 36px 44px";
  return (
    <div>
      {DIVS.map(div=>{
        const ts = [...standings.filter(t=>t.div===div)].sort((a,b)=>(b.w??0)-(a.w??0)||((b.pf??0)-(b.pa??0))-((a.pf??0)-(a.pa??0)));
        return (
          <div key={div} style={{marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:DIVC[div]}}/>
              <span style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"1px"}}>{div}</span>
            </div>
            <div style={{background:C.surf,borderRadius:12,border:`1px solid ${C.border}`,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:gc,gap:2,padding:"8px 12px",background:C.bg,borderBottom:`1px solid ${C.border}`,alignItems:"center"}}>
                {["#","Team","W","L","PF","PA","DIFF"].map(h=>(
                  <span key={h} style={{fontSize:9,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.5px",textAlign:h==="Team"?"left":"center"}}>{h}</span>
                ))}
              </div>
              {ts.map((t,i)=>{
                const d=(t.pf??0)-(t.pa??0);
                const isMe = myTeamIds.includes(t.id);
                return (
                  <div key={t.id} style={{display:"grid",gridTemplateColumns:gc,gap:2,padding:"10px 12px",alignItems:"center",
                    borderBottom:i<ts.length-1?`1px solid ${C.border}`:"none",
                    background:isMe?`${C.gold}0c`:"transparent",
                    outline:isMe?`1px solid ${C.gold}33`:"none",outlineOffset:"-1px"}}>
                    <span style={{fontSize:13,fontWeight:700,textAlign:"center",fontFamily:"'Barlow Condensed',sans-serif",color:i===0?DIVC[div]:C.muted}}>{i+1}</span>
                    <div style={{display:"flex",alignItems:"center",gap:7,minWidth:0}}>
                      <Avatar team={t} size={24}/>
                      <div style={{minWidth:0}}>
                        <div style={{display:"flex",alignItems:"center",gap:5}}>
                          <div style={{fontSize:12,fontWeight:isMe?600:500,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.name}</div>
                          {isMe && <span style={{fontSize:8,fontWeight:700,color:C.gold,textTransform:"uppercase",letterSpacing:"0.8px",background:`${C.gold}18`,padding:"1px 5px",borderRadius:3,flexShrink:0}}>Me</span>}
                        </div>
                        <div style={{fontSize:10,color:C.muted}}>#{t.id}</div>
                      </div>
                    </div>
                    <span style={{fontSize:12,fontWeight:600,textAlign:"center",color:C.green}}>{t.w??0}</span>
                    <span style={{fontSize:12,fontWeight:600,textAlign:"center",color:C.red}}>{t.l??0}</span>
                    <span style={{fontSize:12,textAlign:"center",color:C.text}}>{t.pf??0}</span>
                    <span style={{fontSize:12,textAlign:"center",color:C.text}}>{t.pa??0}</span>
                    <span style={{fontSize:12,fontWeight:600,textAlign:"center",color:d>0?C.green:d<0?C.red:C.muted}}>{d===0?"—":(d>0?"+":" ")+d}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div style={{fontSize:11,color:C.light}}>PF = Points For · PA = Points Against · DIFF = Point Differential</div>
    </div>
  );
}

// ─── Teams + Standings (combined) ────────────────────────────────────────────
function TeamsStandingsTab({standings, refMode, updateTeam, myTeamIds=[]}) {
  const [view,  setView]  = useState("standings"); // "standings" | "teams"
  const [selId, setSelId] = useState(null);

  // ── Team detail (reused from TeamsTab) ────────────────────────────────────
  if (selId) {
    const team = standings.find(t => t.id === selId);
    if (!team) { setSelId(null); return null; }
    return <TeamDetail team={team} refMode={refMode} updateTeam={updateTeam} onBack={()=>setSelId(null)}/>;
  }

  return (
    <div>
      {/* Toggle */}
      <div style={{display:"flex",background:C.bg,borderRadius:10,padding:3,marginBottom:16,border:`1px solid ${C.border}`}}>
        {[["standings","Standings"],["teams","Teams"]].map(([id,label])=>(
          <button key={id} onClick={()=>setView(id)}
            style={{flex:1,padding:"8px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,
              background:view===id?C.surf:"transparent",
              color:view===id?C.text:C.muted,
              transition:"background 0.15s"}}>
            {label}
          </button>
        ))}
      </div>

      {/* Standings view */}
      {view === "standings" && (
        <div>
          {DIVS.map(div=>{
            const ts=[...standings.filter(t=>t.div===div)].sort((a,b)=>(b.w??0)-(a.w??0)||((b.pf??0)-(b.pa??0))-((a.pf??0)-(a.pa??0)));
            const gc="26px 1fr 28px 28px 36px 36px 44px";
            return (
              <div key={div} style={{marginBottom:24}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:DIVC[div]}}/>
                  <span style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"1px"}}>{div}</span>
                </div>
                <div style={{background:C.surf,borderRadius:12,border:`1px solid ${C.border}`,overflow:"hidden"}}>
                  <div style={{display:"grid",gridTemplateColumns:gc,gap:2,padding:"8px 12px",background:C.bg,borderBottom:`1px solid ${C.border}`,alignItems:"center"}}>
                    {["#","Team","W","L","PF","PA","DIFF"].map(h=>(
                      <span key={h} style={{fontSize:9,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.5px",textAlign:h==="Team"?"left":"center"}}>{h}</span>
                    ))}
                  </div>
                  {ts.map((t,i)=>{
                    const d=(t.pf??0)-(t.pa??0);
                    const isMe=myTeamIds.includes(t.id);
                    return (
                      <div key={t.id} onClick={()=>setSelId(t.id)}
                        style={{display:"grid",gridTemplateColumns:gc,gap:2,padding:"10px 12px",alignItems:"center",
                          borderBottom:i<ts.length-1?`1px solid ${C.border}`:"none",
                          background:isMe?`${C.gold}0c`:"transparent",
                          outline:isMe?`1px solid ${C.gold}33`:"none",outlineOffset:"-1px",
                          cursor:"pointer"}}>
                        <span style={{fontSize:13,fontWeight:700,textAlign:"center",fontFamily:"'Barlow Condensed',sans-serif",color:i===0?DIVC[div]:C.muted}}>{i+1}</span>
                        <div style={{display:"flex",alignItems:"center",gap:7,minWidth:0}}>
                          <Avatar team={t} size={24}/>
                          <div style={{minWidth:0}}>
                            <div style={{display:"flex",alignItems:"center",gap:5}}>
                              <div style={{fontSize:12,fontWeight:isMe?600:500,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.name}</div>
                              {isMe&&<span style={{fontSize:8,fontWeight:700,color:C.gold,textTransform:"uppercase",letterSpacing:"0.8px",background:`${C.gold}18`,padding:"1px 5px",borderRadius:3,flexShrink:0}}>Me</span>}
                            </div>
                            <div style={{fontSize:10,color:C.muted}}>#{t.id}</div>
                          </div>
                        </div>
                        <span style={{fontSize:12,fontWeight:600,textAlign:"center",color:C.green}}>{t.w??0}</span>
                        <span style={{fontSize:12,fontWeight:600,textAlign:"center",color:C.red}}>{t.l??0}</span>
                        <span style={{fontSize:12,textAlign:"center",color:C.text}}>{t.pf??0}</span>
                        <span style={{fontSize:12,textAlign:"center",color:C.text}}>{t.pa??0}</span>
                        <span style={{fontSize:12,fontWeight:600,textAlign:"center",color:d>0?C.green:d<0?C.red:C.muted}}>{d===0?"—":(d>0?"+":" ")+d}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div style={{fontSize:11,color:C.light}}>PF = Points For · PA = Points Against · DIFF = Point Differential</div>
          <div style={{fontSize:11,color:C.muted,marginTop:6}}>Tap any row to view team details</div>
        </div>
      )}

      {/* Teams view */}
      {view === "teams" && (
        <div>
          {DIVS.map(div=>{
            const ts=standings.filter(t=>t.div===div);
            return (
              <div key={div} style={{marginBottom:24}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:DIVC[div]}}/>
                  <span style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"1px"}}>{div}</span>
                  <span style={{fontSize:11,color:C.light}}>· {ts.length} teams</span>
                </div>
                {ts.map(t=>(
                  <div key={t.id} onClick={()=>setSelId(t.id)}
                    style={{background:C.surf,borderRadius:12,
                      border: myTeamIds.includes(t.id) ? `1px solid ${C.gold}55` : `1px solid ${C.border}`,
                      padding:"12px 15px",marginBottom:8,cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
                    <Avatar team={t} size={40}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:13,fontWeight:600,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                          <span style={{color:C.muted,marginRight:4}}>#{t.id}</span>{t.name}
                        </span>
                        {myTeamIds.includes(t.id)&&<span style={{fontSize:8,fontWeight:700,color:C.gold,background:`${C.gold}18`,padding:"1px 5px",borderRadius:3,flexShrink:0,textTransform:"uppercase"}}>Me</span>}
                      </div>
                      <div style={{fontSize:11,color:C.muted,marginTop:2}}>Capt: {t.captain}</div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontSize:13,fontWeight:600,color:C.text}}>{t.w??0}–{t.l??0}</div>
                      <div style={{fontSize:10,color:C.muted}}>{t.roster?.length>0?`${t.roster.length} players`:"No roster"}</div>
                    </div>
                    <span style={{color:C.light,fontSize:18}}>›</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Bracket ─────────────────────────────────────────────────────────────────
function BracketSlot({match,teams,onUpdate,myTeamIds=[]}) {
  const [editing, setEditing] = useState(false);
  const [hs,   setHs]   = useState(match.hs  ?? 0);
  const [as_,  setAs]   = useState(match.as_ ?? 0);
  const [done, setDone] = useState(match.done);
  const open = () => { setHs(match.hs??0); setAs(match.as_??0); setDone(match.done); setEditing(true); };
  const homeName = bName(teams, match.home);
  const awayName = bName(teams, match.away);
  const isMySlot = myTeamIds.length > 0 && (myTeamIds.includes(match.home) || myTeamIds.includes(match.away));
  return (
    <div style={{background:C.surf,borderRadius:8,overflow:"hidden",minWidth:152,
      border:match.round==="F"?`1.5px solid ${C.gold}`:editing?`1.5px solid ${C.gold}`:isMySlot?`1.5px solid ${C.gold}55`:`1px solid ${C.border}`}}>
      {match.round==="F"&&<div style={{background:C.gold,padding:"3px 10px",fontSize:9,fontWeight:700,color:"#000",letterSpacing:"1px",textTransform:"uppercase"}}>🏆 Championship</div>}
      {[{name:homeName,score:match.hs,si:0,tid:match.home},{name:awayName,score:match.as_,si:1,tid:match.away}].map(({name,score,si,tid})=>{
        const win=match.done&&match.hs!=null&&((si===0&&match.hs>match.as_)||(si===1&&match.as_>match.hs));
        const isMe = myTeamIds.length > 0 && myTeamIds.includes(tid);
        return (
          <div key={si} style={{padding:"7px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",
            borderBottom:si===0?`1px solid ${C.border}`:"none",background:win?`${C.green}14`:C.surf}}>
            <div style={{display:"flex",alignItems:"center",gap:5,minWidth:0,flex:1,overflow:"hidden"}}>
              <span style={{fontSize:11,fontWeight:win||isMe?600:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                color:win?C.text:match.done?C.muted:C.text}}>{name}</span>
              {isMe && <span style={{fontSize:8,fontWeight:700,color:C.gold,background:`${C.gold}18`,padding:"1px 5px",borderRadius:3,flexShrink:0,letterSpacing:"0.5px",textTransform:"uppercase"}}>Me</span>}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
              <span style={{fontSize:13,fontWeight:700,fontFamily:"'Barlow Condensed',sans-serif",color:win?C.gold:C.muted}}>{score!=null?score:"—"}</span>
              {si===1&&<button onClick={editing?()=>setEditing(false):open} style={{width:16,height:16,borderRadius:3,border:`1px solid ${C.border}`,background:C.bg,color:C.muted,fontSize:9,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✏</button>}
            </div>
          </div>
        );
      })}
      {editing&&(
        <div style={{padding:10,borderTop:`1px solid ${C.border}`}}>
          <div style={{display:"flex",gap:5,marginBottom:8}}>
            {[["Pending",false],["Final",true]].map(([l,v])=>(
              <button key={l} onClick={()=>setDone(v)} style={{flex:1,padding:"4px",borderRadius:6,fontSize:11,fontWeight:500,cursor:"pointer",
                border:done===v?`1.5px solid ${C.gold}`:`1px solid ${C.border}`,background:done===v?C.gold:C.surf,color:done===v?"#000":C.muted}}>{l}</button>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
            <span style={{fontSize:11,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:C.text}}>{homeName}</span>
            <Counter value={hs} onChange={setHs}/>
            <span style={{fontSize:11,color:C.light}}>–</span>
            <Counter value={as_} onChange={setAs}/>
            <span style={{fontSize:11,flex:1,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:C.text}}>{awayName}</span>
          </div>
          <SaveCancel label="Save Result" onCancel={()=>setEditing(false)}
            onSave={()=>{onUpdate(match.id,{hs,as_:as_,done});setEditing(false);}}/>
        </div>
      )}
    </div>
  );
}

function BracketTab({teams, myTeamIds=[], bracket, updateBracket}) {
  const upd = (id,u) => updateBracket(id,u);
  const qf=bracket.filter(m=>m.round==="QF"), sf=bracket.filter(m=>m.round==="SF"), f=bracket.find(m=>m.round==="F");
  const sp = {teams,onUpdate:upd,myTeamIds};
  return (
    <div>
      <SLabel>Coed B/C-ish Championship</SLabel>
      <div style={{overflowX:"auto",paddingBottom:8}}>
        <div style={{display:"flex",gap:8,alignItems:"flex-start",minWidth:560}}>
          <div>
            <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.8px",textAlign:"center",marginBottom:6}}>Quarterfinals</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>{qf.map(m=><BracketSlot key={m.id} match={m} {...sp}/>)}</div>
          </div>
          <div style={{alignSelf:"stretch",display:"flex",flexDirection:"column",justifyContent:"space-around",paddingTop:22,flexShrink:0}}>
            <svg width="14" height="196" viewBox="0 0 14 196"><path d="M0,25 C14,25 14,50 14,98 C14,146 14,171 0,171" fill="none" stroke={C.border} strokeWidth="1.5"/></svg>
          </div>
          <div>
            <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.8px",textAlign:"center",marginBottom:6}}>Semifinals</div>
            <div style={{display:"flex",flexDirection:"column",gap:66}}>{sf.map(m=><BracketSlot key={m.id} match={m} {...sp}/>)}</div>
          </div>
          <div style={{alignSelf:"stretch",display:"flex",flexDirection:"column",justifyContent:"center",paddingTop:22,flexShrink:0}}>
            <svg width="14" height="114" viewBox="0 0 14 114"><path d="M0,22 C14,22 14,44 14,57 C14,70 14,92 0,92" fill="none" stroke={C.border} strokeWidth="1.5"/></svg>
          </div>
          <div>
            <div style={{fontSize:10,fontWeight:600,color:C.muted,textTransform:"uppercase",letterSpacing:"0.8px",textAlign:"center",marginBottom:6}}>Final</div>
            <div style={{marginTop:44}}>{f&&<BracketSlot match={f} {...sp}/>}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Info ─────────────────────────────────────────────────────────────────────
function InfoTab({info, updateInfo, refMode}) {
  const [editSec, setEditSec] = useState(null);
  const [rulesT,  setRulesT]  = useState((info.rules||[]).join("\n"));
  const [reqT,    setReqT]    = useState(info.requestNote||"");
  const [venmo,   setVenmo]   = useState(info.payment?.venmo||"");
  const [zelle,   setZelle]   = useState(info.payment?.zelle||"");
  const [cash,    setCash]    = useState(info.payment?.cash||"");
  const [check,   setCheck]   = useState(info.payment?.check||"");
  const [early,   setEarly]   = useState(info.payment?.earlyNote||"");
  const [email,   setEmail]   = useState(info.contact?.email||"");
  const [phone,   setPhone]   = useState(info.contact?.phone||"");
  const [fb,      setFb]      = useState(info.contact?.facebook||"");
  const [site,    setSite]    = useState(info.contact?.website||"");

  // Card wrapper
  const Card = ({title, icon, onEdit, children}) => (
    <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:R,overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"11px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:16,opacity:0.7}}>{icon}</span>
          <span style={{fontSize:13,fontWeight:700,color:C.text}}>{title}</span>
        </div>
        {refMode && onEdit && <EditBtn onClick={onEdit}/>}
      </div>
      <div style={{padding:"12px 16px"}}>{children}</div>
    </div>
  );

  // Row used in several cards
  const Row = ({label, value}) => (
    <div style={{display:"flex",alignItems:"flex-start",gap:12,paddingBottom:10,marginBottom:10,borderBottom:`1px solid ${C.border}`}}>
      <span style={{fontSize:11,fontWeight:600,color:C.muted,minWidth:64,paddingTop:1}}>{label}</span>
      <span style={{fontSize:13,color:C.text,flex:1,lineHeight:1.4}}>{value||"—"}</span>
    </div>
  );

  return (
    <div style={{paddingBottom:24}}>

      {/* ── Rules ── */}
      <Card title="Rules & Regulations" icon="📋"
        onEdit={()=>{ setRulesT((info.rules||[]).join("\n")); setEditSec("rules"); }}>
        {editSec==="rules"
          ? <>
              <TA label="One rule per line" value={rulesT} onChange={setRulesT} rows={10}/>
              <SaveCancel label="Save Rules" onCancel={()=>setEditSec(null)}
                onSave={()=>{ updateInfo("rules", rulesT.split("\n").filter(Boolean)); setEditSec(null); }}/>
            </>
          : (info.rules||[]).length === 0
            ? <div style={{fontSize:12,color:C.muted}}>No rules added yet.</div>
            : <ol style={{margin:0,paddingLeft:18}}>
                {(info.rules||[]).map((r,i) => (
                  <li key={i} style={{fontSize:12,color:C.text,lineHeight:1.6,marginBottom:4,paddingLeft:4}}>{r}</li>
                ))}
              </ol>
        }
      </Card>

      {/* ── Payment ── */}
      <Card title="Payments" icon="💳"
        onEdit={()=>{ setVenmo(info.payment?.venmo||""); setZelle(info.payment?.zelle||""); setCash(info.payment?.cash||""); setCheck(info.payment?.check||""); setEarly(info.payment?.earlyNote||""); setEditSec("payment"); }}>
        {editSec==="payment"
          ? <>
              <TF label="Venmo"  value={venmo}  onChange={setVenmo}/>
              <TF label="Zelle"  value={zelle}  onChange={setZelle}/>
              <TF label="Cash"   value={cash}   onChange={setCash}/>
              <TF label="Check"  value={check}  onChange={setCheck}/>
              <TA label="Early Entry Note" value={early} onChange={setEarly} rows={2}/>
              <SaveCancel label="Save" onCancel={()=>setEditSec(null)}
                onSave={()=>{ updateInfo("payment",{venmo,zelle,cash,check,earlyNote:early}); setEditSec(null); }}/>
            </>
          : <>
              <Row label="Venmo"  value={info.payment?.venmo}/>
              <Row label="Zelle"  value={info.payment?.zelle}/>
              <Row label="Cash"   value={info.payment?.cash}/>
              <Row label="Check"  value={info.payment?.check}/>
              {info.payment?.earlyNote && (
                <div style={{background:C.bg,borderRadius:8,padding:"10px 12px",marginTop:4}}>
                  <div style={{fontSize:10,fontWeight:700,color:C.gold,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:4}}>💡 Early Entry</div>
                  <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{info.payment.earlyNote}</div>
                </div>
              )}
            </>
        }
      </Card>

      {/* ── Open Court ── */}
      <Card title="Open Court" icon="🏖" onEdit={null}>
        <Row label="Days"     value={info.openCourt?.days}/>
        <Row label="Time"     value={info.openCourt?.time}/>
        <Row label="Location" value={info.openCourt?.location}/>
        {info.openCourt?.note && (
          <div style={{fontSize:12,color:C.muted,lineHeight:1.5,paddingTop:2}}>{info.openCourt.note}</div>
        )}
      </Card>

      {/* ── Locations ── */}
      <Card title="Locations" icon="📍" onEdit={null}>
        {(info.locations||[]).map((loc, i) => (
          <div key={loc.name} style={{paddingBottom:12,marginBottom:12,borderBottom:i<(info.locations.length-1)?`1px solid ${C.border}`:"none"}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:2}}>{loc.name}</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:2}}>{loc.addr}</div>
            {loc.note && <div style={{fontSize:11,color:C.light}}>{loc.note}</div>}
          </div>
        ))}
      </Card>

      {/* ── Contact ── */}
      <Card title="Contact" icon="📞"
        onEdit={()=>{ setEmail(info.contact?.email||""); setPhone(info.contact?.phone||""); setFb(info.contact?.facebook||""); setSite(info.contact?.website||""); setEditSec("contact"); }}>
        {editSec==="contact"
          ? <>
              <TF label="Email"    value={email} onChange={setEmail}/>
              <TF label="Phone"    value={phone} onChange={setPhone}/>
              <TF label="Facebook" value={fb}    onChange={setFb}/>
              <TF label="Website"  value={site}  onChange={setSite}/>
              <SaveCancel label="Save" onCancel={()=>setEditSec(null)}
                onSave={()=>{ updateInfo("contact",{email,phone,facebook:fb,website:site}); setEditSec(null); }}/>
            </>
          : <>
              <Row label="Email"    value={info.contact?.email}/>
              <Row label="Phone"    value={info.contact?.phone}/>
              <Row label="Website"  value={info.contact?.website}/>
              <Row label="Facebook" value={info.contact?.facebook}/>
            </>
        }
      </Card>

      {/* ── League Requests ── */}
      <Card title="League Requests" icon="📝"
        onEdit={()=>{ setReqT(info.requestNote||""); setEditSec("requests"); }}>
        {editSec==="requests"
          ? <>
              <TA label="Policy text" value={reqT} onChange={setReqT} rows={4}/>
              <SaveCancel label="Save" onCancel={()=>setEditSec(null)}
                onSave={()=>{ updateInfo("requestNote",reqT); setEditSec(null); }}/>
            </>
          : <div style={{fontSize:12,color:C.text,lineHeight:1.7}}>{info.requestNote||"—"}</div>
        }
      </Card>

      {/* ── Gallery ── */}
      <Card title="Photos & Videos" icon="📷" onEdit={null}>
        <div style={{fontSize:12,color:C.muted,marginBottom:12}}>Gallery coming soon — check back after the first week of play!</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
          {Array(6).fill(0).map((_,i) => (
            <div key={i} style={{aspectRatio:"1",background:C.bg,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:18,color:C.light,opacity:0.4}}>📷</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Profile ──────────────────────────────────────────────────────────────────
function ProfileScreen({profile,setProfile,teams,games,standings,setTab}) {
  const [nameVal,     setNameVal]     = useState("");
  const [pickingTeam, setPickingTeam] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editName,    setEditName]    = useState("");
  // multi-team draft selection (used in picker)
  const [draftIds,    setDraftIds]    = useState([]);

  const save = (updates) => {
    const next = {...(profile||{}), ...updates};
    setProfile(next);
    saveLocal("fp_profile", next);
  };

  // Normalise: support legacy single teamId
  const myTeamIds = profile?.teamIds || (profile?.teamId ? [profile.teamId] : []);
  const myTeams   = myTeamIds.map(id => tById(teams, id)).filter(Boolean);
  const primaryTeam = myTeams[0] || null;
  const teamColor   = primaryTeam?.color || C.gold;

  const myGames  = games.filter(g => myTeamIds.includes(g.home) || myTeamIds.includes(g.away));
  const upcoming = myGames.filter(g => g.status !== "Final");
  const recent   = myGames.filter(g => g.status === "Final").slice(-3).reverse();
  const nextGame = upcoming[0] || null;

  // ── Step 1 — Name ──────────────────────────────────────────────────────────
  if (!profile?.name) {
    return (
      <div style={{paddingBottom:28}}>
        <div style={{textAlign:"center",padding:"32px 0 28px"}}>
          <div style={{width:64,height:64,borderRadius:"50%",background:`${C.gold}14`,border:`1.5px solid ${C.gold}44`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"1px",marginBottom:6}}>Hi, what's your name?</div>
          <div style={{fontSize:13,color:C.muted}}>We'll use this to set up your player card.</div>
        </div>
        <input value={nameVal} onChange={e=>setNameVal(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter"&&nameVal.trim()) save({name:nameVal.trim()});}}
          placeholder="Your name" autoFocus
          style={{width:"100%",padding:"15px 16px",borderRadius:R,border:`1px solid ${C.border}`,fontSize:16,color:C.text,background:C.surf,boxSizing:"border-box",outline:"none",marginBottom:12,textAlign:"center"}}/>
        <button onClick={()=>{if(nameVal.trim()) save({name:nameVal.trim()});}} disabled={!nameVal.trim()}
          style={{width:"100%",padding:"15px",borderRadius:R,border:"none",background:nameVal.trim()?C.gold:C.light,color:nameVal.trim()?"#000":"#0a1628",fontSize:15,fontWeight:700,cursor:nameVal.trim()?"pointer":"default",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"1px",textTransform:"uppercase"}}>
          Continue
        </button>
      </div>
    );
  }

  // ── Step 2 / Change — Pick teams (multi-select) ───────────────────────────
  if (myTeamIds.length === 0 || pickingTeam) {
    const initDraft = pickingTeam ? myTeamIds : [];
    // initialise draft when entering picker
    const draft = draftIds.length > 0 || pickingTeam ? draftIds : initDraft;
    const toggle = (id) => setDraftIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    const canSave = draft.length > 0;
    return (
      <div style={{paddingBottom:28}}>
        <div style={{textAlign:"center",padding:"24px 0 16px"}}>
          <div style={{fontSize:20,fontWeight:700,color:C.text,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"1px",marginBottom:4}}>
            {pickingTeam ? "Change Teams" : `Hi ${profile.name} 👋`}
          </div>
          <div style={{fontSize:13,color:C.muted}}>
            {pickingTeam ? "Tap teams to select or deselect." : "Select all teams you play on."}
          </div>
        </div>
        {pickingTeam && <button onClick={()=>{setPickingTeam(false);setDraftIds([]);}} style={{background:"none",border:"none",color:C.gold,fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:16,padding:0}}>← Back</button>}
        {DIVS.map(div=>(
          <div key={div} style={{marginBottom:18}}>
            <div style={{fontSize:10,fontWeight:700,color:DIVC[div],textTransform:"uppercase",letterSpacing:"1px",marginBottom:8}}>{div}</div>
            {teams.filter(t=>t.div===div).map(t=>{
              const sel = draft.includes(t.id);
              return (
                <button key={t.id} onClick={()=>toggle(t.id)}
                  style={{width:"100%",background:sel?`${t.color}18`:C.surf,border:`1px solid ${sel?t.color:C.border}`,borderRadius:R,padding:"12px 14px",marginBottom:7,cursor:"pointer",display:"flex",alignItems:"center",gap:12,textAlign:"left"}}>
                  <Avatar team={t} size={34}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:600,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.name}</div>
                    <div style={{fontSize:11,color:C.muted}}>Team #{t.id}</div>
                  </div>
                  <div style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${sel?t.color:C.border}`,background:sel?t.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {sel && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20,6 9,17 4,12"/></svg>}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
        <button onClick={()=>{
            if (!canSave) return;
            save({teamIds: draft, teamId: undefined});
            setPickingTeam(false);
            setDraftIds([]);
          }}
          disabled={!canSave}
          style={{width:"100%",padding:"14px",borderRadius:R,border:"none",background:canSave?C.gold:C.light,color:canSave?"#000":"#0a1628",fontSize:14,fontWeight:700,cursor:canSave?"pointer":"default",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"1px",textTransform:"uppercase"}}>
          {`Save ${draft.length} Team${draft.length!==1?"s":""}`}
        </button>
      </div>
    );
  }

  // ── Profile card ──────────────────────────────────────────────────────────
  const primaryStanding = standings.find(t => t.id === myTeamIds[0]);
  const diff = (primaryStanding?.pf??0)-(primaryStanding?.pa??0);

  return (
    <div style={{paddingBottom:28}}>
      {/* Player Pass */}
      <div style={{borderRadius:R,overflow:"hidden",marginBottom:20,boxShadow:"0 8px 32px rgba(0,0,0,0.5)",position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(155deg,#0d1f40 0%,#070e1c 100%)"}}/>
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.045,pointerEvents:"none"}} viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
          <rect x="20" y="20" width="280" height="160" rx="2" fill="none" stroke="#d4a83a" strokeWidth="1"/>
          <line x1="160" y1="20" x2="160" y2="180" stroke="#d4a83a" strokeWidth="0.8"/>
          <line x1="20" y1="100" x2="300" y2="100" stroke="#d4a83a" strokeWidth="1.2"/>
          <circle cx="160" cy="100" r="22" fill="none" stroke="#d4a83a" strokeWidth="0.8"/>
        </svg>
        <div style={{position:"relative",height:3,background:`linear-gradient(90deg,transparent,${teamColor},transparent)`}}/>
        <div style={{position:"relative",padding:"16px 18px 20px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <span style={{fontSize:8,fontWeight:700,color:`${C.gold}88`,textTransform:"uppercase",letterSpacing:"2.5px"}}>Fairplay Volleyball · 2025</span>
            <span style={{fontSize:8,fontWeight:700,color:`${C.gold}88`,textTransform:"uppercase",letterSpacing:"1.5px"}}>Player Card</span>
          </div>
          {/* Name */}
          <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:16}}>
            <div style={{width:54,height:54,borderRadius:"50%",flexShrink:0,background:`${teamColor}20`,border:`2px solid ${teamColor}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:teamColor,fontFamily:"'Barlow Condensed',sans-serif"}}>
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div style={{flex:1,minWidth:0}}>
              {editingName
                ? <div style={{display:"flex",gap:6,marginBottom:4}}>
                    <input value={editName} onChange={e=>setEditName(e.target.value)} autoFocus
                      style={{flex:1,padding:"6px 10px",borderRadius:R2,border:`1px solid ${C.border}`,fontSize:15,color:C.text,background:"#0a1628",outline:"none"}}/>
                    <button onClick={()=>{save({name:editName.trim()||profile.name});setEditingName(false);}}
                      style={{padding:"6px 12px",borderRadius:R2,background:C.gold,border:"none",color:"#000",fontSize:12,fontWeight:700,cursor:"pointer"}}>✓</button>
                  </div>
                : <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                    <span style={{fontSize:20,fontWeight:700,color:C.text,lineHeight:1,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"0.5px"}}>{profile.name}</span>
                    <button onClick={()=>{setEditName(profile.name);setEditingName(true);}} style={{background:"none",border:"none",color:C.light,fontSize:11,cursor:"pointer",padding:0}}>✏</button>
                  </div>
              }
              {/* All selected teams */}
              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:4}}>
                {myTeams.map(t=>(
                  <span key={t.id} style={{fontSize:11,fontWeight:600,color:t.color}}>#{t.id} {t.name}</span>
                ))}
              </div>
            </div>
          </div>
          {/* Stats for primary team */}
          {primaryStanding && (
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",background:"rgba(0,0,0,0.35)",borderRadius:R,border:`1px solid ${C.border}`,overflow:"hidden"}}>
              {[["W",primaryStanding.w??0,C.green],["L",primaryStanding.l??0,C.red],["PF",primaryStanding.pf??0,C.text],["DIFF",diff===0?"—":(diff>0?"+":"")+diff,diff>0?C.green:diff<0?C.red:C.muted]].map(([label,val,clr],i)=>(
                <div key={label} style={{padding:"10px 0",textAlign:"center",borderRight:i<3?`1px solid ${C.border}`:"none"}}>
                  <div style={{fontSize:19,fontWeight:700,color:clr,fontFamily:"'Barlow Condensed',sans-serif",lineHeight:1}}>{val}</div>
                  <div style={{fontSize:8,color:C.muted,textTransform:"uppercase",letterSpacing:"0.8px",marginTop:3}}>{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{position:"relative",height:2,background:`linear-gradient(90deg,transparent,${teamColor}55,transparent)`}}/>
      </div>

      {/* Next Game */}
      {nextGame ? (()=>{
        const isH = myTeamIds.includes(nextGame.home);
        const myT = tById(teams, isH ? nextGame.home : nextGame.away);
        const opp = tById(teams, isH ? nextGame.away : nextGame.home);
        return (
          <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:R,overflow:"hidden",marginBottom:20}}>
            <div style={{padding:"9px 16px",background:nextGame.status==="Live"?`${C.orange}18`:`${C.gold}0d`,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{fontSize:9,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:nextGame.status==="Live"?C.orange:C.gold}}>
                {nextGame.status==="Live"?"🔴 Live Now":"Next Game"}
              </span>
              <StatusBadge status={nextGame.status}/>
            </div>
            <div style={{padding:"14px 16px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                {myT&&<Avatar team={myT} size={30}/>}
                <div style={{flex:1,textAlign:"center"}}><span style={{fontSize:10,fontWeight:600,color:C.muted,letterSpacing:"1.5px",textTransform:"uppercase"}}>vs</span></div>
                {opp&&<Avatar team={opp} size={30}/>}
              </div>
              <div style={{display:"flex",marginBottom:12}}>
                <div style={{flex:1,fontSize:13,fontWeight:700,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{myT?.name}</div>
                <div style={{flex:1,fontSize:13,fontWeight:700,color:C.text,textAlign:"right",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{opp?.name||"TBD"}</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",background:C.bg,borderRadius:R2,border:`1px solid ${C.border}`,overflow:"hidden"}}>
                {[["📅",nextGame.day+" "+nextGame.date],["🕐",nextGame.time],["📍",nextGame.court.split("—")[0].trim()]].map(([icon,val],i)=>(
                  <div key={i} style={{padding:"9px 6px",textAlign:"center",borderRight:i<2?`1px solid ${C.border}`:"none"}}>
                    <div style={{fontSize:13,marginBottom:3}}>{icon}</div>
                    <div style={{fontSize:10,color:C.muted,lineHeight:1.3}}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()
      : <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:R,padding:"20px",marginBottom:20,textAlign:"center"}}>
          <div style={{fontSize:13,color:C.muted}}>No upcoming games scheduled</div>
        </div>
      }

      {/* Quick Nav */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:20}}>
        {[["📅","Schedule","schedule"],["👥","My Team","teams"],["📊","Standings","standings"]].map(([icon,label,target])=>(
          <button key={target} onClick={()=>setTab(target)} style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:R,padding:"11px 6px",cursor:"pointer",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <span style={{fontSize:18,opacity:0.7}}>{icon}</span>
            <span style={{fontSize:10,fontWeight:600,color:C.muted}}>{label}</span>
          </button>
        ))}
      </div>

      {/* My Teams */}
      {myTeams.map(myTeam=>{
        const mySt = standings.find(t=>t.id===myTeam.id);
        const tGames = games.filter(g=>g.home===myTeam.id||g.away===myTeam.id);
        const tUpcoming = tGames.filter(g=>g.status!=="Final").slice(0,2);
        const tRecent   = tGames.filter(g=>g.status==="Final").slice(-2).reverse();
        return (
          <div key={myTeam.id} style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:R,overflow:"hidden",marginBottom:14}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:myTeam.color}}/>
                <span style={{fontSize:13,fontWeight:700,color:C.text}}>#{myTeam.id} {myTeam.name}</span>
              </div>
              <DivPill div={myTeam.div}/>
            </div>
            {mySt && (
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:`1px solid ${C.border}`}}>
                {[["W",mySt.w??0,C.green],["L",mySt.l??0,C.red],["Captain",myTeam.captain||"TBD",C.text]].map(([l,v,c],i)=>(
                  <div key={l} style={{padding:"10px 0",textAlign:"center",borderRight:i<2?`1px solid ${C.border}`:"none"}}>
                    <div style={{fontSize:15,fontWeight:700,color:c,fontFamily:"'Barlow Condensed',sans-serif"}}>{v}</div>
                    <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.5px",marginTop:2}}>{l}</div>
                  </div>
                ))}
              </div>
            )}
            {tUpcoming.length>0&&(
              <div style={{padding:"10px 16px 0",borderBottom:tRecent.length>0?`1px solid ${C.border}`:"none"}}>
                <div style={{fontSize:10,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:4}}>Upcoming</div>
                {tUpcoming.map(g=>{
                  const isH=g.home===myTeam.id; const opp=tById(teams,isH?g.away:g.home);
                  return (
                    <div key={g.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderTop:`1px solid ${C.border}`}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:12,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>↗ {opp?.name||"TBD"}</div>
                        <div style={{fontSize:10,color:C.muted,marginTop:1}}>{g.day} {g.date} · {g.time}</div>
                      </div>
                      <StatusBadge status={g.status}/>
                    </div>
                  );
                })}
                <div style={{height:6}}/>
              </div>
            )}
            {tRecent.length>0&&(
              <div style={{padding:"10px 16px 0"}}>
                <div style={{fontSize:10,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:4}}>Recent</div>
                {tRecent.map(g=>{
                  const isH=g.home===myTeam.id; const myS=isH?g.hs:g.as_; const thS=isH?g.as_:g.hs;
                  const opp=tById(teams,isH?g.away:g.home);
                  const won=myS!=null&&myS>thS; const lost=myS!=null&&myS<thS;
                  return (
                    <div key={g.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderTop:`1px solid ${C.border}`}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:12,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>vs {opp?.name||"TBD"}</div>
                        <div style={{fontSize:10,color:C.muted,marginTop:1}}>{g.day} {g.date}</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
                        <span style={{fontSize:9,fontWeight:800,textTransform:"uppercase",color:won?C.green:lost?C.red:C.muted,background:won?`${C.green}18`:lost?`${C.red}18`:`${C.light}18`,padding:"2px 6px",borderRadius:4}}>{won?"W":lost?"L":"T"}</span>
                        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:won?C.green:lost?C.red:C.muted}}>{myS}–{thS}</span>
                      </div>
                    </div>
                  );
                })}
                <div style={{height:6}}/>
              </div>
            )}
          </div>
        );
      })}

      {/* Footer */}
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{setPickingTeam(true);setDraftIds(myTeamIds);}}
          style={{flex:1,background:C.surf,border:`1px solid ${C.border}`,borderRadius:R,padding:"12px",cursor:"pointer",fontSize:12,fontWeight:600,color:C.muted}}>
          Change Teams
        </button>
        <button onClick={()=>{setProfile(null);removeLocal("fp_profile");}}
          style={{flex:1,background:"none",border:`1px solid ${C.red}30`,borderRadius:R,padding:"12px",cursor:"pointer",fontSize:12,fontWeight:600,color:C.red}}>
          Clear Profile
        </button>
      </div>
    </div>
  );
}
// ─── Admin Screen ─────────────────────────────────────────────────────────────
const ADMIN_PW = "fairplayadmin"; // kept for reference

function AdminScreen({ games, setGames, teams, setTeams, info, setInfo, bracket, setBracket, adminMode }) {
  const [section,  setSection]  = useState(null);

  if (!adminMode) {
    return (
      <div style={{paddingBottom:28,textAlign:"center",paddingTop:32}}>
        <div style={{fontSize:32,marginBottom:12}}>🔐</div>
        <div style={{fontSize:16,fontWeight:700,color:C.text,fontFamily:"'Barlow Condensed',sans-serif",marginBottom:8}}>Admin Access Required</div>
        <div style={{fontSize:13,color:C.muted}}>Enable Admin Mode from the side menu to access this dashboard.</div>
      </div>
    );
  }


  // ── Section picker ─────────────────────────────────────────────────────────
  const sections = [
    {id:"announcements",icon:"📣",label:"Announcements"},
    {id:"scores",       icon:"🏆",label:"Scores"},
    {id:"schedule",     icon:"📅",label:"Schedule"},
    {id:"teams",        icon:"👥",label:"Teams"},
    {id:"bracket",      icon:"🎯",label:"Bracket"},
    {id:"bulkimport",   icon:"📋",label:"Bulk Import Schedule"},
    {id:"bulkteams",    icon:"👥",label:"Bulk Import Teams"},
    {id:"backup",       icon:"💾",label:"Backup & Restore"},
  ];

  if (!section) {
    return (
      <div style={{paddingBottom:28}}>
        <div style={{fontSize:13,fontWeight:600,color:C.gold,marginBottom:16,padding:"4px 0",borderBottom:`1px solid ${C.border}`}}>
          ⚙️ Admin Dashboard
        </div>
        {sections.map(s=>(
          <button key={s.id} onClick={()=>setSection(s.id)}
            style={{width:"100%",background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,
              padding:"14px 16px",marginBottom:8,cursor:"pointer",display:"flex",alignItems:"center",
              justifyContent:"space-between",textAlign:"left"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:20,opacity:0.7}}>{s.icon}</span>
              <span style={{fontSize:14,fontWeight:500,color:C.text}}>{s.label}</span>
            </div>
            <span style={{color:C.light,fontSize:18}}>›</span>
          </button>
        ))}
      </div>
    );
  }

  const back = <button onClick={()=>setSection(null)} style={{background:"none",border:"none",color:C.gold,fontSize:13,fontWeight:600,cursor:"pointer",padding:"0 0 16px",display:"block"}}>← Back</button>;

  // ── Announcements ──────────────────────────────────────────────────────────
  if (section === "announcements") {
    return <AdminAnnouncements back={back} info={info} setInfo={setInfo}/>;
  }

  // ── Scores ─────────────────────────────────────────────────────────────────
  if (section === "scores") {
    return <AdminScores back={back} games={games} setGames={setGames} teams={teams}/>;
  }

  // ── Schedule ───────────────────────────────────────────────────────────────
  if (section === "schedule") {
    return <AdminSchedule back={back} games={games} setGames={setGames} teams={teams}/>;
  }

  // ── Teams ──────────────────────────────────────────────────────────────────
  if (section === "teams") {
    return <AdminTeams back={back} teams={teams} setTeams={setTeams}/>;
  }

  // ── Bracket ────────────────────────────────────────────────────────────────
  if (section === "bracket") {
    return <AdminBracket back={back} teams={teams}/>;
  }

  // ── Bulk Import ────────────────────────────────────────────────────────────
  if (section === "bulkimport") {
    return <AdminBulkImport back={back} teams={teams} games={games} setGames={setGames}/>;
  }

  if (section === "bulkteams") {
    return <AdminBulkTeams back={back} teams={teams} setTeams={setTeams}/>;
  }

  if (section === "backup") {
    return <AdminBackupRestore back={back} games={games} setGames={setGames} teams={teams} setTeams={setTeams} info={info} setInfo={setInfo} bracket={bracket} setBracket={setBracket}/>;
  }

  return null;
}

// ── Admin: Announcements ──────────────────────────────────────────────────────
function AdminAnnouncements({ back, info, setInfo }) {
  const [editId, setEditId] = useState(null);
  const [adding, setAdding] = useState(false);
  const blank = { title:"", body:"", tag:"League", date: new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"}) };
  const [form, setForm]     = useState(blank);

  const save = () => {
    if (!form.title.trim()) return;
    const updated = editId
      ? (info.announcements||[]).map(a => a.id===editId ? {...a,...form} : a)
      : [{...form, id: Date.now()}, ...info.announcements];
    setInfo(p => ({...p, announcements: updated}));
    storageSet("fp_info_announcements", JSON.stringify(updated));
    setEditId(null); setAdding(false); setForm(blank);
  };

  const del = (id) => {
    const updated = (info.announcements||[]).filter(a => a.id !== id);
    setInfo(p => ({...p, announcements: updated}));
    storageSet("fp_info_announcements", JSON.stringify(updated));
  };

  const openEdit = (a) => { setForm({title:a.title,body:a.body,tag:a.tag,date:a.date}); setEditId(a.id); setAdding(false); };

  if (adding || editId) {
    return (
      <div style={{paddingBottom:28}}>
        {back}
        <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:16}}>{editId?"Edit Announcement":"New Announcement"}</div>
        <TF label="Title"  value={form.title} onChange={v=>setForm(p=>({...p,title:v}))} placeholder="Announcement title"/>
        <TA label="Body"   value={form.body}  onChange={v=>setForm(p=>({...p,body:v}))}  rows={4}/>
        <TF label="Tag"    value={form.tag}   onChange={v=>setForm(p=>({...p,tag:v}))}   placeholder="League, Facility, Tournament…"/>
        <DatePick label="Date" value={form.date} onChange={v=>setForm(p=>({...p,date:v}))}/>
        <SaveCancel label="Save" onCancel={()=>{setEditId(null);setAdding(false);setForm(blank);}} onSave={save}/>
      </div>
    );
  }

  return (
    <div style={{paddingBottom:28}}>
      {back}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <span style={{fontSize:13,fontWeight:600,color:C.text}}>Announcements</span>
        <button onClick={()=>{setAdding(true);setForm(blank);}} style={{padding:"5px 14px",borderRadius:R,border:"none",background:C.gold,color:"#000",fontSize:12,fontWeight:700,cursor:"pointer"}}>+ Add</button>
      </div>
      {(info.announcements||[]).map(a=>(
        <div key={a.id} style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 14px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:6}}>
            <span style={{fontSize:13,fontWeight:600,color:C.text,flex:1,lineHeight:1.3}}>{a.title}</span>
            <div style={{display:"flex",gap:6,flexShrink:0}}>
              <button onClick={()=>openEdit(a)} style={{padding:"2px 9px",borderRadius:6,border:`1px solid ${C.border}`,background:"none",color:C.muted,fontSize:11,cursor:"pointer"}}>Edit</button>
              <button onClick={()=>del(a.id)} style={{padding:"2px 9px",borderRadius:6,border:`1px solid #f8717140`,background:"none",color:"#f87171",fontSize:11,cursor:"pointer"}}>Del</button>
            </div>
          </div>
          <div style={{fontSize:11,color:C.muted}}>{a.tag} · {a.date}</div>
        </div>
      ))}
    </div>
  );
}

// ── Admin: Scores ─────────────────────────────────────────────────────────────
function AdminScores({ back, games, setGames, teams }) {
  const [selId, setSelId] = useState(null);
  const [hs, setHs] = useState(0);
  const [as_, setAs] = useState(0);
  const [stat, setStat] = useState("Final");

  const sel = selId ? games.find(g=>g.id===selId) : null;

  const save = () => {
    if (!sel) return;
    const updated = games.map(g => g.id===selId ? {...g, hs, as_:as_, status:stat} : g);
    setGames(updated);
    storageSet("fp_games", JSON.stringify(updated));
    setSelId(null);
  };

  if (sel) {
    const home = tById(teams, sel.home);
    const away = tById(teams, sel.away);
    return (
      <div style={{paddingBottom:28}}>
        <button onClick={()=>setSelId(null)} style={{background:"none",border:"none",color:C.gold,fontSize:13,fontWeight:600,cursor:"pointer",padding:"0 0 16px",display:"block"}}>← Back</button>
        <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:16}}>
          {home?.name} vs {away?.name}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,background:C.surf,borderRadius:12,padding:"14px"}}>
          <div style={{flex:1,textAlign:"center"}}>
            <div style={{fontSize:11,color:C.muted,marginBottom:8}}>{home?.name}</div>
            <Counter value={hs} onChange={setHs}/>
          </div>
          <div style={{fontSize:16,color:C.muted,fontWeight:700}}>–</div>
          <div style={{flex:1,textAlign:"center"}}>
            <div style={{fontSize:11,color:C.muted,marginBottom:8}}>{away?.name}</div>
            <Counter value={as_} onChange={setAs}/>
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:8}}>Status</div>
          <div style={{display:"flex",gap:6}}>
            {["Upcoming","Live","Final"].map(s=>(
              <button key={s} onClick={()=>setStat(s)} style={{flex:1,padding:"8px",borderRadius:8,border:stat===s?`1.5px solid ${C.gold}`:`1px solid ${C.border}`,background:stat===s?C.gold:C.surf,color:stat===s?"#000":C.muted,fontSize:12,fontWeight:500,cursor:"pointer"}}>{s}</button>
            ))}
          </div>
        </div>
        <SaveCancel label="Save Score" onCancel={()=>setSelId(null)} onSave={save}/>
      </div>
    );
  }

  return (
    <div style={{paddingBottom:28}}>
      {back}
      <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:14}}>Select a Game</div>
      {games.map(g=>{
        const home=tById(teams,g.home); const away=tById(teams,g.away);
        if(!home||!away) return null;
        return (
          <button key={g.id} onClick={()=>{setSelId(g.id);setHs(g.hs??0);setAs(g.as_??0);setStat(g.status);}}
            style={{width:"100%",background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"11px 14px",marginBottom:7,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",textAlign:"left"}}>
            <div style={{minWidth:0}}>
              <div style={{fontSize:13,fontWeight:500,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{home.name} vs {away.name}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>{g.day} {g.date} · {g.time}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0,marginLeft:8}}>
              {g.hs!=null&&<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:C.text}}>{g.hs}–{g.as_}</span>}
              <StatusBadge status={g.status}/>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ── Admin: Schedule ───────────────────────────────────────────────────────────
function AdminSchedule({ back, games, setGames, teams }) {
  const [selId, setSelId] = useState(null);
  const sel = selId ? games.find(g=>g.id===selId) : null;
  const [day,   setDay]   = useState("");
  const [date,  setDate]  = useState("");
  const [time,  setTime]  = useState("");
  const [court, setCourt] = useState("");
  const [stat,  setStat]  = useState("Upcoming");

  const save = () => {
    const updated = games.map(g => g.id===selId ? {...g,day,date,time,court,status:stat} : g);
    setGames(updated);
    storageSet("fp_games", JSON.stringify(updated));
    setSelId(null);
  };

  if (sel) {
    const home = tById(teams, sel.home);
    const away = tById(teams, sel.away);
    return (
      <div style={{paddingBottom:28}}>
        <button onClick={()=>setSelId(null)} style={{background:"none",border:"none",color:C.gold,fontSize:13,fontWeight:600,cursor:"pointer",padding:"0 0 16px",display:"block"}}>← Back</button>
        <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:16}}>{home?.name} vs {away?.name}</div>
        <DatePick label="Date" value={date} onChange={v=>{ setDate(v); const d=new Date(v+" 2025"); if(!isNaN(d)) setDay(d.toLocaleDateString("en-US",{weekday:"short"})); }}/>
        <TimePick label="Time" value={time} onChange={setTime}/>
        <TF label="Court" value={court} onChange={setCourt} placeholder="River City — Court 1"/>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:8}}>Status</div>
          <div style={{display:"flex",gap:6}}>
            {["Upcoming","Live","Final"].map(s=>(
              <button key={s} onClick={()=>setStat(s)} style={{flex:1,padding:"8px",borderRadius:8,border:stat===s?`1.5px solid ${C.gold}`:`1px solid ${C.border}`,background:stat===s?C.gold:C.surf,color:stat===s?"#000":C.muted,fontSize:12,fontWeight:500,cursor:"pointer"}}>{s}</button>
            ))}
          </div>
        </div>
        <SaveCancel label="Save" onCancel={()=>setSelId(null)} onSave={save}/>
      </div>
    );
  }

  return (
    <div style={{paddingBottom:28}}>
      {back}
      <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:14}}>Select a Game</div>
      {games.map(g=>{
        const home=tById(teams,g.home); const away=tById(teams,g.away);
        if(!home||!away) return null;
        return (
          <button key={g.id} onClick={()=>{setSelId(g.id);setDay(g.day);setDate(g.date);setTime(g.time);setCourt(g.court);setStat(g.status);}}
            style={{width:"100%",background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"11px 14px",marginBottom:7,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",textAlign:"left"}}>
            <div style={{minWidth:0}}>
              <div style={{fontSize:13,fontWeight:500,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{home.name} vs {away.name}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>{g.day} {g.date} · {g.time} · {g.court}</div>
            </div>
            <span style={{flexShrink:0,marginLeft:8}}><StatusBadge status={g.status}/></span>
          </button>
        );
      })}
    </div>
  );
}

// ── Admin: Teams ──────────────────────────────────────────────────────────────
function AdminTeams({ back, teams, setTeams }) {
  const [selId, setSelId] = useState(null);
  const sel = selId ? teams.find(t=>t.id===selId) : null;
  const [name, setName]   = useState("");
  const [cap,  setCap]    = useState("");
  const [div,  setDiv]    = useState("");
  const [np,   setNp]     = useState("");

  const save = () => {
    const updated = teams.map(t => t.id===selId ? {...t,name:name.trim()||t.name,captain:cap.trim(),div} : t);
    setTeams(updated);
    storageSet("fp_teams", JSON.stringify(updated));
    setSelId(null);
  };

  const addPlayer = () => {
    if (!np.trim() || !selId) return;
    const updated = teams.map(t => t.id===selId ? {...t,roster:[...t.roster,np.trim()]} : t);
    setTeams(updated);
    storageSet("fp_teams", JSON.stringify(updated));
    setNp("");
  };

  const removePlayer = (i) => {
    const updated = teams.map(t => t.id===selId ? {...t,roster:t.roster.filter((_,j)=>j!==i)} : t);
    setTeams(updated);
    storageSet("fp_teams", JSON.stringify(updated));
  };

  if (sel) {
    return (
      <div style={{paddingBottom:28}}>
        <button onClick={()=>setSelId(null)} style={{background:"none",border:"none",color:C.gold,fontSize:13,fontWeight:600,cursor:"pointer",padding:"0 0 16px",display:"block"}}>← Back</button>
        <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:16}}>#{sel.id} · {sel.name}</div>
        <TF label="Team Name" value={name}  onChange={setName} placeholder={sel.name}/>
        <TF label="Captain"   value={cap}   onChange={setCap}  placeholder={sel.captain}/>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:8}}>Division</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {DIVS.map(d=><button key={d} onClick={()=>setDiv(d)} style={{padding:"5px 12px",borderRadius:R,fontSize:11,fontWeight:500,cursor:"pointer",border:div===d?`1.5px solid ${DIVC[d]}`:`1px solid ${C.border}`,background:div===d?DIVC[d]:C.surf,color:div===d?"#fff":C.muted}}>{d}</button>)}
          </div>
        </div>
        <SaveCancel label="Save Team" onCancel={()=>setSelId(null)} onSave={save}/>
        <div style={{marginTop:20}}>
          <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:10}}>Roster</div>
          {sel.roster.map((p,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:C.surf,border:`1px solid ${C.border}`,borderRadius:8,marginBottom:6}}>
              <span style={{flex:1,fontSize:13,color:C.text}}>{p}</span>
              <button onClick={()=>removePlayer(i)} style={{background:"none",border:"none",color:"#f87171",fontSize:14,cursor:"pointer",padding:0}}>×</button>
            </div>
          ))}
          <div style={{display:"flex",gap:8,marginTop:6}}>
            <input value={np} onChange={e=>setNp(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter") addPlayer();}}
              placeholder="Player name"
              style={{flex:1,padding:"8px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:13,color:C.text,background:C.surf,outline:"none"}}/>
            <button onClick={addPlayer} style={{padding:"8px 14px",borderRadius:8,background:C.gold,border:"none",color:"#000",fontSize:13,fontWeight:600,cursor:"pointer"}}>Add</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{paddingBottom:28}}>
      {back}
      <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:14}}>Select a Team</div>
      {DIVS.map(div=>(
        <div key={div} style={{marginBottom:16}}>
          <div style={{fontSize:10,fontWeight:700,color:DIVC[div],textTransform:"uppercase",letterSpacing:"1px",marginBottom:8}}>{div}</div>
          {teams.filter(t=>t.div===div).map(t=>(
            <button key={t.id} onClick={()=>{setSelId(t.id);setName(t.name);setCap(t.captain);setDiv(t.div);}}
              style={{width:"100%",background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"11px 14px",marginBottom:6,cursor:"pointer",display:"flex",alignItems:"center",gap:12,textAlign:"left"}}>
              <Avatar team={t} size={32}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:500,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.name}</div>
                <div style={{fontSize:11,color:C.muted}}>#{t.id} · {t.roster.length} players</div>
              </div>
              <span style={{color:C.light,fontSize:18}}>›</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Admin: Bracket ────────────────────────────────────────────────────────────
function AdminBracket({ back, teams }) {
  return (
    <div style={{paddingBottom:28}}>
      {back}
      <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:8}}>Bracket</div>
      <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>
        Use the ✏ buttons directly on the Tournament tab to edit match scores. Each bracket slot has an inline edit button visible to all users.
      </div>
    </div>
  );
}

// ── Admin: Bulk Import Schedule ───────────────────────────────────────────────
function AdminBulkImport({ back, teams, games, setGames }) {
  const [raw,      setRaw]      = useState("");
  const [preview,  setPreview]  = useState(null);  // null | array of {game, error}
  const [imported, setImported] = useState(false);

  const DAY_MAP = {
    sunday:"Sun",monday:"Mon",tuesday:"Tue",wednesday:"Wed",thursday:"Thu",friday:"Fri",saturday:"Sat",
    sun:"Sun",mon:"Mon",tue:"Tue",wed:"Wed",thu:"Thu",fri:"Fri",sat:"Sat",
  };

  const parseLine = (line, idx) => {
    const raw = line.trim();
    if (!raw) return null;
    const parts = raw.split("|").map(p => p.trim());
    if (parts.length < 5) return { error: `Line ${idx+1}: needs 5 fields separated by |`, raw };

    const [datePart, time, court, homeRaw, awayRaw] = parts;

    // Parse date — "Monday, May 6" or "Mon May 6"
    const dateMatch = datePart.match(/^([A-Za-z]+)[,\s]+([A-Za-z]+\s+\d+)$/);
    if (!dateMatch) return { error: `Line ${idx+1}: can't parse date "${datePart}"`, raw };
    const dayWord = dateMatch[1].toLowerCase();
    const day     = DAY_MAP[dayWord] || dateMatch[1].slice(0,3);
    const date    = dateMatch[2].trim();

    // Parse team numbers — "Team #51" or "#51" or "51"
    const numOf = str => { const m = str.match(/#?(\d+)/); return m ? parseInt(m[1]) : null; };
    const homeId = numOf(homeRaw);
    const awayId = numOf(awayRaw);

    if (!homeId || !awayId) return { error: `Line ${idx+1}: can't read team numbers from "${homeRaw}" / "${awayRaw}"`, raw };

    const homeTeam = tById(teams, homeId);
    const awayTeam = tById(teams, awayId);
    const warnings = [];
    if (!homeTeam) warnings.push(`Team #${homeId} not found`);
    if (!awayTeam) warnings.push(`Team #${awayId} not found`);

    const game = {
      id:     Date.now() + idx,
      day,
      date,
      time:   time || "TBD",
      court:  court || "TBD",
      home:   homeId,
      away:   awayId,
      status: "Upcoming",
      hs:     null,
      as_:    null,
    };

    return { game, warnings, raw };
  };

  const handlePreview = () => {
    const lines   = raw.split("\n").filter(l => l.trim());
    const results = lines.map((line, i) => parseLine(line, i)).filter(Boolean);
    setPreview(results);
    setImported(false);
  };

  const handleImport = () => {
    if (!preview) return;
    const newGames = preview.filter(r => r.game).map(r => r.game);
    if (newGames.length === 0) return;
    const updated = [...games, ...newGames];
    setGames(updated);
    storageSet("fp_games", JSON.stringify(updated));
    setImported(true);
  };

  const validCount   = preview ? preview.filter(r => r.game).length  : 0;
  const errorCount   = preview ? preview.filter(r => r.error).length : 0;
  const warnCount    = preview ? preview.filter(r => r.game && r.warnings?.length).length : 0;

  return (
    <div style={{paddingBottom:28}}>
      {back}
      <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:4}}>Bulk Import Schedule</div>
      <div style={{fontSize:11,color:C.muted,marginBottom:14,lineHeight:1.6}}>
        Paste one game per line in this format:
      </div>

      {/* Format example */}
      <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",marginBottom:14,fontFamily:"monospace",fontSize:10,color:C.muted,lineHeight:1.8,userSelect:"all"}}>
        Monday, May 6 | 6:00 PM | Court 1 | Team #51 | Team #52{"\n"}
        Monday, May 6 | 7:00 PM | Court 2 | Team #53 | Team #54{"\n"}
        Tuesday, May 7 | 6:00 PM | Court 1 | Team #61 | Team #62
      </div>

      {/* Textarea */}
      <textarea
        value={raw}
        onChange={e=>{setRaw(e.target.value);setPreview(null);setImported(false);}}
        placeholder={"Monday, May 6 | 6:00 PM | Court 1 | Team #51 | Team #52\nMonday, May 6 | 7:00 PM | Court 2 | Team #53 | Team #54"}
        rows={8}
        style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1px solid ${C.border}`,fontSize:12,
          color:C.text,background:C.surf,boxSizing:"border-box",outline:"none",resize:"vertical",
          fontFamily:"monospace",lineHeight:1.7,marginBottom:10}}
      />

      {/* Preview button */}
      <button onClick={handlePreview} disabled={!raw.trim()}
        style={{width:"100%",padding:"11px",borderRadius:10,border:`1px solid ${C.border}`,background:C.surf,
          color:raw.trim()?C.text:C.muted,fontSize:13,fontWeight:600,cursor:raw.trim()?"pointer":"default",marginBottom:14}}>
        Preview
      </button>

      {/* Preview results */}
      {preview && (
        <div>
          {/* Summary */}
          <div style={{display:"flex",gap:10,marginBottom:12,flexWrap:"wrap"}}>
            <span style={{fontSize:11,fontWeight:600,color:C.green,background:`${C.green}14`,padding:"3px 10px",borderRadius:20}}>{validCount} valid</span>
            {warnCount>0 && <span style={{fontSize:11,fontWeight:600,color:C.gold,background:`${C.gold}14`,padding:"3px 10px",borderRadius:20}}>{warnCount} warnings</span>}
            {errorCount>0 && <span style={{fontSize:11,fontWeight:600,color:C.red,background:`${C.red}14`,padding:"3px 10px",borderRadius:20}}>{errorCount} errors</span>}
          </div>

          {/* Line-by-line preview */}
          <div style={{marginBottom:14}}>
            {preview.map((r,i) => {
              if (r.error) {
                return (
                  <div key={i} style={{background:`${C.red}0c`,border:`1px solid ${C.red}30`,borderRadius:8,padding:"9px 12px",marginBottom:6}}>
                    <div style={{fontSize:11,color:C.red,marginBottom:2}}>✗ {r.error}</div>
                    <div style={{fontSize:10,color:C.muted,fontFamily:"monospace"}}>{r.raw}</div>
                  </div>
                );
              }
              const home = tById(teams, r.game.home);
              const away = tById(teams, r.game.away);
              const hasWarn = r.warnings?.length > 0;
              return (
                <div key={i} style={{background:hasWarn?`${C.gold}08`:`${C.green}08`,border:`1px solid ${hasWarn?C.gold+"30":C.green+"30"}`,borderRadius:8,padding:"9px 12px",marginBottom:6}}>
                  <div style={{fontSize:12,fontWeight:500,color:C.text,marginBottom:2}}>
                    {r.game.day} {r.game.date} · {r.game.time} · {r.game.court}
                  </div>
                  <div style={{fontSize:11,color:C.muted}}>
                    {home?.name||`#${r.game.home} (not found)`} <span style={{color:C.light}}>vs</span> {away?.name||`#${r.game.away} (not found)`}
                  </div>
                  {hasWarn && <div style={{fontSize:10,color:C.gold,marginTop:4}}>⚠ {r.warnings.join(", ")}</div>}
                </div>
              );
            })}
          </div>

          {/* Import button */}
          {validCount > 0 && !imported && (
            <button onClick={handleImport}
              style={{width:"100%",padding:"12px",borderRadius:10,border:"none",background:C.gold,
                color:"#000",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",
                letterSpacing:"1px",textTransform:"uppercase"}}>
              Import {validCount} Game{validCount!==1?"s":""}
            </button>
          )}

          {imported && (
            <div style={{background:`${C.green}14`,border:`1px solid ${C.green}30`,borderRadius:10,padding:"12px",textAlign:"center"}}>
              <div style={{fontSize:13,fontWeight:600,color:C.green}}>✓ {validCount} game{validCount!==1?"s":""} imported successfully</div>
              <div style={{fontSize:11,color:C.muted,marginTop:4}}>Check the Schedule tab to verify.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Admin: Bulk Import Teams ──────────────────────────────────────────────────
function AdminBulkTeams({ back, teams, setTeams }) {
  const [raw,      setRaw]      = useState("");
  const [preview,  setPreview]  = useState(null);
  const [imported, setImported] = useState(false);

  // Assign a stable color by team id
  const colorFor = (id) => {
    const palette = ["#e85d04","#dc2626","#db2777","#9333ea","#2563eb","#0891b2","#059669","#d97706","#16a34a","#0284c7","#6d28d9","#c2410c","#0d9488","#b45309","#be185d","#0f766e","#1d4ed8","#7c3aed"];
    return palette[id % palette.length];
  };

  const parsePaste = (text) => {
    const lines   = text.split("\n");
    const results = [];
    let currentDiv = null;

    // Check if a line looks like a division header
    const isDivHeader = (line) => {
      const t = line.trim();
      if (!t) return false;
      if (t.startsWith("Team #")) return false;
      // Matches known division names or any line with no | separator that looks like a heading
      if (DIVS.some(d => t.toLowerCase().includes(d.toLowerCase()))) return t;
      if (!t.includes("|") && t.length < 40) return t;
      return false;
    };

    lines.forEach((rawLine, i) => {
      const line = rawLine.trim();
      if (!line) return;

      const divMatch = isDivHeader(line);
      if (divMatch) {
        // Try to match against known divisions
        const matched = DIVS.find(d => line.toLowerCase().includes(d.toLowerCase()));
        currentDiv = matched || line;
        return;
      }

      const parts = line.split("|").map(p => p.trim());
      if (parts.length < 2) {
        results.push({ error: `Line ${i+1}: not enough fields`, raw: line });
        return;
      }

      // Team number
      const numMatch = parts[0].match(/#?(\d+)/);
      if (!numMatch) {
        results.push({ error: `Line ${i+1}: can't find team number in "${parts[0]}"`, raw: line });
        return;
      }
      const id = parseInt(numMatch[1]);

      // Team name
      const name = parts[1] || `Team #${id}`;

      // Captain — look for "Captain:" field anywhere
      let captain = "TBD";
      const capPart = parts.find(p => /captain/i.test(p));
      if (capPart) {
        const capVal = capPart.replace(/captain\s*:/i, "").trim();
        captain = capVal || "TBD";
      }

      // Roster — look for "Roster:" field
      let roster = [];
      const rosterPart = parts.find(p => /roster/i.test(p));
      if (rosterPart) {
        const rosterVal = rosterPart.replace(/roster\s*:/i, "").trim();
        if (rosterVal && rosterVal.toLowerCase() !== "tbd") {
          roster = rosterVal.split(",").map(r => r.trim()).filter(Boolean);
        }
      }

      // Division — use detected current or fall back to existing team's div
      const existing = tById(teams, id);
      const div = currentDiv || existing?.div || "Coed C";

      results.push({
        team: { id, name, captain, div, roster, color: existing?.color || colorFor(id) },
        isUpdate: !!existing,
        raw: line,
      });
    });

    return results;
  };

  const handlePreview = () => {
    setPreview(parsePaste(raw));
    setImported(false);
  };

  const handleImport = () => {
    if (!preview) return;
    const valid = preview.filter(r => r.team);
    if (!valid.length) return;

    const updated = [...teams];
    valid.forEach(({ team }) => {
      const idx = updated.findIndex(t => t.id === team.id);
      if (idx >= 0) {
        updated[idx] = { ...updated[idx], ...team };
      } else {
        updated.push(team);
      }
    });

    setTeams(updated);
    storageSet("fp_teams", JSON.stringify(updated));
    setImported(true);
  };

  const validCount  = preview ? preview.filter(r => r.team).length  : 0;
  const updateCount = preview ? preview.filter(r => r.team && r.isUpdate).length : 0;
  const newCount    = validCount - updateCount;
  const errorCount  = preview ? preview.filter(r => r.error).length : 0;

  return (
    <div style={{paddingBottom:28}}>
      {back}
      <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:4}}>Bulk Import Teams</div>
      <div style={{fontSize:11,color:C.muted,marginBottom:14,lineHeight:1.6}}>
        Paste division headers and team rows. Existing teams (by number) will be updated; new teams will be added.
      </div>

      {/* Format example */}
      <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",marginBottom:14,fontFamily:"monospace",fontSize:10,color:C.muted,lineHeight:1.9,userSelect:"all"}}>
        {"Coed C\n"}
        {"Team #61 | Jungle Ballers | Captain: John Smith | Roster: John, Sarah, Mike\n"}
        {"Team #62 | Balls Deep | Captain: TBD | Roster: TBD\n"}
        {"Coed C-\n"}
        {"Team #71 | 3Rivers Set Me Outside | Captain: TBD"}
      </div>

      {/* Textarea */}
      <textarea
        value={raw}
        onChange={e => { setRaw(e.target.value); setPreview(null); setImported(false); }}
        placeholder={"Coed C\nTeam #61 | Jungle Ballers | Captain: John Smith | Roster: John, Sarah, Mike"}
        rows={9}
        style={{width:"100%",padding:"10px 12px",borderRadius:10,border:`1px solid ${C.border}`,fontSize:12,
          color:C.text,background:C.surf,boxSizing:"border-box",outline:"none",resize:"vertical",
          fontFamily:"monospace",lineHeight:1.7,marginBottom:10}}
      />

      {/* Preview button */}
      <button onClick={handlePreview} disabled={!raw.trim()}
        style={{width:"100%",padding:"11px",borderRadius:10,border:`1px solid ${C.border}`,background:C.surf,
          color:raw.trim()?C.text:C.muted,fontSize:13,fontWeight:600,cursor:raw.trim()?"pointer":"default",marginBottom:14}}>
        Preview
      </button>

      {/* Preview results */}
      {preview && (
        <div>
          {/* Summary */}
          <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
            {newCount    > 0 && <span style={{fontSize:11,fontWeight:600,color:C.green,background:`${C.green}14`,padding:"3px 10px",borderRadius:20}}>{newCount} new</span>}
            {updateCount > 0 && <span style={{fontSize:11,fontWeight:600,color:C.gold, background:`${C.gold}14`, padding:"3px 10px",borderRadius:20}}>{updateCount} update</span>}
            {errorCount  > 0 && <span style={{fontSize:11,fontWeight:600,color:C.red,  background:`${C.red}14`,  padding:"3px 10px",borderRadius:20}}>{errorCount} error</span>}
          </div>

          {/* Line-by-line */}
          <div style={{marginBottom:14}}>
            {preview.map((r, i) => {
              if (r.error) {
                return (
                  <div key={i} style={{background:`${C.red}0c`,border:`1px solid ${C.red}30`,borderRadius:8,padding:"9px 12px",marginBottom:6}}>
                    <div style={{fontSize:11,color:C.red,marginBottom:2}}>✗ {r.error}</div>
                    <div style={{fontSize:10,color:C.muted,fontFamily:"monospace"}}>{r.raw}</div>
                  </div>
                );
              }
              const { team, isUpdate } = r;
              return (
                <div key={i} style={{background:isUpdate?`${C.gold}08`:`${C.green}08`,border:`1px solid ${isUpdate?C.gold+"30":C.green+"30"}`,borderRadius:8,padding:"9px 12px",marginBottom:6}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                    <div style={{width:20,height:20,borderRadius:"50%",background:team.color,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#fff"}}>{team.id}</div>
                    <span style={{fontSize:12,fontWeight:600,color:C.text}}>#{team.id} · {team.name}</span>
                    <span style={{fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:4,background:isUpdate?`${C.gold}22`:`${C.green}22`,color:isUpdate?C.gold:C.green,textTransform:"uppercase",letterSpacing:"0.5px"}}>{isUpdate?"Update":"New"}</span>
                  </div>
                  <div style={{fontSize:11,color:C.muted}}>
                    {team.div} · Captain: {team.captain}
                    {team.roster.length > 0 && ` · Roster: ${team.roster.join(", ")}`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Import button */}
          {validCount > 0 && !imported && (
            <button onClick={handleImport}
              style={{width:"100%",padding:"12px",borderRadius:10,border:"none",background:C.gold,
                color:"#000",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",
                letterSpacing:"1px",textTransform:"uppercase"}}>
              Import {validCount} Team{validCount!==1?"s":""}
            </button>
          )}

          {imported && (
            <div style={{background:`${C.green}14`,border:`1px solid ${C.green}30`,borderRadius:10,padding:"12px",textAlign:"center"}}>
              <div style={{fontSize:13,fontWeight:600,color:C.green}}>✓ {validCount} team{validCount!==1?"s":""} imported</div>
              <div style={{fontSize:11,color:C.muted,marginTop:4}}>Check the Teams tab to verify.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
// ── Admin: Backup & Restore ───────────────────────────────────────────────────
function AdminBackupRestore({ back, games, setGames, teams, setTeams, info, setInfo, bracket, setBracket }) {
  const [importData,   setImportData]   = useState(null);
  const [importError,  setImportError]  = useState("");
  const [importDone,   setImportDone]   = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [resetDone,    setResetDone]    = useState(false);

  const handleExport = () => {
    const payload = {
      _version:1, _exported: new Date().toISOString(),
      teams, games, bracket,
      announcements: info.announcements,
      rules:         info.rules,
      payment:       info.payment,
      requestNote:   info.requestNote,
      locations:     info.locations,
      contact:       info.contact,
      openCourt:     info.openCourt,
    };
    try {
      const blob = new Blob([JSON.stringify(payload, null, 2)], {type:"application/json"});
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href = url; a.download = "fairplay-volleyball-backup.json"; a.click();
      URL.revokeObjectURL(url);
    } catch(e) { alert("Download failed. Try copying the JSON manually."); }
  };

  const handleFile = (e) => {
    setImportData(null); setImportError(""); setImportDone(false);
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (typeof parsed !== "object" || Array.isArray(parsed)) { setImportError("Invalid file: expected a JSON object."); return; }
        if (!parsed.teams && !parsed.games && !parsed.announcements) { setImportError("Doesn't look like a Fairplay backup — no teams, games, or announcements found."); return; }
        setImportData(parsed);
      } catch(err) { setImportError("Could not parse file. Make sure it is valid JSON."); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleImport = () => {
    if (!importData) return;
    try {
      if (Array.isArray(importData.teams)         && importData.teams.length)         { setTeams(importData.teams); storageSet("fp_teams", JSON.stringify(importData.teams)); }
      if (Array.isArray(importData.games)         && importData.games.length)         { setGames(importData.games); storageSet("fp_games", JSON.stringify(importData.games)); }
      if (Array.isArray(importData.bracket)       && importData.bracket.length)       { setBracket(importData.bracket); storageSet("fp_bracket", JSON.stringify(importData.bracket)); }
      if (Array.isArray(importData.announcements) && importData.announcements.length) { setInfo(p=>({...p,announcements:importData.announcements})); storageSet("fp_info_announcements", JSON.stringify(importData.announcements)); }
      if (Array.isArray(importData.rules))    setInfo(p=>({...p,rules:importData.rules}));
      if (importData.payment)                 setInfo(p=>({...p,payment:importData.payment}));
      if (importData.requestNote)             setInfo(p=>({...p,requestNote:importData.requestNote}));
      if (Array.isArray(importData.locations))setInfo(p=>({...p,locations:importData.locations}));
      if (importData.contact)                 setInfo(p=>({...p,contact:importData.contact}));
      if (importData.openCourt)               setInfo(p=>({...p,openCourt:importData.openCourt}));
      setImportDone(true);
    } catch(e) { setImportError("Import failed. Data may be malformed."); }
  };

  const handleReset = () => {
    setTeams(TEAMS_INIT); setGames(GAMES_INIT); setInfo(INFO_INIT); setBracket(BRACKET_INIT);
    storageSet("fp_teams", JSON.stringify(TEAMS_INIT));
    storageSet("fp_games", JSON.stringify(GAMES_INIT));
    storageSet("fp_bracket", JSON.stringify(BRACKET_INIT));
    storageSet("fp_info_announcements", JSON.stringify(INFO_INIT.announcements));
    storageDel("fp_profile");
    setResetDone(true); setResetConfirm(false);
  };

  const Row = ({label, value}) => (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
      <span style={{fontSize:13,color:C.muted}}>{label}</span>
      <span style={{fontSize:13,fontWeight:600,color:C.text}}>{value}</span>
    </div>
  );

  return (
    <div style={{paddingBottom:28}}>
      {back}
      <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:20}}>Backup & Restore</div>

      {/* Export */}
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
        <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:4}}>Export Backup</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:12,lineHeight:1.5}}>Downloads all teams, games, announcements, and league info as a JSON file.</div>
        <button onClick={handleExport} style={{width:"100%",padding:"11px",borderRadius:10,border:`1px solid ${C.border}`,background:C.bg,color:C.text,fontSize:13,fontWeight:600,cursor:"pointer"}}>
          💾 Download Backup
        </button>
      </div>

      {/* Import */}
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
        <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:4}}>Import Backup</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:12,lineHeight:1.5}}>Select a <code style={{fontSize:10,background:C.bg,padding:"1px 4px",borderRadius:3}}>fairplay-volleyball-backup.json</code> file to restore.</div>
        <label style={{display:"block",width:"100%",padding:"11px",borderRadius:10,border:`1px dashed ${C.border}`,background:C.bg,color:C.muted,fontSize:13,fontWeight:500,cursor:"pointer",textAlign:"center",boxSizing:"border-box"}}>
          📂 Choose File
          <input type="file" accept=".json,application/json" onChange={handleFile} style={{display:"none"}}/>
        </label>
        {importError && <div style={{marginTop:10,padding:"9px 12px",background:`${C.red}0c`,border:`1px solid ${C.red}30`,borderRadius:8,fontSize:12,color:C.red}}>✗ {importError}</div>}
        {importData && !importDone && (
          <div style={{marginTop:12}}>
            <div style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:8}}>Preview</div>
            <div style={{background:C.bg,borderRadius:8,padding:"4px 12px",marginBottom:12}}>
              <Row label="Teams"         value={Array.isArray(importData.teams)         ? importData.teams.length         : "—"}/>
              <Row label="Games"         value={Array.isArray(importData.games)         ? importData.games.length         : "—"}/>
              <Row label="Bracket"       value={Array.isArray(importData.bracket)       ? `${importData.bracket.length} matches` : "—"}/>
              <Row label="Announcements" value={Array.isArray(importData.announcements) ? importData.announcements.length : "—"}/>
              <Row label="Rules"         value={Array.isArray(importData.rules)         ? `${importData.rules.length} rules` : "—"}/>
              <Row label="Exported"      value={importData._exported ? new Date(importData._exported).toLocaleDateString() : "Unknown"}/>
            </div>
            <div style={{fontSize:11,color:C.red,marginBottom:10}}>⚠ This will replace your current data. This cannot be undone.</div>
            <button onClick={handleImport} style={{width:"100%",padding:"12px",borderRadius:10,border:"none",background:C.gold,color:"#000",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"1px",textTransform:"uppercase"}}>
              Confirm Import
            </button>
          </div>
        )}
        {importDone && (
          <div style={{marginTop:10,padding:"10px 12px",background:`${C.green}14`,border:`1px solid ${C.green}30`,borderRadius:8,textAlign:"center"}}>
            <div style={{fontSize:13,fontWeight:600,color:C.green}}>✓ Data imported successfully</div>
            <div style={{fontSize:11,color:C.muted,marginTop:3}}>All tabs now reflect the restored data.</div>
          </div>
        )}
      </div>

      {/* Reset */}
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px"}}>
        <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:4}}>Reset to Starter Data</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:12,lineHeight:1.5}}>Restores the original demo teams, schedule, and announcements. Clears your profile.</div>
        {!resetConfirm && !resetDone && (
          <button onClick={()=>setResetConfirm(true)} style={{width:"100%",padding:"11px",borderRadius:10,border:`1px solid ${C.red}44`,background:"none",color:C.red,fontSize:13,fontWeight:600,cursor:"pointer"}}>
            Reset to Starter Data
          </button>
        )}
        {resetConfirm && (
          <div>
            <div style={{fontSize:12,color:C.red,marginBottom:10}}>Are you sure? All current data will be replaced with the demo data.</div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setResetConfirm(false)} style={{flex:1,padding:"10px",borderRadius:10,border:`1px solid ${C.border}`,background:C.surf,color:C.muted,fontSize:12,fontWeight:500,cursor:"pointer"}}>Cancel</button>
              <button onClick={handleReset} style={{flex:1,padding:"10px",borderRadius:10,border:"none",background:C.red,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}>Yes, Reset</button>
            </div>
          </div>
        )}
        {resetDone && (
          <div style={{padding:"10px 12px",background:`${C.green}14`,border:`1px solid ${C.green}30`,borderRadius:8,textAlign:"center"}}>
            <div style={{fontSize:13,fontWeight:600,color:C.green}}>✓ Reset complete</div>
            <div style={{fontSize:11,color:C.muted,marginTop:3}}>Starter data has been restored.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── About Screen ─────────────────────────────────────────────────────────────
function AboutScreen() {
  const features = [
    "Schedule — game times, courts, and live scores",
    "Teams & Standings — rosters, captains, and rankings",
    "Tournament Bracket — playoff matches and results",
    "Subs Board — find or offer substitutes",
    "My Profile — personal team card and next game",
    "Admin Mode — manage scores, teams, and schedule",
  ];

  return (
    <div style={{paddingBottom:28}}>
      {/* Logo / wordmark */}
      <div style={{textAlign:"center",padding:"28px 0 24px"}}>
        <div style={{width:64,height:64,borderRadius:16,background:C.navy,border:`2px solid ${C.gold}44`,
          display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:30}}>
          🏐
        </div>
        <div style={{fontSize:24,fontWeight:700,color:C.text,fontFamily:"'Barlow Condensed',sans-serif",
          letterSpacing:"2.5px",textTransform:"uppercase",lineHeight:1}}>
          Fairplay Volleyball
        </div>
        <div style={{fontSize:12,color:C.muted,marginTop:6,lineHeight:1.6,maxWidth:280,margin:"8px auto 0"}}>
          League schedules, standings, brackets, and team tools for Fairplay Volleyball.
        </div>
      </div>

      {/* Version card */}
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:R,padding:`${SP}px`,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,
          paddingBottom:10,borderBottom:`1px solid ${C.border}`}}>
          <span style={{fontSize:13,color:C.text,fontWeight:500}}>Version</span>
          <span style={{fontSize:12,fontWeight:700,color:C.gold,background:`${C.gold}14`,
            padding:"2px 10px",borderRadius:R3,letterSpacing:"0.5px"}}>v1.0 Beta</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:13,color:C.text,fontWeight:500}}>Built for</span>
          <span style={{fontSize:13,color:C.muted}}>Fairplay players</span>
        </div>
      </div>

      {/* Features */}
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:R,overflow:"hidden",marginBottom:12}}>
        <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}`}}>
          <SLabel style={{marginBottom:0}}>Features Included</SLabel>
        </div>
        {features.map((f,i) => (
          <div key={i} style={{padding:"9px 14px",borderBottom:i<features.length-1?`1px solid ${C.border}`:"none",
            display:"flex",alignItems:"center",gap:10}}>
            <span style={{width:4,height:4,borderRadius:"50%",background:C.gold,flexShrink:0,display:"block"}}/>
            <span style={{fontSize:12,color:C.muted,lineHeight:1.4}}>{f}</span>
          </div>
        ))}
      </div>

      {/* Contact / Feedback */}
      <div style={{background:C.surf,border:`1px solid ${C.border}`,borderRadius:R,padding:`${SP}px`,marginBottom:12}}>
        <SLabel>Contact & Feedback</SLabel>
        <div style={{fontSize:12,color:C.muted,lineHeight:1.6,marginBottom:12}}>
          Questions, feedback, or issues with the app? Reach out to the league directly.
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
            <span style={{fontSize:16,flexShrink:0}}>✉️</span>
            <span style={{fontSize:13,color:C.text}}>fairplaybeach@yahoo.com</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0"}}>
            <span style={{fontSize:16,flexShrink:0}}>📱</span>
            <span style={{fontSize:13,color:C.text}}>(260) 402-3999</span>
          </div>
        </div>
      </div>

      {/* Report issue */}
      <button style={{width:"100%",padding:"11px",borderRadius:R,border:`1px solid ${C.border}`,
        background:"none",color:C.muted,fontSize:13,fontWeight:500,cursor:"pointer",marginBottom:20}}>
        🐛 Report an Issue
      </button>

      {/* Credits */}
      <div style={{textAlign:"center",padding:"8px 0"}}>
        <div style={{fontSize:11,color:C.light,letterSpacing:"0.5px"}}>
          Fairplay Volleyball © 2025
        </div>
        <div style={{fontSize:10,color:C.light,marginTop:4,opacity:0.6}}>
          All rights reserved.
        </div>
      </div>
    </div>
  );
}

const NAV_ICONS = {
  home:(a)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?C.gold:C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  schedule:(a)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?C.gold:C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  teams:(a)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?C.gold:C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  standings:(a)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?C.gold:C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  bracket:(a)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?C.gold:C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="2"/><path d="M12 10v4"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M10.5 14.5L7 15"/><path d="M13.5 14.5L17 15"/></svg>,
  me:(a)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?C.gold:C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  subs:(a)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?C.gold:C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/><line x1="20" y1="8" x2="20" y2="14"/></svg>,
};

// ─── Subs Board ───────────────────────────────────────────────────────────────
const SUBS_STORAGE_KEY = "fp_subs_board";

function SubsBoard({ profile, teams }) {
  const [posts,     setPosts]     = useState(() => loadLocal(SUBS_STORAGE_KEY, []));
  const [filter,    setFilter]    = useState("all");
  const [divFilter, setDivFilter] = useState("All");
  const [showForm,  setShowForm]  = useState(false);
  const [formType,  setFormType]  = useState("needed");
  const [form,      setForm]      = useState({ name:"", teamNote:"", div:"", date:"", time:"", position:"", note:"" });
  const [formErr,   setFormErr]   = useState("");

  const savePosts = (updated) => {
    setPosts(updated);
    saveLocal(SUBS_STORAGE_KEY, updated);
  };

  const openForm = (type) => {
    setFormType(type);
    const _ids = profile?.teamIds || (profile?.teamId ? [profile.teamId] : []);
    const _div = _ids.length > 0 ? (teams.find(t=>t.id===_ids[0])?.div||"") : "";
    setForm({ name: profile?.name || "", teamNote:"", div: _div, date:"", time:"", position:"", note:"" });
    setFormErr("");
    setShowForm(true);
  };

  const handlePost = () => {
    if (!form.name.trim()) { setFormErr("Name is required."); return; }
    if (!form.date.trim()) { setFormErr("Date is required."); return; }
    const displayDate = form.time ? `${form.date} · ${form.time}` : form.date;
    const post = {
      id:        Date.now(),
      type:      formType,
      name:      form.name.trim(),
      teamNote:  form.teamNote.trim(),
      div:       form.div || "Any",
      date:      displayDate,
      position:  form.position.trim(),
      note:      form.note.trim(),
      status:    "open",
      ts:        new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),
      ownerId:   form.name.trim().toLowerCase(),
    };
    savePosts([post, ...posts]);
    setShowForm(false);
    setFormErr("");
  };

  const deletePost  = (id) => savePosts(posts.filter(p => p.id !== id));
  const toggleFilled = (id) => savePosts(posts.map(p => p.id===id ? {...p, status: p.status==="open"?"filled":"open"} : p));

  const isOwner = (post) => profile?.name && post.ownerId === profile.name.toLowerCase();

  const visible = posts.filter(p => {
    const matchType = filter==="all" || p.type===filter;
    const matchDiv  = divFilter==="All" || p.div===divFilter || p.div==="Any";
    return matchType && matchDiv;
  });

  // ── New post form ──────────────────────────────────────────────────────────
  if (showForm) {
    return (
      <div style={{paddingBottom:28}}>
        <button onClick={()=>setShowForm(false)} style={{background:"none",border:"none",color:C.gold,fontSize:13,fontWeight:600,cursor:"pointer",padding:"0 0 16px",display:"block"}}>← Back</button>
        <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:16}}>
          {formType==="needed" ? "Post: Looking for Sub" : "Post: Available to Sub"}
        </div>

        {/* Type toggle */}
        <div style={{display:"flex",background:C.bg,borderRadius:10,padding:3,marginBottom:16,border:`1px solid ${C.border}`}}>
          {[["needed","Looking for Sub"],["available","Available to Sub"]].map(([id,label])=>(
            <button key={id} onClick={()=>setFormType(id)}
              style={{flex:1,padding:"8px",borderRadius:8,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,
                background:formType===id?C.surf:"transparent",color:formType===id?C.text:C.muted}}>
              {label}
            </button>
          ))}
        </div>

        <TF label="Your Name *" value={form.name} onChange={v=>setForm(p=>({...p,name:v}))} placeholder="First name or nickname"/>
        {formType==="needed"
          ? <TeamPick
              label="Your Team (optional)"
              value={form.teamNote}
              onChange={v=>setForm(p=>({...p,teamNote:v}))}
              teams={teams}
              myTeamIds={profile?.teamIds || (profile?.teamId ? [profile.teamId] : [])}
              allowAny={false}
            />
          : <TF label="Available for (optional)" value={form.teamNote} onChange={v=>setForm(p=>({...p,teamNote:v}))} placeholder="Any team, specific division, etc."/>
        }
        <div style={{marginBottom:10}}>
          <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:6}}>Division</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {["Any",...DIVS].map(d=>(
              <button key={d} onClick={()=>setForm(p=>({...p,div:d}))}
                style={{padding:"4px 12px",borderRadius:R,fontSize:11,fontWeight:500,cursor:"pointer",
                  border:form.div===d?`1.5px solid ${d==="Any"?C.gold:DIVC[d]||C.gold}`:`1px solid ${C.border}`,
                  background:form.div===d?(d==="Any"?C.gold:DIVC[d]||C.gold):C.surf,
                  color:form.div===d?"#fff":C.muted}}>{d}</button>
            ))}
          </div>
        </div>
        <DatePick label={formType==="needed"?"Date Needed *":"Date(s) Available *"} value={form.date} onChange={v=>setForm(p=>({...p,date:v}))}/>
        <TimePick label="Time (optional)" value={form.time||""} onChange={v=>setForm(p=>({...p,time:v}))} optional/>
        <TF label="Position (optional)" value={form.position} onChange={v=>setForm(p=>({...p,position:v}))} placeholder="e.g. Setter, Any, Female only"/>
        <TA label="Short Note (optional)" value={form.note} onChange={v=>setForm(p=>({...p,note:v}))} rows={2}/>
        {formErr && <div style={{fontSize:12,color:C.red,marginBottom:10}}>⚠ {formErr}</div>}
        <SaveCancel label="Post" onCancel={()=>setShowForm(false)} onSave={handlePost}/>
      </div>
    );
  }

  // ── Board view ─────────────────────────────────────────────────────────────
  return (
    <div style={{paddingBottom:28}}>
      {/* Post buttons */}
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        <button onClick={()=>openForm("needed")}
          style={{flex:1,padding:"10px",borderRadius:10,border:`1px solid ${C.border}`,background:C.surf,color:C.text,fontSize:12,fontWeight:600,cursor:"pointer"}}>
          + Need a Sub
        </button>
        <button onClick={()=>openForm("available")}
          style={{flex:1,padding:"10px",borderRadius:10,border:`1px solid ${C.border}`,background:C.surf,color:C.text,fontSize:12,fontWeight:600,cursor:"pointer"}}>
          + I Can Sub
        </button>
      </div>

      {/* Filters */}
      <div style={{display:"flex",gap:5,marginBottom:8,flexWrap:"wrap"}}>
        {[["all","All"],["needed","Need Sub"],["available","Can Sub"]].map(([id,label])=>(
          <FBtn key={id} label={label} active={filter===id} onClick={()=>setFilter(id)}/>
        ))}
      </div>
      <div style={{display:"flex",gap:5,marginBottom:16,overflowX:"auto",scrollbarWidth:"none",paddingBottom:2}}>
        <FBtn label="All Divs" active={divFilter==="All"} onClick={()=>setDivFilter("All")}/>
        {DIVS.map(d=><FBtn key={d} label={d} active={divFilter===d} color={DIVC[d]} onClick={()=>setDivFilter(d)}/>)}
      </div>

      {/* Posts */}
      {visible.length === 0 && (
        <div style={{textAlign:"center",padding:"32px 0",color:C.muted,fontSize:13}}>
          {posts.length === 0 ? "No posts yet. Be the first to post!" : "No posts match this filter."}
        </div>
      )}

      {visible.map(post => {
        const isFilled = post.status === "filled";
        const mine     = isOwner(post);
        const divColor = DIVC[post.div] || C.gold;
        return (
          <div key={post.id} style={{background:C.surf,borderRadius:12,border:`1px solid ${isFilled?C.light+"44":C.border}`,padding:"13px 15px",marginBottom:10,opacity:isFilled?0.65:1}}>
            {/* Header row */}
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:7,minWidth:0}}>
                <span style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",
                  color:post.type==="needed"?C.orange:C.green,
                  background:post.type==="needed"?`${C.orange}18`:`${C.green}18`,
                  padding:"2px 7px",borderRadius:4,flexShrink:0}}>
                  {post.type==="needed"?"Need Sub":"Can Sub"}
                </span>
                {post.div && post.div!=="Any" && (
                  <span style={{fontSize:9,fontWeight:700,color:divColor,background:`${divColor}18`,padding:"2px 7px",borderRadius:4,flexShrink:0,textTransform:"uppercase",letterSpacing:"0.5px"}}>{post.div}</span>
                )}
                {isFilled && <span style={{fontSize:9,fontWeight:700,color:C.muted,background:`${C.muted}18`,padding:"2px 7px",borderRadius:4,flexShrink:0,textTransform:"uppercase",letterSpacing:"0.5px"}}>Filled</span>}
              </div>
              <span style={{fontSize:10,color:C.light,flexShrink:0}}>{post.ts}</span>
            </div>

            {/* Name + team */}
            <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:2}}>{post.name}</div>
            {post.teamNote && <div style={{fontSize:12,color:C.muted,marginBottom:4}}>{post.teamNote}</div>}

            {/* Date */}
            <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:C.text,marginBottom:post.position||post.note?6:0}}>
              <span style={{fontSize:13}}>📅</span>{post.date}
            </div>

            {/* Position */}
            {post.position && (
              <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:C.muted,marginBottom:post.note?4:0}}>
                <span style={{fontSize:13}}>🏐</span>{post.position}
              </div>
            )}

            {/* Note */}
            {post.note && (
              <div style={{fontSize:12,color:C.muted,lineHeight:1.5,marginTop:6,paddingTop:6,borderTop:`1px solid ${C.border}`}}>
                {post.note}
              </div>
            )}

            {/* Actions — only mine */}
            {mine && (
              <div style={{display:"flex",gap:6,marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
                <button onClick={()=>toggleFilled(post.id)}
                  style={{flex:1,padding:"6px",borderRadius:8,border:`1px solid ${C.border}`,background:"none",fontSize:11,fontWeight:600,cursor:"pointer",color:isFilled?C.green:C.muted}}>
                  {isFilled?"↩ Reopen":"✓ Mark Filled"}
                </button>
                <button onClick={()=>deletePost(post.id)}
                  style={{flex:1,padding:"6px",borderRadius:8,border:`1px solid ${C.red}30`,background:"none",fontSize:11,fontWeight:600,cursor:"pointer",color:C.red}}>
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const BOTTOM_TABS = [
  {id:"home",     label:"Home"},
  {id:"schedule", label:"Schedule"},
  {id:"teams",    label:"Teams"},
  {id:"subs",     label:"Subs"},
  {id:"me",       label:"Me"},
];

const PAGE_TITLE = {schedule:"Schedule",teams:"Teams & Standings",bracket:"Tournament",info:"League Info",announcements:"Announcements",me:"My Profile",admin:"Admin",subs:"Subs Board",about:"About"};

// ─── Root ─────────────────────────────────────────────────────────────────────
function AppInner() {
  const [tab,     setTab]     = useState("home");
  const [drawer,  setDrawer]  = useState(false);
  const [games,   setGames]   = useState(GAMES_INIT);
  const [teams,   setTeams]   = useState(TEAMS_INIT);
  const [info,    setInfo]    = useState(INFO_INIT);
  const [refMode,   setRefMode]   = useState(() => sessionStorage.getItem("fp_ref") === "1");
  const [adminMode, setAdminMode] = useState(() => sessionStorage.getItem("fp_admin") === "1");
  const [editId,  setEditId]  = useState(null);
  const [profile, setProfile] = useState(null);
  const [bracket, setBracket] = useState(BRACKET_INIT);

  const updateBracket = (id, u) => {
    setBracket(p => {
      const next = p.map(m => m.id===id ? {...m,...u} : m);
      storageSet("fp_bracket", JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    const p  = loadLocal("fp_profile");
    const t  = loadLocal("fp_teams");
    const g  = loadLocal("fp_games");
    const a  = loadLocal("fp_info_announcements");
    const br = loadLocal("fp_bracket");
    const sb = loadLocal(SUBS_STORAGE_KEY);
    if (p  && typeof p === "object" && !Array.isArray(p)) setProfile(p);
    if (Array.isArray(t)  && t.length  > 0) setTeams(t);
    if (Array.isArray(g)  && g.length  > 0) setGames(g);
    if (Array.isArray(a)  && a.length  > 0) setInfo(prev => ({...prev, announcements: a}));
    if (Array.isArray(br) && br.length > 0) setBracket(br);
  }, []);

  const enableRef   = () => { setRefMode(true);  try { sessionStorage.setItem("fp_ref","1");   } catch(e){} };
  const disableRef  = () => { setRefMode(false); try { sessionStorage.removeItem("fp_ref");    } catch(e){} setEditId(null); };
  const enableAdmin = () => { setAdminMode(true); try { sessionStorage.setItem("fp_admin","1"); } catch(e){} };
  const disableAdmin= () => { setAdminMode(false);try { sessionStorage.removeItem("fp_admin"); } catch(e){} };

  const updateGame = (id,u) => { setGames(p=>p.map(g=>g.id===id?{...g,...u}:g)); setEditId(null); };
  const updateTeam = (id,u) => setTeams(p=>p.map(t=>t.id===id?{...t,...u}:t));
  const updateInfo = (key,val) => setInfo(p=>({...p,[key]:val}));
  const standings  = calcStandings(games, teams);
  const myTeamIds = profile?.teamIds || (profile?.teamId ? [profile.teamId] : []);
  // refMode = score editing only; adminMode = full editing; either enables game card edit
  const canEditScores = refMode || adminMode;
  const canEditAll    = adminMode;
  const gp         = {games,teams,refMode:canEditScores,editId,setEditId,updateGame,myTeamIds};
  const isHome     = tab === "home";

  const screens = {
    schedule:      <ScheduleTab {...gp}/>,
    teams:         <TeamsStandingsTab standings={standings} refMode={canEditAll} updateTeam={updateTeam} myTeamIds={myTeamIds}/>,
    bracket:       <BracketTab teams={teams} myTeamIds={myTeamIds} bracket={bracket} updateBracket={updateBracket}/>,
    info:          <InfoTab info={info} updateInfo={updateInfo} refMode={canEditAll}/>,
    announcements: <AnnouncementsTab announcements={info.announcements}/>,
    me:            <ProfileScreen profile={profile} setProfile={setProfile} teams={teams} games={games} standings={standings} setTab={setTab}/>,
    admin:         <AdminScreen games={games} setGames={setGames} teams={teams} setTeams={setTeams} info={info} setInfo={setInfo} bracket={bracket} setBracket={setBracket} adminMode={adminMode}/>,
    subs:          <SubsBoard profile={profile} teams={teams}/>,
    about:         <AboutScreen/>,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        *,*::before,*::after{-webkit-tap-highlight-color:transparent;box-sizing:border-box;margin:0;padding:0;}
        html,body,#root{height:100%;background:${C.bg};}
        body{overscroll-behavior:none;}
        input:focus,textarea:focus{outline:none!important;border-color:${C.gold}!important;}
        ::-webkit-scrollbar{display:none;}
        scrollbar-width:none;
      `}</style>

      <Drawer open={drawer} onClose={()=>setDrawer(false)} setTab={setTab}
        refMode={refMode} adminMode={adminMode}
        enableRef={enableRef} disableRef={disableRef}
        enableAdmin={enableAdmin} disableAdmin={disableAdmin}
        setEditId={setEditId}/>

      <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:C.bg,width:"100%",height:"100dvh",display:"flex",flexDirection:"column",overflow:"hidden"}}>

        {/* Safe area top */}
        <div style={{background:C.navy,height:"env(safe-area-inset-top,0px)",flexShrink:0}}/>

        {/* Top bar */}
        <div style={{background:C.navy,height:isHome?64:56,flexShrink:0,display:"flex",alignItems:"center",paddingLeft:14,paddingRight:14,position:"relative",borderBottom:`1px solid ${C.border}`}}>
          {isHome&&<div style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${C.gold2},${C.gold},${C.gold2},transparent)`}}/>}

          <button onClick={()=>setDrawer(true)} style={{width:44,height:44,borderRadius:"50%",background:"#ffffff0a",border:`1px solid ${C.border}`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,flexShrink:0}}>
            <span style={{width:15,height:1.5,background:C.text,borderRadius:2,display:"block"}}/>
            <span style={{width:15,height:1.5,background:C.text,borderRadius:2,display:"block"}}/>
            <span style={{width:15,height:1.5,background:C.text,borderRadius:2,display:"block"}}/>
          </button>

          <div style={{flex:1,textAlign:"center"}}>
            {isHome
              ?<div style={{display:"inline-flex",alignItems:"center",gap:9}}>
                <svg width="22" height="22" viewBox="0 0 200 200" fill="none" opacity="0.9">
                  <circle cx="100" cy="100" r="93" stroke={C.gold} strokeWidth="10"/>
                  <path d="M7 100 C35 52 65 32 100 100 C135 168 165 148 193 100" stroke={C.gold} strokeWidth="8" fill="none"/>
                  <path d="M7 100 C35 148 65 168 100 100 C135 32 165 52 193 100" stroke={C.gold} strokeWidth="8" fill="none"/>
                </svg>
                <div>
                  <div style={{fontSize:18,fontWeight:700,color:C.text,lineHeight:1,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"3px",textTransform:"uppercase"}}>FAIRPLAY</div>
                  <div style={{fontSize:10,fontWeight:600,color:C.gold,letterSpacing:"3.5px",textTransform:"uppercase",lineHeight:1,marginTop:2}}>VOLLEYBALL</div>
                </div>
              </div>
              :<div style={{fontSize:15,fontWeight:700,color:C.text,fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:"1.5px",textTransform:"uppercase"}}>{PAGE_TITLE[tab]||"Fairplay"}</div>
            }
          </div>

          <button onClick={()=>setTab("me")} style={{width:44,height:44,borderRadius:"50%",border:"none",cursor:"pointer",background:tab==="me"?`${C.gold}22`:"#ffffff0a",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            {profile?.name
              ?<div style={{width:28,height:28,borderRadius:"50%",background:`${C.gold}33`,border:`1.5px solid ${C.gold}88`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:C.gold,fontFamily:"'Barlow Condensed',sans-serif"}}>
                {profile.name.charAt(0).toUpperCase()}
              </div>
              :<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tab==="me"?C.gold:C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            }
          </button>
        </div>

        {refMode&&!adminMode&&<div style={{background:"#001a0d",borderBottom:`1px solid ${C.green}33`,padding:"7px 16px",fontSize:12,color:"#4ade80",fontWeight:500,flexShrink:0,display:"flex",alignItems:"center",gap:8}}>
          <span>🟢</span> Ref Mode — score editing enabled
        </div>}
        {adminMode&&<div style={{background:"#1a1000",borderBottom:`1px solid ${C.gold}33`,padding:"7px 16px",fontSize:12,color:C.gold,fontWeight:500,flexShrink:0,display:"flex",alignItems:"center",gap:8}}>
          <span>🔐</span> Admin Mode — full editing enabled
        </div>}

        {/* Content */}
        <div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch"}}>
          {isHome
            ?<HomeScreen setTab={setTab} info={info} profile={profile} games={games} teams={teams}/>
            :<div style={{padding:"16px 16px 8px"}}>{screens[tab] || <div style={{padding:"32px 0",textAlign:"center",color:C.muted,fontSize:13}}>Page not found</div>}</div>
          }
        </div>

        {/* Bottom nav */}
        <div style={{background:C.navy,borderTop:`1px solid ${C.border}`,display:"flex",alignItems:"stretch",flexShrink:0,paddingBottom:"env(safe-area-inset-bottom,0px)",position:"relative"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${C.gold2}60,transparent)`}}/>
          {BOTTOM_TABS.map(t=>{
            const active=tab===t.id;
            return (
              <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,paddingTop:10,paddingBottom:10,minHeight:62,position:"relative"}}>
                {active&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:20,height:2,background:C.gold,borderRadius:"0 0 2px 2px"}}/>}
                {NAV_ICONS[t.id](active)}
                <span style={{fontSize:10,fontWeight:active?600:400,color:active?C.gold:C.muted,letterSpacing:"0.3px"}}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default function App() {
  return <ErrorBoundary><AppInner/></ErrorBoundary>;
}
