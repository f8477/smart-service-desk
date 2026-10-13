import { useMemo, useState } from 'react';
import './App.css';

type TicketStatus =
  | 'Open'
  | 'In Progress'
  | 'Waiting'
  | 'Resolved';

type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

type Ticket = {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  requester: string;
  initials: string;
  date: string;
};

const initialTickets: Ticket[] = [
  {
    id: 'TKT-1042',
    title: 'Unable to connect to company VPN',
    description: 'Connection drops after authentication',
    category: 'Network',
    priority: 'Critical',
    status: 'Open',
    requester: 'Olivia Martin',
    initials: 'OM',
    date: 'Oct 13, 2026',
  },
  {
    id: 'TKT-1041',
    title: 'Outlook keeps crashing',
    description: 'Application closes when opening attachments',
    category: 'Software',
    priority: 'High',
    status: 'In Progress',
    requester: 'James Wilson',
    initials: 'JW',
    date: 'Oct 13, 2026',
  },
  {
    id: 'TKT-1040',
    title: 'Request access to shared folder',
    description: 'Need access to the marketing team drive',
    category: 'Account',
    priority: 'Medium',
    status: 'Waiting',
    requester: 'Sophia Chen',
    initials: 'SC',
    date: 'Oct 12, 2026',
  },
  {
    id: 'TKT-1039',
    title: 'External monitor not detected',
    description: 'Second monitor is not recognized by Windows',
    category: 'Hardware',
    priority: 'High',
    status: 'In Progress',
    requester: 'Noah Davis',
    initials: 'ND',
    date: 'Oct 12, 2026',
  },
  {
    id: 'TKT-1038',
    title: 'Password reset request',
    description: 'Unable to sign in after password expiration',
    category: 'Account',
    priority: 'Low',
    status: 'Resolved',
    requester: 'Emma Thompson',
    initials: 'ET',
    date: 'Oct 11, 2026',
  },
  {
    id: 'TKT-1037',
    title: 'Printer not responding',
    description: 'Office printer is offline for the team',
    category: 'Hardware',
    priority: 'Medium',
    status: 'Open',
    requester: 'Liam Brown',
    initials: 'LB',
    date: 'Oct 11, 2026',
  },
];

const navigation = [
  { label: 'Dashboard', icon: '▦' },
  { label: 'All Tickets', icon: '▤' },
  { label: 'My Tickets', icon: '♙' },
  { label: 'Knowledge Base', icon: '▧' },
  { label: 'Reports', icon: '▥' },
];

function App() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [notification, setNotification] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('Software');
  const [newPriority, setNewPriority] =
    useState<TicketPriority>('Medium');

  const openCount = tickets.filter(
    (ticket) => ticket.status === 'Open',
  ).length;

  const progressCount = tickets.filter(
    (ticket) => ticket.status === 'In Progress',
  ).length;

  const resolvedCount = tickets.filter(
    (ticket) => ticket.status === 'Resolved',
  ).length;

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch = [
        ticket.id,
        ticket.title,
        ticket.requester,
        ticket.category,
      ].some((value) =>
        value.toLowerCase().includes(search.toLowerCase()),
      );

      const matchesFilter =
        activeFilter === 'All' || ticket.status === activeFilter;

      const matchesNavigation =
        activeNav !== 'My Tickets' ||
        ticket.requester === 'Olivia Martin';

      return matchesSearch && matchesFilter && matchesNavigation;
    });
  }, [tickets, search, activeFilter, activeNav]);

  function handleCreateTicket(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const ticket: Ticket = {
      id: `TKT-${1043 + tickets.length - initialTickets.length}`,
      title: newTitle.trim(),
      description: newDescription.trim(),
      category: newCategory,
      priority: newPriority,
      status: 'Open',
      requester: 'You',
      initials: 'YO',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setTickets((current) => [ticket, ...current]);
    setShowCreateForm(false);
    setActiveNav('All Tickets');
    setActiveFilter('All');
    setSearch('');
    setNewTitle('');
    setNewDescription('');
    setNewCategory('Software');
    setNewPriority('Medium');
    setNotification('Ticket created successfully.');

    window.setTimeout(() => setNotification(''), 3000);
  }

  function handleNavigation(label: string) {
    setActiveNav(label);
    setActiveFilter('All');

    if (label === 'Knowledge Base' || label === 'Reports') {
      setNotification(`${label} page is coming soon.`);
      window.setTimeout(() => setNotification(''), 3000);
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a
          className="brand"
          href="#dashboard"
          onClick={() => handleNavigation('Dashboard')}
        >
          <span className="brand-mark">
            <span>✳</span>
          </span>
          <span className="brand-copy">
            <strong>smartdesk</strong>
            <small>IT SERVICE MANAGEMENT</small>
          </span>
        </a>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${
                activeNav === item.label ? 'active' : ''
              }`}
              onClick={() => handleNavigation(item.label)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.label === 'All Tickets' && (
                <span className="nav-count">{tickets.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">✦</div>
            <strong>Work smarter</strong>
            <p>Keep every support request organized in one place.</p>
            <button
              className="upgrade-link"
              onClick={() => {
                setNotification('You are using the Smart Desk demo.');
                window.setTimeout(() => setNotification(''), 3000);
              }}
            >
              Explore workspace <span>→</span>
            </button>
          </div>

          <button
            className="profile-card"
            onClick={() => {
              setNotification('Profile settings are coming soon.');
              window.setTimeout(() => setNotification(''), 3000);
            }}
          >
            <span className="avatar avatar-purple">FA</span>
            <span className="profile-info">
              <strong>Fatemeh Arabkhani</strong>
              <small>Administrator</small>
            </span>
            <span className="profile-menu">···</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-separator">/</span>
            <strong>{activeNav}</strong>
          </div>

          <div className="topbar-actions">
            <span className="system-status">
              <span className="status-dot" />
              All systems operational
            </span>
            <button
              className="icon-button notification-button"
              aria-label="Notifications"
              onClick={() => {
                setNotification('You are all caught up!');
                window.setTimeout(() => setNotification(''), 3000);
              }}
            >
              ♧
              <span className="notification-indicator" />
            </button>
            <span className="avatar avatar-purple topbar-avatar">FA</span>
          </div>
        </header>

        <div className="page-container">
          <section className="welcome-row">
            <div>
              <div className="eyebrow">
                MONDAY, OCTOBER 13, 2026
              </div>
              <h1>
                {activeNav === 'Dashboard'
                  ? 'Good morning, Fatemeh'
                  : activeNav}
                <span className="heading-wave">
                  {activeNav === 'Dashboard' ? ' ✨' : ''}
                </span>
              </h1>
              <p className="page-subtitle">
                Here&apos;s what&apos;s happening with your support desk today.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => setShowCreateForm(true)}
            >
              <span className="plus-icon">+</span>
              Create ticket
            </button>
          </section>

          <section className="stats-grid" aria-label="Ticket statistics">
            <article className="stat-card">
              <div className="stat-topline">
                <span className="stat-label">Total tickets</span>
                <span className="stat-icon stat-icon-blue">▤</span>
              </div>
              <div className="stat-value">{tickets.length}</div>
              <div className="stat-footnote">
                <span className="trend-neutral">All requests</span>
                <span> in your workspace</span>
              </div>
              <div className="mini-bars bars-blue" aria-hidden="true">
                {[35, 55, 42, 68, 48, 78, 58, 90, 70, 100, 76, 86].map(
                  (height, index) => (
                    <span key={index} style={{ height: `${height}%` }} />
                  ),
                )}
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-topline">
                <span className="stat-label">Open tickets</span>
                <span className="stat-icon stat-icon-orange">◷</span>
              </div>
              <div className="stat-value">{openCount}</div>
              <div className="stat-footnote">
                <span className="trend-orange">Needs attention</span>
                <span> awaiting action</span>
              </div>
              <div className="mini-bars bars-orange" aria-hidden="true">
                {[60, 40, 75, 50, 82, 58, 68, 42, 90, 62, 76, 48].map(
                  (height, index) => (
                    <span key={index} style={{ height: `${height}%` }} />
                  ),
                )}
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-topline">
                <span className="stat-label">In progress</span>
                <span className="stat-icon stat-icon-purple">↻</span>
              </div>
              <div className="stat-value">{progressCount}</div>
              <div className="stat-footnote">
                <span className="trend-purple">Being handled</span>
                <span> by the support team</span>
              </div>
              <div className="mini-bars bars-purple" aria-hidden="true">
                {[40, 62, 48, 80, 60, 92, 68, 48, 75, 58, 84, 65].map(
                  (height, index) => (
                    <span key={index} style={{ height: `${height}%` }} />
                  ),
                )}
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-topline">
                <span className="stat-label">Resolved</span>
                <span className="stat-icon stat-icon-green">✓</span>
              </div>
              <div className="stat-value">{resolvedCount}</div>
              <div className="stat-footnote">
                <span className="trend-green">Successfully closed</span>
                <span> requests</span>
              </div>
              <div className="mini-bars bars-green" aria-hidden="true">
                {[35, 48, 42, 62, 55, 75, 58, 85, 68, 95, 76, 100].map(
                  (height, index) => (
                    <span key={index} style={{ height: `${height}%` }} />
                  ),
                )}
              </div>
            </article>
          </section>

          <section className="content-grid">
            <article className="panel tickets-panel">
              <div className="panel-heading">
                <div>
                  <h2>Recent tickets</h2>
                  <p>Track and manage support requests.</p>
                </div>
                <button
                  className="text-button"
                  onClick={() => handleNavigation('All Tickets')}
                >
                  View all <span>→</span>
                </button>
              </div>

              <div className="ticket-toolbar">
                <div className="search-box">
                  <span className="search-icon">⌕</span>
                  <input
                    type="search"
                    placeholder="Search tickets..."
                    aria-label="Search tickets"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <kbd>⌘ K</kbd>
                </div>

                <select
                  className="filter-select"
                  aria-label="Filter by status"
                  value={activeFilter}
                  onChange={(event) => setActiveFilter(event.target.value)}
                >
                  <option value="All">All statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In progress</option>
                  <option value="Waiting">Waiting</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="table-scroll">
                <table className="tickets-table">
                  <thead>
                    <tr>
                      <th>Ticket</th>
                      <th>Requester</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map((ticket) => (
                      <tr key={ticket.id}>
                        <td>
                          <div className="ticket-title-cell">
                            <span className="ticket-id">{ticket.id}</span>
                            <strong>{ticket.title}</strong>
                            <span className="ticket-description">
                              {ticket.category} · {ticket.description}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="requester-cell">
                            <span className="avatar avatar-small">
                              {ticket.initials}
                            </span>
                            <span>{ticket.requester}</span>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`priority priority-${ticket.priority
                              .toLowerCase()
                              .replace(' ', '-')}`}
                          >
                            <span className="priority-dot" />
                            {ticket.priority}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`ticket-status status-${ticket.status
                              .toLowerCase()
                              .replaceAll(' ', '-')}`}
                          >
                            <span className="status-dot-small" />
                            {ticket.status}
                          </span>
                        </td>
                        <td className="date-cell">{ticket.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredTickets.length === 0 && (
                  <div className="empty-state">
                    <span className="empty-icon">⌕</span>
                    <strong>No tickets found</strong>
                    <p>Try another search term or change the status filter.</p>
                    <button
                      className="text-button"
                      onClick={() => {
                        setSearch('');
                        setActiveFilter('All');
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>

              <div className="table-footer">
                <span>
                  Showing <strong>{filteredTickets.length}</strong> of{' '}
                  <strong>{tickets.length}</strong> tickets
                </span>
                <div className="pagination">
                  <button aria-label="Previous page" disabled>
                    ‹
                  </button>
                  <button className="current-page">1</button>
                  <button aria-label="Next page" disabled>
                    ›
                  </button>
                </div>
              </div>
            </article>

            <aside className="right-column">
              <article className="panel priority-panel">
                <div className="panel-heading compact-heading">
                  <div>
                    <h2>Priority overview</h2>
                    <p>Tickets by urgency</p>
                  </div>
                  <span className="heading-menu">···</span>
                </div>

                <div className="priority-overview">
                  {(
                    [
                      ['Critical', '#e34f5f'],
                      ['High', '#f49a45'],
                      ['Medium', '#5689ec'],
                      ['Low', '#39a982'],
                    ] as const
                  ).map(([priority, color]) => {
                    const count = tickets.filter(
                      (ticket) => ticket.priority === priority,
                    ).length;
                    const percent = tickets.length
                      ? (count / tickets.length) * 100
                      : 0;

                    return (
                      <div className="priority-row" key={priority}>
                        <div className="priority-row-heading">
                          <span>
                            <span
                              className="legend-dot"
                              style={{ backgroundColor: color }}
                            />
                            {priority}
                          </span>
                          <strong>{count}</strong>
                        </div>
                        <div className="progress-track">
                          <span
                            style={{
                              width: `${percent}%`,
                              backgroundColor: color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="priority-note">
                  <span className="note-icon">✦</span>
                  <p>
                    <strong>Stay on top of urgent issues.</strong>
                    <br />
                    Review critical tickets first to keep your team moving.
                  </p>
                </div>
              </article>

              <article className="panel activity-panel">
                <div className="panel-heading compact-heading">
                  <div>
                    <h2>Recent activity</h2>
                    <p>Latest workspace updates</p>
                  </div>
                  <button
                    className="icon-button more-button"
                    aria-label="More activity options"
                    onClick={() => {
                      setNotification('Showing the latest activity.');
                      window.setTimeout(() => setNotification(''), 3000);
                    }}
                  >
                    ···
                  </button>
                </div>

                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-avatar activity-blue">JW</span>
                    <div>
                      <p>
                        <strong>James Wilson</strong> updated a ticket
                      </p>
                      <span>TKT-1041 · In progress</span>
                      <small>12 minutes ago</small>
                    </div>
                  </div>
                  <div className="activity-item">
                    <span className="activity-avatar activity-green">ET</span>
                    <div>
                      <p>
                        <strong>Emma Thompson</strong> resolved a ticket
                      </p>
                      <span>TKT-1038 · Password reset</span>
                      <small>38 minutes ago</small>
                    </div>
                  </div>
                  <div className="activity-item">
                    <span className="activity-avatar activity-orange">OM</span>
                    <div>
                      <p>
                        <strong>Olivia Martin</strong> created a ticket
                      </p>
                      <span>TKT-1042 · VPN connection</span>
                      <small>1 hour ago</small>
                    </div>
                  </div>
                </div>

                <button
                  className="activity-link"
                  onClick={() => {
                    setNotification('Full activity history is coming soon.');
                    window.setTimeout(() => setNotification(''), 3000);
                  }}
                >
                  View activity history <span>→</span>
                </button>
              </article>
            </aside>
          </section>

          <footer className="page-footer">
            <span>© 2026 Smart Service Desk</span>
            <span>
              Made for better support <span className="footer-heart">♥</span>
            </span>
          </footer>
        </div>
      </main>

      {notification && (
        <div className="toast" role="status">
          <span className="toast-check">✓</span>
          {notification}
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotification('')}
          >
            ×
          </button>
        </div>
      )}

      {showCreateForm && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowCreateForm(false);
            }
          }}
        >
          <section
            className="create-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-ticket-title"
          >
            <div className="modal-heading">
              <div>
                <span className="modal-eyebrow">NEW REQUEST</span>
                <h2 id="create-ticket-title">Create a ticket</h2>
                <p>Describe the issue so the support team can help.</p>
              </div>
              <button
                className="modal-close"
                aria-label="Close form"
                onClick={() => setShowCreateForm(false)}
              >
                ×
              </button>
            </div>

            <form className="create-form" onSubmit={handleCreateTicket}>
              <label>
                Ticket title
                <input
                  autoFocus
                  required
                  minLength={3}
                  maxLength={200}
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  placeholder="e.g. Cannot connect to Wi-Fi"
                />
              </label>

              <label>
                Description
                <textarea
                  required
                  minLength={5}
                  value={newDescription}
                  onChange={(event) =>
                    setNewDescription(event.target.value)
                  }
                  placeholder="Describe the issue and what you have tried..."
                  rows={4}
                />
              </label>

              <div className="form-two-columns">
                <label>
                  Category
                  <select
                    value={newCategory}
                    onChange={(event) =>
                      setNewCategory(event.target.value)
                    }
                  >
                    <option>Hardware</option>
                    <option>Software</option>
                    <option>Network</option>
                    <option>Account</option>
                    <option>Security</option>
                    <option>Other</option>
                  </select>
                </label>

                <label>
                  Priority
                  <select
                    value={newPriority}
                    onChange={(event) =>
                      setNewPriority(event.target.value as TicketPriority)
                    }
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  <span className="plus-icon">+</span>
                  Create ticket
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
