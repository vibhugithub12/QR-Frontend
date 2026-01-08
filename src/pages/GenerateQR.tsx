import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { createQR } from "../api";

function GenerateQR() {
  const [message, setMessage] = useState("");
  const [qrId, setQrId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setLoading(true);
    setError(null);

    try {
      const { id } = await createQR({ message });
      setQrId(id);
    } catch {
      setError("Could not generate QR");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Create One-Time QR</h1>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter private message"
      />

      <button onClick={handleSubmit} disabled={!message || loading}>
        Generate QR
      </button>

      {error && <p>{error}</p>}

      {qrId && (
        <QRCodeCanvas
          value={`${window.location.origin}/scan/${qrId}`}
          size={256}
        />
      )}
    </div>
  );
}

export default GenerateQR;
