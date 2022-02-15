import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectDemoCleared } from "../settings/settingsSlice";
import styles from "./DemoAlert.module.css";

function DemoAlert() {
  const demoCleared = useAppSelector(selectDemoCleared);
  if (demoCleared) {
    return null;
  }

  return (
    <Link to="/workout" className={styles["demo-alert"]}>
      <p>
        This is <strong>demo data.</strong> Start your own by doing
        push&#8209;ups now.
      </p>
    </Link>
  );
}

export default DemoAlert;
