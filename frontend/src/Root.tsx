import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Homepage from "./pages/Home";
import { loaderAtom, userAtom } from "./store/atoms";

export default function Root() {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const [loading, setLoading] = useRecoilState(loaderAtom);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [user, navigate, setLoading]);

  if (loading) return <div>Loading...</div>;

  return <Homepage />;
}
