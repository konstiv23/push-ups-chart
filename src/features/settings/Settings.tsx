import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { completelyClear } from "../chart/chartSlice";

function Settings() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const complete = useCallback(() => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all data?"
    );
    if (confirmed) {
      dispatch(completelyClear());
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <main>
      <button onClick={complete}>Clear All Data</button>
    </main>
  );
}

export default Settings;
