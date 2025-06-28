import { useState } from "react";
import emailjs from "emailjs-com";
import styles from './Report.module.css';

export default function Report({uName, uEmail}) {
  const [form, setForm] = useState({
    name: uName,
    email: uEmail,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send("kyayaarshahid", "template_918o19q", form, "VMqybVryyKPdkvF0c")
      .then(
        () => {
          alert("Report sent successfully!");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          alert("Failed to send. Try again later.");
          console.error(error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.formContainer}>

    <form className={styles.form} onSubmit={handleSubmit}>
      <input className="inputFields"
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
        disabled={loading}
        />
      <input
        className="inputFields"
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
        disabled={loading}
        />
      <textarea
      className={`inputFields ${styles.textArea}`}
        name="message"
        placeholder="Describe the issue..."
        value={form.message}
        onChange={handleChange}
        required
        disabled={loading}
        />
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Feedback"}
      </button>
    </form>
        </div>
  );
}
