import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/users";
import * as NotesApi from "../network/notes_api";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccess: () => void;
}
const NavBarLoggedInView = ({
  user,
  onLogoutSuccess,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await NotesApi.logout();
      onLogoutSuccess();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">Signed is as: {user.username}</Navbar.Text>
      <Button onClick={logout}>Log out</Button>
    </>
  );
};

export default NavBarLoggedInView;
