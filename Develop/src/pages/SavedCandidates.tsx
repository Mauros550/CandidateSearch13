import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.login}>
              <img src={candidate.avatar_url} alt={candidate.login} width={50} />
              <h2>{candidate.name || candidate.login}</h2>
              <p>Location: {candidate.location || 'Not available'}</p>
              <p>Email: {candidate.email || 'Not available'}</p>
              <p>Company: {candidate.company || 'Not available'}</p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates have been accepted yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
