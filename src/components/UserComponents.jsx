import React, { useState } from 'react';
import { Star, Edit, Monitor, Plus, Eye, FileText, Search, ChevronLeft, ChevronRight, Check, X, BarChart3, User, Users, UserCheck, Trash2, ChevronDown } from 'lucide-react';

export const UserDashboard = ({ tickets }) => {
  const totalTickets = tickets.length;
  const solvedTickets = tickets.filter(t => t.status === 'closed').length;
  const pendingTickets = tickets.filter(t => t.status === 'pending').length;
  const inProgressTickets = tickets.filter(t => t.status === 'approved').length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg text-center shadow-md">
          <h3 className="text-sm font-medium">Total Tickets</h3>
          <p className="text-4xl font-bold mt-2">{totalTickets}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg text-center shadow-md">
          <h3 className="text-sm font-medium">Total Solved</h3>
          <p className="text-4xl font-bold mt-2">{solvedTickets}</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg text-center shadow-md">
          <h3 className="text-sm font-medium">Total Awaiting Approval</h3>
          <p className="text-4xl font-bold mt-2">{pendingTickets}</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg text-center shadow-md">
          <h3 className="text-sm font-medium">Total In Progress</h3>
          <p className="text-4xl font-bold mt-2">{inProgressTickets}</p>
        </div>
      </div>
    </div>
  );
};

export const UserNewTicket = ({ user, onCreateTicket }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Access Issue');
  const [type, setType] = useState('Support');
  const [priority, setPriority] = useState('Low');
  const [name, setName] = useState(user?.name || '');
  const [department, setDepartment] = useState('IT');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notRobot, setNotRobot] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!notRobot) {
      setError('Please confirm you are not a robot');
      return;
    }
    if (!title || !description) {
      setError('Title and description are required');
      return;
    }
    onCreateTicket({ title, description });
    setError('');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Ticket</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Ticket No.</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" value="Auto-generated" disabled />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Date</label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Department</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Operations</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Subject</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Access Issue</option>
              <option>Account Issue</option>
              <option>Technical Issue</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Type</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>Support</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Priority</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md h-32"
            placeholder="Please describe your issue in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-6">
          <div className="flex items-center p-3 border border-gray-300 rounded-md bg-gray-50 w-fit">
            <input
              type="checkbox"
              className="mr-3"
              checked={notRobot}
              onChange={(e) => setNotRobot(e.target.checked)}
            />
            <span className="text-sm">I'm not a robot</span>
            <div className="ml-4 text-xs text-gray-500">reCAPTCHA</div>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-teal-500 text-white px-8 py-3 rounded-md hover:bg-teal-600 font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export const UserMyTicket = ({ tickets, setSelectedTicket, setCurrentView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState(10);

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket._id.includes(searchTerm)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">List of Ticket</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Show:</span>
            <select
              value={showEntries}
              onChange={(e) => setShowEntries(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">Entries</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Find ticket</span>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm"
                placeholder="Search..."
              />
              <Search size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">Ticket No.</th>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">Subject</th>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">Support by</th>
                <th className="border border-gray-200 p-3 text-left text-sm font-medium text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.slice(0, showEntries).map((ticket) => (
                <tr key={ticket._id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-3">
                    <button
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setCurrentView('ticketDetails');
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {ticket._id}
                    </button>
                  </td>
                  <td className="border border-gray-200 p-3 text-sm">{ticket.title}</td>
                  <td className="border border-gray-200 p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="border border-gray-200 p-3 text-sm">{ticket.assignedTo || 'Unassigned'}</td>
                  <td className="border border-gray-200 p-3 text-sm">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-600">
            Showing 1 to {Math.min(showEntries, filteredTickets.length)} of {filteredTickets.length} entries
          </span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">‹‹</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-gray-100">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">››</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserTicketDetails = ({ selectedTicket, setCurrentView }) => {
  if (!selectedTicket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-md">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Ticket Details</h3>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-600">Ticket No.</span>
            <span className="text-sm text-gray-800">{selectedTicket._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-600">Date:</span>
            <span className="text-sm text-gray-800">{new Date(selectedTicket.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-600">Name:</span>
            <span className="text-sm text-gray-800">{selectedTicket.createdBy?.name || 'User'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-600">Title:</span>
            <span className="text-sm text-gray-800">{selectedTicket.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-600">Description:</span>
            <span className="text-sm text-gray-800">{selectedTicket.description}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-600">Status:</span>
            <span className="text-sm text-gray-800">{selectedTicket.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-600">Assigned To:</span>
            <span className="text-sm text-gray-800">{selectedTicket.assignedTo || 'Unassigned'}</span>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setCurrentView('myTicket')}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const UserProfile = ({ onEditProfile }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmitFeedback = () => {
    alert('Feedback submitted successfully!');
    setFeedback('');
    setRating(0);
  };

  return (
    <div className="bg-gray-100 min-h-screen -m-6">
      <div className="mb-4 p-6 pb-0">
        <h2 className="text-lg font-semibold">User Profile</h2>
      </div>
      <div className="p-6">
        <div className="bg-teal-400 rounded p-6">
          <div className="flex gap-6">
            <div className="bg-white rounded p-6 w-80">
              <div className="flex items-start mb-4">
                <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mr-4">
                  <User size={32} className="text-black" />
                </div>
                <div className="flex-1 flex justify-end">
                  <div
                    className="w-8 h-8 border-2 border-black rounded flex items-center justify-center cursor-pointer"
                    onClick={onEditProfile}
                  >
                    <Edit size={16} className="text-black" />
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div><strong>Username</strong></div>
                <div><strong>Contact Number</strong></div>
                <div><strong>Email</strong></div>
                <div><strong>Department</strong></div>
              </div>
            </div>
            <div className="bg-white rounded p-6 w-80">
              <h3 className="font-semibold mb-4">Give Your Feedback</h3>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Lorem Ipsum"
                className="w-full p-3 border border-gray-300 rounded mb-4 h-20 text-sm bg-gray-100"
              />
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < rating ? 'text-yellow-400 fill-current cursor-pointer' : 'text-gray-300 cursor-pointer'}
                    onClick={() => setRating(i + 1)}
                  />
                ))}
              </div>
              <button
                onClick={handleSubmitFeedback}
                className="bg-teal-400 text-black px-6 py-2 rounded font-medium hover:bg-teal-500"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserProfileSettings = ({ user }) => {
  return (
    <div className="bg-gray-100 min-h-screen -m-6">
      <div className="mb-4 p-6 pb-0">
        <h2 className="text-lg font-semibold">User Profile</h2>
      </div>
      <div className="p-6">
        <div className="bg-white rounded shadow-md">
          <div className="bg-teal-400 text-white p-3 rounded-t">
            <h3 className="font-semibold">Edit Account</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex">
                <div className="w-48">
                  <label className="block text-sm font-medium text-white bg-gray-500 p-2 rounded mb-2">Username</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    defaultValue={user?.name || ''}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-48">
                  <label className="block text-sm font-medium text-white bg-gray-500 p-2 rounded mb-2">Current Password</label>
                  <input type="password" className="w-full p-2 border border-gray-300 rounded" />
                </div>
              </div>
              <div className="flex">
                <div className="w-48">
                  <label className="block text-sm font-medium text-white bg-gray-500 p-2 rounded mb-2">New Password</label>
                  <input type="password" className="w-full p-2 border border-gray-300 rounded" />
                </div>
              </div>
              <div className="flex">
                <div className="w-48">
                  <label className="block text-sm font-medium text-white bg-gray-500 p-2 rounded mb-2">Confirm Password</label>
                  <input type="password" className="w-full p-2 border border-gray-300 rounded" />
                </div>
              </div>
              <div className="flex">
                <div className="w-48">
                  <label className="block text-sm font-medium text-white bg-gray-500 p-2 rounded mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    defaultValue={user?.email || ''}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-48">
                  <label className="block text-sm font-medium text-white bg-gray-500 p-2 rounded mb-2">Real Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    defaultValue={user?.name || ''}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-48">
                  <label className="block text-sm font-medium text-white bg-gray-500 p-2 rounded mb-2">Access Level</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    defaultValue={user?.role || 'user'}
                    disabled
                  />
                </div>
              </div>
              <div className="pt-4">
                <button className="bg-teal-400 text-black px-6 py-2 rounded font-medium hover:bg-teal-500">
                  Update User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;