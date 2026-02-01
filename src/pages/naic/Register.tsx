import { useEffect } from "react";
import RegistrationForm from "@/components/naic/RegistrationForm";

const Register = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <RegistrationForm />
    </div>
  );
};

export default Register;
