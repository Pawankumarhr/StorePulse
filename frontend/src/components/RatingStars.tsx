interface RatingStarsProps { value: number | null; onChange?: (value: number) => void; label?: string }

export function RatingStars({ value, onChange, label = 'Rating' }: RatingStarsProps) {
  return <div className="stars" aria-label={`${label}: ${value ?? 0} out of 5`} role={onChange ? 'radiogroup' : undefined}>{[1, 2, 3, 4, 5].map((star) => onChange ? <button key={star} className={star <= (value ?? 0) ? 'star selected' : 'star'} type="button" role="radio" aria-checked={star === value} aria-label={`${star} out of 5`} onClick={() => onChange(star)}>★</button> : <span key={star} className={star <= (value ?? 0) ? 'star selected' : 'star'}>★</span>)}</div>
}
