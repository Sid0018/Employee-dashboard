function SuccessToast({ successMessage }) {
  if (!successMessage) {
    return null;
  }

  return (
    <div className="success-toast">
      ✓ {successMessage}
    </div>
  );
}

export default SuccessToast;