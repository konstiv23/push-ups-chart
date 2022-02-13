import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { completelyClear } from "../chart/chartSlice";
import { setDemoCleared } from "../settings/settingsSlice";
import styles from "./Options.module.css";

type ModalProps = {
  hideModal: () => void;
};

function MyConfirmModal({ hideModal }: ModalProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleNo() {
    hideModal();
  }

  function handleYes() {
    dispatch(completelyClear());
    dispatch(setDemoCleared());
    navigate("/", { replace: true });
  }

  return (
    <div className={styles["modal-wrapper"]}>
      <section className={styles.modal}>
        <h3>Clear Data</h3>
        <div>Are you sure?</div>
        <div className={styles["confirm-buttons"]}>
          <button onClick={handleNo}>No</button>
          <button onClick={handleYes}>Yes</button>
        </div>
      </section>
    </div>
  );
}

function Options() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className={styles.options}>
      {showModal && <MyConfirmModal hideModal={() => setShowModal(false)} />}
      <h1>Options</h1>
      <div className={styles.hr} />
      <button onClick={() => setShowModal(true)}>Clear All Data</button>
      <div className={styles.hr} />
      <p>
        Developer email:{" "}
        <a href="mailto:konstiv23@gmail.com">konstiv23@gmail.com</a>
      </p>
      <div className={styles.hr} />
      <a
        className={styles.github}
        href="https://github.com/konstiv23/push-ups-chart"
      >
        <img
          className={styles["github-logo"]}
          src={`${process.env.PUBLIC_URL}/github-logo.svg`}
          alt="Github logo"
        />
        Source code on Github
      </a>
    </main>
  );
}

export default Options;
