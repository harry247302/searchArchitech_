import { architectLogout } from "@/app/redux/slices/architectSlice/ArchitectAuth";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";

const useHandleLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await dispatch(architectLogout()).unwrap();
      console.log(res, "--------------------------------------------");
        window.location.reload()
    //   router.push(redirectTo);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return handleLogout;
};

export default useHandleLogout;