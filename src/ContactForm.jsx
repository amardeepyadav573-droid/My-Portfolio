import { useState } from "react";
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// Messages are delivered to your inbox through Web3Forms (free, no backend needed).
// The access key is tied to YOUR email on web3forms.com, so the email address
// itself never appears in the website code. See README -> "Contact form setup".
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const ENDPOINT = "https://api.web3forms.com/submit";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const empty = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [feedback, setFeedback] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (values.name.trim().length < 2) er.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.email.trim())) er.email = "Please enter a valid email.";
    if (values.message.trim().length < 10) er.message = "Message should be at least 10 characters.";
    return er;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    // Honeypot: real users never fill this hidden field, bots usually do.
    if (e.target.elements.botcheck?.checked) return;

    if (!ACCESS_KEY) {
      setStatus("error");
      setFeedback("Contact form is not configured yet (missing access key).");
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New portfolio message from ${values.name.trim()}`,
          from_name: "Portfolio Contact Form",
          name: values.name.trim(),
          email: values.email.trim(), // used as reply-to, so you can just hit Reply
          message: values.message.trim(),
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFeedback("Thanks! Your message has been sent. I'll get back to you soon.");
        setValues(empty);
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setFeedback(
        err instanceof TypeError
          ? "Network error. Please check your connection and try again."
          : `Could not send message: ${err.message}`
      );
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      {/* honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hp"
        aria-hidden="true"
      />

      <div className="field">
        <label htmlFor="cf-name">Name</label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={values.name}
          onChange={onChange}
          aria-invalid={!!errors.name}
          maxLength={80}
        />
        {errors.name && <small className="field-error">{errors.name}</small>}
      </div>

      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={onChange}
          aria-invalid={!!errors.email}
          maxLength={120}
        />
        {errors.email && <small className="field-error">{errors.email}</small>}
      </div>

      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          rows="5"
          placeholder="How can I help you?"
          value={values.message}
          onChange={onChange}
          aria-invalid={!!errors.message}
          maxLength={2000}
        />
        {errors.message && <small className="field-error">{errors.message}</small>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : <>Send Message <FaPaperPlane /></>}
      </button>

      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className="form-msg success"><FaCheckCircle /> {feedback}</p>
        )}
        {status === "error" && (
          <p className="form-msg error"><FaExclamationCircle /> {feedback}</p>
        )}
      </div>
    </form>
  );
}
