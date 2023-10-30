import { HeaderDefault } from "../components/HeaderDefault";
import { HeaderUser } from "../components/HeaderUser";

import { useEffect, useState } from "react";

export function HeaderPage() {
  // variable to test alternance between default header and user logged header
  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setHasToken(true);
    }
  }, []);

  return hasToken ? <HeaderUser /> : <HeaderDefault />;
}
