import React, { useState } from 'react';
import {  Star, Edit, Monitor, Plus, Eye , FileText,  Search, ChevronLeft, ChevronRight, Check, X,  BarChart3, User ,  Users, UserCheck,  Trash2, ChevronDown } from 'lucide-react';

const AdminDashboard = () => (
  <div className="p-6 bg-gray-100 min-h-screen">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-500 text-white p-6 rounded-lg text-center">
        <h3 className="text-sm font-medium">Total Tickets</h3>
        <p className="text-4xl font-bold">12</p>
      </div>
      <div className="bg-green-500 text-white p-6 rounded-lg text-center">
        <h3 className="text-sm font-medium">Total Solved</h3>
        <p className="text-4xl font-bold">8</p>
      </div>
      <div className="bg-red-500 text-white p-6 rounded-lg text-center">
        <h3 className="text-sm font-medium">Total Awaiting Approval</h3>
        <p className="text-4xl font-bold">2</p>
      </div>
      <div className="bg-yellow-500 text-white p-6 rounded-lg text-center">
        <h3 className="text-sm font-medium">Total In Progress</h3>
        <p className="text-4xl font-bold">2</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-teal-400 p-8 rounded-lg flex items-center justify-center">
        <BarChart3 size={80} className="text-white" />
      </div>
      <div className="space-y-3">
        <div className="bg-teal-400 p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users size={24} className="text-white" />
            <span className="text-white font-medium">Technical Support</span>
          </div>
          <span className="text-white font-bold text-lg">9</span>
        </div>
        <div className="bg-teal-400 p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserCheck size={24} className="text-white" />
            <span className="text-white font-medium">Operation Team</span>
          </div>
          <span className="text-white font-bold text-lg">4</span>
        </div>
        <div className="bg-teal-400 p-4 rounded-lg">
          <div className="text-white text-center">
            <p className="text-sm font-medium mb-2">Customer Feedback</p>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4].map(i => 
                <Star key={i} size={18} className="text-yellow-300 fill-current" />
              )}
              <Star size={18} className="text-yellow-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AdminDatabase = () => {
  const [activeTab, setActiveTab] = useState('User');
  const [searchTerm, setSearchTerm] = useState('');

  const userData = [
    { id: 'ABC123', name: 'Abu', department: 'IT', specialty: 'Software' },
    { id: 'ABC124', name: 'Ahmad', department: 'Software', specialty: 'Networking' },
    { id: 'ABC125', name: 'Ali', department: 'Technical', specialty: 'Hardware' },
  ];

  const filteredData = userData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Database</h2>
      
      <div className="flex mb-6">
        {['User', 'Operation Team', 'Technical Support'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 font-medium ${
              activeTab === tab 
                ? 'bg-teal-400 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${tab === 'User' ? 'rounded-l-lg' : tab === 'Technical Support' ? 'rounded-r-lg' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Show:</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="text-sm text-gray-600">Entries</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Find ticket"
            className="border border-gray-300 rounded px-3 py-1 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={16} className="text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setting</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.specialty}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Showing 1 to {filteredData.length} of {filteredData.length} entries
        </span>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            <ChevronLeft size={16} />
          </button>
          <button className="px-3 py-1 bg-teal-400 text-white rounded text-sm">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminSettings = () => {
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    connect: false,
    email: false,
    authorization: false,
    notification: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SettingSection = ({ title, children, isExpanded, onToggle }) => (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="w-full bg-teal-400 text-white px-4 py-3 rounded-lg flex items-center justify-between hover:bg-teal-500 transition-colors"
      >
        <span className="font-medium">{title}</span>
        <ChevronDown size={20} className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      {isExpanded && (
        <div className="mt-2 bg-gray-50 rounded-lg p-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Setting</h2>
      
      <div className="max-w-2xl">
        <SettingSection 
          title="General" 
          isExpanded={expandedSections.general}
          onToggle={() => toggleSection('general')}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Language</span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-800 text-white text-sm rounded">EN</button>
              <button className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded">ID</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Data Backup</span>
            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
          </div>
        </SettingSection>

        <SettingSection 
          title="Connect To" 
          isExpanded={expandedSections.connect}
          onToggle={() => toggleSection('connect')}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-700">GoDash</span>
            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">SuperController</span>
            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
          </div>
        </SettingSection>

        <SettingSection 
          title="Email" 
          isExpanded={expandedSections.email}
          onToggle={() => toggleSection('email')}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Enable SMTP</span>
            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
          </div>
        </SettingSection>

        <SettingSection 
          title="Authorization" 
          isExpanded={expandedSections.authorization}
          onToggle={() => toggleSection('authorization')}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Edit authorization</span>
            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Authority Level</span>
            <button className="w-4 h-4 bg-gray-400 rounded flex items-center justify-center">
              <X size={12} className="text-white" />
            </button>
          </div>
        </SettingSection>

        <SettingSection 
          title="Notification" 
          isExpanded={expandedSections.notification}
          onToggle={() => toggleSection('notification')}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Enable Notification</span>
            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
          </div>
        </SettingSection>
      </div>
    </div>
  );
};

const AdminUserLogHistory = () => {
  const userLogs = [
    { 
      id: 1, 
      dateSignIn: '130821 / 0800',
      staffId: 'XL000001',
      department: 'OT',
      activity: 'Create Team',
      dateSignOut: '130821 / 0815'
    },
    { 
      id: 2, 
      dateSignIn: '130821 / 0805',
      staffId: '',
      department: '',
      activity: '',
      dateSignOut: '130821 / 0810'
    },
    { id: 3, dateSignIn: '', staffId: '', department: '', activity: '', dateSignOut: '' },
    { id: 4, dateSignIn: '', staffId: '', department: '', activity: '', dateSignOut: '' },
    { id: 5, dateSignIn: '', staffId: '', department: '', activity: '', dateSignOut: '' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Log History</h2>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Show:</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="text-sm text-gray-600">Entries</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Sign In Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Sign Out time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.dateSignIn}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.staffId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.activity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.dateSignOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Showing 1 to 5 of 5 entries
        </span>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            <ChevronLeft size={16} />
          </button>
          <button className="px-3 py-1 bg-teal-400 text-white rounded text-sm">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminProfile = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleFeedbackSubmit = () => {
    setFeedback('');
    setRating(0);
    alert('Feedback submitted!');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={32} className="text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-1">Username</div>
              <div className="text-sm text-gray-600 mb-1">Contact Number</div>
              <div className="text-sm text-gray-600 mb-1">Email</div>
              <div className="text-sm text-gray-600">Department</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Give Your Feedback</h3>
          <input
            type="text"
            placeholder="Lorem Ipsum"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <div className="flex items-center space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                className={`cursor-pointer ${
                  star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <button
            onClick={handleFeedbackSubmit}
            className="bg-teal-400 text-white px-6 py-2 rounded-lg hover:bg-teal-500 transition-colors"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminProfileSetting = () => {
  const [formData, setFormData] = useState({
    username: 'Current User',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: '',
    realName: '',
    accessLevel: 'Project Access Level'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateUser = () => {
    alert('User updated successfully!');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>
      
      <div className="max-w-2xl">
        <div className="bg-teal-400 p-6 rounded-lg">
          <div className="bg-white p-6 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Edit Account</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Real Name</label>
                <input
                  type="text"
                  value={formData.realName}
                  onChange={(e) => handleInputChange('realName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Access Level</label>
                <input
                  type="text"
                  value={formData.accessLevel}
                  onChange={(e) => handleInputChange('accessLevel', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Access Level</label>
                <input
                  type="text"
                  value="Project Access Level"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  disabled
                />
              </div>
              
              <button
                onClick={handleUpdateUser}
                className="bg-teal-400 text-white px-6 py-3 rounded-lg hover:bg-teal-500 transition-colors font-medium"
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AdminDashboard, AdminDatabase, AdminSettings, AdminUserLogHistory, AdminProfile, AdminProfileSetting }; 
