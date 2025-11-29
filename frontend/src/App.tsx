import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'

// Admin pages
import { AdminLogin } from '@/pages/admin/Login'
import { Dashboard } from '@/pages/admin/Dashboard'
import { TokenManage } from '@/pages/admin/TokenManage'
import { KeyManage } from '@/pages/admin/KeyManage'
import { Announcements } from '@/pages/admin/Announcements'
import { UserManage } from '@/pages/admin/UserManage'
import { AIManage } from '@/pages/admin/AIManage'
import { ApiTest } from '@/pages/admin/ApiTest'
import { ApiDocs } from '@/pages/admin/ApiDocs'
import { Logs } from '@/pages/admin/Logs'
import { Monitor } from '@/pages/admin/Monitor'
import { Settings } from '@/pages/admin/Settings'

// User pages
import { UserLogin } from '@/pages/user/Login'
import { UserApiKeys } from '@/pages/user/ApiKeys'
import { UserTokens } from '@/pages/user/Tokens'
import { UserApiUsage } from '@/pages/user/ApiUsage'
import { UserTest } from '@/pages/user/Test'
import { UserAccount } from '@/pages/user/Account'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<MainLayout type="admin" />}>
          <Route index element={<Dashboard />} />
          <Route path="tokens" element={<TokenManage />} />
          <Route path="keys" element={<KeyManage />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="users" element={<UserManage />} />
          <Route path="ai" element={<AIManage />} />
          <Route path="test" element={<ApiTest />} />
          <Route path="docs" element={<ApiDocs />} />
          <Route path="logs" element={<Logs />} />
          <Route path="monitor" element={<Monitor />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* User routes */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/user" element={<MainLayout type="user" />}>
          <Route index element={<UserApiKeys />} />
          <Route path="tokens" element={<UserTokens />} />
          <Route path="docs" element={<UserApiUsage />} />
          <Route path="test" element={<UserTest />} />
          <Route path="account" element={<UserAccount />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
