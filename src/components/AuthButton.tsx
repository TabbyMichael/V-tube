import { useGoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../store/authStore';

export default function AuthButton() {
  const { user, setUser, logout } = useAuthStore();

  const login = useGoogleLogin({
    onSuccess: (response) => setUser(response),
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
  });

  if (user) {
    return (
      <button
        onClick={logout}
        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700"
      >
        <span>Sign Out</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => login()}
      className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
    >
      <span>Sign In</span>
    </button>
  );
}