import BackgroundImage from "../../common/components/BackgroundImage";

export default function AuthPageLayout({ children }) {
  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div style={{ width: "40%", height: "100%" }}>
        <BackgroundImage />
      </div>
      <div className="Login">{children}</div>
    </div>
  );
}
