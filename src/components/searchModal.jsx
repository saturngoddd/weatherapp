import React, { useState } from "react";
import { Transition } from "react-transition-group";
import "./searchModal.css";

export const SearchModal = ({
  setCity,
  setIsSearchOpen,
  isSearchOpen,
  isCityFound,
}) => {
  const [value, setValue] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    setCity(value);
    setValue("");
  };
  const onWrapperClick = (event) => {
    if (event.target.classList.contains("modal-wrapper"))
      setIsSearchOpen(false);
  };
  return (
    <>
      <Transition in={isSearchOpen} timeout={350} unmountOnExit={true}>
        {(state) => (
          <div className={`modal modal--${state}`}>
            <div className="modal-wrapper" onClick={onWrapperClick}>
              <div className="modal-content">
                <form className="modal-search-content" onSubmit={handleClick}>
                  <input
                    onChange={(e) => setValue(e.currentTarget.value)}
                    value={value}
                    className="modal-search"
                    type="text"
                    placeholder="Search value..."
                  />
                  <button className="modal-search-button">Search</button>
                </form>
                {!isCityFound ? (
                  <p className="modal-error-message">
                    *no results for your request
                  </p>
                ) : null}
                <button
                  className="modal-close-button"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <img src="./icons/icon-close.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};
