import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { getUsers } from './api/api';
import successImage from './assets/success-image.svg';
import './App.css';

const Card = lazy(() => import('./components/Card/Card'));
const Form = lazy(() => import('./components/Form/Form'));

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [visibleCards, setVisibleCards] = useState(6);
  const [showHideButton, setShowHideButton] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const usersSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, formSubmitted]);

  async function fetchUsers() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const data = await getUsers(currentPage, 6);
      if (data.users.length < 6) {
        setHasMore(false);
      }
      setUsers(prev => [...prev, ...data.users]);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleShowMore = () => {
    if (!hasMore) return;
    setVisibleCards(prev => prev + 6);
    setShowHideButton(true);
    if (currentPage * 6 <= visibleCards) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleHide = () => {
    setVisibleCards(6);
    setShowHideButton(false);
    setCurrentPage(1);
  };

  const handleFormSubmit = () => {
    setFormSubmitted(true);
    setCurrentPage(1);
    setUsers([]);
    fetchUsers();
  };

  const handleBackToUsers = () => {
    setFormSubmitted(false);
  };

  return (
    <div className="app">
      <Header />
      {!formSubmitted && (
        <>
          <Banner onSignUpClick={() => formSectionRef.current.scrollIntoView({ behavior: 'smooth' })} />
          <h2 className="section-title" ref={usersSectionRef}>Working with GET request</h2>
          <section className="users-section" id="users">
            <Suspense fallback={<div>Loading...</div>}>
              {users.slice(0, visibleCards).map((user, index) => (
                <Card
                  key={`${user.id}-${index}`}
                  avatarUrl={user.photo}
                  name={user.name}
                  position={user.position}
                  email={user.email}
                  phone={user.phone}
                />
              ))}
            </Suspense>
          </section>
          {hasMore && (
            <div className="show-more-container">
              <button onClick={handleShowMore} className="show-more-button">
                Show more
              </button>
            </div>
          )}
          {showHideButton && (
            <div className="hide-more-container">
              <button onClick={handleHide} className="hide-more-button">
                Hide
              </button>
            </div>
          )}
          <h2 className="section-title" ref={formSectionRef} id="register">Working with POST request</h2>
          <Suspense fallback={<div>Loading form...</div>}>
            <Form onSuccessfulSubmit={handleFormSubmit} />
          </Suspense>
        </>
      )}
      {formSubmitted && (
        <div className="success-message">
          <img src={successImage} alt="Success" />
          <h2>User successfully registered</h2>
          <button className="back-button" onClick={handleBackToUsers}>
            Back
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}

function Banner({ onSignUpClick }) {
  return (
    <div className="main-banner">
      <div className="banner-content">
        <h1>Test assignment for front-end developer</h1>
        <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
        <button className="sign-up-button" onClick={onSignUpClick}>Sign up</button>
      </div>
    </div>
  );
}

export default App;
