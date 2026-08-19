function ErrorToast({ errorMessage }) {
  if (!errorMessage) {
    return null;
  }

  return (
    <div className="error-toast">
      ⚠ {errorMessage}
    </div>
  );
}

export default ErrorToast;