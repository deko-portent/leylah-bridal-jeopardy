'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronRight, Crown, Heart, Minus, Pencil, Plus, RotateCcw, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Clue = { id: string; value: number; prompt: string; answer: string };
type Category = { name: string; kicker: string; clues: Clue[] };
type Team = { name: string; score: number };

const categories: Category[] = [
  { name: 'Leylah 101', kicker: 'The essentials', clues: [
    { id: 'l-100', value: 100, prompt: "What is Leylah's favorite chocolate?", answer: 'Galaxy' },
    { id: 'l-200', value: 200, prompt: "What birthday appears on Leylah's ID?", answer: 'January 1, 2003' },
    { id: 'l-300', value: 300, prompt: "What is Leylah's aunt's full name?", answer: 'Amal Hafez' },
    { id: 'l-400', value: 400, prompt: "What are the names of Leylah's brother's two sons?", answer: 'Samy and Zein' },
    { id: 'l-500', value: 500, prompt: "What is Leylah's exact go-to coffee order?", answer: 'An iced latte with 20 g of honey, 80% skimmed milk and 20% oat milk' },
  ]},
  { name: 'Love Story', kicker: 'Meet-cute to forever', clues: [
    { id: 's-100', value: 100, prompt: 'When did Leylah and Tahoun first start dating?', answer: 'Grade 11' },
    { id: 's-200', value: 200, prompt: 'Where did Leylah take her first trip with Tahoun?', answer: 'Madrid' },
    { id: 's-300', value: 300, prompt: 'Where will Leylah live after she gets married?', answer: 'Villette, Cairo' },
    { id: 's-400', value: 400, prompt: 'How long after getting married does Leylah want to wait before having a child?', answer: 'One year' },
    { id: 's-500', value: 500, prompt: 'Name all three honeymoon destinations.', answer: 'The Maldives, Singapore and Bali' },
  ]},
  { name: 'Her Favorites', kicker: 'Taste test', clues: [
    { id: 'f-100', value: 100, prompt: "What is Leylah's favorite color?", answer: 'Leylah reveals the answer!' },
    { id: 'f-200', value: 200, prompt: 'What song will always get Leylah on the dance floor?', answer: 'Leylah reveals the answer!' },
    { id: 'f-300', value: 300, prompt: 'What is her comfort movie or TV show?', answer: 'Leylah reveals the answer!' },
    { id: 'f-400', value: 400, prompt: 'What is her dream vacation destination?', answer: 'Leylah reveals the answer!' },
    { id: 'f-500', value: 500, prompt: 'Name her ultimate celebrity dinner guest.', answer: 'Leylah reveals the answer!' },
  ]},
  { name: 'Inner Circle', kicker: 'Family & friends', clues: [
    { id: 't-100', value: 100, prompt: "When is Tahoun's birthday?", answer: 'July 20' },
    { id: 't-200', value: 200, prompt: "Name one of Tahoun's parents.", answer: 'Amr' },
    { id: 't-300', value: 300, prompt: 'Where in the United States did Amani live?', answer: 'Texas' },
    { id: 't-400', value: 400, prompt: 'How many times did Karim come to Leeds?', answer: 'Three times' },
    { id: 't-500', value: 500, prompt: "Which story involving Leylah's friends makes everyone laugh the hardest?", answer: 'Leylah reveals the answer!' },
  ]},
  { name: 'Wedding Bells', kicker: 'November 6', clues: [
    { id: 'w-100', value: 100, prompt: 'On what date is Leylah getting married?', answer: 'November 6' },
    { id: 'w-200', value: 200, prompt: "What three colors make up Leylah's wedding palette?", answer: 'Brown, burnt orange and olive green' },
    { id: 'w-300', value: 300, prompt: 'Who is more likely to cry first during the ceremony?', answer: 'Leylah reveals the answer!' },
    { id: 'w-400', value: 400, prompt: 'What will the couple do first on their honeymoon?', answer: 'Leylah reveals the answer!' },
    { id: 'w-500', value: 500, prompt: 'In three words, what will married Leylah be like?', answer: 'Leylah picks her favorite answer!' },
  ]},
];

const finalClue = { prompt: 'What three things would Leylah bring to a deserted island?', answer: 'Leylah chooses the closest—or funniest—answer!' };

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([{ name: 'Team Bride', score: 0 }, { name: 'Team Besties', score: 0 }]);
  const [used, setUsed] = useState<string[]>([]);
  const [active, setActive] = useState<Clue | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [editingTeam, setEditingTeam] = useState<number | null>(null);
  const totalClues = categories.reduce((sum, category) => sum + category.clues.length, 0);
  const progress = Math.round((used.length / totalClues) * 100);
  const winner = useMemo(() => [...teams].sort((a, b) => b.score - a.score)[0], [teams]);

  function chooseClue(clue: Clue) { if (!used.includes(clue.id)) { setActive(clue); setShowAnswer(false); setIsFinal(false); } }
  function closeClue() { if (active && !used.includes(active.id)) setUsed((current) => [...current, active.id]); setActive(null); setShowAnswer(false); }
  function changeScore(teamIndex: number, amount: number) {
    setTeams((current) => current.map((team, index) => index === teamIndex ? { ...team, score: team.score + amount } : team));
    if (active) closeClue();
  }
  function resetGame() { setUsed([]); setTeams((current) => current.map((team) => ({ ...team, score: 0 }))); setActive(null); setIsFinal(false); setShowAnswer(false); }

  return (
    <main className="min-h-screen px-3 pb-10 pt-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        <header className="game-header">
          <div className="brand-mark" aria-hidden="true"><Heart fill="currentColor" /></div>
          <div className="min-w-0 flex-1"><p className="eyebrow">The bridal edition</p><h1>Who Knows Leylah Best?</h1></div>
          <div className="header-actions">
            <span className="date-pill"><Sparkles /> November 6</span>
            <Button variant="ghost" className="soft-button" onClick={() => setShowRules(true)}>How to play</Button>
            <Button variant="ghost" size="icon" className="soft-button" aria-label="Reset game" onClick={resetGame}><RotateCcw /></Button>
          </div>
        </header>

        <section className="score-row" aria-label="Team scores">
          {teams.map((team, index) => (
            <article className="score-card" key={index}>
              <div className={`team-dot team-dot-${index + 1}`} />
              <div className="flex-1">
                {editingTeam === index ? (
                  <input autoFocus className="team-input" value={team.name} onChange={(event) => setTeams((current) => current.map((item, i) => i === index ? { ...item, name: event.target.value } : item))} onBlur={() => setEditingTeam(null)} onKeyDown={(event) => event.key === 'Enter' && setEditingTeam(null)} aria-label={`Rename ${team.name}`} />
                ) : <button className="team-name" onClick={() => setEditingTeam(index)}>{team.name} <Pencil /></button>}
                <p className="score-value">{team.score.toLocaleString()}</p>
              </div>
              <div className="mini-score-actions">
                <button aria-label={`Subtract 100 points from ${team.name}`} onClick={() => changeScore(index, -100)}><Minus /></button>
                <button aria-label={`Add 100 points to ${team.name}`} onClick={() => changeScore(index, 100)}><Plus /></button>
              </div>
            </article>
          ))}
          <div className="progress-card"><div><span>Board progress</span><strong>{used.length}/{totalClues}</strong></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div></div>
        </section>

        <section className="board-shell" aria-label="Jeopardy game board">
          <div className="board-grid">
            {categories.map((category) => (
              <div className="category-column" key={category.name}>
                <header className="category-header"><span>{category.kicker}</span><h2>{category.name}</h2></header>
                {category.clues.map((clue) => {
                  const isUsed = used.includes(clue.id);
                  return <button className={`clue-tile ${isUsed ? 'used' : ''}`} key={clue.id} disabled={isUsed} onClick={() => chooseClue(clue)} aria-label={`${category.name} for ${clue.value} points${isUsed ? ', already played' : ''}`}>{isUsed ? <Check /> : <><span>$</span>{clue.value}</>}</button>;
                })}
              </div>
            ))}
          </div>
        </section>

        <footer className="game-footer"><p><span className="live-dot" /> Pick a square to begin</p><Button className="final-button" onClick={() => { setIsFinal(true); setActive(null); setShowAnswer(false); }}>Final Jeopardy <ChevronRight /></Button></footer>
      </div>

      {(active || isFinal) && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={isFinal ? 'Final Jeopardy' : `${active?.value} point clue`}>
          <div className={`clue-modal ${isFinal ? 'final-modal' : ''}`}>
            <button className="close-button" onClick={() => { setActive(null); setIsFinal(false); setShowAnswer(false); }} aria-label="Close clue"><X /></button>
            <div className="modal-topline">{isFinal ? <><Crown /> Final Jeopardy</> : <><Sparkles /> {active?.value} points</>}</div>
            <p className="modal-label">{showAnswer ? 'Leylah says…' : 'Your clue'}</p>
            <h2>{showAnswer ? (isFinal ? finalClue.answer : active?.answer) : (isFinal ? finalClue.prompt : active?.prompt)}</h2>
            {!showAnswer ? <Button className="reveal-button" onClick={() => setShowAnswer(true)}>Reveal answer <ChevronRight /></Button> : isFinal ? (
              <div className="winner-panel"><span>Current leader</span><strong>{winner.name}</strong><p>{winner.score.toLocaleString()} points</p><Button className="reveal-button" onClick={() => { setIsFinal(false); setShowAnswer(false); }}>Back to board</Button></div>
            ) : (
              <div className="award-panel"><p>Who got it right?</p><div className="award-buttons">{teams.map((team, index) => <Button key={index} onClick={() => changeScore(index, active?.value ?? 0)}><Plus /> {team.name}</Button>)}</div><Button variant="ghost" className="no-score" onClick={closeClue}>Nobody—mark as played</Button></div>
            )}
          </div>
        </div>
      )}

      {showRules && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="How to play">
          <div className="rules-modal">
            <button className="close-button" onClick={() => setShowRules(false)} aria-label="Close rules"><X /></button>
            <div className="rules-icon"><Heart fill="currentColor" /></div><p className="eyebrow">Welcome, besties</p><h2>Who really knows the bride?</h2>
            <ol>
              <li><span>1</span><div><strong>Split into two teams</strong><p>Tap a team name to rename it.</p></div></li>
              <li><span>2</span><div><strong>Choose a clue</strong><p>Take turns picking a category and point value.</p></div></li>
              <li><span>3</span><div><strong>Leylah has the final say</strong><p>Reveal the answer, then award the points.</p></div></li>
            </ol>
            <Button className="start-button" onClick={() => setShowRules(false)}>Start the game <Sparkles /></Button><p className="host-note">Host tip: Leylah can reveal the personal answers live for maximum fun.</p>
          </div>
        </div>
      )}
    </main>
  );
}
