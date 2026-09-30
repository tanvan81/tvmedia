import { FormEvent, useState } from 'react';
import { AlertTriangle, LockKeyhole } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isSupabaseConfigured || !supabase) {
      setError('Chưa cấu hình Supabase. Kiểm tra file .env ở thư mục gốc rồi khởi động lại website.');
      return;
    }

    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      onSuccess();
    } catch (err: any) {
      setError(err?.message || 'Không thể đăng nhập.');
    } finally {
      setBusy(false);
    }
  };

  if (!isSupabaseConfigured || !supabase) {
    return <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 px-4 pt-24">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5"><AlertTriangle /></div>
        <h1 className="text-2xl font-bold text-slate-900">Chưa cấu hình Supabase</h1>
        <p className="text-slate-500 mt-2">Admin đã tắt hoàn toàn chế độ mật khẩu local. Hãy kiểm tra <code>.env</code> ở thư mục gốc, sau đó restart <code>npm run dev</code>.</p>
      </div>
    </div>;
  }

  return <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 px-4 pt-24">
    <form onSubmit={submit} className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
      <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-5"><LockKeyhole /></div>
      <h1 className="text-2xl font-bold text-slate-900">Quản trị nội dung</h1>
      <p className="text-slate-500 mt-2 mb-6">Đăng nhập bằng tài khoản Supabase Auth.</p>
      <label className="block mb-4"><span className="text-sm font-medium">Email</span><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full border rounded-xl px-4 py-3" /></label>
      <label className="block mb-4"><span className="text-sm font-medium">Mật khẩu</span><input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full border rounded-xl px-4 py-3" /></label>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      <button disabled={busy} className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 disabled:opacity-60">{busy ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
    </form>
  </div>;
}
