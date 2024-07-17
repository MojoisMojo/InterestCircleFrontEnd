function FullScreenViewer({ children, onClose }) {
  return (
    <div className="full-screen-viewer">
      <div className="full-screen-viewer__content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
export default FullScreenViewer;