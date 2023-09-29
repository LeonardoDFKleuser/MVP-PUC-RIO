import Toast from "react-bootstrap/Toast";

export default function AppToast({ idx, imgSrc, imgAlt, title, bodyText, variant, autohide, show, setShow }) {
  return (
    <Toast key={idx} bg={variant ? variant.toLowerCase() : ''} onClose={() => setShow(idx)} show={show} delay={3000} autohide={autohide}>
      <Toast.Header>
        <img height={25} width={25} src={imgSrc} className="rounded me-2" alt={imgAlt} />
        <strong className="me-auto">{title}</strong>
        <small className="text-muted">agora há pouco</small>
      </Toast.Header>
      <Toast.Body className={variant && variant.toLowerCase === 'dark' && 'text-white'}>
        {bodyText}
      </Toast.Body>
    </Toast>
  );
};