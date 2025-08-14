export const mockArchitects = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    company: 'Modern Architecture Co.',
    status: 'approved',
    joinDate: '2024-01-15',
    documents: [
      { id: '1', type: 'License', fileName: 'architect_license.pdf', uploadDate: '2024-01-10', verified: true },
      { id: '2', type: 'Portfolio', fileName: 'portfolio.pdf', uploadDate: '2024-01-12', verified: true }
    ],
    profile: {
      experience: '8 years',
      specialization: 'Residential Design',
      location: 'New York, NY'
    }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1-555-0124',
    company: 'Green Building Solutions',
    status: 'pending',
    joinDate: '2024-01-20',
    documents: [
      { id: '3', type: 'License', fileName: 'license.pdf', uploadDate: '2024-01-18', verified: false },
      { id: '4', type: 'Portfolio', fileName: 'work_samples.pdf', uploadDate: '2024-01-19', verified: false }
    ],
    profile: {
      experience: '5 years',
      specialization: 'Sustainable Architecture',
      location: 'San Francisco, CA'
    }
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1-555-0125',
    company: 'Urban Design Studio',
    status: 'blocked',
    joinDate: '2024-01-05',
    documents: [
      { id: '5', type: 'License', fileName: 'invalid_license.pdf', uploadDate: '2024-01-03', verified: false }
    ],
    profile: {
      experience: '3 years',
      specialization: 'Urban Planning',
      location: 'Chicago, IL'
    }
  }
];

export const mockTickets = [
  {
    id: '1',
    title: 'Unable to upload portfolio',
    description: 'Getting error when trying to upload portfolio documents',
    status: 'open',
    priority: 'high',
    createdBy: 'John Smith',
    createdDate: '2024-01-22',
    comments: [
      { id: '1', content: 'Initial ticket created', author: 'John Smith', timestamp: '2024-01-22 10:30' }
    ]
  },
  {
    id: '2',
    title: 'Profile verification pending',
    description: 'Waiting for profile verification for over a week',
    status: 'in-progress',
    priority: 'medium',
    createdBy: 'Sarah Johnson',
    assignedTo: 'Support Team',
    createdDate: '2024-01-20',
    comments: [
      { id: '2', content: 'Ticket assigned to verification team', author: 'Admin', timestamp: '2024-01-20 14:15' }
    ]
  },
  {
    id: '3',
    title: 'Account suspended incorrectly',
    description: 'My account was suspended but I believe this was a mistake',
    status: 'resolved',
    priority: 'high',
    createdBy: 'Michael Chen',
    assignedTo: 'Admin',
    createdDate: '2024-01-18',
    resolvedDate: '2024-01-19',
    comments: [
      { id: '3', content: 'Reviewing suspension reason', author: 'Admin', timestamp: '2024-01-18 16:00' },
      { id: '4', content: 'Suspension maintained due to invalid documents', author: 'Admin', timestamp: '2024-01-19 09:30' }
    ]
  }
];

export const mockVisitors = [
  {
    id: '1',
    location: 'New York, NY',
    visitDate: '2024-01-22',
    pagesVisited: 5,
    timeSpent: 420,
    architectsApproached: 2,
    isReturning: false
  },
  {
    id: '2',
    location: 'Los Angeles, CA',
    visitDate: '2024-01-22',
    pagesVisited: 3,
    timeSpent: 180,
    architectsApproached: 1,
    isReturning: true
  },
  {
    id: '3',
    location: 'Chicago, IL',
    visitDate: '2024-01-21',
    pagesVisited: 7,
    timeSpent: 600,
    architectsApproached: 3,
    isReturning: false
  }
];

export const mockStats = {
  totalArchitects: 156,
  approvedArchitects: 128,
  blockedArchitects: 12,
  suspendedArchitects: 16,
  totalTickets: 89,
  openTickets: 23,
  resolvedTickets: 66,
  todayVisitors: 245,
  monthlyVisitors: 8420,
  avgArchitectsApproached: 2.3
};
