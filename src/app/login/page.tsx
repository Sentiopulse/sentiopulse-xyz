import GoogleSignInButton from "@/components/GoogleSignInButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function LoginPage() {
  return (
    <div className="login-bg flex-center min-h-screen">
      <div className="login-card flex-col-center">
        <h1 className="login-title">Welcome to SentioPulse</h1>
        <p className="login-desc">
          Sign in for AI-powered market sentiment analytics.
        </p>
        <GoogleSignInButton />
        <div style={{ marginTop: 24 }}>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
