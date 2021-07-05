import { HeaderDefault } from "../components/HeaderDefault";
import { HeaderUser } from "../components/HeaderUser";

export function HeaderPage() {
  // variable to test alternance between default header and user logged header
  let i = 0;

  return i === 0 ? <HeaderDefault /> : <HeaderUser />;
}
