import { useAuth } from '../../context/authContext';

export default function LogOut() {
    const { signOut } = useAuth();

    return signOut();
}