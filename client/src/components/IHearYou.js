import { useState, useEffect } from "react";

const IHearYou = () => {
  const [offset, setOffset] = useState(0);
  const [cards, setCards] = useState([]);

  const next = () => {
    if (offset < cards.length) {
      setOffset(offset + 24);
    }
  };

  const prev = () => {
    if (offset > 0) {
      setOffset(offset - 24);
    }
  };

  useEffect(() => {
    const fetchCards = async () => {};
    fetchCards();
  }, [offset]);

  return (
    <>
      <div className="container">
        <form class="form-inline my-2 my-lg-0 ">
          <input
            class="form-control mr-sm-2 w-50"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <hr />
        <h1>I hear you cards</h1>
        <hr />
        <div className="text-center my-5">
          <button class="btn btn-success m-2 m-sm-1" onClick={prev}>
            prev
          </button>
          <span className="m-2 m-sm-1">
            {offset} - {offset + 24}
          </span>
          <button class="btn btn-success m-2 m-sm-1" onClick={next}>
            next
          </button>
        </div>
      </div>
    </>
  );
};

export default IHearYou;
