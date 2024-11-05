import { useAuthStore } from '../store/authStore';

export default function SettingsPage() {
  const { user } = useAuthStore();

  return (
    <div className="pt-16 pl-64">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Account Settings</h2>
              <div className="space-y-4">
                {user ? (
                  <>
                    <p className="text-gray-600">Signed in as: {user.email}</p>
                    <button className="text-blue-600 hover:text-blue-800">
                      Manage your Google Account
                    </button>
                  </>
                ) : (
                  <p className="text-gray-600">Sign in to manage your account settings</p>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-2">Appearance</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>Dark theme</span>
                </label>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Privacy</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>Keep watch history</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}