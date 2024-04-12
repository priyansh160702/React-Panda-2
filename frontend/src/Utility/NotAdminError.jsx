const NotAdminError = () => {
  return (
    <div className="not-admin">
      <h1>NOT AN ADMIN</h1>
      <p>
        (Please email regarding admin status to -{" "}
        <span>priyanshsingh1607@gmail.com</span>).
      </p>
    </div>
  );
};

export default NotAdminError;
