import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './UI/card';
import { Button } from './UI/button';
import { Input } from './UI/input';
import { Label } from './UI/label';
import { ArrowLeft, Mail, Lock, User as UserIcon } from 'lucide-react';
import type { Portal, User } from '../pages/_app';

interface AuthFormProps {
  portal: Portal;
  onLogin: (user: User) => void;
  onBack: () => void;
}

const portalTitles = {
  student: 'Student Portal',
  government: 'Government Portal',
  institute: 'Institute Portal',
  company: 'Company Portal',
  admin: 'Admin Portal'
};

const portalColors = {
  student: 'from-blue-500 to-blue-600',
  government: 'from-teal-500 to-teal-600',
  institute: 'from-indigo-500 to-indigo-600',
  company: 'from-purple-500 to-purple-600',
  admin: 'from-slate-600 to-slate-700'
};

export function AuthForm({ portal, onLogin, onBack }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app would call API
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      portal: portal
    };
    
    onLogin(user);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-slate-600 hover:text-slate-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portals
        </Button>

        {/* Auth Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-8">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${portalColors[portal]} flex items-center justify-center mx-auto mb-4`}>
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </CardTitle>
            <p className="text-slate-600">
              {portalTitles[portal]}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className={`w-full bg-gradient-to-r ${portalColors[portal]} hover:scale-105 transition-transform`}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Demo credentials hint */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
              <p>💡 Demo: Use any email and password to sign in</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}