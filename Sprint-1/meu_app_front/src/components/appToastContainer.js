import ToastContainer from "react-bootstrap/ToastContainer";

export default function AppToastContainer({ position, toasts }) {
  return (
    <ToastContainer position={position ?? 'top-end'} className="p-3" style={{ zIndex: 1 }}>
      {toasts.map(toast => toast)}
    </ToastContainer>
  );
};