import toast from "react-hot-toast";
import Button from "../../ui/Button";

function DemoAccount({ login, isLoading, setEmail, setPassword }) {
  const demoCredentials = {
    email: "boyaf25710@gexige.com",
    password: "abcde1234",
  };

  const handleDemoLogin = () => {
    // fill the input fields
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);

    // now trigger login
    login(demoCredentials, {
      onSuccess: () => {
        toast.success("Logged in with demo account!");
      },
      onError: () => {
        toast.error("Demo login failed. Please try again.");
      },
    });
  };

  return (
    <Button type="button" onClick={handleDemoLogin} disabled={isLoading}>
      {isLoading ? "Logging in..." : "Use Demo Account"}
    </Button>
  );
}

export default DemoAccount;
