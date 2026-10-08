// Re-mounts on every navigation: short, skippable page transition.
export default function Template({ children }) {
  return (
    <>
      <div className="page-curtain" aria-hidden="true" />
      <div className="page-in">{children}</div>
    </>
  );
}
