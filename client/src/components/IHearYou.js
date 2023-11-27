import { useState } from "react";

const IHearYou = () => {
  const [offset, setOffset] = useState(0);

  const next = () => {
    setOffset(offset + 25);
  };

  const prev = () => {
    if (offset > 0) {
      setOffset(offset - 25);
    }
  };
  return (
    <>
      <div className="container">
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <hr />
        <h1>I Hear You cards</h1>
        <div>
          <button class="btn btn-outline-success" onClick={prev}>
            prev
          </button>
          <button class="btn btn-outline-success" onClick={next}>
            next
          </button>
        </div>
      </div>
    </>
  );
};

export default IHearYou;
