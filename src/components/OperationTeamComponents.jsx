import React, { useState } from 'react';
import { Star, Edit, Search, ChevronLeft, ChevronRight, Check, X, User, Trash2 } from 'lucide-react';

const BASE_URL = 'https://ticketsystem-backend-twx0.onrender.com/api';

export const OperationDashboard = ({ tickets, user }) => {
  const totalTickets = tickets.length;
  const solvedTickets = tickets.filter(t => t.status === 'closed').length;
  const pendingTickets = tickets.filter(t => t.status === 'pending').length;
  const inProgressTickets = tickets.filter(t => t.status === 'approved').length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg text-center">
          <h3 className="text-sm">Total Tickets</h3>
          <p className="text-3xl font-bold">{totalTickets}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg text-center">
          <h3 className="text-sm">Total Solved</h3>
          <p className="text-3xl font-bold">{solvedTickets}</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg text-center">
          <h3 className="text-sm">Total Awaiting Approval</h3>
          <p className="text-3xl font-bold">{pendingTickets}</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg text-center">
          <h3 className="text-sm">Total In Progress</h3>
          <p className="text-3xl font-bold">{inProgressTickets}</p>
        </div>
      </div>
    </div>
  );
};

export const OperationTicketApproval = ({ tickets, setTickets, users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState(10);

  const handleApprove = async (ticketId) => {
    try {
      const response = await fetch(`${BASE_URL}/tickets/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });
      const data = await response.json();
      if (response.ok) {
        setTickets(tickets.map(t => t._id === ticketId ? { ...t, status: 'approved' } : t));
      } else {
        alert(data.message || 'Failed to approve ticket');
      }
    } catch (error) {
      alert('An error occurred while approving ticket');
      console.error('Approve ticket error:', error);
    }
  };

  const handleReject = async (ticketId) => {
    try {
      const response = await fetch(`${BASE_URL}/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        setTickets(tickets.filter(t => t._id !== ticketId));
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to reject ticket');
      }
    } catch (error) {
      alert('An error occurred while rejecting ticket');
      console.error('Reject ticket error:', error);
    }
  };

  const handleAssign = async (ticketId, assignedTo) => {
    try {
      const response = await fetch(`${BASE_URL}/tickets/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignedTo }),
      });
      const data = await response.json();
      if (response.ok) {
        setTickets(tickets.map(t => t._id === ticketId ? { ...t, assignedTo } : t));
      } else {
        alert(data.message || 'Failed to assign ticket');
      }
    } catch (error) {
      alert('An error occurred while assigning ticket');
      console.error('Assign ticket error:', error);
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.status === 'pending' &&
    (ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) || ticket._id.includes(searchTerm))
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Ticket Approval</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <select
            className="border border-gray-300 rounded p-1"
            value={showEntries}
            onChange={(e) => setShowEntries(Number(e.target.value))}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>Entries</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Find ticket</span>
          <input
            type="text"
            className="border border-gray-300 rounded p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={16} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Ticket No.</th>
              <th className="border p-3 text-left">Subject</th>
              <th className="border p-3 text-left">Description</th>
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Action</th>
              <th className="border p-3 text-left">Assign to</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.slice(0, showEntries).map((ticket) => (
              <tr key={ticket._id}>
                <td className="border p-3">{ticket._id}</td>
                <td className="border p-3">{ticket.title}</td>
                <td className="border p-3">{ticket.description}</td>
                <td className="border p-3">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                <td className="border p-3">
                  <div className="flex space-x-2">
                    <button
                      className="text-green-500 hover:text-green-700"
                      title="Approve"
                      onClick={() => handleApprove(ticket._id)}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      title="Reject"
                      onClick={() => handleReject(ticket._id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
                <td className="border p-3">
                  <select
                    className="border border-gray-300 rounded p-1"
                    value={ticket.assignedTo || ''}
                    onChange={(e) => handleAssign(ticket._id, e.target.value)}
                  >
                    <option value="">Unassigned</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm">Showing 1 to {Math.min(showEntries, filteredTickets.length)} of {filteredTickets.length} entries</span>
        <div className="flex space-x-2">
          <button className="p-2 border border-gray-300 rounded"><ChevronLeft size={16} /></button>
          <button className="p-2 border border-gray-300 rounded bg-teal-400 text-white">1</button>
          <button className="p-2 border border-gray-300 rounded"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
};

export const OperationMyTicket = ({ tickets, setSelectedTicket, setCurrentView, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState(10);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    (ticket.assignedTo === user.id || !ticket.assignedTo) &&
    (ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) || ticket._id.includes(searchTerm))
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Ticket</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <select
            className="border border-gray-300 rounded p-1"
            value={showEntries}
            onChange={(e) => setShowEntries(Number(e.target.value))}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>Entries</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Find ticket</span>
          <input
            type="text"
            className="border border-gray-300 rounded p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={16} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Ticket No.</th>
              <th className="border p-3 text-left">Subject</th>
              <th className="border p-3 text-left">Description</th>
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-left">Person in charge</th>
              <th className="border p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.slice(0, showEntries).map((ticket) => (
              <tr key={ticket._id}>
                <td className="border p-3">
                  <button
                    className="text-blue-600 underline"
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setCurrentView('ticketDetails');
                    }}
                  >
                    {ticket._id}
                  </button>
                </td>
                <td className="border p-3">{ticket.title}</td>
                <td className="border p-3">{ticket.description}</td>
                <td className="border p-3">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                <td className="border p-3">
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="border p-3">{ticket.assignedTo || 'Unassigned'}</td>
                <td className="border p-3">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setCurrentView('ticketDetails');
                      }}
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm">Showing 1 to {Math.min(showEntries, filteredTickets.length)} of {filteredTickets.length} entries</span>
        <div className="flex space-x-2">
          <button className="p-2 border border-gray-300 rounded"><ChevronLeft size={16} /></button>
          <button className="p-2 border border-gray-300 rounded bg-teal-400 text-white">1</button>
          <button className="p-2 border border-gray-300 rounded"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
};

export const OperationTicketDetails = ({ selectedTicket, setCurrentView, onCloseTicket, onUpdateTicket, user, users }) => {
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [status, setStatus] = useState(selectedTicket?.status || 'pending');

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tickets/${selectedTicket._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, assignedTo: teamMember || selectedTicket.assignedTo }),
      });
      const data = await response.json();
      if (response.ok) {
        onUpdateTicket(selectedTicket._id, { status, assignedTo: teamMember || selectedTicket.assignedTo });
        setCurrentView('myTicket');
      } else {
        alert(data.message || 'Failed to update ticket');
      }
    } catch (error) {
      alert('An error occurred while updating ticket');
      console.error('Update ticket error:', error);
    }
  };

  const handleCloseTicket = async () => {
    if (teamName && teamMember) {
      try {
        const response = await fetch(`${BASE_URL}/tickets/${selectedTicket._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'closed', closedBy: teamName, closedByMember: teamMember }),
        });
        const data = await response.json();
        if (response.ok) {
          onCloseTicket(selectedTicket._id, teamName, teamMember);
          setShowCloseModal(false);
          setCurrentView('myTicket');
        } else {
          alert(data.message || 'Failed to close ticket');
        }
      } catch (error) {
        alert('An error occurred while closing ticket');
        console.error('Close ticket error:', error);
      }
    } else {
      alert('Please provide team name and member');
    }
  };

  if (!selectedTicket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4">Ticket Details</h3>
        <div className="space-y-3 mb-6">
          <div><span className="font-medium">Ticket No:</span> {selectedTicket._id}</div>
          <div><span className="font-medium">Date:</span> {new Date(selectedTicket.createdAt).toLocaleDateString()}</div>
          <div><span className="font-medium">Name:</span> {selectedTicket.createdBy?.name || 'User'}</div>
          <div><span className="font-medium">Title:</span> {selectedTicket.title}</div>
          <div><span className="font-medium">Description:</span> {selectedTicket.description}</div>
          <div>
            <span className="font-medium">Status:</span>
            <select
              className="ml-2 border border-gray-300 rounded p-1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <span className="font-medium">Assigned To:</span>
            <select
              className="ml-2 border border-gray-300 rounded p-1"
              value={teamMember || selectedTicket.assignedTo || ''}
              onChange={(e) => setTeamMember(e.target.value)}
            >
              <option value="">Unassigned</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => setShowCloseModal(true)}
          >
            Close
          </button>
        </div>
      </div>

      {showCloseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4 text-center">My Ticket - Close Ticket</h3>
            <div className="bg-teal-400 p-4 rounded-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Ticket No.</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={selectedTicket._id}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Team name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Team Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Team Member</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded"
                    value={teamMember}
                    onChange={(e) => setTeamMember(e.target.value)}
                  >
                    <option value="">Select member</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 flex items-center"
                    onClick={handleCloseTicket}
                  >
                    <Check size={16} className="mr-2" />
                    Close Ticket
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => setShowCloseModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const OperationPerformance = ({ user, tickets }) => {
  const totalTickets = tickets.filter(t => t.assignedTo === user.id).length;
  const solvedTickets = tickets.filter(t => t.assignedTo === user.id && t.status === 'closed').length;
  const pendingTickets = tickets.filter(t => t.assignedTo === user.id && t.status === 'pending').length;
  const inProgressTickets = tickets.filter(t => t.assignedTo === user.id && t.status === 'approved').length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Performance</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-200 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <User size={40} className="text-gray-600 mr-4" />
            <div>
              <h3 className="font-bold">{user.name}</h3>
              <p className="text-sm text-gray-600">Contact No: {user.contact || 'N/A'}</p>
              <p className="text-sm text-gray-600">Department: {user.department || 'Operations'}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Ticket Handle</span>
              <span className="font-bold">{totalTickets}</span>
            </div>
            <div className="flex justify-between">
              <span>Ticket Solved</span>
              <span className="font-bold">{solvedTickets}</span>
            </div>
            <div className="flex justify-between">
              <span>Ticket Pending</span>
              <span className="font-bold">{pendingTickets}</span>
            </div>
            <div className="flex justify-between">
              <span>Ticket in progress</span>
              <span className="font-bold">{inProgressTickets}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OperationProfile = ({ onEditProfile, user }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleFeedbackSubmit = () => {
    setFeedback('');
    setRating(0);
    alert('Feedback submitted!');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>
      <div className="bg-teal-400 p-6 rounded-lg">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-gray-200 p-4 rounded-full mr-4">
                <User size={40} className="text-gray-600" />
              </div>
              <button
                className="bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-500"
                onClick={onEditProfile}
              >
                Edit Profile
              </button>
            </div>
            <div className="space-y-2">
              <div><span className="font-medium">Username:</span> {user.name}</div>
              <div><span className="font-medium">Contact Number:</span> {user.contact || 'N/A'}</div>
              <div><span className="font-medium">Email:</span> {user.email}</div>
              <div><span className="font-medium">Department:</span> {user.department || 'Operations'}</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-gray-200 p-4 rounded-full mr-4">
                <User size={40} className="text-gray-600" />
              </div>
              <span className="font-medium">Give Your Feedback</span>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your feedback"
                className="w-full p-2 border border-gray-300 rounded"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < rating ? 'text-yellow-300 fill-current cursor-pointer' : 'text-gray-300 cursor-pointer'}
                    onClick={() => setRating(i + 1)}
                  />
                ))}
              </div>
              <button
                className="bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-500"
                onClick={handleFeedbackSubmit}
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

export const OperationProfileSettings = ({ user }) => {
  const [username, setUsername] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [contact, setContact] = useState(user?.contact || '');
  const [department, setDepartment] = useState(user?.department || 'Operations');

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, email, contact, department }),
      });
      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to update profile');
      }
    } catch (error) {
      alert('An error occurred while updating profile');
      console.error('Update profile error:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>
      <div className="bg-teal-400 p-6 rounded-lg">
        <div className="bg-white p-6 rounded-lg">
          <div className="bg-teal-400 text-white p-3 rounded mb-4">
            <h3 className="font-bold">Edit Account</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 bg-gray-500 text-white p-2 rounded">Username</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 bg-gray-500 text-white p-2 rounded">Current Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 bg-gray-500 text-white p-2 rounded">New Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 bg-gray-500 text-white p-2 rounded">Confirm Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 bg-gray-500 text-white p-2 rounded">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 bg-gray-500 text-white p-2 rounded">Contact Number</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 bg-gray-500 text-white p-2 rounded">Department</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              className="bg-teal-400 text-white px-6 py-2 rounded hover:bg-teal-500"
              onClick={handleUpdate}
            >
              Update User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OperationTeamCreation = ({ onCreateTeam }) => {
  const [teamName, setTeamName] = useState('');
  const [teamMember, setTeamMember] = useState('');

  const handleCreateTeam = () => {
    if (teamName && teamMember) {
      onCreateTeam(teamName, teamMember);
      setTeamName('');
      setTeamMember('');
    } else {
      alert('Please provide team name and member');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-xl font-bold mb-4 text-center">My Ticket - Team Creation</h3>
        <div className="bg-teal-400 p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Ticket No.</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value="Auto-generated"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Team name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Team Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Team Member</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={teamMember}
                onChange={(e) => setTeamMember(e.target.value)}
              >
                <option value="">Select member</option>
                <option value="John Doe">John Doe</option>
                <option value="Alice Smith">Alice Smith</option>
              </select>
            </div>
            <button
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 flex items-center"
              onClick={handleCreateTeam}
            >
              <Check size={16} className="mr-2" />
              Create Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};