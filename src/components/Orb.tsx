export function Orb({ listening, onToggle }: { listening: boolean; onToggle: () => void }) {
  return (
    <div className="orbwrap">
      <button
        className={'orb' + (listening ? ' listening' : '')}
        onClick={onToggle}
        aria-label={listening ? 'Stop listening' : 'Start voice input'}
        style={{ border: 'none', padding: 0 }}
      />
      {listening && (
        <div className="wavef" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => <i key={i} />)}
        </div>
      )}
    </div>
  );
}
