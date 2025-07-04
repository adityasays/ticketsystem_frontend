import React, { useState } from 'react';
import { User, Search, ChevronLeft, ChevronRight, Star, BarChart3, Users, UserCheck, Eye, Edit, X } from 'lucide-react';

export const TechnicalSupportDashboard = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-500 text-white p-6 rounded-lg text-center">
        <h3 className="text-sm">Total Tickets</h3>
        <p className="text-3xl font-bold">12</p>
      </div>
      <div className="bg-green-500 text-white p-6 rounded-lg text-center">
        <h3 className="text-sm">Total Solved</h3>
        <p className="text-3xl font-bold">8</p>
      </div>
      <div className="bg-red-500 text-white p-6 rounded-lg text-center">
        <h3 className="text-sm">Total Awaiting Approval</h3>
        <p className="text-3xl font-bold">2</p>
      </div>
      <div className="bg-yellow-500 text-white p-6 rounded-lg text-center">
        <h3 className="text-sm">Total In Progress</h3>
        <p className="text-3xl font-bold">2</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-teal-400 p-6 rounded-lg flex items-center justify-center">
        <BarChart3 size={64} className="text-white" />
      </div>
      <div className="space-y-2">
        <div className="bg-teal-400 p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users size={24} className="text-white" />
            <span className="text-white">Technical Support</span>
          </div>
          <span className="text-white font-bold">9</span>
        </div>
        <div className="bg-teal-400 p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserCheck size={24} className="text-white" />
            <span className="text-white">Operation Team</span>
          </div>
          <span className="text-white font-bold">4</span>
        </div>
        <div className="bg-teal-400 p-4 rounded-lg">
          <div className="text-white text-center">
            <p className="text-sm">Customer Feedback</p>
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4].map(i => <Star key={i} size={16} className="text-yellow-300 fill-current" />)}
              <Star size={16} className="text-yellow-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const TechnicalSupportMyTicket = ({ tickets, setSelectedTicket, setCurrentView }) => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">My Ticket</h2>
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <span>Show</span>
        <select className="border border-gray-300 rounded p-1">
          <option>10</option>
        </select>
        <span>Entries</span>
      </div>
      <div className="flex items-center space-x-2">
        <span>Find ticket</span>
        <input type="text" className="border border-gray-300 rounded p-2" />
        <Search size={16} />
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left">Ticket No.</th>
            <th className="border p-3 text-left">Subject</th>
            <th className="border p-3 text-left">Category</th>
            <th className="border p-3 text-left">Priority</th>
            <th className="border p-3 text-left">Date</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-left">Person in charge</th>
            <th className="border p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td className="border p-3">{ticket.id}</td>
              <td className="border p-3">{ticket.subject}</td>
              <td className="border p-3">{ticket.category}</td>
              <td className="border p-3">
                <span className={`px-2 py-1 rounded text-xs ${
                  ticket.priority === 'High' 
                    ? 'bg-red-100 text-red-800' 
                    : ticket.priority === 'Medium' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {ticket.priority}
                </span>
              </td>
              <td className="border p-3">{ticket.date}</td>
              <td className="border p-3">
                <span className={`px-2 py-1 rounded text-xs ${
                  ticket.status === 'Progress' 
                    ? 'bg-green-100 text-green-800' 
                    : ticket.status === 'On hold' 
                    ? 'bg-blue-100 text-blue-800' 
                    : ticket.status === 'Closed'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {ticket.status}
                </span>
              </td>
              <td className="border p-3">{ticket.assignedTo}</td>
              <td className="border p-3">
                <button 
                  className="text-blue-500 hover:text-blue-700" 
                  onClick={() => { 
                    setSelectedTicket(ticket); 
                    setCurrentView('ticketDetails'); 
                  }}
                >
                  <Eye size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex justify-between items-center mt-4">
      <span className="text-sm">Showing 1 to 5 of 5 entries</span>
      <div className="flex space-x-2">
        <button className="p-2 border border-gray-300 rounded">
          <ChevronLeft size={16} />
        </button>
        <button className="p-2 border border-gray-300 rounded bg-teal-400 text-white">1</button>
        <button className="p-2 border border-gray-300 rounded">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  </div>
);

export const TechnicalSupportTicketDetails = ({ selectedTicket, onClose, onUpdate }) => {
  if (!selectedTicket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Ticket Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-3 mb-6">
          <div><span className="font-medium">Ticket No:</span> {selectedTicket.id}</div>
          <div><span className="font-medium">Name:</span> {selectedTicket.name || 'N/A'}</div>
          <div><span className="font-medium">Dept:</span> {selectedTicket.department || 'N/A'}</div>
          <div><span className="font-medium">Title:</span> {selectedTicket.subject}</div>
          <div><span className="font-medium">Description:</span> {selectedTicket.description}</div>
          <div><span className="font-medium">Category:</span> {selectedTicket.category}</div>
          <div><span className="font-medium">Type:</span> {selectedTicket.type || 'N/A'}</div>
          <div><span className="font-medium">Priority:</span> {selectedTicket.priority}</div>
          <div><span className="font-medium">Status:</span> {selectedTicket.status}</div>
          <div><span className="font-medium">Attachment:</span> {selectedTicket.attachment || 'None'}</div>
        </div>
        
        <div className="flex space-x-4">
          <button 
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => onUpdate(selectedTicket.id)}
          >
            Update
          </button>
          <button 
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const TechnicalSupportCloseTicket = ({ selectedTicket, onClose, onCloseTicket }) => {
  const [teamName, setTeamName] = useState('');
  const [remark, setRemark] = useState('');

  const handleSubmit = () => {
    if (!teamName.trim()) {
      alert('Please enter team name');
      return;
    }
    onCloseTicket(selectedTicket.id, teamName, remark);
  };

  if (!selectedTicket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">My Ticket - Close Ticket</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="bg-teal-400 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ticket No</label>
              <input 
                type="text" 
                value={selectedTicket.id}
                className="w-full p-2 border border-gray-300 rounded bg-gray-100" 
                disabled 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Team name</label>
              <input 
                type="text" 
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded" 
                placeholder="Enter team name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Remark</label>
              <textarea 
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded h-20" 
                placeholder="Enter remark"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Team Member</label>
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Select member</option>
                <option>John Doe</option>
                <option>Alice Smith</option>
              </select>
            </div>
            
            <button 
              className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
              onClick={handleSubmit}
            >
              Close Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TechnicalSupportTeamCreation = ({ onClose, onCreateTeam }) => {
  const [teamName, setTeamName] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [remark, setRemark] = useState('');

  const handleSubmit = () => {
    if (!teamName.trim() || !teamMember.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    onCreateTeam(teamName, teamMember, remark);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">My Ticket - Team Creation</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="bg-teal-400 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ticket No</label>
              <input 
                type="text" 
                value="Auto-generated"
                className="w-full p-2 border border-gray-300 rounded bg-gray-100" 
                disabled 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Team name</label>
              <input 
                type="text" 
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded" 
                placeholder="Enter team name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Remark</label>
              <textarea 
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded h-20" 
                placeholder="Enter remark"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Team Member</label>
              <select 
                value={teamMember}
                onChange={(e) => setTeamMember(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select member</option>
                <option value="John Doe">John Doe</option>
                <option value="Alice Smith">Alice Smith</option>
              </select>
            </div>
            
            <button 
              className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
              onClick={handleSubmit}
            >
              Create Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TechnicalSupportPerformance = ({ performanceData }) => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Performance</h2>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={32} className="text-gray-600" />
          </div>
          <div>
            <h3 className="font-bold">Technical Support Name</h3>
            <div className="bg-gray-200 p-2 rounded text-sm">
              <div>Contact No: 0123456789</div>
              <div>Department: ABC</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-bold mb-2">Total Ticket Handle</h3>
          <div className="text-3xl font-bold">5</div>
          <div className="text-sm space-y-1">
            <div>Ticket Solved: 2</div>
            <div>Ticket Pending: 1</div>
            <div>Ticket in progress: 2</div>
            <div className="flex items-center">
              <span>Rating: </span>
              <div className="ml-2 flex">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={16} className={i <= 4 ? 'text-yellow-300 fill-current' : 'text-gray-300'} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span>Technical Support 1</span>
          </div>
          <button className="bg-teal-400 text-white px-3 py-1 rounded text-sm">View details</button>
        </div>
        
        <div className="bg-white p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span>Technical Support 2</span>
          </div>
          <button className="bg-teal-400 text-white px-3 py-1 rounded text-sm">View details</button>
        </div>
        
        <div className="bg-white p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span>Technical Support 3</span>
          </div>
          <button className="bg-teal-400 text-white px-3 py-1 rounded text-sm">View details</button>
        </div>
      </div>
    </div>
  </div>
);

export const TechnicalSupportProfile = ({ onEditProfile }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) {
      alert('Please enter feedback');
      return;
    }
    alert('Feedback submitted successfully!');
    setFeedback('');
    setRating(0);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>
      <div className="bg-teal-400 p-6 rounded-lg">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={32} className="text-gray-600" />
              </div>
              <button 
                onClick={onEditProfile}
                className="bg-gray-200 p-2 rounded hover:bg-gray-300"
              >
                <Edit size={16} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div>Username</div>
              <div>Contact Number</div>
              <div>Email</div>
              <div>Department</div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-bold mb-4">Give Your Feedback</h3>
            <input
              type="text"
              placeholder="Leave your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Star
                  key={i}
                  size={20}
                  className={i <= rating ? 'text-yellow-300 fill-current cursor-pointer' : 'text-gray-300 cursor-pointer'}
                  onClick={() => setRating(i)}
                />
              ))}
            </div>
            <button 
              onClick={handleFeedbackSubmit}
              className="bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-500"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TechnicalSupportProfileSettings = ({ onSave }) => {
  const [formData, setFormData] = useState({
    username: 'Current User',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: '',
    realName: '',
    accessLevel: 'Project Access Level'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    alert('Profile updated successfully!');
    if (onSave) onSave(formData);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="bg-teal-400 p-1 rounded mb-4">
          <div className="bg-white p-4 rounded">
            <h3 className="font-bold mb-4">Edit Account</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 bg-gray-400 text-white p-2 rounded">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 bg-gray-400 text-white p-2 rounded">Current Password</label>
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => handleChange('currentPassword', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 bg-gray-400 text-white p-2 rounded">New Password</label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => handleChange('newPassword', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 bg-gray-400 text-white p-2 rounded">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 bg-gray-400 text-white p-2 rounded">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 bg-gray-400 text-white p-2 rounded">Real Name</label>
                <input
                  type="text"
                  value={formData.realName}
                  onChange={(e) => handleChange('realName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 bg-gray-400 text-white p-2 rounded">Access Level</label>
                <input
                  type="text"
                  value={formData.accessLevel}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 bg-gray-400 text-white p-2 rounded">Project Access Level</label>
                <input
                  type="text"
                  value={formData.accessLevel}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  disabled
                />
              </div>
              
              <button 
                onClick={handleSubmit}
                className="bg-teal-400 text-white px-6 py-2 rounded hover:bg-teal-500"
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