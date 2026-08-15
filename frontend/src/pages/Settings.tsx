import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Select } from '@/components/common/Select';
import { Moon, Sun, Monitor, Bell, ShieldAlert, Trash2 } from 'lucide-react';
import { useUiStore } from '@/store/ui.store';
import { useState, useEffect } from 'react';
import { userService } from '@/api/user.api';
import { useAuthStore } from '@/store/auth.store';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { theme, setTheme } = useUiStore();
  const { logout } = useAuthStore();
  const [notifications, setNotifications] = useState(true);
  const [currency, setCurrency] = useState('INR');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await userService.getProfile();
        const p = (response as any).data || response;
        if (p.theme && p.theme !== theme) {
          setTheme(p.theme);
        }
        setNotifications(p.notifications_enabled ?? true);
        if (p.preferred_currency) setCurrency(p.preferred_currency);
      } catch (error) {
        console.error('Failed to fetch settings', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const updateSetting = async (key: string, value: any) => {
    try {
      await userService.updateProfile({ [key]: value });
      toast.success('Settings saved');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  const handleThemeChange = (newTheme: 'light'|'dark'|'system') => {
    setTheme(newTheme);
    updateSetting('theme', newTheme);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    updateSetting('preferred_currency', newCurrency);
  };

  const handleNotificationsChange = () => {
    const newVal = !notifications;
    setNotifications(newVal);
    updateSetting('notifications_enabled', newVal);
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to permanently delete your account and all associated trips?")) {
      try {
        await userService.deleteAccount();
        logout();
        toast.success("Account deleted successfully");
      } catch (error) {
        toast.error("Failed to delete account");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 mt-2">Manage your app preferences and account settings.</p>
      </div>

      <div className="space-y-6">
        <Card>
          <h3 className="text-lg font-bold mb-6 flex items-center"><Monitor className="w-5 h-5 mr-2 text-primary-600" /> Appearance</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button 
              onClick={() => handleThemeChange('light')}
              className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-colors ${theme === 'light' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 text-primary-600' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300'}`}
            >
              <Sun className="w-8 h-8 mb-2" />
              <span className="font-medium">Light</span>
            </button>
            <button 
              onClick={() => handleThemeChange('dark')}
              className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-colors ${theme === 'dark' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300'}`}
            >
              <Moon className="w-8 h-8 mb-2" />
              <span className="font-medium">Dark</span>
            </button>
            <button 
              onClick={() => handleThemeChange('system')}
              className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-colors ${theme === 'system' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 text-primary-600' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300'}`}
            >
              <Monitor className="w-8 h-8 mb-2" />
              <span className="font-medium">System</span>
            </button>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold mb-6">Preferences</h3>
          <div className="space-y-6 max-w-md">
            <Select 
              label="Default Currency"
              value={currency}
              onChange={handleCurrencyChange}
              options={[
                { value: 'INR', label: 'Indian Rupee (₹)' },
                { value: 'USD', label: 'US Dollar ($)' },
                { value: 'EUR', label: 'Euro (€)' },
              ]}
            />
            
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
              <div>
                <p className="font-medium flex items-center"><Bell className="w-4 h-4 mr-2" /> Push Notifications</p>
                <p className="text-sm text-slate-500 mt-1">Receive trip reminders and AI suggestions.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={notifications} onChange={handleNotificationsChange} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </Card>

        <Card className="border-danger-200 dark:border-danger-900/50">
          <h3 className="text-lg font-bold mb-6 flex items-center text-danger-600"><ShieldAlert className="w-5 h-5 mr-2" /> Danger Zone</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-danger-100 dark:border-danger-900/30 bg-danger-50 dark:bg-danger-900/10 rounded-xl">
              <div>
                <p className="font-bold text-danger-700 dark:text-danger-400">Delete Account</p>
                <p className="text-sm text-danger-600/80 dark:text-danger-400/80">Permanently remove your account and all trips.</p>
              </div>
              <Button variant="danger" onClick={handleDeleteAccount}><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
