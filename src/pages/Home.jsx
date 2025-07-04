import React, { useState, useEffect, Component } from 'react';
import { Search, ChevronLeft, ChevronRight, Plus, Check, X, Star, Eye, Edit, Trash2 } from 'lucide-react';
import BMIcon from '../assets/icons/bm.svg?react';
import DashboardIcon from '../assets/icons/dashboard.svg?react';
import DatabaseIcon from '../assets/icons/database.svg?react';
import GroupIcon from '../assets/icons/Group.svg?react';
import MyTicketIcon from '../assets/icons/myticket.svg?react';
import NewTicketIcon from '../assets/icons/newticket.svg?react';
import OperationTeamIcon from '../assets/icons/operationteam.svg?react';
import PerformanceIcon from '../assets/icons/performance.svg?react';
import TechnicalSupportIcon from '../assets/icons/technicalsupport.svg?react';
import TicketApprovalIcon from '../assets/icons/ticketapproval.svg?react';
import UserLogIcon from '../assets/icons/userlog.svg?react';
import BellIcon from '../assets/icons/bell.svg?react';
import PersonIcon from '../assets/icons/person.svg?react';
import BackIcon from '../assets/icons/back.svg?react';
import { AdminDashboard, AdminDatabase, AdminSettings, AdminUserLogHistory, AdminProfile, AdminProfileSetting } from '../components/AdminComponents';
import {
  OperationDashboard,
  OperationTicketApproval,
  OperationMyTicket,
  OperationTicketDetails,
  OperationPerformance,
  OperationProfile,
  OperationProfileSettings,
  OperationTeamCreation
} from '../components/OperationTeamComponents';
import { UserDashboard, UserNewTicket, UserMyTicket, UserTicketDetails, UserProfile, UserProfileSettings } from '../components/UserComponents';
import { TechnicalSupportDashboard, TechnicalSupportMyTicket, TechnicalSupportTicketDetails, TechnicalSupportCloseTicket, TechnicalSupportTeamCreation, TechnicalSupportPerformance, TechnicalSupportProfile, TechnicalSupportProfileSettings } from '../components/Technical';

const BASE_URL = 'https://ticketsystem-backend-twx0.onrender.com/api';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold text-red-600">Something went wrong.</h2>
          <p className="text-gray-700">{this.state.error?.message}</p>
          <button
            className="mt-4 bg-teal-400 text-white px-6 py-2 rounded hover:bg-teal-500"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const HelpdeskSystem = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [teamData, setTeamData] = useState({ name: '', member: '' });
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [showTeamCreation, setShowTeamCreation] = useState(false);
  const [showTicketDetailsModal, setShowTicketDetailsModal] = useState(false);
  const [showCloseTicketModal, setShowCloseTicketModal] = useState(false);
  const [showTeamCreationModal, setShowTeamCreationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [tickets, setTickets] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [users] = useState([
    { id: 'ABC123', name: 'Abu Rahman', department: 'IT', email: 'abu@company.com', contact: '0123456789' },
    { id: 'DEF456', name: 'John Doe', department: 'Operations', email: 'john@company.com', contact: '0987654321' },
    { id: 'GHI789', name: 'Alice Smith', department: 'Operations', email: 'alice@company.com', contact: '1234567890' },
  ]);
  const [performanceData] = useState([
    { name: 'Technical Support 1', ticketsResolved: 25, rating: 4.5 },
  ]);
  const [operationData] = useState({
    name: "Operation Name",
    contact: "0123456789",
    department: "ABC",
    totalTickets: 5,
    solved: 2,
    pending: 1,
    inProgress: 2,
    rating: 4
  });
  const [userLogs] = useState([
    { id: 1, user: 'John Doe', action: 'Login', timestamp: '2021-08-13 09:30:00' },
  ]);

  useEffect(() => {
    if (user && userRole === 'user') {
      fetchUserTickets();
    }
    if (user && userRole === 'operation') {
      fetchPendingTickets();
    }
    if (user && userRole === 'technical') {
      fetchUserTickets();
    }
  }, [user, userRole]);

  const fetchUserTickets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/tickets?userId=${user._id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        setTickets(data || []); // Ensure array
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Failed to fetch tickets');
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching tickets');
      console.error('Fetch tickets error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPendingTickets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/tickets/pending`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        setTickets(data || []); // Ensure array
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Failed to fetch pending tickets');
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching pending tickets');
      console.error('Fetch pending tickets error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setUserRole(data.user.role);
        setCurrentView('dashboard');
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setCurrentView('login');
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Signup failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred during signup');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTicket = async (ticketData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...ticketData, createdBy: user._id }),
      });
      const data = await response.json();
      if (response.ok) {
        setTickets([...tickets, data]);
        setCurrentView('myTicket');
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Failed to create ticket');
      }
    } catch (error) {
      setErrorMessage('An error occurred while creating ticket');
      console.error('Create ticket error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTicket = async (ticketId, updateData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/tickets/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      if (response.ok) {
        setTickets(tickets.map(t => t._id === ticketId ? { ...t, ...data } : t));
        setShowTicketDetails(false);
        setShowTicketDetailsModal(false);
        alert('Ticket updated successfully!');
      } else {
        setErrorMessage(data.message || 'Failed to update ticket');
      }
    } catch (error) {
      setErrorMessage('An error occurred while updating ticket');
      console.error('Update ticket error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        setTickets(tickets.filter(t => t._id !== ticketId));
        setShowTicketDetails(false);
        setShowTicketDetailsModal(false);
        alert('Ticket deleted successfully!');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Failed to delete ticket');
      }
    } catch (error) {
      setErrorMessage('An error occurred while deleting ticket');
      console.error('Delete ticket error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseTicket = (ticketId, teamName, teamMember) => {
    handleUpdateTicket(ticketId, { status: 'closed', closedBy: teamName, closedByMember: teamMember });
  };

  const handleTechnicalTicketUpdate = (ticketId) => {
    handleUpdateTicket(ticketId, { status: 'In Progress', lastUpdated: new Date().toISOString() });
  };

  const handleTechnicalTicketClose = (ticketId, teamName, remark) => {
    handleUpdateTicket(ticketId, { status: 'closed', closedBy: teamName, remark });
  };

  const handleCreateTeam = (teamName, teamMember) => {
    alert(`Team "${teamName}" created with member "${teamMember}"`);
    setShowTeamCreation(false);
    setCurrentView('myTicket');
  };

  const handleTechnicalTeamCreation = (teamName, teamMember, remark) => {
    alert(`Team "${teamName}" created with member "${teamMember}"`);
    setShowTeamCreationModal(false);
  };

  const handleEditProfile = () => {
    setCurrentView('profileSetting');
  };

  const handleTechnicalEditProfile = () => {
    setCurrentView('profileSetting');
  };

  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      handleLogin(email, password);
    };

    return (
      <div className="min-h-screen bg-teal-400 flex items-center justify-center">
        <div className="bg-teal-400 ">
          <div className="bg-teal-200 p-6 rounded-lg">
            <div className=" mb-4">
              <h2 className="text-center font-bold text-lg">Helpdesk System</h2>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              <button
                onClick={handleSubmit}
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
              <div className="flex justify-between text-sm">
                <a href="#" className="text-red-500" onClick={() => setCurrentView('forgot')}>Forgot password</a>
                <a href="#" className="text-gray-700" onClick={() => setCurrentView('signup')}>Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      handleSignup(name, email, password);
    };

    return (
      <div className="min-h-screen bg-teal-400 flex items-center justify-center">
        <div className="bg-teal-400 ">
          <div className="bg-teal-200 p-6 rounded-lg">
            <div className=" p-4 rounded   mb-4">
              <h2 className="text-center font-bold text-lg">Helpdesk System</h2>
            </div>
            <p className="text-center mb-4">Sign up here</p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
              <div className="flex justify-between text-sm">
                <a href="#" className="text-red-500" onClick={() => setCurrentView('forgot')}>Forgot password</a>
                <a href="#" className="text-gray-700" onClick={() => setCurrentView('login')}>Sign In</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ForgotPasswordPage = () => (
    <div className="min-h-screen bg-teal-400 flex items-center justify-center">
      <div className="bg-teal-400 ">
        <div className="bg-teal-200 p-6 rounded-lg">
          <div className=" p-4  mb-4">
            <h2 className="text-center font-bold text-lg">Helpdesk System</h2>
          </div>
          <p className="text-center mb-4 text-sm">Enter your email address and we'll send you a link to reset your password.</p>
          <div className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded" />
            <button onClick={() => setCurrentView('login')} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Send Reset Link</button>
            <div className="text-center">
              <a href="#" className="text-gray-700 text-sm" onClick={() => setCurrentView('login')}>Back to Sign In</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Sidebar = ({ role, setCurrentView, currentView }) => {
    const sidebarItems = {
      user: [
        { icon: DashboardIcon, text: 'Dashboard', key: 'dashboard' },
        { icon: NewTicketIcon, text: 'New Ticket', key: 'newTicket' },
        { icon: MyTicketIcon, text: 'My Ticket', key: 'myTicket' },
      ],
      operation: [
        { icon: DashboardIcon, text: 'Dashboard', key: 'dashboard' },
        { icon: TicketApprovalIcon, text: 'Ticket Approval', key: 'ticketApproval' },
        { icon: MyTicketIcon, text: 'My Ticket', key: 'myTicket' },
        { icon: OperationTeamIcon, text: 'Team Creation', key: 'teamCreation' },
        { icon: PerformanceIcon, text: 'Performance', key: 'performance' },
      ],
      technical: [
        { icon: DashboardIcon, text: 'Dashboard', key: 'dashboard' },
        { icon: MyTicketIcon, text: 'My Ticket', key: 'myTicket' },
        { icon: PerformanceIcon, text: 'Performance', key: 'performance' },
      ],
      admin: [
        { icon: DashboardIcon, text: 'Dashboard', key: 'dashboard' },
        { icon: DatabaseIcon, text: 'Database', key: 'database' },
        { icon: BMIcon, text: 'Setting', key: 'setting' },
        { icon: UserLogIcon, text: 'User Log History', key: 'userLog' },
        { icon: GroupIcon, text: 'Profile Setting', key: 'profileSetting' },
      ],
    };
    return (
      <div className="bg-gray-100 w-64 min-h-screen p-4">
        <div className="bg-teal-400 p-4 rounded-lg mb-4">
          <h2 className="text-white font-bold text-lg">Helpdesk</h2>
        </div>
        <nav className="space-y-2">
          {sidebarItems[role]?.map((item) => (
            <button
              key={item.key}
              onClick={() => setCurrentView(item.key)}
              className={`w-full flex items-center space-x-3 p-3 text-left rounded ${currentView === item.key ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.text}</span>
            </button>
          ))}
        </nav>
      </div>
    );
  };

  const Header = ({ title, role }) => (
    <div className="bg-teal-400 p-4 flex justify-between items-center">
      <h1 className="text-white font-bold text-lg">Helpdesk</h1>
      <div className="flex items-center space-x-4">
        <BMIcon ></BMIcon>
        <BellIcon className="text-white w-5 h-5 cursor-pointer" title="Notifications" />
        <PersonIcon
          className="text-white w-5 h-5 cursor-pointer"
          onClick={() => setCurrentView('profile')}
          title="Profile & Feedback"
        />
        <BackIcon
          className="text-white w-5 h-5 cursor-pointer"
          onClick={() => {
            setUser(null);
            setUserRole(null);
            setCurrentView('login');
          }}
          title="Logout"
        />
      </div>
    </div>
  );

  return (
    <ErrorBoundary>
      <div className="flex">
        {currentView !== 'login' && currentView !== 'signup' && currentView !== 'forgot' && (
          <Sidebar role={userRole} setCurrentView={setCurrentView} currentView={currentView} />
        )}
        <div className="flex-1">
          {currentView !== 'login' && currentView !== 'signup' && currentView !== 'forgot' && (
            <Header title={currentView} role={userRole} />
          )}
          <div className="p-0">
            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
            {isLoading && <p className="text-gray-700">Loading...</p>}
            {!isLoading && (
              <>
                {currentView === 'login' && <LoginPage />}
                {currentView === 'signup' && <SignUpPage />}
                {currentView === 'forgot' && <ForgotPasswordPage />}
                {currentView === 'dashboard' && userRole === 'admin' && <AdminDashboard />}
                {currentView === 'dashboard' && userRole === 'user' && <UserDashboard tickets={tickets} />}
                {currentView === 'dashboard' && userRole === 'operation' && (
                  <OperationDashboard tickets={tickets} user={user} />
                )}
                {currentView === 'dashboard' && userRole === 'technical' && <TechnicalSupportDashboard />}
                {currentView === 'newTicket' && userRole === 'user' && (
                  <UserNewTicket user={user} onCreateTicket={handleCreateTicket} />
                )}
                {currentView === 'newTicket' && userRole !== 'user' && (
                  <UserNewTicket user={user} onCreateTicket={handleCreateTicket} />
                )}
                {currentView === 'ticketApproval' && userRole === 'operation' && (
                  <OperationTicketApproval tickets={tickets} setTickets={setTickets} users={users} />
                )}
                {currentView === 'ticketApproval' && userRole === 'technical' && (
                  <OperationTicketApproval tickets={tickets} setTickets={setTickets} users={users} />
                )}
                {currentView === 'myTicket' && userRole === 'user' && (
                  <UserMyTicket tickets={tickets} setSelectedTicket={setSelectedTicket} setCurrentView={setCurrentView} />
                )}
                {currentView === 'myTicket' && userRole === 'operation' && (
                  <OperationMyTicket
                    tickets={tickets}
                    setSelectedTicket={setSelectedTicket}
                    setCurrentView={setCurrentView}
                    user={user}
                  />
                )}
                {currentView === 'myTicket' && userRole === 'technical' && (
                  <TechnicalSupportMyTicket
                    tickets={tickets}
                    setSelectedTicket={setSelectedTicket}
                    setCurrentView={setCurrentView}
                  />
                )}
                {currentView === 'ticketDetails' && userRole === 'user' && (
                  <UserTicketDetails selectedTicket={selectedTicket} setCurrentView={setCurrentView} />
                )}
                {currentView === 'ticketDetails' && userRole === 'operation' && (
                  <OperationTicketDetails
                    selectedTicket={selectedTicket}
                    setCurrentView={setCurrentView}
                    onCloseTicket={handleCloseTicket}
                    onUpdateTicket={handleUpdateTicket}
                    user={user}
                    users={users}
                  />
                )}
                {currentView === 'ticketDetails' && userRole === 'technical' && (
                  <TechnicalSupportTicketDetails
                    selectedTicket={selectedTicket}
                    onClose={() => setShowTicketDetailsModal(false)}
                    onUpdate={handleTechnicalTicketUpdate}
                  />
                )}
                {currentView === 'performance' && userRole === 'operation' && (
                  <OperationPerformance user={user} tickets={tickets} />
                )}
                {currentView === 'performance' && userRole === 'technical' && (
                  <TechnicalSupportPerformance performanceData={performanceData} />
                )}
                {currentView === 'profile' && userRole === 'admin' && <AdminProfile />}
                {currentView === 'profile' && userRole === 'user' && (
                  <UserProfile onEditProfile={handleEditProfile} user={user} />
                )}
                {currentView === 'profile' && userRole === 'operation' && (
                  <OperationProfile onEditProfile={handleEditProfile} user={user} />
                )}
                {currentView === 'profile' && userRole === 'technical' && (
                  <TechnicalSupportProfile onEditProfile={handleTechnicalEditProfile} />
                )}
                {currentView === 'database' && userRole === 'admin' && <AdminDatabase />}
                {currentView === 'setting' && userRole === 'admin' && <AdminSettings />}
                {currentView === 'userLog' && userRole === 'admin' && <AdminUserLogHistory userLogs={userLogs} />}
                {currentView === 'profileSetting' && userRole === 'user' && <UserProfileSettings user={user} />}
                {currentView === 'profileSetting' && userRole === 'admin' && <AdminProfileSetting />}
                {currentView === 'profileSetting' && userRole === 'operation' && (
                  <OperationProfileSettings user={user} />
                )}
                {currentView === 'profileSetting' && userRole === 'technical' && (
                  <TechnicalSupportProfileSettings />
                )}
                {currentView === 'teamCreation' && userRole === 'operation' && (
                  <OperationTeamCreation onCreateTeam={handleCreateTeam} />
                )}
                {showTicketDetails && userRole === 'operation' && (
                  <OperationTicketDetails
                    selectedTicket={selectedTicket}
                    setCurrentView={setCurrentView}
                    onCloseTicket={handleCloseTicket}
                    onUpdateTicket={handleUpdateTicket}
                    user={user}
                    users={users}
                  />
                )}
                {showTeamCreation && userRole === 'operation' && (
                  <OperationTeamCreation onCreateTeam={handleCreateTeam} />
                )}
                {showTicketDetailsModal && userRole === 'technical' && (
                  <TechnicalSupportTicketDetails
                    selectedTicket={selectedTicket}
                    onClose={() => setShowTicketDetailsModal(false)}
                    onUpdate={handleTechnicalTicketUpdate}
                  />
                )}
                {showCloseTicketModal && userRole === 'technical' && (
                  <TechnicalSupportCloseTicket
                    selectedTicket={selectedTicket}
                    onClose={() => setShowCloseTicketModal(false)}
                    onCloseTicket={handleTechnicalTicketClose}
                  />
                )}
                {showTeamCreationModal && userRole === 'technical' && (
                  <TechnicalSupportTeamCreation
                    onClose={() => setShowTeamCreationModal(false)}
                    onCreateTeam={handleTechnicalTeamCreation}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default HelpdeskSystem;