import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { consumeQR } from "../api";
import type { ConsumeQRResponse } from "../api";

type ScanState =
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; error: string };

function ScanQR() {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<ScanState>({ status: "loading" });

  useEffect(() => {
    if (!id) {
      setState({ status: "error", error: "Invalid QR code" });
      return;
    }

    consumeQR(id)
      .then((res: ConsumeQRResponse) => {
        if ("message" in res) {
          setState({ status: "success", message: res.message });
        } else {
          setState({ status: "error", error: res.error });
        }
      })
      .catch(() => {
        setState({ status: "error", error: "Network error" });
      });
  }, [id]);

  if (state.status === "loading") {
    return <p>Loading...</p>;
  }

  if (state.status === "error") {
    return <p>{state.error}</p>;
  }

  return (
    <div>
      <h1>Private Message</h1>
      <p>{state.message}</p>
      <p>This message has now expired.</p>
    </div>
  );
}

export default ScanQR;
