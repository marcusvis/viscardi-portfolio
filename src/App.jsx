import { useState, useEffect, useRef, useMemo } from 'react'
import { projects, publications, talks, skills } from './data'
import { fetchCounts, bumpReaction, firebaseReady } from './firebase'

const MINE_KEY = 'mv_mine_v1'
const LOCAL_COUNTS_KEY = 'mv_counts_v1'

function loadMine() {
  try { return new Set(JSON.parse(localStorage.getItem(MINE_KEY)) || []) }
  catch { return new Set() }
}
function saveMine(set) {
  try { localStorage.setItem(MINE_KEY, JSON.stringify([...set])) } catch {}
}

export default function App() {
  const [counts, setCounts] = useState(() => Object.fromEntries(projects.map((p) => [p.id, 0])))
  const [mine, setMine] = useState(loadMine)

  // Load tallies: from Firestore if configured, otherwise from localStorage so
  // the site still works in local dev before the config is pasted in.
  useEffect(() => {
    let alive = true
    if (firebaseReady) {
      fetchCounts()
        .then((c) => { if (alive) setCounts((prev) => ({ ...prev, ...c })) })
        .catch((e) => console.warn('Firestore read failed, using local counts.', e))
    } else {
      try {
        const local = JSON.parse(localStorage.getItem(LOCAL_COUNTS_KEY)) || {}
        setCounts((prev) => ({ ...prev, ...local }))
      } catch {}
    }
    return () => { alive = false }
  }, [])

  function react(id) {
    const has = mine.has(id)
    const delta = has ? -1 : 1
    const nextMine = new Set(mine)
    has ? nextMine.delete(id) : nextMine.add(id)
    const nextCounts = { ...counts, [id]: Math.max(0, (counts[id] || 0) + delta) }

    setMine(nextMine); saveMine(nextMine)
    setCounts(nextCounts)

    if (firebaseReady) {
      bumpReaction(id, delta).catch((e) => console.warn('Firestore write failed.', e))
    } else {
      try { localStorage.setItem(LOCAL_COUNTS_KEY, JSON.stringify(nextCounts)) } catch {}
    }
  }

  return (
    <>
      <Nav />
      <Hero />
      <Work counts={counts} mine={mine} onReact={react} />
      <Leaderboard counts={counts} />
      <About />
      <Publications />
      <Talks />
      <Skills />
      <Footer />
    </>
  )
}

function Nav() {
  return (
    <nav><div className="wrap">
      <div className="brand">Marcus Viscardi<span className="dot">.</span></div>
      <div className="navlinks">
        <a href="#work">Work</a>
        <a href="#interesting">Most clicked</a>
        <a href="#about">How I work</a>
        <a href="#pubs">Publications</a>
        <a href="#talks">Talks</a>
        <a href="#contact">Contact</a>
      </div>
    </div></nav>
  )
}

function Hero() {
  const helix = useMemo(() => {
    const W = 980, H = 360, n = 46, items = []
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * W
      const y1 = H / 2 + Math.sin(i * 0.5) * 70
      const y2 = H / 2 - Math.sin(i * 0.5) * 70
      const op = 0.2 + Math.abs(Math.sin(i * 0.5)) * 0.3
      items.push({ x, y1, y2, op })
    }
    return { W, H, items }
  }, [])

  return (
    <header className="hero"><div className="wrap">
      <svg className="strand" viewBox={`0 0 ${helix.W} ${helix.H}`} preserveAspectRatio="none" aria-hidden="true">
        {helix.items.map((d, i) => (
          <g key={i}>
            <line x1={d.x} y1={d.y1} x2={d.x} y2={d.y2} stroke="#3ec6a8" strokeWidth="1" opacity={d.op * 0.5} />
            <circle cx={d.x} cy={d.y1} r="2.4" fill="#3ec6a8" opacity={d.op} />
            <circle cx={d.x} cy={d.y2} r="2.4" fill="#5a8dff" opacity={d.op} />
          </g>
        ))}
      </svg>
      <div className="eyebrow">PhD · RNA biology · multiomics</div>
      <h1>from bench<br />to bioinformatics</h1>
      <p className="sub">I develop sequencing assays at the bench, then write the production pipelines that turn the reads into biology. PhD in RNA biology; currently working in multiomics.</p>
      <div className="tags">
        <span className="tag"><b>Nanopore</b> direct RNA-seq</span>
        <span className="tag"><b>Multiomic</b> library development</span>
        <span className="tag"><b>Nextflow</b> + AWS pipelines</span>
        <span className="tag"><b>Foundation models</b> on omics data</span>
      </div>
      <div className="cta">
        <a className="btn primary" href="#work">See the work →</a>
        <a className="btn" href="#contact">Get in touch</a>
      </div>
      <div className="legend">
        <span><i className="ld" style={{ background: 'var(--rna)' }}></i>RNA</span>
        <span><i className="ld" style={{ background: 'var(--dna)' }}></i>DNA</span>
        <span><i className="ld" style={{ background: 'var(--me)' }}></i>methylation</span>
        <span><i className="ld" style={{ background: 'var(--warm)' }}></i>tooling / infra</span>
      </div>
    </div></header>
  )
}

function Work({ counts, mine, onReact }) {
  return (
    <section id="work"><div className="wrap">
      <div className="sec-head"><h2>// the work</h2></div>
      <p className="lead">Click any project to open it. If something catches your eye, tap <span style={{ color: 'var(--warm)' }}>interesting</span>; the counts feed the leaderboard below.</p>
      <div>
        {projects.map((p) => (
          <ProjectCard key={p.id} p={p} count={counts[p.id] || 0} mine={mine.has(p.id)} onReact={onReact} />
        ))}
      </div>
      {!firebaseReady && (
        <p className="note">Local preview: reaction counts are stored in your browser until the Firebase config is added. Once it is, they persist in the shared database.</p>
      )}
    </div></section>
  )
}

function ProjectCard({ p, count, mine, onReact }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)
  const maxHeight = open ? (bodyRef.current ? bodyRef.current.scrollHeight : 1000) : 0

  return (
    <div className={`card${open ? ' open' : ''}`}>
      <div className="card-head" onClick={() => setOpen((o) => !o)}>
        <div className={`chan ${p.chan}`}></div>
        <div className="card-meta">
          <div className="card-kicker">{p.kicker}</div>
          <div className="card-title">{p.title}</div>
          <div className="card-one">{p.one}</div>
        </div>
        <div className="chev">›</div>
      </div>
      <div className="card-body" style={{ maxHeight }}>
        <div className="card-body-inner" ref={bodyRef}>
          {p.expand && <p><span className="expand">{p.expand}</span></p>}
          {p.body.map((t, i) => <p key={i}>{t}</p>)}
          <div className="pills">{p.pills.map((x) => <span className="pill" key={x}>{x}</span>)}</div>
          <div className="react">
            <button
              className={`reactbtn${mine ? ' on' : ''}`}
              onClick={(e) => { e.stopPropagation(); onReact(p.id) }}
            >
              <i className="ti ti-bulb"></i> interesting · <span className="ct">{count}</span>
            </button>
            <small>click to add yours</small>
          </div>
        </div>
      </div>
    </div>
  )
}

function Leaderboard({ counts }) {
  const sorted = [...projects].sort((a, b) => (counts[b.id] || 0) - (counts[a.id] || 0))
  const max = Math.max(1, ...sorted.map((p) => counts[p.id] || 0))
  return (
    <section id="interesting"><div className="wrap">
      <div className="sec-head"><h2>// what visitors find interesting</h2></div>
      <p className="lead">Live ranking, rebuilt from clicks.</p>
      <div className="board">
        {sorted.map((p, i) => (
          <div className="row" key={p.id}>
            <div className="rank">{i + 1}</div>
            <div className="rname">{p.title}</div>
            <div className="barwrap"><div className="bar" style={{ width: `${Math.round((counts[p.id] || 0) / max * 100)}%` }}></div></div>
            <div className="rcount">{counts[p.id] || 0}</div>
          </div>
        ))}
      </div>
    </div></section>
  )
}

function About() {
  return (
    <section id="about"><div className="wrap">
      <div className="sec-head"><h2>// how I work</h2></div>
      <div className="about-panel">
        <p className="about-hook">The work I'm proudest of has almost always been <span className="hl">collaborative</span>.</p>
        <p>I coached rugby at UCSC for five years and TA'd biochemistry for four quarters, and over the course of my PhD I became the person other folks came to when an experiment or a pipeline wasn't behaving. That role suits me. I like sitting down with someone, working out what's actually going wrong, and getting them unstuck.</p>
        <p>It's also why I'm looking for a team with some structure around it. The wet-and-dry-lab span I have is most useful in a room with other people: translating between the bench and the analysis, designing experiments together rather than alone. I'd rather contribute to something bigger than what I can hold by myself.</p>
        <div className="about-tl">
          <span className="tl"><b>5 years</b> coaching rugby</span>
          <span className="tl"><b>4 quarters</b> TA, biochemistry</span>
          <span className="tl"><b>3 years</b> the department's bioinformatics help desk</span>
        </div>
      </div>
    </div></section>
  )
}

function Publications() {
  return (
    <section id="pubs"><div className="wrap">
      <div className="sec-head"><h2>// publications</h2></div>
      <p className="lead">What each paper found, and what I did on it.</p>
      {publications.map((pub) => (
        <div className="pubcard" key={pub.title}>
          <div className="pubcard-top">
            <span className="venue-badge">{pub.venue}</span>
            <span className={`role-badge${pub.first ? ' first' : ''}`}>{pub.role}</span>
          </div>
          <div className="pubcard-title">{pub.title}</div>
          <div className="authors">
            {pub.authors.map(([name, self], i) => (
              <span key={name}>
                {i > 0 && ', '}
                {self ? <span className="self">{name}</span> : name}
              </span>
            ))}
          </div>
          <div className="pubrow"><span className="plab">Found</span><p>{pub.found}</p></div>
          <div className="pubrow"><span className="plab">My part</span><p>{pub.mine}</p></div>
          <a className="publink" href={pub.link} target="_blank" rel="noopener noreferrer">Read it →</a>
        </div>
      ))}
    </div></section>
  )
}

function Talks() {
  return (
    <section id="talks"><div className="wrap">
      <div className="sec-head"><h2>// talks &amp; presentations</h2></div>
      <p className="lead">Invited and selected presentations, 2018 to now.</p>
      <div className="timeline">
        {talks.map((t, i) => (
          <div className="tevent" key={i}>
            <span className="tdot"></span>
            <div className="tyear">{t.year}</div>
            <div className="tplace">{t.venue} <span className="city">· {t.city}</span>{t.type && <span className="ttype">{t.type}</span>}</div>
            <p className="ttopic">{t.topic}{t.note && <span className="tnote">{t.note}</span>}</p>
          </div>
        ))}
      </div>
    </div></section>
  )
}

function Skills() {
  return (
    <section id="skills"><div className="wrap">
      <div className="sec-head"><h2>// toolkit</h2></div>
      <p className="lead">What I actually reach for.</p>
      <div className="skills">
        {skills.map((s) => (
          <div className="skill" key={s.h}><h3>{s.h}</h3><p>{s.p}</p></div>
        ))}
      </div>
    </div></section>
  )
}

function Footer() {
  return (
    <footer id="contact"><div className="wrap">
      <div className="lead" style={{ color: 'var(--ink)' }}>Let's talk.</div>
      <p>Bay Area · wet + dry bioinformatics · open to solutions-engineering and translational roles.<br />
        <a href="mailto:marcus.viscardi@gmail.com">marcus.viscardi@gmail.com</a> &nbsp;·&nbsp;
        <a href="https://github.com/MViscardi-UCSC">GitHub</a> &nbsp;·&nbsp;
        <a href="https://www.linkedin.com/in/marcusviscardi/">LinkedIn</a></p>
    </div></footer>
  )
}
