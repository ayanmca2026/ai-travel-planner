import { useAuthStore } from '@/store/auth.store';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Avatar } from '@/components/common/Avatar';
import { MapPin, Mail, Navigation, Heart, Edit2 } from 'lucide-react';
import { Chip } from '@/components/common/Chip';
import { useState, useEffect } from 'react';
import { userService } from '@/api/user.api';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || user?.name || '',
    home_city: '',
    student_id: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        full_name: user.full_name || user.name || prev.full_name
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getProfile();
        const p = (response as any).data || response;
        setProfile(p);
        setFormData(prev => ({
          ...prev,
          home_city: p.home_city || '',
          student_id: p.student_id || ''
        }));
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    
    setIsSaving(true);
    try {
      await userService.updateUser({
        full_name: formData.full_name,
        home_city: formData.home_city,
        student_id: formData.student_id
      });
      // Also update auth store user
      updateUser({ full_name: formData.full_name, name: formData.full_name });
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Profile</h1>
          <p className="text-slate-500 mt-2">Manage your personal information and preferences.</p>
        </div>
        <Button variant={isEditing ? 'primary' : 'outline'} onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : <><Edit2 className="w-4 h-4 mr-2" /> Edit Profile</>}
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="flex flex-col items-center text-center p-8">
            <Avatar size="xl" initials={user?.full_name || user?.name} className="mb-4 text-3xl font-bold w-24 h-24" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.full_name || user?.name || 'Traveler'}</h2>
            <p className="text-sm text-slate-500 mb-6 flex items-center justify-center gap-1">
              <Mail className="w-4 h-4" /> {user?.email}
            </p>
            
            <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
              <div>
                <p className="text-3xl font-bold text-primary-600">12</p>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Trips</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent-500">48</p>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Places</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-bold mb-6">Personal Information</h3>
            <div className="space-y-4">
              <Input label="Full Name" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} disabled={!isEditing} />
              <Input label="Email Address" value={user?.email || ''} disabled={true} />
              <Input label="Student ID" value={formData.student_id} onChange={(e) => setFormData({...formData, student_id: e.target.value})} disabled={!isEditing} placeholder="e.g. S12345678" />
              <Input label="Home City" value={formData.home_city} onChange={(e) => setFormData({...formData, home_city: e.target.value})} disabled={!isEditing} icon={<MapPin className="w-4 h-4" />} />
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-bold mb-6">Travel Preferences</h3>
            
            <div className="mb-6">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Preferred Style</p>
              <div className="flex gap-2 flex-wrap">
                <Chip label="Backpacker" active={true} />
                <Chip label="Budget" />
                <Chip label="Balanced" />
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Interests</p>
              <div className="flex gap-2 flex-wrap">
                {['Adventure', 'Nature', 'Photography', 'Food'].map(i => (
                  <Chip key={i} label={i} active={true} icon={<Heart className="w-3 h-3" />} onRemove={isEditing ? () => {} : undefined} />
                ))}
                {isEditing && <Button variant="outline" size="sm" className="rounded-full h-8 px-3 text-xs border-dashed text-slate-500">+ Add</Button>}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
