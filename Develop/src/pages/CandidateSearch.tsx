import './CandidateSearch.css';
import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';



const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    return JSON.parse(localStorage.getItem('savedCandidates') || '[]');
  });

  
  useEffect(() => {
    const fetchCandidates = async () => {
      const users = await searchGithub();
      if (users.length > 0) {
        loadCandidate(users[0].login);
      }
    };
    fetchCandidates();
  }, []);

  
  const loadCandidate = async (username: string) => {
    const userData = await searchGithubUser(username);
    setCurrentCandidate(userData);
  };

  
  const saveCandidate = () => {
    if (currentCandidate) {
      const updatedList = [...savedCandidates, currentCandidate];
      setSavedCandidates(updatedList);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedList));
    }
    getNextCandidate();
  };

  
  const getNextCandidate = async () => {
    if (candidates.length > 1) {
      
      const newCandidates = candidates.slice(1);
      setCandidates(newCandidates);
      loadCandidate(newCandidates[0].login);
    } else {
      
      const newUsers = await searchGithub();
      if (newUsers.length > 0) {
        setCandidates(newUsers);
        loadCandidate(newUsers[0].login);
      } else {
        setCurrentCandidate(null);
      }
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.login} width={100} />
          <h2>{currentCandidate.name || currentCandidate.login}</h2>
          <p>Username: {currentCandidate.login}</p>
          <p>Location: {currentCandidate.location || 'Not available'}</p>
          <p>Email: {currentCandidate.email || 'Not available'}</p>
          <p>Company: {currentCandidate.company || 'Not available'}</p>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
          <br />
          <button onClick={saveCandidate}>+</button>
          <button onClick={getNextCandidate}>-</button>
        </div>
      ) : (
        <p>No more candidates available</p>
      )}
    </div>
  );
};


export default CandidateSearch;
