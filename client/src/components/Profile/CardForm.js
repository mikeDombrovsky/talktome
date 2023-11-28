const CardForm = ({ message, handleSubmit, setMessage, btn_text }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <p>Choose role, type message below and push the button</p>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="role"
          id="talktome"
          value="talktome"
          required
        />
        <label class="form-check-label" for="talktome">
          I need to talk
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="role"
          id="ihearyou"
          value="ihearyou"
        />
        <label class="form-check-label" for="ihearyou">
          I want to listen
        </label>
      </div>
      <input
        type="text"
        name="message"
        placeholder="type your message here"
        className="form-control my-3"
        required
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button class=" btn btn-success">{btn_text}</button>
    </form>
  );
};

export default CardForm;
